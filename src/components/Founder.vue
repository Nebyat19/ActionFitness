<template>
  <section id="founder" class="py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-green/20 to-transparent"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Premium Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-6 font-anton">
          Meet Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-green-400">Founder</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          The visionary behind Action Fitness, dedicated to transforming lives through premium fitness training.
        </p>
      </div>

      <!-- Premium Founder Card -->
      <div class="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          
          <!-- Premium Image Section -->
          <div class="lg:w-2/5">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-green to-green-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div class="relative bg-gray-900 rounded-2xl overflow-hidden transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500">
                <img 
                  class="w-full h-96 md:h-[500px] object-cover object-top" 
                  :src="founderInfo.image" 
                  :alt="founderInfo.name"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <!-- Premium Badge -->
              <div class="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary-green to-green-600 text-white px-6 py-3 rounded-full shadow-lg">
                <span class="font-bold text-sm">{{ founderInfo.title }}</span>
              </div>
            </div>
          </div>

          <!-- Premium Content Section -->
          <div class="lg:w-3/5 space-y-8">
            <div class="text-center lg:text-left">
              <h3 class="text-3xl md:text-5xl font-black text-white mb-4">
                <span class="text-primary-green">{{ founderInfo.sub }}</span> {{ founderInfo.name }}
              </h3>
              <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
                {{ founderInfo.info }}
              </p>
            </div>

            <!-- Premium Achievements -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-2xl font-bold text-primary-green mb-2">10+</div>
                <div class="text-sm text-gray-300">Years Experience</div>
              </div>
              <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-2xl font-bold text-primary-green mb-2">500+</div>
                <div class="text-sm text-gray-300">Clients Transformed</div>
              </div>
              <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-2xl font-bold text-primary-green mb-2">15+</div>
                <div class="text-sm text-gray-300">Certifications</div>
              </div>
            </div>

            <!-- Premium CTA -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="group relative px-8 py-4 bg-gradient-to-r from-primary-green to-green-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-green/25">
                <span class="relative z-10 flex items-center justify-center gap-2">
                  Read Full Story
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-primary-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button class="px-8 py-4 border-2 border-primary-green text-primary-green font-bold rounded-xl hover:bg-primary-green hover:text-white transition-all duration-300">
                View Certifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { founderInfo } from '@/data/constants'
</script>
