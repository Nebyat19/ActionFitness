// Shared DB client for all serverless functions. Vercel does not route
// files/directories under api/ that start with an underscore, so this
// (and its siblings in this folder) are never exposed as endpoints.
export { db, schema } from '../../db/client.js'
