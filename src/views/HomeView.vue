<template>
  <main id="home" class="overflow-hidden ">
    <!-- Premium Hero Section -->
    <div class="relative mt-14 w-full h-[75vh] md:h-screen flex items-center justify-center overflow-hidden">
      <img :src="HERO_IMAGE_2" class="w-full h-full absolute object-cover object-center" alt="Action Fitness Hero" />
      
      <!-- Enhanced Premium Gradient Overlay -->
      <div class="w-full h-full absolute bg-gradient-to-br from-black/90 via-black/75 to-primary-green/20"></div>
      
      <!-- Additional Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-r from-primary-green/5 to-transparent opacity-30"></div>
      
      <!-- Premium Content Container -->
      <div class="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full text-center md:text-left px-4 md:px-32 animate-fadein">
        <!-- Premium Logo Section -->
        <div class="flex flex-col items-center md:items-start justify-center md:w-2/5 mb-6 md:mb-0">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20">
            <img class="h-16 md:h-24 w-auto drop-shadow-2xl mb-4 md:mb-6" :src="ACTION_IMAGE" alt="Action Logo" />
            <img class="h-16 md:h-24 w-48 md:w-64 drop-shadow-2xl" :src="FITNESS_1" alt="Fitness Logo" />
          </div>
        </div>
        
        <!-- Premium Text & CTA Section -->
        <div class="flex flex-col items-center md:items-start justify-center md:w-3/5 gap-4 md:gap-8">
          <div class="space-y-2 md:space-y-4">
            <h1 class="text-3xl md:text-7xl font-black font-anton text-white leading-tight drop-shadow-2xl">
              It's time to take 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-green-400">Action</span>
            </h1>
            <h2 class="text-lg md:text-3xl font-light text-gray-200 mb-4 md:mb-8 drop-shadow-lg">
              <span class="text-primary-green font-semibold">Transform</span> your life with premium fitness training
            </h2>
          </div>
          
          <!-- Premium CTA Buttons -->
          <div class="flex flex-col sm:flex-row  md:gap-6 w-full md:justify-start justify-center">
            <router-link to="/services">
              <button class="group relative px-6 md:px-10 py-3 md:py-4 rounded-xl bg-gradient-to-r from-primary-green to-green-500 text-black font-bold text-base md:text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-primary-green/25 overflow-hidden">
                <span class="relative z-10">Explore Services</span>
                <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-primary-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </router-link>
          
          </div>
          
          <!-- Premium Social Media Section -->
          <div class="flex gap-4 md:gap-8 mt-4 md:mt-8 justify-center md:justify-start">
            <a :href="gymInformation.socialMedia.facebook" target="_blank" rel="noopener" aria-label="Facebook" 
               class="group p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <FacebookIcon class="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a :href="gymInformation.socialMedia.instagram" target="_blank" rel="noopener" aria-label="Instagram" 
               class="group p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <InstagramIcon class="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a :href="gymInformation.socialMedia.tiktok" target="_blank" rel="noopener" aria-label="TikTok" 
               class="group p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <TiktokIcon class="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Premium CTA Banner -->
    <div class="relative w-full bg-gradient-to-r from-primary-green via-primary-green to-black  py-4 md:py-6 overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center text-white px-4 md:px-6">
        <div class="flex items-center gap-2 md:gap-3">
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span class="text-sm md:text-lg font-semibold">Premium Training Programs</span>
        </div>
        <span class="hidden md:block text-white/80">|</span>
        <span class="text-white/90 text-sm md:text-base">Tailored to your unique fitness journey</span>
        <router-link to="/contact">
          <button class="px-4 md:px-6 py-1 md:py-2 bg-white text-primary-green font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm md:text-base">
            Start Today
          </button>
        </router-link>
      </div>
    </div>
  </main>

  <!-- Premium Section Separator -->
  <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

  <AboutUs />
  
  <!-- Premium Section Separator -->
  <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  
  <WhyUs />
  
  <!-- Premium Section Separator -->
  <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  
  <Services />
  
  <!-- Premium Section Separator -->
  <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  
  <Founder />
  <CertificatesSection/>
  <PremiumTransformationVideos />
  <!-- Premium Section Separator -->
  <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  
  <ContactUs />
  
  <!-- Premium Section Separator -->
  <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  
  <FollowUs />
  
  <!-- Premium Section Separator -->
  <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  
  <Gallary />
</template>

<script setup>
import { HERO_IMAGE_2, ACTION_IMAGE, ACTION_FITNESS_IMAGE, FITNESS_1, gymInformation } from '@/data/constants'
import AboutUs from '@/components/AboutUs.vue'
import Services from '@/components/Services.vue'
import WhyUs from '@/components/WhyUs.vue'
import FollowUs from '@/components/FollowUs.vue'
import ContactUs from '@/components/ContactUs.vue'
import Gallary from '@/components/Gallary.vue'
import Founder from '@/components/Founder.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import CertificatesSection from '@/components/CertificatesSection.vue'
import PremiumTransformationVideos from '@/components/PremiumTransformationVideos.vue'
</script>
