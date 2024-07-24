<template>
  <section id="services" class="bg-black pt-5 p-1 md:p-16 grid place-items-center">
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
        <div v-show="!service.image" class="grid place-items-center h-auto bg-black w-1/2">
          <img class="w-24 h-auto" :src="ACTION_FITNESS_IMAGE" alt="" />
        </div>

        <div class="w-1/2 p-5 flex flex-col gap-3 justify-center items-center">
          <h1 class="text-black font-bebas text-xl">{{ service.name }}</h1>
          <p class="">{{ service.description }}</p>
          <router-link
            class="mt-5 px-3 py-1 bg-primary-red text-white text-sm bg-opacity-50 rounded-lg"
            :to="service.path"
          >
            Learn More
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
    description: 'Build muscle and strength with our body building training programs.',
    image: BodybuildingBlack,
    path: '/services/BodyBuilding'
  },
  {
    service: 'group-training',
    name: 'Group Fitness Training ',
    description: 'Group Fitness Training ',
    image: groupFitness,
    path: '/services/GroupFitnessTraining'
  },
  {
    service: 'personal-training',
    name: 'Personal Training',
    description: 'Achieve your fitness goals with one-on-one personal training sessions.',
    path: '/services/PersonalTraining'
  },
  {
    service: 'home-to-home-private-training',
    name: 'Home to Home Private Training',
    description: 'Enjoy private training sessions at the convenience of your home.',
    image: homeTraining,
    path: '/services/HomeToHomePrivateTraining'
  },
  {
    service: 'boxing',
    name: 'Boxing',
    description: 'Improve your boxing skills with our professional boxing classes.',
    path: '/services/Boxing',
    image: BoxingBlack

  },
  {
    service: 'thai-boxing-and-kick-boxing',
    name: 'Thai Boxing and Kick Boxing',
    description:
      'Get trained in Thai boxing  kick boxing techniques to enhance your self-defense skills.',
    image: THAIBOXING,
    path: '/services/ThaiBoxingAndKickBoxing'
  },

  {
    service: 'nutritional-consultant',
    name: 'Nutritional Consultant',
    description: 'Get personalized nutrition advice to help you achieve your fitness goals.',
    image: nutritionalConsultant,
    path: '/services/NutritionalConsultant'
  },
 
  {
    service: 'after-school-training-programs',
    name: 'After School Taekwondo Training Programs',
    description: 'Enroll in our comprehensive training programs designed for students.',
    image: AFTER_SCHOOL_IMAGE_1,
    path: '/services/AfterSchoolTrainingPrograms'
  },


  {
    service: 'fat-loss-training',
    name: 'Fat Loss Training',
    description: 'Join our specialized programs focused on fat loss and weight management.',
    path: '/services/FatLossTraining'
  },
 
 
  // {
  //   service: 'after-school-taekwondo-training',
  //   name: 'After School Taekwondo Training',
  //   description: 'Learn Taekwondo after school with our expert trainers.',
  //   image: AFTER_SCHOOL_TAEKWONDO,
  //   path: '/services/AfterSchoolTaekwondoTraining'
  // },
  {
    service: 'taekwondo',
    name: 'Taekwondo',
    description: 'Master the art of Taekwondo with our experienced instructors.',
    image: taekwondo,
    path: '/services/Taekwondo'
  }
]
</script>
