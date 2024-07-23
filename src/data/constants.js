import HERO_IMAGE from '@/assets/images/heroImage-2.jpg'
import ACTION_IMAGE from '@/assets/images/logos/actionBgRemoved.png'
import ACTION_FITNESS_IMAGE from '@/assets/images/logos/ActionFitnessBgRemoved.png'

export { HERO_IMAGE, ACTION_IMAGE, ACTION_FITNESS_IMAGE }

const gymInformation = {
  name: 'Action Fitness',
  location: 'Addis Ababa, Ethiopia',
  openingHours: 'Mo-Fr 06:00-22:00, Sa-Su 08:00-20:00',

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
  sampleVideo_2
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

export { galleryImages }

//other Galley

import Other_GALLERY_IMAGE_1 from '@/assets/images/gallery/afterschoolGallary-1.jpg'
import Other_GALLERY_IMAGE_2 from '@/assets/images/gallery/CrossFitMembership.jpg'
import Other_GALLERY_IMAGE_3 from '@/assets/images/gallery/InternationalInstructorcourse.jpg'
import Other_GALLERY_IMAGE_4 from '@/assets/images/gallery/MuayThai.jpg'
import Other_GALLERY_IMAGE_5 from '@/assets/images/gallery/taekwondoGallary-1.jpg'
import Other_GALLERY_IMAGE_6 from '@/assets/images/gallery/international.jpg'

const otherGalleryImages = [
  {image: Other_GALLERY_IMAGE_1, title: 'After school Training programs'},
  {image: Other_GALLERY_IMAGE_2, title: 'CrossFit Membership Course Bangkok Thailand 2019'},
  {image: Other_GALLERY_IMAGE_3, title: 'International Instructor Course'},
  {image: Other_GALLERY_IMAGE_4, title: 'MuayThai - Thai boxing Course Bagkok Thailand 2019'},
  {image: Other_GALLERY_IMAGE_5, title: 'Taekwondo club After school'},
  {image: Other_GALLERY_IMAGE_6, title: 'WT PARTNERSHIP Taekwondo program 2018'}
]

export { otherGalleryImages }
