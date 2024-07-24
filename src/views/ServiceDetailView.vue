<template>
  <div class="min-h-screen bg-gray-100 py-12 px-6 pt-36">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img :src="service.image" alt="Body Building Service" class="w-full bg-black h-64 object-cover " />
      <div class="p-6">
        <h1 class="text-3xl text-center font-cursive font-bold text-gray-800 mb-4">
          {{ service.title }}
        </h1>
        <p class="text-gray-600 mb-4">
          {{ service.description }}
        </p>
        <p class="text-primary-green font-bebas text-center font-bold text-2xl mb-4 mt-10">
          Benefits of our {{ service.sub }} program
        </p>
        <ul class="font-bold text-gray-700 mb-6">
          <li class="flex gap-2" v-for="benefit in service.benefits" :key="benefit">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M18 3v5M6 3v5m14.5-4v1.5m0 0V7m0-1.5H22M3.5 4v1.5m0 0V7m0-1.5H2m16 0H6M7.277 19h9.447c1.237 0 1.856 0 2.112-.303c.58-.686-.532-1.594-.938-2.051c-.457-.516-.792-.646-1.468-.646H7.57c-.676 0-1.01.13-1.468.646c-.406.457-1.518 1.365-.938 2.051C5.42 19 6.04 19 7.277 19M9 8v8m6-8v8m1 3v2m-8-2v2"
                color="currentColor"
              />
            </svg>
            {{ benefit }}
          </li>
        </ul>
        <div class="grid place-items-center">
          <button
            class="w-full p-2 bg-primary-red rounded-lg text-white mb-5 font-poppins"
            @click="router.push('/services')"
          >
            Go Back
          </button>
          <img
            class="h-16 w-auto p-3 border border-primary-green rounded-full"
            :src="ACTION_FITNESS_IMAGE"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BodyBuilding, homeTraining,AFTER_SCHOOL_IMAGE_1, ACTION_FITNESS_IMAGE,THAIBOXING ,nutritionalConsultant} from '@/data/constants'

const service = ref({})
const ServiceList = ['BodyBuilding','ThaiBoxingAndKickBoxing', 'AfterSchoolTrainingPrograms','HomeToHomePrivateTraining','Boxing', 'NutritionalConsultant']
defineProps({
  name: String
})
const ServiceInfo = {
    
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
    image: homeTraining // Make sure to import the correct image path
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
const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
  if (!ServiceList.includes(route.params.name)) {
   router.push('/services')
  } else{

      service.value = ServiceInfo[route.params.name]
  }
})
  
</script>
