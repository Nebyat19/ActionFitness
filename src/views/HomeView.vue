<template>
  <main id="home">
    <div class=" w-full h-[100vh] md:pt-10 relative grid place-items-center">
      <img :src="HERO_IMAGE" class="w-full h-full   absolute object-cover" alt="">
      <div class=" w-full h-full absolute bg-black opacity-60"></div>
      <div class=" z-10 text-5xl md:text-6xl md:text-center text-gray-300 font-anton md:leading-normal leading-tight font-thin  mx-5 tracking-tight">
      
   <div class="flex md:justify-center p-3 gap-2">   <img  class=" h-16 mb-5 w-auto" :src="ACTION_FITNESS_IMAGE" alt=""> <img class="h-16 w-56" :src="FITNESS_1" alt="">
   </div>
      <p>Push <span class="relative text-primary-green">yourself 
   </span></p>
      <p> <span class="text-primary-green">harder</span> to become better </p>
          
      <div class="text-sm mt-7 tracking-wide flex justify-start gap-5 font-poppins"><a href="#services" class="px-4 py-2 bg-gray-900 text-white rounded-lg ">Our Services</a> <a href="#contact-us" class="px-4 py-2 bg-primary-green  text-white rounded-lg ">Contact Us</a></div>
      </div>
     
    </div>
    <div class="w-full bg-primary-red h-16 z-0 flex  gap-3 justify-center items-center  text-white text-md font-bebas">Focused training programs tailored to your needs. <span class=" font-bold text-black"> Start now!</span></div>
  </main>

  <AboutUs />
  <WhyUs />
  <Services />
  <Founder />
  <ContactUs />
  <FollowUs />
  <Gallary />

  
</template>

<script setup>
import { HERO_IMAGE,ACTION_IMAGE,ACTION_FITNESS_IMAGE, FITNESS_1 } from '@/data/constants'
import AboutUs from '@/components/AboutUs.vue'
import Services from '@/components/Services.vue';
import WhyUs from '@/components/WhyUs.vue';
import FollowUs from '@/components/FollowUs.vue';
import ContactUs from '@/components/ContactUs.vue';
import Gallary from '@/components/Gallary.vue';
import Founder from '@/components/Founder.vue';
</script>

