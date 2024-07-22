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
  email: 'info@actionfitness.com',
  phone: '+251911111111',
  info: 'Action Fitness is a gym that offers personalized training programs to help you achieve your fitness goals.',
  
  socialMedia: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    linkedin: 'https://www.linkedin.com',
    tiktok: 'https://www.tiktok.com'
  }
}

export { gymInformation }
