<template>
  <section id="services" class="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-32 h-32 bg-primary-green/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-primary-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-accent-orange/10 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Enhanced Services Header -->
      <div class="text-center mb-16">
        <div class="inline-block mb-6">
          <span class="bg-gradient-to-r from-primary-red to-accent-orange text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
            What We Offer
          </span>
        </div>
        <h2 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Premium 
          <span class="bg-gradient-to-r from-primary-green via-light-green to-primary-green bg-clip-text text-transparent">
            Services
          </span>
        </h2>
        <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Discover our comprehensive range of premium fitness services designed to transform your body, mind, and spirit.
        </p>
      </div>

      <!-- Enhanced Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(service, index) in services" 
          :key="service.name" 
          class="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl hover:shadow-primary-green/20 transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-gray-800 hover:border-primary-green/50"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          
          <!-- Service Image -->
          <div class="relative h-56 overflow-hidden">
            <img 
              v-if="service.image" 
              :src="service.image" 
              :alt="service.name" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div 
              v-else 
              class="w-full h-full bg-gradient-to-br from-primary-green to-light-green flex items-center justify-center"
            >
              <img class="w-16 h-16 opacity-80" :src="ACTION_FITNESS_IMAGE" :alt="service.name" />
            </div>
            
            <!-- Enhanced Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <!-- Service Number Badge -->
            <div class="absolute top-4 right-4">
              <div class="relative">
                <div class="absolute inset-0 bg-accent-gold rounded-full animate-ping opacity-40"></div>
                <div class="relative bg-gradient-to-r from-accent-gold to-accent-orange text-black w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg">
                  {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>
            </div>

            <!-- Hover Icon -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div class="bg-primary-green/90 text-black p-4 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Enhanced Service Content -->
          <div class="p-8">
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-primary-green transition-colors duration-300 leading-tight">
              {{ service.name }}
            </h3>
            
            <p class="text-gray-400 mb-8 leading-relaxed text-lg">
              {{ service.description }}
            </p>

            <!-- Enhanced CTA Button -->
            <router-link :to="service.path" class="block">
              <button class="group/btn relative w-full px-8 py-4 bg-gradient-to-r from-primary-green to-light-green text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-green/30 hover:scale-105">
                <span class="relative z-10 flex items-center justify-center gap-3 text-lg">
                  Learn More
                  <svg class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-light-green to-primary-green opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </router-link>
          </div>

          <!-- Premium Corner Accent -->
          <div class="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary-red/20 to-accent-orange/20 transform -rotate-45 -translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary-green/20 to-light-green/20 transform rotate-45 translate-x-8 translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      <!-- Enhanced CTA Section -->
      <div class="text-center mt-20">
        <div class="relative bg-gradient-to-r from-primary-red via-accent-orange to-accent-gold rounded-3xl p-1 max-w-5xl mx-auto">
          <div class="bg-black rounded-3xl p-12 md:p-16">
            <div class="mb-8">
              <div class="inline-block bg-gradient-to-r from-light-green to-primary-green text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                Get Started Today
              </div>
              <h3 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Ready to Start Your
                <br>
                <span class="bg-gradient-to-r text-sm from-primary-green to-light-green bg-clip-text text-transparent">
                  TRANSFORMATION?
                </span>
              </h3>
              <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of members who have already achieved their fitness goals with Action Fitness.
              </p>
            </div>
            
          
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <!-- <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
          <div class="text-4xl font-black text-primary-green mb-2">10+</div>
          <div class="text-gray-400 font-semibold">Premium Services</div>
        </div>
        <div class="text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
          <div class="text-xl font-black text-primary-red mb-2">1000+</div>
          <div class="text-gray-400 font-semibold">Happy Clients</div>
        </div>
        <div class="text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
          <div class="text-xl font-black text-accent-gold mb-2">10+</div>
          <div class="text-gray-400 font-semibold">Years Experience</div>
        </div>
        <div class="text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
          <div class="text-xl font-black text-light-green mb-2">24/7</div>
          <div class="text-gray-400 font-semibold">Support Available</div>
        </div>
      </div> -->
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
  fatloss,
  BodybuildingBlack,
  homeTraining,
  personaltraining,
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
    image: personaltraining,
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
    image: fatloss,
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

<style scoped>
/* Custom brand colors */
.text-primary-red { color: #ef212f; }
.text-primary-green { color: #93b902; }
.text-accent-orange { color: #c7621e; }
.text-accent-gold { color: #af8b10; }
.text-light-green { color: #c7fc00; }

.bg-primary-red { background-color: #ef212f; }
.bg-primary-green { background-color: #93b902; }
.bg-accent-orange { background-color: #c7621e; }
.bg-accent-gold { background-color: #af8b10; }
.bg-light-green { background-color: #c7fc00; }

.border-primary-red { border-color: #ef212f; }
.border-primary-green { border-color: #93b902; }

.shadow-primary-green\/20 { box-shadow: 0 25px 50px -12px rgba(147, 185, 2, 0.2); }
.shadow-primary-green\/30 { box-shadow: 0 25px 50px -12px rgba(147, 185, 2, 0.3); }

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}
</style>