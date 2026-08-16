// Media library: issues presigned R2 upload URLs (files go straight from the
// admin's browser to R2, never through this function — needed since video
// files can exceed serverless request-body limits), registers the resulting
// media row, lists the library, and deletes (blocking delete of anything
// still referenced elsewhere).
//
// POST   /api/admin/media   { type: 'request-upload-url', filename, contentType, size }
//        -> { uploadUrl, publicUrl, pathname }
// POST   /api/admin/media   { blobUrl, blobPathname, kind, altText }    -> create row
//        (sent by our own admin UI right after the PUT to `uploadUrl`
//        resolves — this is the source of truth for the DB row since R2
//        has no completion webhook we could use instead. Trade-off: if the
//        tab closes between upload finishing and this call, the object is
//        orphaned in storage with no DB row — harmless, just needs a manual
//        cleanup in the Cloudflare dashboard if it ever happens.)
// GET    /api/admin/media          -> list
// DELETE /api/admin/media?id=1     -> delete (blocked if still referenced)
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { eq, desc } from 'drizzle-orm'
import { db, schema } from '../_lib/db.js'
import { requireAuth, requireSameOrigin } from '../_lib/auth.js'
import { ALLOWED_CONTENT_TYPES, MAX_UPLOAD_BYTES } from '../_lib/blob.js'
import { r2, R2_BUCKET, publicUrlFor } from '../_lib/r2.js'

const REFERENCING_TABLES = [
  { table: schema.branches, column: 'imageMediaId', label: 'branches' },
  { table: schema.services, column: 'imageMediaId', label: 'services' },
  { table: schema.services, column: 'videoMediaId', label: 'services' },
  { table: schema.trainers, column: 'imageMediaId', label: 'trainers' },
  { table: schema.galleryItems, column: 'mediaId', label: 'gallery items' },
  { table: schema.certificates, column: 'imageMediaId', label: 'certificates' },
  { table: schema.transformations, column: 'imageMediaId', label: 'transformations' },
  { table: schema.transformations, column: 'videoMediaId', label: 'transformations' }
]

export default async function handler(req, res) {
  const user = await requireAuth(req, res)
  if (!user) return

  try {
    return await route(req, res)
  } catch (err) {
    console.error('[api/admin/media]', err)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}

async function route(req, res) {
  if (req.method === 'GET') {
    const rows = await db.select().from(schema.media).orderBy(desc(schema.media.createdAt))
    return res.status(200).json(rows)
  }

  if (req.method === 'POST') {
    if (!requireSameOrigin(req, res)) return

    // Presigned upload URL request (sent by uploadMedia() before the PUT).
    if (req.body?.type === 'request-upload-url') {
      const { filename, contentType, size } = req.body
      if (!filename || !contentType || !size) {
        return res.status(400).json({ error: 'filename, contentType and size are required' })
      }
      if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
        return res.status(400).json({ error: `Content type not allowed: ${contentType}` })
      }
      if (size > MAX_UPLOAD_BYTES) {
        return res.status(400).json({ error: 'File exceeds maximum upload size' })
      }
      const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const pathname = `media/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`
      try {
        const uploadUrl = await getSignedUrl(
          r2,
          new PutObjectCommand({
            Bucket: R2_BUCKET,
            Key: pathname,
            ContentType: contentType,
            ContentLength: size
          }),
          { expiresIn: 300 }
        )
        return res.status(200).json({ uploadUrl, publicUrl: publicUrlFor(pathname), pathname })
      } catch (err) {
        console.error('[api/admin/media] presign failed', err)
        return res.status(500).json({ error: 'Failed to create upload URL' })
      }
    }

    // Register the media row after a direct upload has completed.
    const { blobUrl, blobPathname, kind, altText } = req.body || {}
    if (!blobUrl || !blobPathname || !kind) {
      return res.status(400).json({ error: 'blobUrl, blobPathname and kind are required' })
    }
    if (!['image', 'video'].includes(kind)) {
      return res.status(400).json({ error: 'kind must be "image" or "video"' })
    }
    const [row] = await db
      .insert(schema.media)
      .values({ blobUrl, blobPathname, kind, altText: altText || null })
      .returning()
    return res.status(201).json(row)
  }

  if (req.method === 'DELETE') {
    if (!requireSameOrigin(req, res)) return

    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'id is required' })
    const mediaId = Number(id)

    const [mediaRow] = await db.select().from(schema.media).where(eq(schema.media.id, mediaId)).limit(1)
    if (!mediaRow) return res.status(404).json({ error: 'Not found' })

    const usage = {}
    for (const { table, column, label } of REFERENCING_TABLES) {
      const rows = await db.select({ id: table.id }).from(table).where(eq(table[column], mediaId))
      if (rows.length) usage[label] = (usage[label] || 0) + rows.length
    }
    if (Object.keys(usage).length > 0) {
      const summary = Object.entries(usage)
        .map(([label, count]) => `${count} ${label}`)
        .join(', ')
      return res.status(409).json({ error: `Still used by ${summary}. Remove those references first.`, usage })
    }

    try {
      await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: mediaRow.blobPathname }))
    } catch (err) {
      // R2's DeleteObject is idempotent (no error if already gone), so any
      // failure here is a real problem — don't silently clear the DB row.
      console.error('[api/admin/media] r2 delete failed', err)
      return res.status(502).json({ error: 'Failed to delete file from storage, DB row left untouched' })
    }
    await db.delete(schema.media).where(eq(schema.media.id, mediaId))
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'GET, POST, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
