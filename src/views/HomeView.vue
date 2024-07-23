<template>
  <main id="home">
    <div class=" w-full h-[100vh] relative grid place-items-center">
      <img :src="HERO_IMAGE" class="w-full h-full  absolute object-cover" alt="">
      <div class=" w-full h-full absolute bg-black opacity-50"></div>
      <div>
        <div class=" container mx-auto flex flex-col  items-center text-center justify-center h-full">
          <div class="text-white text-center   z-0 flex justify-between items-center flex-col  ">
           <div class="flex flex-col md:flex-row gap-2 items-center justify-start text-white text-[60px] md:text-[100px] font-bold  tracking-tighter"> <div class=" text-primary-green p-3 bg-white rounded-[30px]"><img class="h-24 w-auto" :src="ACTION_IMAGE" alt=""></div> FITNESS GYM  </div>
            <p class="text-sm md:text-lg">Join Action Fitness for top-notch gym facilities, personal training, and wellness programs </p>
            <button class="bg-primary-green text-sm hover:bg-primary-red text-white px-10 py-2 rounded-lg mt-4">Get Started</button>
          </div>
          </div>
          
      </div>
     
    </div>
    <div class="w-full bg-primary-red h-16 z-0 flex  gap-3 justify-center items-center  text-white text-md font-bebas">Focused training programs tailored to your needs. <span class=" font-bold text-black"> Start now!</span></div>
  </main>
  <AboutUs />
  <WhyUs />
  <Services />
  <ContactUs />
  <FollowUs />
  <Gallary />
  
</template>

<script setup>
import { HERO_IMAGE,ACTION_IMAGE } from '@/data/constants'
import AboutUs from '@/components/AboutUs.vue'
import Services from '@/components/Services.vue';
import WhyUs from '@/components/WhyUs.vue';
import FollowUs from '@/components/FollowUs.vue';
import ContactUs from '@/components/ContactUs.vue';
import Gallary from '@/components/Gallary.vue';
</script>

