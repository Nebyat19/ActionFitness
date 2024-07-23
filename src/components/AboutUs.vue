<template>
  <section id="about-us" class="bg-white  w-full p-10 md:p-24">
    <div class="container mx-auto flex flex-col justify-center items-center gap-5">
      <h1 class="text-1xl md:text-4xl font-poppins font-bold tracking-tighter text-gray-900">
        Welcome to Action Fitness
      </h1>
      <p class="md:px-24 text-md font-poppins text-center text-gray-800">
        where your health and fitness journey begins. Located in Addis Ababa, Ethiopia, we offer a
        range of services designed to meet your individual needs and help you achieve your personal
        fitness goals.
      </p>
      <div class="flex flex-col md:flex-row justify-between gap-10 mt-5">
        <div class="shadow-2xl border-2 border-gray-50 relative  w-full md:w-1/2 h-64">
          <video
            class="absolute inset-0 h-full w-full object-cover"
            :src="sampleVideo_2"
            autoplay
            loop
            muted
          ></video>
        </div>
        <p class=" leading-9 md:text-md w-full md:w-1/2   text-gray-800 text-md">
            <span class="text-primary-green block mb-3 text-2xl"> Our Mission</span>
      
          Our dedicated team of professional trainers and nutritional consultants are here to
          support and guide you every step of the way.
        <span class="block mt-5 ">  Our mission is to inspire and empower individuals to lead healthier lives through personalized fitness and nutrition programs.
  combining physical training, mental well-being, and nutritional guidance to help you achieve optimal results.
</span>
        
        </p>
       
      </div>
    </div>
  </section>
</template>

<script setup>
import { sampleVideo_2 } from '@/data/constants'
</script>
