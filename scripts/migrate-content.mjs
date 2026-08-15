// One-time migration: uploads every currently-hardcoded photo/video to
// Vercel Blob (resizing/compressing images first — see the plan's free-tier
// bandwidth note) and inserts the corresponding rows into Neon, so the
// admin dashboard has real data to show/edit from day one.
//
// Usage: npm run migrate:content   (add --force to re-run against a
// non-empty DB; by default it refuses, matching scripts/seed-admin.mjs)
//
// Scope note: this covers "content" — contact info, branches, services,
// trainers, gallery, certificates, transformations, and the founder's core
// bio. Design-baked marketing copy (hero tagline, CTA button wording, the
// AboutUs value cards, Founder's story/certifications modal) stays hardcoded
// per the "content-only" scope decision — see the Site Text admin page.
import path from 'node:path'
import fs from 'node:fs/promises'
import sharp from 'sharp'
import { put } from '@vercel/blob'
import { db, schema } from '../db/client.js'

const force = process.argv.includes('--force')

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4'
}

async function withRetry(fn, { retries = 2, delayMs = 1500 } = {}) {
  let lastErr
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      if (attempt < retries) {
        console.warn(`    retrying after error: ${err.message}`)
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
    }
  }
  throw lastErr
}

async function processImage(buffer, ext) {
  const resized = sharp(buffer)
    .rotate() // auto-orient from EXIF before stripping it
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
  if (ext === '.png') return resized.png({ quality: 82, compressionLevel: 9 }).toBuffer()
  return resized.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}

const mediaCache = new Map()
let uploadCount = 0

// relPath is project-root-relative, e.g. 'src/assets/images/services/x.jpg'
async function uploadAsset(relPath, { kind, altText } = {}) {
  if (mediaCache.has(relPath)) return mediaCache.get(relPath)

  const absPath = path.resolve(process.cwd(), relPath)
  const ext = path.extname(relPath).toLowerCase()
  let buffer = await fs.readFile(absPath)
  const contentType = CONTENT_TYPES[ext] || 'application/octet-stream'

  if (kind === 'image') buffer = await processImage(buffer, ext)

  const blob = await withRetry(() =>
    put(`migrated/${kind}s/${path.basename(relPath)}`, buffer, {
      access: 'public',
      contentType,
      addRandomSuffix: true
    })
  )
  const [row] = await withRetry(() =>
    db
      .insert(schema.media)
      .values({ blobUrl: blob.url, blobPathname: blob.pathname, kind, altText: altText || null })
      .returning()
  )

  mediaCache.set(relPath, row)
  uploadCount++
  console.log(`  [${uploadCount}] ${relPath} -> ${row.blobUrl}`)
  return row
}

const IMG = 'src/assets/images'
const VID = 'src/assets/videos'

async function guardAgainstReRun() {
  const existing = await withRetry(() => db.select({ id: schema.services.id }).from(schema.services))
  if (existing.length > 0 && !force) {
    console.error(
      `services already has ${existing.length} row(s) — this looks like it already ran. ` +
        'Re-running would create duplicates. Pass --force to do it anyway.'
    )
    process.exit(1)
  }
}

async function migrateGymInfoAndBranch() {
  console.log('\n== Gym info & branch ==')
  await withRetry(() =>
    db
      .insert(schema.siteContent)
      .values({
        key: 'gym_info',
        value: {
          name: 'Action Fitness',
          location: 'Ayat Tafo Road, 500m past the cobblestone road, next to St. Gabriel Church',
          openingHours: 'Mo-Sa 05:00 AM - 9:00 Pm, Su 05:00 AM - 12:00 AM',
          email: 'Actionfitness12@gmail.com',
          phone: '0910531281',
          phones: ['0910531281', '0911008014', '0983904518', '0929247946'],
          info: 'Action Fitness is a gym that offers personalized training programs to help you achieve your fitness goals.',
          facebook: 'https://www.facebook.com/share/1LSH1hrAu1/?mibextid=LQQJ4d',
          instagram: 'https://www.instagram.com/actionfitness12?igsh=YTBuZ2EyNXRucGVu',
          linkedin: 'https://www.linkedin.com',
          tiktok: 'https://www.tiktok.com/@action_fitness_a.a?_t=ZM-8yR8MqoEXOq&_r=1'
        }
      })
      .onConflictDoNothing()
  )

  await withRetry(() =>
    db.insert(schema.branches).values({
      slug: 'main-branch',
      name: 'Action Fitness - Ayat',
      address: 'Ayat Tafo Road, 500m past the cobblestone road, next to St. Gabriel Church',
      phone: '0910531281',
      openingHours: 'Mo-Sa 05:00 AM - 9:00 Pm, Su 05:00 AM - 12:00 AM',
      sortOrder: 0
    })
  )
  console.log('  done')
}

