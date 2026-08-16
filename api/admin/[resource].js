// Generic authenticated CRUD dispatcher for the "shape-alike" resources —
// keeps the function count low on Vercel's free tier without turning into
// an unreadable per-resource if/else chain, since every resource here is
// just rows in a table with an allowlist of writable fields.
//
// GET    /api/admin/:resource        -> list all rows (admin view: includes inactive)
// GET    /api/admin/:resource?id=1   -> single row
// POST   /api/admin/:resource        -> create
// PUT    /api/admin/:resource?id=1   -> update
// DELETE /api/admin/:resource?id=1   -> delete
//
// `media`, `site-content`, and `users` are NOT here — their semantics
// (Blob orchestration, key-value upsert, password hashing) genuinely differ
// and live in their own files.
import { eq, asc } from 'drizzle-orm'
import { db, schema } from '../_lib/db.js'
import { requireAuth, requireSameOrigin } from '../_lib/auth.js'

const RESOURCES = {
  branches: {
    table: schema.branches,
    fields: [
      'slug',
      'name',
      'address',
      'phone',
      'openingHours',
      'imageMediaId',
      'isPrimary',
      'sortOrder',
      'isActive'
    ],
    required: ['slug', 'name', 'address']
  },
  services: {
    table: schema.services,
    fields: [
      'slug',
      'name',
      'shortDescription',
      'longDescription',
      'benefits',
      'imageMediaId',
      'videoMediaId',
      'sortOrder',
      'isActive'
    ],
    required: ['slug', 'name']
  },
  trainers: {
    table: schema.trainers,
    fields: ['name', 'title', 'rank', 'certifications', 'imageMediaId', 'sortOrder', 'isActive'],
    required: ['name']
  },
  'gallery-collections': {
    table: schema.galleryCollections,
    fields: ['slug', 'title', 'description', 'sortOrder', 'isActive'],
    required: ['slug', 'title']
  },
  'gallery-items': {
    table: schema.galleryItems,
    fields: ['collectionId', 'mediaId', 'sortOrder'],
    required: ['collectionId', 'mediaId']
  },
  certificates: {
    table: schema.certificates,
    fields: ['imageMediaId', 'sortOrder'],
    required: ['imageMediaId']
  },
  transformations: {
    table: schema.transformations,
    fields: ['title', 'description', 'videoMediaId', 'imageMediaId', 'sortOrder'],
    required: []
  }
}

function pickFields(body, fields) {
  const out = {}
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) out[field] = body[field]
  }
  return out
}

export default async function handler(req, res) {
  const { resource, id } = req.query
  const config = RESOURCES[resource]
  if (!config) return res.status(404).json({ error: `Unknown resource "${resource}"` })

  const user = await requireAuth(req, res)
  if (!user) return
  if (!requireSameOrigin(req, res)) return

  const { table, fields, required } = config

  try {
    switch (req.method) {
      case 'GET': {
        if (id) {
          const [row] = await db.select().from(table).where(eq(table.id, Number(id))).limit(1)
          if (!row) return res.status(404).json({ error: 'Not found' })
          return res.status(200).json(row)
        }
        const rows = await db.select().from(table).orderBy(asc(table.sortOrder), asc(table.id))
        return res.status(200).json(rows)
      }

      case 'POST': {
        const data = pickFields(req.body || {}, fields)
        const missing = required.filter((f) => data[f] === undefined || data[f] === null || data[f] === '')
        if (missing.length) {
          return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` })
        }
        const [row] = await db.insert(table).values(data).returning()
        return res.status(201).json(row)
      }

      case 'PUT': {
        if (!id) return res.status(400).json({ error: 'id is required' })
        const data = pickFields(req.body || {}, fields)
        if (Object.keys(data).length === 0) {
          return res.status(400).json({ error: 'No updatable fields provided' })
        }
        const [row] = await db.update(table).set(data).where(eq(table.id, Number(id))).returning()
        if (!row) return res.status(404).json({ error: 'Not found' })
        return res.status(200).json(row)
      }

      case 'DELETE': {
        if (!id) return res.status(400).json({ error: 'id is required' })
        const [row] = await db.delete(table).where(eq(table.id, Number(id))).returning()
        if (!row) return res.status(404).json({ error: 'Not found' })
        return res.status(200).json({ ok: true })
      }

      default:
        res.setHeader('Allow', 'GET, POST, PUT, DELETE')
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (err) {
    // Unique-slug collisions and FK violations (e.g. a gallery-item pointing
    // at a media row) surface as Postgres error codes — return a readable
    // message instead of a raw 500.
    if (err.code === '23505') {
      return res.status(409).json({ error: 'That slug is already in use' })
    }
    if (err.code === '23503') {
      return res.status(409).json({ error: 'This references (or is referenced by) another item that no longer exists' })
    }
    console.error(`[api/admin/${resource}]`, err)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}
