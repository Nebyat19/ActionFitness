import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  uniqueIndex
} from 'drizzle-orm/pg-core'

// ---------------------------------------------------------------------------
// Admin auth
// ---------------------------------------------------------------------------

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  passwordHash: text('password_hash').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  // Bumped whenever a user's sessions should be force-invalidated
  // (password change, deactivation). Checked on every authenticated request
  // alongside the JWT so revocation doesn't have to wait out token expiry.
  tokenVersion: integer('token_version').notNull().default(0),
  failedLoginAttempts: integer('failed_login_attempts').notNull().default(0),
  lockedUntil: timestamp('locked_until', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
}, (table) => ({
  emailIdx: uniqueIndex('admin_users_email_idx').on(table.email)
}))

// ---------------------------------------------------------------------------
// Media library — every image/video lives here once; other tables reference
// it by id so the same asset can be reused and the admin UI can show
// "used by N services" before allowing a delete.
// ---------------------------------------------------------------------------

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  blobUrl: text('blob_url').notNull(),
  blobPathname: text('blob_pathname').notNull(),
  kind: text('kind').notNull(), // 'image' | 'video'
  altText: text('alt_text'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})

// ---------------------------------------------------------------------------
// Branches — new concept, doesn't exist in the current hardcoded site
// ---------------------------------------------------------------------------

export const branches = pgTable('branches', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phone: text('phone'),
  openingHours: text('opening_hours'),
  imageMediaId: integer('image_media_id').references(() => media.id),
  // The branch whose address/phone/hours populate the header, footer, and
  // contact page — those show one location, not a list, once there's more
  // than one branch. Exactly one row should have this set; if none do, the
  // frontend falls back to the first branch.
  isPrimary: boolean('is_primary').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true)
}, (table) => ({
  slugIdx: uniqueIndex('branches_slug_idx').on(table.slug)
}))

// ---------------------------------------------------------------------------
// Services — unifies the 3 disconnected datasets found in constants.js /
// Services.vue / ServiceDetailView.vue into one source of truth.
// ---------------------------------------------------------------------------

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  shortDescription: text('short_description'),
  longDescription: text('long_description'),
  benefits: jsonb('benefits').notNull().default([]), // string[]
  imageMediaId: integer('image_media_id').references(() => media.id),
  videoMediaId: integer('video_media_id').references(() => media.id),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true)
}, (table) => ({
  slugIdx: uniqueIndex('services_slug_idx').on(table.slug)
}))

// ---------------------------------------------------------------------------
// Trainers
// ---------------------------------------------------------------------------

export const trainers = pgTable('trainers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title'),
  rank: text('rank'),
  certifications: jsonb('certifications').notNull().default([]), // string[]
  imageMediaId: integer('image_media_id').references(() => media.id),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true)
})

// ---------------------------------------------------------------------------
// Gallery — replaces the hardcoded slug allow-list anti-pattern in
// GalleryDetailView.vue with a real DB-backed collection/item model.
// ---------------------------------------------------------------------------

export const galleryCollections = pgTable('gallery_collections', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true)
}, (table) => ({
  slugIdx: uniqueIndex('gallery_collections_slug_idx').on(table.slug)
}))

export const galleryItems = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  collectionId: integer('collection_id')
    .notNull()
    .references(() => galleryCollections.id, { onDelete: 'cascade' }),
  mediaId: integer('media_id')
    .notNull()
    .references(() => media.id),
  sortOrder: integer('sort_order').notNull().default(0)
})

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------

export const certificates = pgTable('certificates', {
  id: serial('id').primaryKey(),
  imageMediaId: integer('image_media_id')
    .notNull()
    .references(() => media.id),
  sortOrder: integer('sort_order').notNull().default(0)
})

// ---------------------------------------------------------------------------
// Transformations
// ---------------------------------------------------------------------------

export const transformations = pgTable('transformations', {
  id: serial('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  videoMediaId: integer('video_media_id').references(() => media.id),
  imageMediaId: integer('image_media_id').references(() => media.id),
  sortOrder: integer('sort_order').notNull().default(0)
})

// ---------------------------------------------------------------------------
// Site content — singleton freeform blocks with no independent lifecycle
// (gym-wide info, hero text, about-us, why-us, founder bio). Key/value + jsonb
// avoids a dedicated table+migration per text block.
// ---------------------------------------------------------------------------

export const siteContent = pgTable('site_content', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})
