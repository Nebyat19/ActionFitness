<template>
  <div class="">
    <div class="bg-black text-white h-80 flex flex-col justify-center items-center gap-2">
      <h1 class="text-2xl flex gap-3 font-bold pt-36 font-poppins uppercase">
        <svg
          class="text-primary-red"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path
              d="M7.4 7H4.6a.6.6 0 0 0-.6.6v8.8a.6.6 0 0 0 .6.6h2.8a.6.6 0 0 0 .6-.6V7.6a.6.6 0 0 0-.6-.6m12 0h-2.8a.6.6 0 0 0-.6.6v8.8a.6.6 0 0 0 .6.6h2.8a.6.6 0 0 0 .6-.6V7.6a.6.6 0 0 0-.6-.6"
            />
            <path
              d="M1 14.4V9.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H1.6a.6.6 0 0 1-.6-.6m22 0V9.6a.6.6 0 0 0-.6-.6h-1.8a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6h1.8a.6.6 0 0 0 .6-.6M8 12h8"
            />
          </g>
        </svg>
        Meet Our Trainers
      </h1>
      <div class="p-[0.1px] border bg-white w-24"></div>
    </div>
    <div class="flex flex-col md:flex-row gap-16 justify-center mt-10">
      <div v-for="trainer in trainesInfo" :key="trainer" class="border shadow-lg bg-black">
        <div class="relative h-80 w-full md:w-80">
          <img
            class="absolute inset-0 w-full h-full object-cover object-top"
            :src="trainer.image"
            :alt="trainer.name"
          />
        </div>
        <h2 class="text-center p-3 font-bebas text-2xl text-white">{{ trainer.name }}</h2>
        <p
          class="items-center justify-center flex gap-3 font-bebas text-lg pb-5 text-primary-green"
        >
          <svg
            class="text-white h-5 w-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
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
          {{ trainer.title }}
        </p>
      </div>
    </div>
    <div class="w-full h-80 relative bg-black mt-16 flex justify-center items-center">
      <div class="absolute h-full w-full inset-0 bg-black bg-opacity-50"></div>
      <img class="w-full my-auto h-full object-cover py-10" :src="HERO_IMAGE" alt="" />

    <div class="absolute flex gap-5 justify-center items-center">
    <img  class="h-36 w-auto border-2 shadow-lg bg-black rounded-full p-5 border-primary-green" :src="ACTION_FITNESS_IMAGE" alt="">
    </div>
      
    </div>

    <ContactUs />
  </div>
</template>

<script setup>
import { trainesInfo, HERO_IMAGE, ACTION_FITNESS_IMAGE } from '@/data/constants'
import ContactUs from '@/components/ContactUs.vue'
</script>
