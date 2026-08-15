// Guardrails applied when issuing client-upload tokens, so a leaked/expired
// token (or a careless admin session) can't be used to host arbitrary files.
export const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime'
]

// Soft abuse guardrail, not a product requirement — generous enough for
// full-resolution gym photos and short transformation videos.
export const MAX_UPLOAD_BYTES = 300 * 1024 * 1024

export function kindFromContentType(contentType) {
  if (contentType?.startsWith('video/')) return 'video'
  if (contentType?.startsWith('image/')) return 'image'
  return null
}