async function migrateFounder() {
  console.log('\n== Founder ==')
  const image = await uploadAsset(`${IMG}/gallery/founder.jpg`, { kind: 'image', altText: 'Eskender Worku' })
  await withRetry(() =>
    db
      .insert(schema.siteContent)
      .values({
        key: 'founder',
        value: {
          name: 'Eskender Worku',
          sub: 'Master',
          title: 'Founder & Master Trainer',
          info: 'Master Eskender Worku is the founder of Action Fitness. He has been in the fitness industry for over 10 years and has helped hundreds of people achieve their fitness goals through premium training and expert guidance.',
          imageMediaId: image.id
        }
      })
      .onConflictDoNothing()
  )
  console.log('  done')
}

async function migrateServices() {
  console.log('\n== Services ==')
  const services = [
    {
      slug: 'body-building',
      name: 'Body Building',
      shortDescription:
        'Build muscle and strength with our comprehensive body building training programs designed for all levels.',
      longDescription:
        "Our Body Building service is designed to help you achieve your fitness goals through tailored workout plans, professional guidance, and a supportive environment. Whether you're looking to build muscle, enhance your physique, or improve overall strength, our expert trainers are here to assist you every step of the way.",
      benefits: [
        'Increased muscle mass',
        'Improved strength and endurance',
        'Enhanced physical appearance',
        'Boosted metabolism',
        'Reduced risk of injury'
      ],
      image: `${IMG}/gallery/BodybuildingBlack.jpg`
    },
    {
      slug: 'group-training',
      name: 'Group Fitness Training',
      shortDescription: 'Join our energetic group sessions led by certified trainers in a motivating community environment.',
      longDescription:
        'Experience the energy and motivation of working out in a group with our Group Fitness Training sessions. Our dynamic group workouts are designed to provide a fun and engaging environment while helping you achieve your fitness goals. Enjoy varied workout routines, increase your social interaction, and benefit from a cost-effective fitness solution that keeps you motivated and on track.',
      benefits: [
        'Motivating group environment',
        'Varied workout routines',
        'Cost-effective fitness solution',
        'Increased social interaction',
        'Fun and engaging classes'
      ],
      image: `${IMG}/services/groupfitness.png`
    },
    {
      slug: 'personal-training',
      name: 'Personal Training',
      shortDescription: 'Achieve your fitness goals with personalized one-on-one training sessions tailored to your needs.',
      longDescription:
        "Achieve your fitness goals with one-on-one personal training sessions. Our personal training service offers customized workout plans tailored to your specific needs and goals. With individualized attention and expert guidance, you'll receive the motivation and support needed to maximize your results and reach your fitness objectives more efficiently.",
      benefits: [
        'Customized workout plans',
        'Individualized attention',
        'Enhanced motivation and accountability',
        'Expert guidance and support',
        'Faster achievement of fitness goals'
      ],
      image: `${IMG}/services/personaltraining.png`
    },
    {
      slug: 'home-to-home-private-training',
      name: 'Home Private Training',
      shortDescription: 'Enjoy premium private training sessions at the convenience of your home with our expert trainers.',
      longDescription:
        'Enjoy private training sessions at the convenience of your home. Our Home to Home Private Training service offers personalized workout plans tailored to your fitness goals, all within the comfort of your own space. Experience flexible scheduling and dedicated attention from our expert trainers, designed to fit your lifestyle and preferences.',
      benefits: [
        'Convenient training at your home',
        'Personalized workout plans',
        'Flexible scheduling',
        'One-on-one attention from trainers',
        'Comfortable and private training environment'
      ],
      image: `${IMG}/services/homeTraines.png`
    },
    {
      slug: 'boxing',
      name: 'Boxing',
      shortDescription: 'Master the art of boxing with our professional trainers and state-of-the-art boxing facilities.',
      longDescription:
        "Improve your boxing skills with our professional boxing classes. Our training program focuses on developing advanced boxing techniques, enhancing your fitness, and building your confidence in the ring. Whether you're a novice or an experienced boxer, our expert trainers will help you reach your full potential.",
      benefits: [
        'Enhanced boxing techniques',
        'Increased physical fitness',
        'Improved hand-eye coordination',
        'Boosted confidence',
        'Better defensive skills'
      ],
      image: `${IMG}/gallery/BoxingBlack.jpg`
    },
    {
      slug: 'thai-boxing-and-kick-boxing',
      name: 'Thai Boxing & Kickboxing',
      shortDescription: 'Learn authentic Thai boxing and kickboxing techniques to enhance your fitness and self-defense skills.',
      longDescription:
        "Get trained in Thai boxing and kick boxing techniques to enhance your self-defense skills. Our program focuses on developing striking techniques, conditioning, and practical self-defense strategies. Whether you're a beginner or looking to refine your skills, our experienced trainers will guide you through every step of your training.",
      benefits: [
        'Enhanced self-defense skills',
        'Increased cardiovascular fitness',
        'Improved flexibility and agility',
        'Boosted mental toughness',
        'Better coordination and balance'
      ],
      image: `${IMG}/services/Thaiboxing.jpg`
    },
    {
      slug: 'nutritional-consultant',
      name: 'Nutritional Consulting',
      shortDescription:
        'Get personalized nutrition advice and meal plans to complement your fitness journey and achieve optimal results.',
      longDescription:
        "Get personalized nutrition advice to help you achieve your fitness goals. Our nutritional consulting service provides tailored dietary plans and expert guidance to optimize your nutrition, enhance your performance, and support your overall health. Whether you're looking to improve your diet, manage weight, or boost energy, our professional consultants are here to assist you.",
      benefits: [
        'Personalized nutrition plans',
        'Improved dietary habits',
        'Enhanced fitness performance',
        'Better overall health',
        'Guidance on healthy eating'
      ],
      image: `${IMG}/services/nutritionalConsultant.jpg`
    },
    {
      slug: 'after-school-training-programs',
      name: 'After School Programs',
      shortDescription: 'Comprehensive training programs designed specifically for students to develop fitness and discipline.',
      longDescription:
        'Enroll in our comprehensive training programs designed for students. Our After School Training Programs offer a structured schedule that focuses on developing athletic skills, improving physical fitness, and fostering teamwork. Designed to fit into the school routine, these programs provide a supportive environment where students can enhance their abilities and stay active after school.',
      benefits: [
        'Structured training schedule',
        'Development of athletic skills',
        'Improved physical fitness',
        'Supportive learning environment',
        'Enhanced teamwork and discipline'
      ],
      image: `${IMG}/services/afterSchoolnew1.jpg`
    },
    {
      slug: 'fat-loss-training',
      name: 'Fat Loss Training',
      shortDescription: 'Specialized programs focused on fat loss and weight management with proven results.',
      longDescription:
        "Join our specialized programs focused on fat loss and weight management. Our Fat Loss Training service offers tailored exercise routines and nutrition guidance to help you achieve your fat loss goals. With a focus on effective fat reduction and improved metabolic rate, you'll receive personalized plans and support to enhance your body composition and reach your fitness objectives.",
      benefits: [
        'Effective fat reduction',
        'Improved metabolic rate',
        'Enhanced body composition',
        'Personalized nutrition and exercise plans',
        'Supportive and motivating environment'
      ],
      image: `${IMG}/services/fatloss.png`
    },
    {
      slug: 'taekwondo',
      name: 'Taekwondo',
      shortDescription: 'Master the art of Taekwondo with our experienced instructors in a traditional yet modern setting.',
      // No longer-form copy existed in the old code for this one (it was
      // missing from ServiceDetailView.vue entirely — a bug this migration
      // fixes). Left short on purpose rather than inventing marketing copy;
      // easy to expand from the admin dashboard.
      longDescription: 'Master the art of Taekwondo with our experienced instructors in a traditional yet modern setting.',
      benefits: [],
      image: `${IMG}/services/taekwondo.jpg`
    }
  ]

  for (const [index, s] of services.entries()) {
    const image = await uploadAsset(s.image, { kind: 'image', altText: s.name })
    await withRetry(() =>
      db.insert(schema.services).values({
        slug: s.slug,
        name: s.name,
        shortDescription: s.shortDescription,
        longDescription: s.longDescription,
        benefits: s.benefits,
        imageMediaId: image.id,
        sortOrder: index
      })
    )
  }
}

