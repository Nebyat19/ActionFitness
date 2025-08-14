<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 pt-36">
    <div class="max-w-5xl mx-auto mt-10">
      
      <!-- Enhanced Service Card -->
      <div class="bg-gradient-to-br from-gray-900 to-black shadow-2xl rounded-3xl overflow-hidden border border-gray-800">
        
        <!-- Hero Image Section -->
        <div class="relative h-80 md:h-96 overflow-hidden">
          <img 
            :src="service.image || '/placeholder.svg?height=400&width=800&text=Service+Image'" 
            :alt="service.title" 
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <!-- Service Title Overlay -->
          <div class="absolute bottom-8 left-8 right-8">
            <div class="bg-primary-green text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider inline-block mb-4">
              Premium Service
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-white leading-tight">
              {{ service.title }}
            </h1>
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-8 md:p-12">
          
          <!-- Service Description -->
          <div class="mb-12">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-1 h-12 bg-primary-green rounded-full"></div>
              <h2 class="text-2xl font-bold text-white">About This Service</h2>
            </div>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ service.description }}
            </p>
          </div>

          <!-- Benefits Section -->
          <div class="mb-12">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-1 h-12 bg-primary-green rounded-full"></div>
              <h2 class="text-2xl font-bold text-white">
                Benefits of Our {{ service.sub }} Program
              </h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="(benefit, index) in service.benefits" 
                :key="benefit"
                class="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-primary-green/50 transition-all duration-300 group"
              >
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p class="text-gray-300 font-medium leading-relaxed">{{ benefit }}</p>
                </div>
              </div>
            </div>
          </div>

          

          <!-- Action Fitness Logo -->
          <div class="flex justify-center mt-12">
            <div class="bg-black p-4 rounded-full">
              <img
                class="h-16 w-auto"
                :src="ACTION_FITNESS_IMAGE"
                alt="Action Fitness"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div class="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
          <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Flexible Schedule</h4>
          <p class="text-gray-400 text-sm">Train at times that work for you</p>
        </div>

        <div class="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
          <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Certified Trainers</h4>
          <p class="text-gray-400 text-sm">Expert guidance from professionals</p>
        </div>

        <div class="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
          <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Proven Results</h4>
          <p class="text-gray-400 text-sm">Achieve your fitness goals faster</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BodyBuilding,fatloss, personaltraining, homeTraining, AFTER_SCHOOL_IMAGE_1, ACTION_FITNESS_IMAGE, THAIBOXING, nutritionalConsultant } from '@/data/constants'

const service = ref({})
const ServiceList = ['BodyBuilding', 'GroupFitnessTraining', 'FatLossTraining', 'PersonalTraining', 'ThaiBoxingAndKickBoxing', 'AfterSchoolTrainingPrograms', 'HomeToHomePrivateTraining', 'Boxing', 'NutritionalConsultant']

const router = useRouter()
const route = useRoute()

defineProps({
  name: String
})

