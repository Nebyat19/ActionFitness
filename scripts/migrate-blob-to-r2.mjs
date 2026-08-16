// One-time migration: copies every media row still pointing at Vercel Blob
// over to R2 (download from the old public blobUrl, upload to R2 under the
// same pathname, then repoint the DB row's blobUrl at R2). Idempotent — rows
// already on R2 are skipped, so it's safe to re-run after a partial failure
// (e.g. a flaky Neon connection mid-run).
//
// Usage: npm run migrate:blob-to-r2
//
// Does NOT delete anything from Vercel Blob — once this reports 0 remaining
// and you've spot-checked a few images/videos on the live site, delete the
// Vercel Blob store from the Vercel dashboard yourself.
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { eq } from 'drizzle-orm'
import { db, schema } from '../db/client.js'
import { r2, R2_BUCKET, publicUrlFor } from '../api/_lib/r2.js'

async function withRetry(fn, { retries = 2, delayMs = 1500 } = {}) {
  let lastErr
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      if (attempt < retries) {
        console.warn(`    retrying after error: ${err.message}`)
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
    }
  }
  throw lastErr
}

async function migrateRow(row) {
  const res = await withRetry(async () => {
    const r = await fetch(row.blobUrl)
    if (!r.ok) throw new Error(`fetch ${row.blobUrl} -> HTTP ${r.status}`)
    return r
  })
  const contentType = res.headers.get('content-type') || 'application/octet-stream'
  const buffer = Buffer.from(await res.arrayBuffer())

  await withRetry(() =>
    r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: row.blobPathname,
        Body: buffer,
        ContentType: contentType
      })
    )
  )

  const newUrl = publicUrlFor(row.blobPathname)
  await withRetry(() => db.update(schema.media).set({ blobUrl: newUrl }).where(eq(schema.media.id, row.id)))

  return newUrl
}

async function main() {
  const rows = await withRetry(() => db.select().from(schema.media))
  const pending = rows.filter((r) => !r.blobUrl.startsWith(process.env.R2_PUBLIC_URL))

  console.log(`${rows.length} media rows total, ${pending.length} still on Vercel Blob\n`)

  let ok = 0
  let failed = 0
  for (const row of pending) {
    try {
      const newUrl = await migrateRow(row)
      ok++
      console.log(`  [${ok}/${pending.length}] id=${row.id} ${row.blobPathname} -> ${newUrl}`)
    } catch (err) {
      failed++
      console.error(`  FAILED id=${row.id} ${row.blobPathname}: ${err.message}`)
    }
  }

  console.log(`\nDone. ${ok} migrated, ${failed} failed.`)
  if (failed > 0) {
    console.log('Re-run this script to retry the failed rows (already-migrated rows are skipped).')
    process.exitCode = 1
  }
}

main()
