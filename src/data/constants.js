import HERO_IMAGE from '@/assets/images/heroImage-3.jpg'
import ACTION_IMAGE from '@/assets/images/logos/actionBgRemoved.png'
import ACTION_FITNESS_IMAGE from '@/assets/images/logos/ActionFitnessBgRemoved.png'

export { HERO_IMAGE, ACTION_IMAGE, ACTION_FITNESS_IMAGE }

const gymInformation = {
  name: 'Action Fitness',
  location:
    'Ayat Tafo Road, 500m past the cobblestone road near St. Gabriel Church, next to St. Gabriel Church',
  openingHours: 'Mo-Sa 05:00 AM - 9:00 Pm, Su 05:00 AM - 12:00 AM',

  links: [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact-us' }
  ],
  email: 'Actionfitness12@gmail.com',
  phone: '0910531281',
  phones: ['0910531281', '0911008014', '0983904518', '0929247946'],
  info: 'Action Fitness is a gym that offers personalized training programs to help you achieve your fitness goals.',

  socialMedia: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    linkedin: 'https://www.linkedin.com',
    tiktok: 'https://www.tiktok.com'
  }
}

export { gymInformation }

//services

import AFTER_SCHOOL_IMAGE_1 from '@/assets/images/services/afterSchool.jpg'
import AFTER_SCHOOL_IMAGE_2 from '@/assets/images/services/afterSchool-1.jpg'

import AFTER_SCHOOL_TAEKWONDO from '@/assets/images/services/TaekwondoclubAfterschool .jpg'
import THAIBOXING from '@/assets/images/services/Thaiboxing.jpg'
import nutritionalConsultant from '@/assets/images/services/nutritionalConsultant.jpg'
import InHomePersonalTraining from '@/assets/images/services/InHomePersonalTraining.jpg'
import taekwondo from '@/assets/images/services/taekwondo.jpg'
import BodyBuilding from '@/assets/images/services/BodyBuilding.jpg'
import taekwondo_2 from '@/assets/images/services/taekwondo-2.jpg'
import sampleVideo_2 from '@/assets/images/services/sampleVideo-2.mp4'
import groupFitness from '@/assets/images/services/groupfitness.png'

export {
  AFTER_SCHOOL_IMAGE_1,
  AFTER_SCHOOL_IMAGE_2,
  AFTER_SCHOOL_TAEKWONDO,
  THAIBOXING,
  nutritionalConsultant,
  InHomePersonalTraining,
  taekwondo,
  BodyBuilding,
  taekwondo_2,
  sampleVideo_2,
  groupFitness
}

//gallery

import GALLERY_IMAGE_1 from '@/assets/images/gallery/gymGallary-1.jpg'
import GALLERY_IMAGE_2 from '@/assets/images/gallery/gymGallary-2.jpg'
import GALLERY_IMAGE_3 from '@/assets/images/gallery/gymGallary-3.jpg'
import GALLERY_IMAGE_4 from '@/assets/images/gallery/gymGallary-4.jpg'
import GALLERY_IMAGE_5 from '@/assets/images/gallery/gymGallary-5.jpg'
import GALLERY_IMAGE_6 from '@/assets/images/gallery/gymGallary-6.jpg'
import GALLERY_IMAGE_7 from '@/assets/images/gallery/gymGallary-7.jpg'
import GALLERY_IMAGE_9 from '@/assets/images/gallery/gymGallary-9.jpg'

const galleryImages = [
  GALLERY_IMAGE_1,
  // GALLERY_IMAGE_2,
  // GALLERY_IMAGE_3,
  //  GALLERY_IMAGE_4,
  GALLERY_IMAGE_5,
  GALLERY_IMAGE_6,
  //  GALLERY_IMAGE_7,
  GALLERY_IMAGE_9
]

const gymGallary = [
  ...galleryImages,
  GALLERY_IMAGE_2,
  GALLERY_IMAGE_3,
  GALLERY_IMAGE_4,
  GALLERY_IMAGE_7
]
export { galleryImages, gymGallary }

//other Galley

