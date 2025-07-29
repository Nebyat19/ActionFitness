<template>
  <main id="home">
    <div class="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      <img :src="HERO_IMAGE" class="w-full h-full absolute object-cover object-center" alt="" />
      <!-- Gradient overlay -->
      <div class="w-full h-full absolute bg-gradient-to-br from-black/80 via-black/60 to-primary-green/40"></div>
      <div
        class="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full text-center md:text-left px-4 md:px-24 animate-fadein"
      >
        <!-- Logo Section -->
        <div class="flex flex-col items-center md:items-start justify-center md:w-1/3 mb-8 md:mb-0">
          <img class="h-20 w-auto drop-shadow-lg mb-4" :src="ACTION_IMAGE" alt="Action Logo" />
          <img class="h-20 w-56 drop-shadow-lg" :src="FITNESS_1" alt="Fitness Logo" />
        </div>
        <!-- Text & Buttons Section -->
        <div class="flex flex-col items-center md:items-start justify-center md:w-2/3 gap-4">
          <h1 class="text-4xl md:text-6xl font-extrabold font-anton text-white leading-tight drop-shadow-lg mb-2">
            It’s time to take <span class="text-primary-green">Action</span>
          </h1>
          <h2 class="text-lg md:text-2xl font-semibold text-gray-200 mb-6 drop-shadow">
            <span class="text-primary-green">Start</span> your training today!
          </h2>
          <div class="flex flex-col sm:flex-row gap-4 w-full md:justify-start justify-center">
            <router-link to="/services">
              <button class="px-8 py-3 rounded-lg bg-primary-green text-black font-bold text-lg shadow-lg transition hover:bg-green-500 hover:scale-105 duration-200 w-full sm:w-auto">
                Our Services
              </button>
            </router-link>
            <router-link to="/contact">
              <button class="px-8 py-3 rounded-lg bg-primary-red text-white font-bold text-lg shadow-lg transition hover:bg-red-500 hover:scale-105 duration-200 w-full sm:w-auto">
                Contact Us
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full bg-primary-red h-16 z-0 flex gap-3 justify-center items-center text-white text-md font-bebas"
    >
      Focused training programs tailored to your needs.
      <span class="font-bold text-black"> Start now!</span>
    </div>
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
import { HERO_IMAGE, ACTION_IMAGE, ACTION_FITNESS_IMAGE, FITNESS_1 } from '@/data/constants'
import AboutUs from '@/components/AboutUs.vue'
import Services from '@/components/Services.vue'
import WhyUs from '@/components/WhyUs.vue'
import FollowUs from '@/components/FollowUs.vue'
import ContactUs from '@/components/ContactUs.vue'
import Gallary from '@/components/Gallary.vue'
import Founder from '@/components/Founder.vue'
</script>
