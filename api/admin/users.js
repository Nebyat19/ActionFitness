// Minimal admin-account management — no roles/RBAC, just email + password +
// is_active, and only reachable by an already-authenticated admin. Deliberately
// small: this exists so the owner can add/remove staff logins from the
// dashboard instead of needing shell access, not a full user-management system.
import { eq, ne, and } from 'drizzle-orm'
import { db, schema } from '../_lib/db.js'
import { requireAuth, requireSameOrigin, hashPassword } from '../_lib/auth.js'

const PUBLIC_FIELDS = {
  id: schema.adminUsers.id,
  email: schema.adminUsers.email,
  isActive: schema.adminUsers.isActive,
  createdAt: schema.adminUsers.createdAt
}

export default async function handler(req, res) {
  const currentUser = await requireAuth(req, res)
  if (!currentUser) return
  if (!requireSameOrigin(req, res)) return

  const { id } = req.query

  try {
    switch (req.method) {
      case 'GET': {
        const rows = await db.select(PUBLIC_FIELDS).from(schema.adminUsers).orderBy(schema.adminUsers.id)
        return res.status(200).json(rows)
      }

      case 'POST': {
        const { email, password } = req.body || {}
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' })
        }
        if (password.length < 8) {
          return res.status(400).json({ error: 'Password must be at least 8 characters' })
        }
        const passwordHash = await hashPassword(password)
        const [row] = await db
          .insert(schema.adminUsers)
          .values({ email: email.toLowerCase().trim(), passwordHash })
          .returning(PUBLIC_FIELDS)
        return res.status(201).json(row)
      }

      case 'PUT': {
        if (!id) return res.status(400).json({ error: 'id is required' })
        const { password, isActive } = req.body || {}
        const data = {}

        if (password !== undefined) {
          if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' })
          }
          data.passwordHash = await hashPassword(password)
          // Changing the password invalidates any existing session for this
          // user immediately (see requireAuth's tokenVersion check).
          data.tokenVersion = (await currentTokenVersion(Number(id))) + 1
        }
        if (isActive !== undefined) {
          data.isActive = Boolean(isActive)
          if (!isActive) data.tokenVersion = (await currentTokenVersion(Number(id))) + 1
        }
        if (Object.keys(data).length === 0) {
          return res.status(400).json({ error: 'Nothing to update' })
        }

        const [row] = await db
          .update(schema.adminUsers)
          .set(data)
          .where(eq(schema.adminUsers.id, Number(id)))
          .returning(PUBLIC_FIELDS)
        if (!row) return res.status(404).json({ error: 'Not found' })
        return res.status(200).json(row)
      }

      case 'DELETE': {
        if (!id) return res.status(400).json({ error: 'id is required' })
        // Guard against locking everyone out by deleting the last active admin.
        const otherActive = await db
          .select({ id: schema.adminUsers.id })
          .from(schema.adminUsers)
          .where(and(ne(schema.adminUsers.id, Number(id)), eq(schema.adminUsers.isActive, true)))
        if (otherActive.length === 0) {
          return res.status(409).json({ error: 'Cannot delete the last active admin account' })
        }
        const [row] = await db
          .delete(schema.adminUsers)
          .where(eq(schema.adminUsers.id, Number(id)))
          .returning(PUBLIC_FIELDS)
        if (!row) return res.status(404).json({ error: 'Not found' })
        return res.status(200).json({ ok: true })
      }

      default:
        res.setHeader('Allow', 'GET, POST, PUT, DELETE')
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'That email is already registered' })
    }
    console.error('[api/admin/users]', err)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}

async function currentTokenVersion(id) {
  const [row] = await db
    .select({ tokenVersion: schema.adminUsers.tokenVersion })
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.id, id))
    .limit(1)
  return row?.tokenVersion ?? 0
}