async function migrateTrainers() {
  console.log('\n== Trainers ==')
  const trainers = [
    {
      name: 'Abel Getahun',
      image: `${IMG}/trainers/trainer-1.jpg`,
      title: 'Taekwondo & Fitness Trainer',
      rank: '3rd Dan Black Belt',
      certifications: [
        'Taekwondo 3rd Dan from World Taekwondo HQ Kukkiwon South Korea',
        'Muay Thai or Thai Boxing Trainer Certification',
        'Body Building and Weightlifting Trainer Certification from Addis Ababa Weight Lifting Federation',
        'Fitness and Aerobics Trainer Certification from Addis Ababa Sports Commission'
      ]
    },
    {
      name: 'Zekarias Engedawork',
      image: `${IMG}/trainers/trainer-3.png`,
      title: 'Taekwondo Coach & Fitness Trainer',
      rank: '3rd Dan Black Belt',
      certifications: [
        'Taekwondo 3rd Dan from World Taekwondo HQ Kukkiwon South Korea',
        'Taekwondo International Instructor Course Certification from WT Taekwondowon Muju Korea',
        'Body Building and Weightlifting Trainer Certification from Addis Ababa Weight Lifting Federation',
        'Fitness and Aerobics Trainer Certification from Addis Ababa Sports Commission'
      ]
    },
    {
      name: 'Surafel Matiwos',
      image: `${IMG}/trainers/trainer-2.jpg`,
      title: 'Taekwondo & Combat Sports Trainer',
      rank: '2nd Dan Black Belt',
      certifications: [
        'Taekwondo 2nd Dan from World Taekwondo HQ Kukkiwon South Korea',
        'Muay Thai or Thai Boxing Trainer Certification',
        'Body Building and Weightlifting Trainer Certification from Addis Ababa Weight Lifting Federation',
        'Fitness and Aerobics Trainer Certification from Addis Ababa Sports Commission'
      ]
    }
  ]

  for (const [index, t] of trainers.entries()) {
    const image = await uploadAsset(t.image, { kind: 'image', altText: t.name })
    await withRetry(() =>
      db.insert(schema.trainers).values({
        name: t.name,
        title: t.title,
        rank: t.rank,
        certifications: t.certifications,
        imageMediaId: image.id,
        sortOrder: index
      })
    )
  }
}

