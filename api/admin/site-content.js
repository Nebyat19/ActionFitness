// Key/value upsert for singleton freeform content blocks (gym info, hero
// text, about-us, why-us, founder bio) that don't need a dedicated table.
//
// GET /api/admin/site-content          -> all blocks
// GET /api/admin/site-content?key=hero -> one block
// PUT /api/admin/site-content?key=hero -> upsert { value: {...} }
import { eq } from 'drizzle-orm'
import { db, schema } from '../_lib/db.js'
import { requireAuth, requireSameOrigin } from '../_lib/auth.js'

export default async function handler(req, res) {
  const user = await requireAuth(req, res)
  if (!user) return
  if (!requireSameOrigin(req, res)) return

  const { key } = req.query

  if (req.method === 'GET') {
    if (key) {
      const [row] = await db.select().from(schema.siteContent).where(eq(schema.siteContent.key, key)).limit(1)
      if (!row) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json(row)
    }
    const rows = await db.select().from(schema.siteContent)
    return res.status(200).json(rows)
  }

  if (req.method === 'PUT') {
    if (!key) return res.status(400).json({ error: 'key is required' })
    const { value } = req.body || {}
    if (value === undefined) return res.status(400).json({ error: 'value is required' })

    const [row] = await db
      .insert(schema.siteContent)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: schema.siteContent.key,
        set: { value, updatedAt: new Date() }
      })
      .returning()

    return res.status(200).json(row)
  }

  res.setHeader('Allow', 'GET, PUT')
  return res.status(405).json({ error: 'Method not allowed' })
}
