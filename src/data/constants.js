import HERO_IMAGE from '@/assets/images/heroImage-3.jpg'
import HERO_IMAGE_2 from '@/assets/images/heroImage-2.jpg'
import ACTION_IMAGE from '@/assets/images/logos/actionBgRemoved.png'
import ACTION_FITNESS_IMAGE from '@/assets/images/logos/ActionFitnessBgRemoved.png'
import FITNESS_1 from '@/assets/images/logos/FITNESS_1.png'



export { HERO_IMAGE, HERO_IMAGE_2, ACTION_IMAGE, ACTION_FITNESS_IMAGE, FITNESS_1 }

const gymInformation = {
  name: 'Action Fitness',
  location:
    'Ayat Tafo Road, 500m past the cobblestone road, next to St. Gabriel Church',
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
    facebook: 'https://www.facebook.com/share/1LSH1hrAu1/?mibextid=LQQJ4d',
    instagram: 'https://www.instagram.com/actionfitness12?igsh=YTBuZ2EyNXRucGVu',
    linkedin: 'https://www.linkedin.com',
    tiktok: 'https://www.tiktok.com/@action_fitness_a.a?_t=ZM-8yR8MqoEXOq&_r=1'
  }
}

export { gymInformation }

//services

import AFTER_SCHOOL_IMAGE_1 from '@/assets/images/services/afterSchoolnew1.jpg'
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
import homeTraining from '@/assets/images/services/homeTraines.png'
import personaltraining from "@/assets/images/services/personaltraining.png"
import fatloss from "@/assets/images/services/fatloss.png"
import BodybuildingBlack from '@/assets/images/gallery/BodybuildingBlack.jpg'
import BoxingBlack from '@/assets/images/gallery/BoxingBlack.jpg'