async function migrateGallery() {
  console.log('\n== Gallery ==')
  const collections = [
    {
      slug: 'gym-gallery',
      title: 'Gym Gallery',
      images: [12, 10, 11, 1, 5, 6, 9, 2, 3, 4, 7].map((n) => {
        const ext = n === 10 ? 'png' : 'jpg'
        return `${IMG}/gallery/gymGallary-${n}.${ext}`
      })
    },
    {
      slug: 'after-school-gallery',
      title: 'After School Training Programs',
      images: [
        `${IMG}/gallery/afterschoolGallary-1.jpg`,
        ...[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `${IMG}/gallery/afterSchoolGallery-${n}.jpg`)
      ]
    },
    {
      slug: 'cross-fit-membership',
      title: 'CrossFit Membership Course — Bangkok, Thailand 2019',
      images: [1, 2, 3].map((n) => `${IMG}/gallery/CrossFitMembership-${n}.jpg`)
    },
    {
      slug: 'personal-training-gallery',
      title: 'Personal Training at Home',
      images: [
        `${IMG}/services/homeTraines.png`,
        `${IMG}/gallery/PersonalTraining1.jpg`,
        `${IMG}/gallery/PersonalTraining2.png`,
        `${IMG}/gallery/PersonalTraining3.png`,
        `${IMG}/gallery/PersonalTraining4.png`,
        `${IMG}/gallery/PersonalTraining5.jpg`
      ]
    },
    {
      slug: 'boxing-gallery',
      title: 'Thai Boxing Course — Bangkok, Thailand 2019',
      images: [1, 2, 3, 4].map((n) => `${IMG}/gallery/MuayThai${n}.jpg`)
    },
    {
      slug: 'wt-partnership-gallery',
      title: 'International Instructor Course — South Korea, Muju 2018',
      images: [1, 2, 3, 4, 5].map((n) => `${IMG}/gallery/WTPARTNERSHIPGallery${n}.jpg`)
    },
    {
      slug: 'activity-gallery',
      title: 'Group Activities',
      images: [1, 2, 3, 4].map((n) => `${IMG}/gallery/activities${n}.png`)
    }
  ]

  for (const [collectionIndex, c] of collections.entries()) {
    const [collection] = await withRetry(() =>
      db
        .insert(schema.galleryCollections)
        .values({ slug: c.slug, title: c.title, sortOrder: collectionIndex })
        .returning()
    )

    for (const [itemIndex, relPath] of c.images.entries()) {
      const media = await uploadAsset(relPath, { kind: 'image', altText: c.title })
      await withRetry(() =>
        db.insert(schema.galleryItems).values({
          collectionId: collection.id,
          mediaId: media.id,
          sortOrder: itemIndex
        })
      )
    }
  }
}

