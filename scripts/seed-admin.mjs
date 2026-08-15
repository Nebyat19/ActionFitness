// One-time script to create the first admin login.
// Usage: node --env-file=.env scripts/seed-admin.mjs
// Refuses to run if admin_users already has any rows, unless --force is passed
// (so it can't accidentally be re-run in production and reset/duplicate the
// owner's account). Use the admin dashboard's Users page to add more logins
// after the first one exists.

import bcrypt from 'bcryptjs'
import { db, schema } from '../db/client.js'

const force = process.argv.includes('--force')

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL
  const password = process.env.ADMIN_SEED_PASSWORD

  if (!email || !password) {
    console.error('ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set (see .env.example).')
    process.exit(1)
  }
  if (password.length < 8) {
    console.error('ADMIN_SEED_PASSWORD is too short (use at least 8 characters).')
    process.exit(1)
  }

  const existing = await db.select({ id: schema.adminUsers.id }).from(schema.adminUsers)
  if (existing.length > 0 && !force) {
    console.error(
      `admin_users already has ${existing.length} row(s). Refusing to seed again.\n` +
        'Use the admin dashboard Users page to add more accounts, or pass --force to add another anyway.'
    )
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const [user] = await db
    .insert(schema.adminUsers)
    .values({ email: email.toLowerCase().trim(), passwordHash })
    .returning({ id: schema.adminUsers.id, email: schema.adminUsers.email })

  console.log(`Created admin user #${user.id} (${user.email}).`)
  console.log('You can now log in at /admin/login. Consider clearing ADMIN_SEED_PASSWORD from .env.')
}

main().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
