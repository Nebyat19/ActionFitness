// Thin fetch wrapper for the authenticated /api/admin/* and /api/auth/*
// endpoints. Cookies (the session JWT) travel automatically via
// credentials: 'include' since everything is same-origin.

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

// Uploads a file straight from the browser to R2 via a presigned URL (never
// through our own serverless function — needed so video uploads aren't
// capped by a function's request-body size limit), then registers the
// resulting media row. `onUploadProgress`, if given, is called with
// `{ loaded, total }` as the PUT progresses.
export async function uploadMedia(file, { altText, onUploadProgress } = {}) {
  const { uploadUrl, publicUrl, pathname } = await request('/admin/media', {
    method: 'POST',
    body: { type: 'request-upload-url', filename: file.name, contentType: file.type, size: file.size }
  })

  await putWithProgress(uploadUrl, file, onUploadProgress)

  const kind = file.type.startsWith('video/') ? 'video' : 'image'
  return adminApi.media.register({ blobUrl: publicUrl, blobPathname: pathname, kind, altText })
}

// fetch() has no upload progress event, so XHR is needed to drive the
// progress bar during large video uploads.
function putWithProgress(url, file, onUploadProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', file.type)
    if (onUploadProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) onUploadProgress({ loaded: e.loaded, total: e.total })
      })
    }
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve()
      else reject(new Error(`Upload failed (${xhr.status})`))
    })
    xhr.addEventListener('error', () => reject(new Error('Upload failed')))
    xhr.send(file)
  })
}