async function migrateCertificates() {
  console.log('\n== Certificates ==')
  // Preserves the curated display order from CertificatesSection.vue, not
  // raw filename order.
  const order = [1, 2, 3, 4, 5, 10, 6, 7, 8, 11, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  for (const [index, n] of order.entries()) {
    const relPath = n <= 11 ? `${IMG}/certificates/certificates${n}.jpg` : `${IMG}/certificates/${n}.jpg`
    const media = await uploadAsset(relPath, { kind: 'image', altText: `Certificate ${n}` })
    await withRetry(() => db.insert(schema.certificates).values({ imageMediaId: media.id, sortOrder: index }))
  }
}

async function migrateTransformations() {
  console.log('\n== Transformations ==')
  const videos = [
    { file: `${VID}/transformation-videos/transformation1.mp4`, title: 'Incredible Results', description: 'From struggle to strength - witness this amazing fitness journey' },
    { file: `${VID}/transformation-videos/transformation2.mp4`, title: 'Body Transformation', description: 'Real dedication leads to real results - see the proof' },
    { file: `${VID}/transformation-videos/transformation3.mp4`, title: 'Success Story', description: 'Hard work pays off - watch this inspiring transformation' },
    { file: `${VID}/transformation-videos/transformation4.mp4`, title: 'Fitness Journey', description: 'Commitment and consistency create incredible changes' },
    { file: `${VID}/transformation-videos/transformation5.mp4`, title: 'Life Changed', description: 'More than just physical - a complete lifestyle transformation' }
  ]
  const images = [
    { file: `${IMG}/transformations/1.png`, description: 'Amazing weight loss journey with sustainable results and improved health' },
    { file: `${IMG}/transformations/2.png`, description: 'Complete lifestyle transformation through proper nutrition and training' },
    { file: `${IMG}/transformations/3.png`, description: 'Dramatic fat loss while maintaining muscle mass and gaining confidence' }
  ]

  let sortOrder = 0
  for (const v of videos) {
    const media = await uploadAsset(v.file, { kind: 'video', altText: v.title })
    const currentOrder = sortOrder++
    await withRetry(() =>
      db.insert(schema.transformations).values({
        title: v.title,
        description: v.description,
        videoMediaId: media.id,
        sortOrder: currentOrder
      })
    )
  }
  for (const img of images) {
    const media = await uploadAsset(img.file, { kind: 'image', altText: img.description })
    const currentOrder = sortOrder++
    await withRetry(() =>
      db.insert(schema.transformations).values({
        description: img.description,
        imageMediaId: media.id,
        sortOrder: currentOrder
      })
    )
  }
}

async function main() {
  await guardAgainstReRun()
  await migrateGymInfoAndBranch()
  await migrateFounder()
  await migrateServices()
  await migrateTrainers()
  await migrateGallery()
  await migrateCertificates()
  await migrateTransformations()
  console.log(`\nDone. Uploaded ${uploadCount} unique media files.`)
}

main().catch((err) => {
  console.error('\nMigration failed:', err)
  process.exit(1)
})