const ServiceInfo = {
  GroupFitnessTraining: {
    title: 'Group Fitness Training',
    sub: 'Dynamic Group Workouts',
    benefits: [
      'Motivating group environment',
      'Varied workout routines',
      'Cost-effective fitness solution',
      'Increased social interaction',
      'Fun and engaging classes'
    ],
    description:
      "Experience the energy and motivation of working out in a group with our Group Fitness Training sessions. Our dynamic group workouts are designed to provide a fun and engaging environment while helping you achieve your fitness goals. Enjoy varied workout routines, increase your social interaction, and benefit from a cost-effective fitness solution that keeps you motivated and on track.",
    image: null
  },
  FatLossTraining: {
    title: 'Fat Loss Training',
    sub: 'Specialized Fat Loss Programs',
    benefits: [
      'Effective fat reduction',
      'Improved metabolic rate',
      'Enhanced body composition',
      'Personalized nutrition and exercise plans',
      'Supportive and motivating environment'
    ],
    description:
      "Join our specialized programs focused on fat loss and weight management. Our Fat Loss Training service offers tailored exercise routines and nutrition guidance to help you achieve your fat loss goals. With a focus on effective fat reduction and improved metabolic rate, you'll receive personalized plans and support to enhance your body composition and reach your fitness objectives.",
    image: fatloss
  },
  PersonalTraining: {
    title: 'Personal Training',
    sub: 'One-on-One Personal Training',
    benefits: [
      'Customized workout plans',
      'Individualized attention',
      'Enhanced motivation and accountability',
      'Expert guidance and support',
      'Faster achievement of fitness goals'
    ],
    description:
      "Achieve your fitness goals with one-on-one personal training sessions. Our personal training service offers customized workout plans tailored to your specific needs and goals. With individualized attention and expert guidance, you'll receive the motivation and support needed to maximize your results and reach your fitness objectives more efficiently.",
    image: personaltraining
  },
  AfterSchoolTrainingPrograms: {
    title: 'After School Training Programs',
    sub: 'Student Training Programs',
    benefits: [
      'Structured training schedule',
      'Development of athletic skills',
      'Improved physical fitness',
      'Supportive learning environment',
      'Enhanced teamwork and discipline'
    ],
    description:
      "Enroll in our comprehensive training programs designed for students. Our After School Training Programs offer a structured schedule that focuses on developing athletic skills, improving physical fitness, and fostering teamwork. Designed to fit into the school routine, these programs provide a supportive environment where students can enhance their abilities and stay active after school.",
    image: AFTER_SCHOOL_IMAGE_1 
  },
  HomeToHomePrivateTraining: {
    title: 'Home to Home Private Training',
    sub: 'Private Home Training',
    benefits: [
      'Convenient training at your home',
      'Personalized workout plans',
      'Flexible scheduling',
      'One-on-one attention from trainers',
      'Comfortable and private training environment'
    ],
    description:
      "Enjoy private training sessions at the convenience of your home. Our Home to Home Private Training service offers personalized workout plans tailored to your fitness goals, all within the comfort of your own space. Experience flexible scheduling and dedicated attention from our expert trainers, designed to fit your lifestyle and preferences.",
    image: homeTraining
  },
  NutritionalConsultant: {
    title: 'Nutritional Consultant',
    sub: 'Nutrition Advice',
    benefits: [
      'Personalized nutrition plans',
      'Improved dietary habits',
      'Enhanced fitness performance',
      'Better overall health',
      'Guidance on healthy eating'
    ],
    description:
      "Get personalized nutrition advice to help you achieve your fitness goals. Our nutritional consulting service provides tailored dietary plans and expert guidance to optimize your nutrition, enhance your performance, and support your overall health. Whether you're looking to improve your diet, manage weight, or boost energy, our professional consultants are here to assist you.",
    image: nutritionalConsultant 
  },
  Boxing: {
    title: 'Boxing',
    sub: 'Boxing',
    benefits: [
      'Enhanced boxing techniques',
      'Increased physical fitness',
      'Improved hand-eye coordination',
      'Boosted confidence',
      'Better defensive skills'
    ],
    description:
      "Improve your boxing skills with our professional boxing classes. Our training program focuses on developing advanced boxing techniques, enhancing your fitness, and building your confidence in the ring. Whether you're a novice or an experienced boxer, our expert trainers will help you reach your full potential.",
    image: ACTION_FITNESS_IMAGE 
  },
  BodyBuilding: {
    title: 'Body Building',
    sub: 'Body Building',
    benefits: [
      'Increased muscle mass',
      'Improved strength and endurance',
      'Enhanced physical appearance',
      'Boosted metabolism',
      'Reduced risk of injury'
    ],
    description:
      "Our Body Building service is designed to help you achieve your fitness goals through tailored workout plans, professional guidance, and a supportive environment. Whether you're looking to build muscle, enhance your physique, or improve overall strength, our expert trainers are here to assist you every step of the way.",
    image: BodyBuilding
  },
  ThaiBoxingAndKickBoxing: {
    title: 'Thai Boxing and Kick Boxing',
    sub: 'Thai Boxing & Kick Boxing',
    benefits: [
      'Enhanced self-defense skills',
      'Increased cardiovascular fitness',
      'Improved flexibility and agility',
      'Boosted mental toughness',
      'Better coordination and balance'
    ],
    description:
      "Get trained in Thai boxing and kick boxing techniques to enhance your self-defense skills. Our program focuses on developing striking techniques, conditioning, and practical self-defense strategies. Whether you're a beginner or looking to refine your skills, our experienced trainers will guide you through every step of your training.",
    image: THAIBOXING
  }
}

onBeforeMount(() => {
  if (!ServiceList.includes(route.params.name)) {
    router.push('/services')
  } else {
    service.value = ServiceInfo[route.params.name]
  }
})
</script>

<style scoped>
.text-primary-green { color: #93b902; }
.bg-primary-green { background-color: #93b902; }
.border-primary-green { border-color: #93b902; }
.hover\:bg-primary-green\/90:hover { background-color: rgba(147, 185, 2, 0.9); }
.hover\:border-primary-green\/50:hover { border-color: rgba(147, 185, 2, 0.5); }
.hover\:text-primary-green:hover { color: #93b902; }
.shadow-primary-green\/25 { box-shadow: 0 25px 50px -12px rgba(147, 185, 2, 0.25); }
</style>