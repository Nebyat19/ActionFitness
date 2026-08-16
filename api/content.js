// Public, unauthenticated aggregate endpoint — the entire public site fetches
// this ONCE instead of firing 8+ separate requests, and it's cached at
// Vercel's edge so Neon's autosuspend cold-start and free-tier compute don't
// get hit on every visitor. 60s cache keeps admin edits showing up quickly
// without re-querying Neon on every single page load.
import { eq, asc } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { db, schema } from './_lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const [
      branches,
      services,
      trainers,
      certificates,
      transformations,
      collections,
      collectionItems,
      siteContentRows
    ] = await Promise.all([
      db
        .select()
        .from(schema.branches)
        .where(eq(schema.branches.isActive, true))
        .orderBy(asc(schema.branches.sortOrder), asc(schema.branches.id)),

      selectWithMedia(
        'services',
        schema.services,
        { image: 'imageMediaId', video: 'videoMediaId' },
        eq(schema.services.isActive, true)
      ),

      selectWithMedia('trainers', schema.trainers, { image: 'imageMediaId' }, eq(schema.trainers.isActive, true)),

      selectWithMedia('certificates', schema.certificates, { image: 'imageMediaId' }),

      selectWithMedia('transformations', schema.transformations, { image: 'imageMediaId', video: 'videoMediaId' }),

      db
        .select()
        .from(schema.galleryCollections)
        .where(eq(schema.galleryCollections.isActive, true))
        .orderBy(asc(schema.galleryCollections.sortOrder), asc(schema.galleryCollections.id)),

      db
        .select({
          id: schema.galleryItems.id,
          collectionId: schema.galleryItems.collectionId,
          sortOrder: schema.galleryItems.sortOrder,
          mediaUrl: schema.media.blobUrl,
          mediaKind: schema.media.kind,
          altText: schema.media.altText
        })
        .from(schema.galleryItems)
        .innerJoin(schema.media, eq(schema.galleryItems.mediaId, schema.media.id))
        .orderBy(asc(schema.galleryItems.sortOrder), asc(schema.galleryItems.id)),

      db.select().from(schema.siteContent)
    ])

    const itemsByCollection = new Map()
    for (const item of collectionItems) {
      if (!itemsByCollection.has(item.collectionId)) itemsByCollection.set(item.collectionId, [])
      itemsByCollection.get(item.collectionId).push(item)
    }
    const gallery = collections.map((c) => ({ ...c, items: itemsByCollection.get(c.id) || [] }))

    const siteContent = {}
    for (const row of siteContentRows) siteContent[row.key] = row.value

    // founder.imageMediaId is a media table id (set via the admin's media
    // picker) — resolve it to a URL here since the founder section renders
    // straight from this object rather than joining media itself.
    if (siteContent.founder?.imageMediaId) {
      const [img] = await db
        .select({ blobUrl: schema.media.blobUrl })
        .from(schema.media)
        .where(eq(schema.media.id, siteContent.founder.imageMediaId))
        .limit(1)
      if (img) siteContent.founder = { ...siteContent.founder, imageUrl: img.blobUrl }
    }

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).json({
      branches,
      services,
      trainers,
      certificates,
      transformations,
      gallery,
      siteContent
    })
  } catch (err) {
    console.error('[api/content]', err)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}

// Selects every column of `table` plus resolved Blob URLs for its media
// reference columns (e.g. { image: 'imageMediaId', video: 'videoMediaId' }),
// so the frontend gets plain `imageUrl`/`videoUrl` strings instead of ids.
// `tableLabel` just needs to be unique per call, for the join aliases.
async function selectWithMedia(tableLabel, table, mediaColumns, whereClause) {
  const aliases = {}
  const extra = {}
  for (const [label] of Object.entries(mediaColumns)) {
    const a = alias(schema.media, `${tableLabel}_${label}`)
    aliases[label] = a
    extra[`${label}Url`] = a.blobUrl
  }

  let query = db.select({ ...table, ...extra }).from(table)

  for (const [label, column] of Object.entries(mediaColumns)) {
    query = query.leftJoin(aliases[label], eq(table[column], aliases[label].id))
  }

  if (whereClause) query = query.where(whereClause)
  return query.orderBy(asc(table.sortOrder), asc(table.id))
}