export {
  fatloss,
  personaltraining,
  AFTER_SCHOOL_IMAGE_1,
  AFTER_SCHOOL_IMAGE_2,
  BoxingBlack,
  BodybuildingBlack,
  AFTER_SCHOOL_TAEKWONDO,
  THAIBOXING,
  nutritionalConsultant,
  InHomePersonalTraining,
  taekwondo,
  BodyBuilding,
  taekwondo_2,
  sampleVideo_2,
  groupFitness,
  homeTraining,

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
import GALLERY_IMAGE_10 from '@/assets/images/gallery/gymGallary-10.png'
import GALLERY_IMAGE_11 from "@/assets/images/gallery/gymGallary-11.jpg"
import GALLERY_IMAGE_12 from "@/assets/images/gallery/gymGallary-12.jpg"

const galleryImages = [GALLERY_IMAGE_12, GALLERY_IMAGE_10, GALLERY_IMAGE_11, GALLERY_IMAGE_1, GALLERY_IMAGE_5, GALLERY_IMAGE_6]
export { GALLERY_IMAGE_10 }
const gymGallary = [
  ...galleryImages,
  GALLERY_IMAGE_9,
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
// import Other_GALLERY_IMAGE_5 from '@/assets/images/gallery/taekwondoGallary-1.jpg'
import Other_GALLERY_IMAGE_6 from '@/assets/images/gallery/international.jpg'
import activities1 from "@/assets/images/gallery/activities1.png"

const otherGalleryImages = [

  {
    image: Other_GALLERY_IMAGE_1,
    path: '/gallery/afterSchoolGallery',
    title: 'After school Training programs'
  },
  {
    image: Other_GALLERY_IMAGE_2,
    path: '/gallery/crossFitMembership',
    title: 'CrossFit Membership Course Bangkok Thailand 2019'
  },
  {
    image: Other_GALLERY_IMAGE_3,
    path: '/gallery/WTPARTNERSHIPGallery',
    title: 'International Instructor Course'
  },
  {
    image: Other_GALLERY_IMAGE_4,
    title: 'MuayThai - Thai boxing Course Bagkok Thailand 2019',
    path: '/gallery/boxingGallery'
  },
  { image: homeTraining, title: 'Personal Training at Home', path: '/gallery/PersonalTrainingGallery' },
  { image: Other_GALLERY_IMAGE_6, path: '/gallery/WTPARTNERSHIPGallery', title: 'WT PARTNERSHIP Taekwondo program 2018' },
  {
    image: activities1,
    path: "/gallery/activityGallary",
    title: "Group Activities"
  },
]

export { otherGalleryImages }

//Activities gallery



/* 'gymGallery',
  'afterSchoolGallery',
  'boxingGallery',
  'TaekwondoClubGallery',
  'WTPARTNERSHIPGallery'
  */
import PersonalTraining1 from '@/assets/images/gallery/PersonalTraining1.jpg'
import PersonalTraining2 from '@/assets/images/gallery/PersonalTraining2.png'
import PersonalTraining3 from '@/assets/images/gallery/PersonalTraining3.png'
import PersonalTraining4 from '@/assets/images/gallery/PersonalTraining4.png'
import PersonalTraining5 from '@/assets/images/gallery/PersonalTraining5.jpg'

const PersonalTrainingGallery = [homeTraining, PersonalTraining1, PersonalTraining2, PersonalTraining3, PersonalTraining4, PersonalTraining5]
export { PersonalTrainingGallery }

import WTPARTNERSHIPGallery1 from '@/assets/images/gallery/WTPARTNERSHIPGallery1.jpg'
import WTPARTNERSHIPGallery2 from '@/assets/images/gallery/WTPARTNERSHIPGallery2.jpg'
import WTPARTNERSHIPGallery3 from '@/assets/images/gallery/WTPARTNERSHIPGallery3.jpg'
import WTPARTNERSHIPGallery4 from '@/assets/images/gallery/WTPARTNERSHIPGallery4.jpg'
import WTPARTNERSHIPGallery5 from '@/assets/images/gallery/WTPARTNERSHIPGallery5.jpg'

const WTPARTNERSHIPGallery = [
  WTPARTNERSHIPGallery1,
  WTPARTNERSHIPGallery2,
  WTPARTNERSHIPGallery3,
  WTPARTNERSHIPGallery4,
  WTPARTNERSHIPGallery5
]
export { WTPARTNERSHIPGallery }
import MuayThai1 from '@/assets/images/gallery/MuayThai1.jpg'
import MuayThai2 from '@/assets/images/gallery/MuayThai2.jpg'
import MuayThai3 from '@/assets/images/gallery/MuayThai3.jpg'
import MuayThai4 from '@/assets/images/gallery/MuayThai4.jpg'

const boxingGallery = [MuayThai1, MuayThai2, MuayThai3, MuayThai4]
export { boxingGallery }

import CrossFitMembership1 from '@/assets/images/gallery/CrossFitMembership-1.jpg'
import CrossFitMembership2 from '@/assets/images/gallery/CrossFitMembership-2.jpg'
import CrossFitMembership3 from '@/assets/images/gallery/CrossFitMembership-3.jpg'

const crossFitMembershipGallary = [CrossFitMembership1, CrossFitMembership2, CrossFitMembership3]
export { crossFitMembershipGallary }

import afterschoolGallary1 from '@/assets/images/gallery/afterschoolGallary-1.jpg'
import afterschoolGallary2 from '@/assets/images/gallery/afterSchoolGallery-2.jpg'
import afterschoolGallary3 from '@/assets/images/gallery/afterSchoolGallery-3.jpg'
import afterschoolGallary4 from '@/assets/images/gallery/afterSchoolGallery-4.jpg'
import afterschoolGallary5 from '@/assets/images/gallery/afterSchoolGallery-5.jpg'
import afterschoolGallary6 from '@/assets/images/gallery/afterSchoolGallery-6.jpg'
import afterschoolGallary7 from '@/assets/images/gallery/afterSchoolGallery-7.jpg'
import afterschoolGallary8 from '@/assets/images/gallery/afterSchoolGallery-8.jpg'
import afterschoolGallary9 from '@/assets/images/gallery/afterSchoolGallery-9.jpg'
import afterschoolGallary10 from '@/assets/images/gallery/afterSchoolGallery-10.jpg'

const afterschoolGallary = [
  afterschoolGallary1,
  afterschoolGallary2,
  afterschoolGallary3,
  afterschoolGallary4,
  afterschoolGallary5,
  afterschoolGallary6,
  afterschoolGallary7,
  afterschoolGallary8,
  afterschoolGallary9,
  afterschoolGallary10
]

export { afterschoolGallary }

//activityGallary
//import activities1 from "@/assets/images/gallery/activities1.png";
import activities2 from "@/assets/images/gallery/activities2.png";
import activities3 from "@/assets/images/gallery/activities3.png";
import activities4 from "@/assets/images/gallery/activities4.png";
const activityGallary = { activities1, activities2, activities3, activities4 }
export { activityGallary }
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
import trainerThree from "@/assets/images/trainers/trainer-3.png"

const trainesInfo = [
  { name: 'Abel Getahun', image: trainerOne, title: 'Trainer' },
  { name: 'Surafel Matiyos', image: trainerTwo, title: 'Trainer' },
  { name: "Zekariyas Engedawork", image: trainerThree, title: "Taekwondo Coach" }
]

export { trainesInfo }


//certificates
import certificate1 from '@/assets/images/certificates/certificates1.jpg'
import certificate2 from '@/assets/images/certificates/certificates2.jpg'
import certificate3 from '@/assets/images/certificates/certificates3.jpg'
import certificate4 from '@/assets/images/certificates/certificates4.jpg'
import certificate5 from '@/assets/images/certificates/certificates5.jpg'
import certificate6 from '@/assets/images/certificates/certificates6.jpg'
import certificate7 from '@/assets/images/certificates/certificates7.jpg'
import certificate8 from '@/assets/images/certificates/certificates8.jpg'
import certificate9 from '@/assets/images/certificates/certificates9.jpg'
import certificate10 from '@/assets/images/certificates/certificates10.jpg'
import certificates11 from '@/assets/images/certificates/certificates11.jpg'
import certificate12 from '@/assets/images/certificates/12.jpg'
import certificate13 from '@/assets/images/certificates/13.jpg'
import certificate14 from '@/assets/images/certificates/14.jpg'
import certificate15 from '@/assets/images/certificates/15.jpg'
import certificate16 from '@/assets/images/certificates/16.jpg'
import certificate17 from '@/assets/images/certificates/17.jpg'
import certificate18 from '@/assets/images/certificates/18.jpg'
import certificate19 from '@/assets/images/certificates/19.jpg'
import certificate20 from '@/assets/images/certificates/20.jpg'
import certificate21 from '@/assets/images/certificates/21.jpg'
import certificate22 from '@/assets/images/certificates/22.jpg'
import certificate23 from '@/assets/images/certificates/23.jpg'
import certificate24 from '@/assets/images/certificates/24.jpg'

export { certificate12, certificate13, certificate14, certificate15, certificate16, certificate17, certificate18, certificate19, certificate20, certificate21, certificate22, certificate23, certificate24 }

export { certificate1, certificate2, certificate3, certificate4, certificate5, certificate6, certificate7, certificate8, certificate9, certificate10, certificates11 }

//transformation videos 


import transformation1 from '@/assets/videos/transformation-videos/transformation1.mp4'
import transformation2 from '@/assets/videos/transformation-videos/transformation2.mp4'
import transformation3 from '@/assets/videos/transformation-videos/transformation3.mp4'
import transformation4 from '@/assets/videos/transformation-videos/transformation4.mp4'
import transformation5 from '@/assets/videos/transformation-videos/transformation5.mp4'

export { transformation1, transformation2, transformation3, transformation4, transformation5 }


//trasnformation images
import transformationImage1 from '@/assets/images/transformations/1.png'
import transformationImage2 from '@/assets/images/transformations/2.png'
import transformationImage3 from '@/assets/images/transformations/3.png'

export { transformationImage1, transformationImage2, transformationImage3 }