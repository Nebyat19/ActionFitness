<template>
  <main id="home" class="overflow-hidden ">
    <!-- Premium Hero Section -->
    <div class="relative mt-14 w-full h-[95vh] md:h-screen flex items-center justify-center overflow-hidden">
      <img :src="heroImage" class="w-full h-full absolute object-cover object-center" alt="Action Fitness Hero" />
      <div class="w-full h-full absolute bg-gradient-to-t from-black via-black/70 to-black/40"></div>

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
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-light-green">Action</span>
            </h1>
            <h2 class="text-lg md:text-3xl font-light text-gray-200 mb-4 md:mb-8 drop-shadow-lg">
              <span class="text-primary-green font-semibold">Transform</span> your life with premium fitness training
            </h2>
          </div>
          
          <!-- Premium CTA Buttons -->
          <div class="flex flex-col sm:flex-row  md:gap-6 w-full md:justify-start justify-center">
            <router-link to="/services">
              <button class="site-btn-primary text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4">
                Explore Services
              </button>
            </router-link>
          </div>
          
          <!-- Premium Social Media Section -->
          <div class="flex gap-4 md:gap-8 mt-4 md:mt-8 justify-center md:justify-start">
            <a v-if="gymInfo.facebook" :href="gymInfo.facebook" target="_blank" rel="noopener" aria-label="Facebook"
               class="group p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <FacebookIcon class="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a v-if="gymInfo.instagram" :href="gymInfo.instagram" target="_blank" rel="noopener" aria-label="Instagram"
               class="group p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <InstagramIcon class="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a v-if="gymInfo.tiktok" :href="gymInfo.tiktok" target="_blank" rel="noopener" aria-label="TikTok"
               class="group p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <TiktokIcon class="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Promo strip -->
    <div class="relative w-full bg-primary-green py-3.5">
      <div class="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center text-black px-4 md:px-6">
        <span class="text-sm md:text-base font-semibold">Premium Training Programs</span>
        <span class="hidden md:block text-black/40">|</span>
        <span class="text-black/70 text-sm md:text-base">Tailored to your unique fitness journey</span>
        <router-link to="/contact">
          <button class="text-sm md:text-base px-4 md:px-6 py-1.5 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-colors duration-200">
            Start Today
          </button>
        </router-link>
      </div>
    </div>
  </main>

  <!-- Section separator -->
  <div class="site-divider"></div>

  <AboutUs />
  
  <!-- Section separator -->
  <div class="site-divider"></div>
  
  <WhyUs />
  
  <!-- Section separator -->
  <div class="site-divider"></div>
  
  <Services />
  
  <!-- Section separator -->
  <div class="site-divider"></div>
  
  <Founder />
  <CertificatesSection/>
  <WeightLossSection />
  <PremiumTransformationVideos />
  <!-- Section separator -->
  <div class="site-divider"></div>
  
  <ContactUs />
  
  <!-- Section separator -->
  <div class="site-divider"></div>
  
  <FollowUs />
  
  <!-- Section separator -->
  <div class="site-divider"></div>
  
  <Gallary />
</template>

<script setup>
import { computed } from 'vue'
import HERO_IMAGE_2 from '@/assets/images/heroImage-2.jpg'
import ACTION_IMAGE from '@/assets/images/logos/actionBgRemoved.png'
import FITNESS_1 from '@/assets/images/logos/FITNESS_1.png'
import { useContentStore } from '@/stores/content'
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
import WeightLossSection from '@/components/WeightLossSection.vue'

const content = useContentStore()
const gymInfo = computed(() => content.gymInfo)
// Falls back to the bundled default hero image until the owner picks one
// under Admin > Site Images.
const heroImage = computed(() => content.siteImages.homeHeroUrl || HERO_IMAGE_2)
</script>
