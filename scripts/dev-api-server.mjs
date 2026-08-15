// Local stand-in for Vercel's serverless function runtime, so `npm run dev`
// works end-to-end without needing `vercel login` (which needs an
// interactive browser flow Vercel's CLI can't do here). It replicates the
// bits of the Vercel Node.js Functions contract our handlers rely on:
// req.query (path params + querystring merged, matching Vercel's real
// behavior for [param].js files), req.body (JSON-parsed), req.cookies, and
// res.status()/json()/setHeader(). Production itself doesn't use this file
// at all — Vercel's own platform runs api/**/*.js natively on deploy.
import 'dotenv/config'
import http from 'node:http'
import { URL } from 'node:url'

const PORT = process.env.API_PORT || 3001

const ROUTES = [
  { method: '*', pattern: /^\/api\/auth\/login$/, load: () => import('../api/auth/login.js') },
  { method: '*', pattern: /^\/api\/auth\/logout$/, load: () => import('../api/auth/logout.js') },
  { method: '*', pattern: /^\/api\/auth\/me$/, load: () => import('../api/auth/me.js') },
  { method: '*', pattern: /^\/api\/content$/, load: () => import('../api/content.js') },
  { method: '*', pattern: /^\/api\/admin\/media$/, load: () => import('../api/admin/media.js') },
  { method: '*', pattern: /^\/api\/admin\/site-content$/, load: () => import('../api/admin/site-content.js') },
  { method: '*', pattern: /^\/api\/admin\/users$/, load: () => import('../api/admin/users.js') },
  {
    method: '*',
    pattern: /^\/api\/admin\/(?<resource>[^/]+)$/,
    load: () => import('../api/admin/[resource].js')
  }
]

function parseCookies(header) {
  const out = {}
  if (!header) return out
  for (const part of header.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim())
  }
  return out
}

async function readBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (chunks.length === 0) return undefined
  const raw = Buffer.concat(chunks).toString('utf8')
  const contentType = req.headers['content-type'] || ''
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw)
    } catch {
      return undefined
    }
  }
  return raw
}

function augmentResponse(res) {
  res.status = function (code) {
    res.statusCode = code
    return res
  }
  res.json = function (body) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(body))
  }
  return res
}

const server = http.createServer(async (req, res) => {
  augmentResponse(res)
  const url = new URL(req.url, `http://${req.headers.host}`)

  const route = ROUTES.find((r) => r.pattern.test(url.pathname))
  if (!route) {
    res.status(404).json({ error: 'No such API route' })
    return
  }

  try {
    const match = url.pathname.match(route.pattern)
    const query = { ...match.groups }
    for (const [key, value] of url.searchParams) query[key] = value

    req.query = query
    req.cookies = parseCookies(req.headers.cookie)
    req.body = await readBody(req)

    const mod = await route.load()
    await mod.default(req, res)
  } catch (err) {
    console.error(`[dev-api-server] ${req.method} ${url.pathname} ->`, err)
    if (!res.headersSent) res.status(500).json({ error: 'Unexpected server error' })
  }
})

server.listen(PORT, () => {
  console.log(`Local API dev server listening on http://localhost:${PORT}`)
})
