<template>
  <section id="services " class="bg-black p-10 md:p-24 grid place-items-center">
    <div>
      <h1 class="text-3xl font-bold text-primary-red font-bebas mb-10 grid place-items-center">
        What We Offer
      </h1>
      <p class="mt-4 text-sm text-gray-50">
        At Action Fitness, we provide a wide range of services tailored to meet your fitness and
        wellness needs.Join us to start on your fitness journey with our expert trainers and
        comprehensive programs.
      </p>
    </div>
    <div class="flex flex-col mt-7">
      <div
        :class="
          ind % 2 === 0 ? 'flex-row-reverse  bg-primary-green text-white' : 'flex-row  bg-gray-50 '
        "
        v-for="(service, ind) in services"
        :key="service"
        class="flex rounded-sm shadow-sm"
      >
        <img
          v-show="service.image"
          :src="service.image"
          alt=""
          class="w-1/2 h-auto object-cover rounded-sm"
        />
       <div   v-show="!service.image" class="grid place-items-center  h-auto bg-black w-1/2"> <img
        
          class="w-24 h-auto"
          :src="ACTION_FITNESS_IMAGE"
          alt=""
        /></div>

        <div class="w-1/2 p-5 flex flex-col gap-3 justify-center items-center">
          <h1 class="text-black font-bebas text-xl">{{ service.name }}</h1>
          <p class="">{{ service.description }}</p>
          <button class="mt-5 bg-primary-red text-white text-sm px-3 py-1 rounded-lg">read more</button>
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
  BodyBuilding
} from '@/data/constants'
const services = [
  {
    service: 'nutritional-consultant',
    name: 'Nutritional Consultant',
    description: 'Get personalized nutrition advice to help you achieve your fitness goals.',
    image: nutritionalConsultant
  },
  {
    service: 'home-to-home-private-training',
    name: 'Home to Home Private Training',
    description: 'Enjoy private training sessions at the convenience of your home.',
    image: null
  },
  {
    service: 'after-school-training-programs',
    name: 'After School Training Programs',
    description: 'Enroll in our comprehensive training programs designed for students.',
    image: AFTER_SCHOOL_IMAGE_1
  },

  {
    service: 'after-school-taekwondo-training',
    name: 'After School Taekwondo Training',
    description: 'Learn Taekwondo after school with our expert trainers.',
    image: AFTER_SCHOOL_TAEKWONDO
  },

  {
    service: 'personal-training',
    name: 'Personal Training',
    description: 'Achieve your fitness goals with one-on-one personal training sessions.'
  },
  {
    service: 'fat-loss-training',
    name: 'Fat Loss Training',
    description: 'Join our specialized programs focused on fat loss and weight management.'
  },
  {
    service: 'body-building',
    name: 'Body Building',
    description: 'Build muscle and strength with our body building training programs.',
   image: BodyBuilding
  },
  {
    service: 'boxing',
    name: 'Boxing',
    description: 'Improve your boxing skills with our professional boxing classes.'
  },

  {
    service: 'taekwondo',
    name: 'Taekwondo',
    description: 'Master the art of Taekwondo with our experienced instructors.',
    image: taekwondo
  },

  {
    service: 'kick-boxing',
    name: 'Kick Boxing',
    description: 'Learn kick boxing techniques and improve your fitness level.'
  },
  {
    service: 'thai-boxing',
    name: 'Thai Boxing',
    description: 'Get trained in Thai boxing and enhance your self-defense skills.',
    image:THAIBOXING
  }
]
</script>
