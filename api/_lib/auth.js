import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db, schema } from './db.js'

const COOKIE_NAME = 'admin_session'
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days — short-ish on purpose, see plan notes on revocation
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_MINUTES = 15

function secretKey() {
  if (!process.env.AUTH_SECRET) {
    throw new Error('AUTH_SECRET is not set')
  }
  return new TextEncoder().encode(process.env.AUTH_SECRET)
}

// ---------------------------------------------------------------------------
// Password hashing
// ---------------------------------------------------------------------------

export function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

// ---------------------------------------------------------------------------
// JWT
// ---------------------------------------------------------------------------

export async function signSessionToken({ userId, tokenVersion }) {
  return new SignJWT({ tokenVersion })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL_SECONDS}s`)
    .sign(secretKey())
}

async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey())
    return { userId: Number(payload.sub), tokenVersion: payload.tokenVersion }
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Cookies (Vercel Node functions don't ship a cookie-writing helper, only
// cookie-reading via req.cookies — Set-Cookie has to be built by hand)
// ---------------------------------------------------------------------------

function serializeCookie(name, value, { maxAge, clear = false } = {}) {
  const parts = [`${name}=${value}`, 'Path=/', 'HttpOnly', 'SameSite=Strict']
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    parts.push('Secure')
  }
  parts.push(clear ? 'Max-Age=0' : `Max-Age=${maxAge}`)
  return parts.join('; ')
}

export function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie', serializeCookie(COOKIE_NAME, token, { maxAge: TOKEN_TTL_SECONDS }))
}

export function clearAuthCookie(res) {
  res.setHeader('Set-Cookie', serializeCookie(COOKIE_NAME, '', { clear: true }))
}

function readCookie(req, name) {
  if (req.cookies && req.cookies[name]) return req.cookies[name]
  const header = req.headers.cookie
  if (!header) return null
  const match = header.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`))
  return match ? match.slice(name.length + 1) : null
}

// ---------------------------------------------------------------------------
// Auth guard — call at the top of every authenticated handler.
// Re-verifies the JWT AND re-checks is_active/tokenVersion against the DB on
// every request, so deactivating/deleting a user or changing their password
// revokes access immediately instead of waiting out token expiry.
// Returns the user row on success, or null after already sending a 401.
// ---------------------------------------------------------------------------

export async function requireAuth(req, res) {
  const token = readCookie(req, COOKIE_NAME)
  if (!token) {
    res.status(401).json({ error: 'Not authenticated' })
    return null
  }

  const claims = await verifySessionToken(token)
  if (!claims) {
    res.status(401).json({ error: 'Session expired or invalid' })
    return null
  }

  const [user] = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.id, claims.userId))
    .limit(1)

  if (!user || !user.isActive || user.tokenVersion !== claims.tokenVersion) {
    res.status(401).json({ error: 'Session no longer valid' })
    return null
  }

  return user
}

// ---------------------------------------------------------------------------
// CSRF mitigation: sameSite=Strict on the cookie already blocks the common
// cases, but for defense in depth every mutating admin request must also
// come from our own origin.
// ---------------------------------------------------------------------------

export function requireSameOrigin(req, res) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return true

  const host = req.headers.host
  const origin = req.headers.origin || req.headers.referer
  if (!origin || !host) {
    res.status(403).json({ error: 'Missing origin' })
    return false
  }
  let originHost
  try {
    originHost = new URL(origin).host
  } catch {
    res.status(403).json({ error: 'Invalid origin' })
    return false
  }
  if (originHost !== host) {
    res.status(403).json({ error: 'Cross-origin request rejected' })
    return false
  }
  return true
}

// ---------------------------------------------------------------------------
// Login attempt tracking / lockout — Vercel Hobby has no built-in rate
// limiting, so brute-force protection lives here instead.
// ---------------------------------------------------------------------------

export function isLockedOut(user) {
  return Boolean(user.lockedUntil && new Date(user.lockedUntil) > new Date())
}

export async function recordFailedLogin(user) {
  const attempts = user.failedLoginAttempts + 1
  const lockedUntil =
    attempts >= MAX_FAILED_ATTEMPTS
      ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
      : user.lockedUntil

  await db
    .update(schema.adminUsers)
    .set({ failedLoginAttempts: attempts >= MAX_FAILED_ATTEMPTS ? 0 : attempts, lockedUntil })
    .where(eq(schema.adminUsers.id, user.id))
}

export async function recordSuccessfulLogin(user) {
  await db
    .update(schema.adminUsers)
    .set({ failedLoginAttempts: 0, lockedUntil: null })
    .where(eq(schema.adminUsers.id, user.id))
}