import Other_GALLERY_IMAGE_1 from '@/assets/images/gallery/afterschoolGallary-1.jpg'
import Other_GALLERY_IMAGE_2 from '@/assets/images/gallery/CrossFitMembership.jpg'
import Other_GALLERY_IMAGE_3 from '@/assets/images/gallery/InternationalInstructorcourse.jpg'
import Other_GALLERY_IMAGE_4 from '@/assets/images/gallery/MuayThai.jpg'
import Other_GALLERY_IMAGE_5 from '@/assets/images/gallery/taekwondoGallary-1.jpg'
import Other_GALLERY_IMAGE_6 from '@/assets/images/gallery/international.jpg'

/* 'gymGallery',
  'afterSchoolGallery',
  'boxingGallery',
  'TaekwondoClubGallery',
  'WTPARTNERSHIPGallery'
  */
const otherGalleryImages = [
  {
    image: Other_GALLERY_IMAGE_1,
    path: '/gallery/afterSchoolGallery',
    title: 'After school Training programs'
  },
  { image: Other_GALLERY_IMAGE_2, 
    path: '/gallery/crossFitMembership',
    title: 'CrossFit Membership Course Bangkok Thailand 2019' },
  { image: Other_GALLERY_IMAGE_3, title: 'International Instructor Course' },
  { image: Other_GALLERY_IMAGE_4, title: 'MuayThai - Thai boxing Course Bagkok Thailand 2019' },
  { image: Other_GALLERY_IMAGE_5, title: 'Taekwondo club After school' },
  { image: Other_GALLERY_IMAGE_6, title: 'WT PARTNERSHIP Taekwondo program 2018' }
]

export { otherGalleryImages }

//founder

import FOUNDER_IMAGE from '@/assets/images/gallery/founder.jpg'

const founderInfo = {
  sub: 'Master',
  name: 'Eskender Worku',
  title: 'CEO and Head Coach',
  image: [FOUNDER_IMAGE],
  Certifications: [
    '5th Degree Black Belt (DAN) - Certified Master from South Korea World Taekwondo Headquarters (HQ Kukkiwon)',
    'Global Taekwondo Master Course from Muju, South Korea',
    'Fitness Instructor Certificate from London New Skills Academy',
    'Diploma in Sports Nutrition from USA California FAB Academy',
    'Diploma in Physical Fitness from Alison, Ireland',
    'CrossFit Workout Programming Course from USA CF Education',
    'Certified Personal Trainer Certificate from FIT Thailand',
    'Muaythai Thai Boxing Course from Bangkok, Thailand',
    'Health and Fitness Trainer (First and Second Level) from Addis Ababa Sport Commission',
    'Instructor and Monitoring Fitness Program from Platinum Health and Fitness',
    'Body Building and Weight Lifting Coach from Addis Ababa Sport Commission',
    'Zumba Instructor Course from ZIN',
    'Tabata, TRX, and Functional Training Course from Udemy'
  ],
  phone: '0910531281',
  email: 'eskender@gmail.com',
  address: 'Addis Ababa, Ethiopia',
  info: 'Master Eskender Worku is the founder of Action Fitness. He has been in the fitness industry for over 10 years and has helped hundreds of people achieve their fitness goals.',
  workExperience: [
    'Founder of Master Eskinder Taekwondo Club and Action Body Building and Fitness Center',
    'Instructor at Turkish Schools / Intellectual Schools for over five years',
    'Instructor at Flipper International Schools for over 6 years (till now)',
    'Instructor at German Embassy Schools',
    'Instructor at Addis International Academy',
    'Instructor at Head to Toe Early Learning Center',
    'Instructor at Enat Alem Children Care Organization',
    'Instructor at Iqra Academy / Elysian Academy',
    'Personal one-to-one home coaching'
  ]
}

export { founderInfo }

//traines

import trainerOne from '@/assets/images/trainers/trainer-1.jpg'
import trainerTwo from '@/assets/images/trainers/trainer-2.jpg'

const trainesInfo = [
  { name: 'Abel Getahun', image: trainerOne, title: 'Trainer' },
  { name: 'Surafel Matiyos', image: trainerTwo, title: 'Trainer' }
]

export { trainesInfo }
