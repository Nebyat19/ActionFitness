<template>
  <footer class="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-green/20 to-transparent"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex flex-col items-center lg:items-start">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <img class="h-16 w-auto" :src="ACTION_FITNESS_IMAGE" alt="Action Fitness" />
            </div>
            <p class="text-gray-300 text-sm leading-relaxed text-center lg:text-left mb-6">
              {{ gymInformation.info }}
            </p>
            <div class="flex gap-4">
              <a :href="socialLinks.facebook" target="_blank" rel="noopener" aria-label="Facebook" 
                 class="group p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <FacebookIcon class="w-5 h-5" />
              </a>
              <a :href="socialLinks.instagram" target="_blank" rel="noopener" aria-label="Instagram" 
                 class="group p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <InstagramIcon class="w-5 h-5" />
              </a>
              <a :href="socialLinks.tiktok" target="_blank" rel="noopener" aria-label="TikTok" 
                 class="group p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-primary-green hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <TiktokIcon class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-1">
          <div class="text-center lg:text-left">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span class="w-8 h-1 bg-primary-green rounded-full"></span>
              Quick Links
            </h3>
            <ul class="space-y-3">
              <li v-for="link in gymInformation.links" :key="link.name">
                <router-link 
                  :to="link.path" 
                  class="text-gray-300 hover:text-primary-green transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span class="w-1 h-1 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="lg:col-span-1">
          <div class="text-center lg:text-left">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span class="w-8 h-1 bg-primary-green rounded-full"></span>
              Contact Info
            </h3>
            <div class="space-y-4">
              <!-- Location -->
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-gray-300 text-sm leading-relaxed">{{ gymInformation.location }}</p>
                </div>
              </div>
              
              <!-- Phone Numbers -->
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div class="space-y-1">
                  <a 
                    v-for="phone in gymInformation.phones" 
                    :key="phone" 
                    :href="`tel:${phone}`"
                    class="block text-gray-300 hover:text-primary-green transition-colors duration-300 text-sm"
                  >
                    {{ phone }}
                  </a>
                </div>
              </div>
              
              <!-- Email -->
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <a 
                    :href="`mailto:${gymInformation.email}`"
                    class="text-gray-300 hover:text-primary-green transition-colors duration-300 text-sm"
                  >
                    {{ gymInformation.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Opening Hours -->
        <div class="lg:col-span-1">
          <div class="text-center lg:text-left">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span class="w-8 h-1 bg-primary-green rounded-full"></span>
              Opening Hours
            </h3>
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-white font-semibold">Today's Schedule</span>
              </div>
              <p class="text-gray-300 text-sm leading-relaxed">{{ gymInformation.openingHours }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Premium CTA Section -->
      <div class="text-center mb-12">
        <div class="bg-gradient-to-r from-primary-green to-green-600 rounded-2xl p-8 text-white">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h3>
          <p class="text-lg mb-6 opacity-90">Join our community and transform your life with premium fitness training.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/contact">
              <button class="px-8 py-4 bg-white text-primary-green font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Get Started Today
              </button>
            </router-link>
            <router-link to="/services">
              <button class="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary-green transition-all duration-200">
                View Services
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="border-t border-white/10 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Action Fitness. All rights reserved.
          </p>
          <div class="flex gap-6 text-sm">
            <a href="#" class="text-gray-400 hover:text-primary-green transition-colors duration-300">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-primary-green transition-colors duration-300">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-primary-green transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ACTION_FITNESS_IMAGE, gymInformation } from '@/data/constants'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'

const socialLinks = gymInformation.socialMedia
</script>
