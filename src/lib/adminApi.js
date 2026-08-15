// Thin fetch wrapper for the authenticated /api/admin/* and /api/auth/*
// endpoints. Cookies (the session JWT) travel automatically via
// credentials: 'include' since everything is same-origin.
import { upload } from '@vercel/blob/client'

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: 'include',
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // empty body (e.g. 204s) — fine
  }

  if (!res.ok) {
    const error = new Error(data?.error || `Request failed (${res.status})`)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}

export const adminApi = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),

  list: (resource) => request(`/admin/${resource}`),
  get: (resource, id) => request(`/admin/${resource}?id=${id}`),
  create: (resource, data) => request(`/admin/${resource}`, { method: 'POST', body: data }),
  update: (resource, id, data) => request(`/admin/${resource}?id=${id}`, { method: 'PUT', body: data }),
  remove: (resource, id) => request(`/admin/${resource}?id=${id}`, { method: 'DELETE' }),

  siteContent: {
    list: () => request('/admin/site-content'),
    get: (key) => request(`/admin/site-content?key=${key}`),
    set: (key, value) => request(`/admin/site-content?key=${key}`, { method: 'PUT', body: { value } })
  },

  media: {
    list: () => request('/admin/media'),
    register: (data) => request('/admin/media', { method: 'POST', body: data }),
    remove: (id) => request(`/admin/media?id=${id}`, { method: 'DELETE' })
  },

  users: {
    list: () => request('/admin/users'),
    create: (data) => request('/admin/users', { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/users?id=${id}`, { method: 'PUT', body: data }),
    remove: (id) => request(`/admin/users?id=${id}`, { method: 'DELETE' })
  }
}

// Uploads a file straight from the browser to Vercel Blob (never through our
// own serverless function — needed so video uploads aren't capped by a
// function's request-body size limit), then registers the resulting media
// row. `onUploadProgress` is optional, forwarded straight to @vercel/blob.
export async function uploadMedia(file, { altText, onUploadProgress } = {}) {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const pathname = `media/${Date.now()}-${safeName}`

  const blob = await upload(pathname, file, {
    access: 'public',
    handleUploadUrl: '/api/admin/media',
    onUploadProgress
  })

  const kind = file.type.startsWith('video/') ? 'video' : 'image'
  return adminApi.media.register({ blobUrl: blob.url, blobPathname: blob.pathname, kind, altText })
}
