<template>
  <main>
    <div class=" w-full h-[100vh] relative grid place-items-center">
      <img :src="HERO_IMAGE" class="w-full h-full  absolute object-cover" alt="">
      <div>
        <div class=" container mx-auto flex flex-col  items-center text-center justify-center h-full">
          <div class="text-white text-center  gap-3 z-0 flex justify-between items-center flex-col  ">
            <img :src="ACTION_IMAGE" class="w-80" alt="">>
            <h1 class="text-6xl font-bold font-bebas text-accent-gold">Welcome to our gym</h1>
            <p class="text-md text-primary-green">We are here to help you achieve your fitness goals</p>
            <button class="bg-primary-red text-white px-10 py-2 rounded-lg mt-4">Get Started</button>
          </div>
          </div>
          
      </div>
     
    </div>
    <div class="w-full bg-primary-red h-16 z-0 flex  gap-3 justify-center items-center  text-white text-md font-bebas">Focused training programs tailored to your needs. <span class=" font-bold text-black"> Start now!</span></div>
  </main>
</template>

<script setup>
import { HERO_IMAGE,ACTION_IMAGE } from '@/data/constants'
</script>
