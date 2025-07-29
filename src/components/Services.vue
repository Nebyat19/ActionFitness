<template>
  <section id="services" class="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl mx-auto">
      <!-- Premium Services Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-anton">
          Premium <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-green-600">Services</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover our comprehensive range of premium fitness services designed to transform your body, mind, and spirit.
        </p>
      </div>

      <!-- Premium Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(service, index) in services" :key="service.name" 
             class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
          
          <!-- Service Image -->
          <div class="relative h-48 overflow-hidden">
            <img v-if="service.image" :src="service.image" :alt="service.name" 
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div v-else class="w-full h-full bg-gradient-to-br from-primary-green to-green-600 flex items-center justify-center">
              <img class="w-16 h-16 opacity-80" :src="ACTION_FITNESS_IMAGE" :alt="service.name" />
            </div>
            <!-- Premium Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Service Content -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-primary-green transition-colors duration-300">
                {{ service.name }}
              </h3>
              <div class="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-bold">{{ index + 1 }}</span>
              </div>
            </div>
            
            <p class="text-gray-600 mb-6 leading-relaxed">
              {{ service.description }}
            </p>

            <!-- Premium CTA Button -->
            <router-link :to="service.path" class="inline-block">
              <button class="group/btn relative w-full px-6 py-3 bg-gradient-to-r from-primary-green to-green-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-green/25">
                <span class="relative z-10 flex items-center justify-center gap-2">
                  Learn More
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-primary-green opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </router-link>
          </div>

          <!-- Premium Corner Accent -->
          <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-green to-green-600 transform rotate-45 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <!-- Premium CTA Section -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-primary-green to-green-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 class="text-2xl md:text-4xl font-bold mb-4">Ready to Start Your Transformation?</h3>
          <p class="text-lg mb-8 opacity-90">Join thousands of members who have already achieved their fitness goals with Action Fitness.</p>
          <router-link to="/contact">
            <button class="px-8 py-4 bg-white text-primary-green font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Get Your Free Consultation
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  AFTER_SCHOOL_IMAGE_1,
  AFTER_SCHOOL_TAEKWONDO,
  THAIBOXING,
  nutritionalConsultant,
  ACTION_FITNESS_IMAGE,
  taekwondo,
  BodyBuilding,
  BoxingBlack,
  groupFitness,
  HERO_IMAGE,
  BodybuildingBlack,
  homeTraining
} from '@/data/constants'

const services = [
  {
    service: 'body-building',
    name: 'Body Building',
    description: 'Build muscle and strength with our comprehensive body building training programs designed for all levels.',
    image: BodybuildingBlack,
    path: '/services/BodyBuilding'
  },
  {
    service: 'group-training',
    name: 'Group Fitness Training',
    description: 'Join our energetic group sessions led by certified trainers in a motivating community environment.',
    image: groupFitness,
    path: '/services/GroupFitnessTraining'
  },
  {
    service: 'personal-training',
    name: 'Personal Training',
    description: 'Achieve your fitness goals with personalized one-on-one training sessions tailored to your needs.',
    path: '/services/PersonalTraining'
  },
  {
    service: 'home-to-home-private-training',
    name: 'Home Private Training',
    description: 'Enjoy premium private training sessions at the convenience of your home with our expert trainers.',
    image: homeTraining,
    path: '/services/HomeToHomePrivateTraining'
  },
  {
    service: 'boxing',
    name: 'Boxing',
    description: 'Master the art of boxing with our professional trainers and state-of-the-art boxing facilities.',
    path: '/services/Boxing',
    image: BoxingBlack
  },
  {
    service: 'thai-boxing-and-kick-boxing',
    name: 'Thai Boxing & Kickboxing',
    description: 'Learn authentic Thai boxing and kickboxing techniques to enhance your fitness and self-defense skills.',
    image: THAIBOXING,
    path: '/services/ThaiBoxingAndKickBoxing'
  },
  {
    service: 'nutritional-consultant',
    name: 'Nutritional Consulting',
    description: 'Get personalized nutrition advice and meal plans to complement your fitness journey and achieve optimal results.',
    image: nutritionalConsultant,
    path: '/services/NutritionalConsultant'
  },
  {
    service: 'after-school-training-programs',
    name: 'After School Programs',
    description: 'Comprehensive training programs designed specifically for students to develop fitness and discipline.',
    image: AFTER_SCHOOL_IMAGE_1,
    path: '/services/AfterSchoolTrainingPrograms'
  },
  {
    service: 'fat-loss-training',
    name: 'Fat Loss Training',
    description: 'Specialized programs focused on fat loss and weight management with proven results.',
    path: '/services/FatLossTraining'
  },
  {
    service: 'taekwondo',
    name: 'Taekwondo',
    description: 'Master the art of Taekwondo with our experienced instructors in a traditional yet modern setting.',
    image: taekwondo,
    path: '/services/Taekwondo'
  }
]
</script>
