// Media library: issues scoped client-upload tokens (files go straight from
// the admin's browser to Blob, never through this function — needed since
// video files can exceed serverless request-body limits), registers the
// resulting media row, lists the library, and deletes (blocking delete of
// anything still referenced elsewhere).
//
// POST   /api/admin/media   { type: 'blob.generate-client-token', ... } -> token
//        (this shape is sent automatically by @vercel/blob/client's upload())
// POST   /api/admin/media   { blobUrl, blobPathname, kind, altText }    -> create row
//        (sent by our own admin UI right after upload() resolves — this is
//        the source of truth for the DB row rather than Blob's completion
//        webhook, because that webhook can't reach `vercel dev` locally
//        without a public tunnel. Trade-off: if the tab closes between
//        upload finishing and this call, the blob is orphaned in storage
//        with no DB row — harmless, just needs a manual cleanup in the
//        Vercel dashboard if it ever happens.)
// GET    /api/admin/media          -> list
// DELETE /api/admin/media?id=1     -> delete (blocked if still referenced)
import { del } from '@vercel/blob'
import { handleUpload } from '@vercel/blob/client'
import { eq, desc } from 'drizzle-orm'
import { db, schema } from '../_lib/db.js'
import { requireAuth, requireSameOrigin } from '../_lib/auth.js'
import { ALLOWED_CONTENT_TYPES, MAX_UPLOAD_BYTES } from '../_lib/blob.js'

const REFERENCING_TABLES = [
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

    // Client upload token request (forwarded from @vercel/blob/client's upload()).
    if (req.body?.type === 'blob.generate-client-token') {
      try {
        const jsonResponse = await handleUpload({
          body: req.body,
          request: req,
          onBeforeGenerateToken: async () => ({
            allowedContentTypes: ALLOWED_CONTENT_TYPES,
            maximumSizeInBytes: MAX_UPLOAD_BYTES,
            addRandomSuffix: true
          })
        })
        return res.status(200).json(jsonResponse)
      } catch (err) {
        console.error('[api/admin/media] token generation failed', err)
        return res.status(400).json({ error: err.message })
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
      await del(mediaRow.blobUrl)
    } catch (err) {
      // If it's already gone from Blob storage, don't block clearing the
      // now-orphaned DB row over it — but surface any other failure.
      if (err?.name !== 'BlobNotFoundError') {
        console.error('[api/admin/media] blob delete failed', err)
        return res.status(502).json({ error: 'Failed to delete file from storage, DB row left untouched' })
      }
    }
    await db.delete(schema.media).where(eq(schema.media.id, mediaId))
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'GET, POST, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
