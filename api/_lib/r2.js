// Cloudflare R2 client. R2 is S3-compatible so the AWS SDK talks to it
// directly — just point the endpoint at the account's R2 URL and use R2 API
// tokens instead of AWS credentials. Free tier: 10GB storage, no egress fees
// (the thing that made Vercel Blob's 1GB/limited-bandwidth Hobby tier too
// tight for video content).
import { S3Client } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
})

export const R2_BUCKET = process.env.R2_BUCKET_NAME

// Public base URL for reading objects back — either the bucket's r2.dev
// subdomain or a custom domain mapped to it in the Cloudflare dashboard.
// R2's S3 API endpoint itself is not publicly readable.
export function publicUrlFor(pathname) {
  return `${process.env.R2_PUBLIC_URL.replace(/\/$/, '')}/${pathname}`
}
