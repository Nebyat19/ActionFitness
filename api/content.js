// Public, unauthenticated aggregate endpoint — the entire public site fetches
// this ONCE instead of firing 8+ separate requests. Deliberately uncached
// (no-store) so admin edits are visible immediately everywhere — the
// trade-off is every page load hits Neon directly, including any
// autosuspend cold-start latency if the DB has been idle. Revisit with a
// short s-maxage on api/content.js's Cache-Control if that latency becomes
// a real problem at higher traffic.
import { eq, asc, inArray } from 'drizzle-orm'
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
      selectWithMedia('branches', schema.branches, { image: 'imageMediaId' }, eq(schema.branches.isActive, true)),

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

    // site_images.*MediaId fields are media table ids too (admin's Site
    // Images page) — resolve each to a `...Url` string the way founder's
    // photo is resolved above.
    if (siteContent.site_images) {
      const mediaIdKeys = Object.keys(siteContent.site_images).filter((k) => k.endsWith('MediaId'))
      const ids = mediaIdKeys.map((k) => siteContent.site_images[k]).filter(Boolean)
      if (ids.length) {
        const rows = await db.select({ id: schema.media.id, blobUrl: schema.media.blobUrl }).from(schema.media).where(inArray(schema.media.id, ids))
        const urlById = new Map(rows.map((r) => [r.id, r.blobUrl]))
        const resolved = { ...siteContent.site_images }
        for (const key of mediaIdKeys) {
          const id = siteContent.site_images[key]
          if (id && urlById.has(id)) resolved[key.replace(/MediaId$/, 'Url')] = urlById.get(id)
        }
        siteContent.site_images = resolved
      }
    }

    res.setHeader('Cache-Control', 'no-store')
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
