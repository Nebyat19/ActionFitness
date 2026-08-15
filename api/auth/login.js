import { eq } from 'drizzle-orm'
import { db, schema } from '../_lib/db.js'
import {
  verifyPassword,
  signSessionToken,
  setAuthCookie,
  requireSameOrigin,
  isLockedOut,
  recordFailedLogin,
  recordSuccessfulLogin
} from '../_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!requireSameOrigin(req, res)) return

  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const [user] = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, String(email).toLowerCase().trim()))
    .limit(1)

  // Same generic error for "no such user" and "wrong password" so login
  // can't be used to enumerate valid admin emails.
  const genericError = () => res.status(401).json({ error: 'Invalid email or password' })

  if (!user || !user.isActive) return genericError()
  if (isLockedOut(user)) {
    return res.status(423).json({ error: 'Too many failed attempts. Try again in a few minutes.' })
  }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    await recordFailedLogin(user)
    return genericError()
  }

  await recordSuccessfulLogin(user)
  const token = await signSessionToken({ userId: user.id, tokenVersion: user.tokenVersion })
  setAuthCookie(res, token)
  return res.status(200).json({ id: user.id, email: user.email })
}
