<template>
  <section id="about-us" class="bg-gradient-to-br from-black via-gray-900 to-black w-full py-20 px-6 relative overflow-hidden">
    <!-- Subtle Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-32 left-20 w-36 h-36 bg-primary-green/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-32 right-20 w-28 h-28 bg-white/5 rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto relative z-10">
      <!-- Clean Header -->
      <div class="text-center mb-16">
        <div class="inline-block mb-6">
          <span class="bg-primary-green text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
            About Us
          </span>
        </div>
        <h1 class="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
          Welcome to 
          <span class="text-primary-green text-md">
            Action Fitness
          </span>
        </h1>
        <p class="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
          Where your health and fitness journey begins. Located in Addis Ababa, Ethiopia, we offer a
          range of services designed to meet your individual needs and help you achieve your personal
          fitness goals.
        </p>
      </div>

      <!-- Content Section -->
      <div class="flex flex-col lg:flex-row justify-between items-center gap-12 mt-16">
        
        <!-- Video Section -->
        <div class="w-full lg:w-1/2">
          <div class="relative group">
            <div class="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500">
              <video
                class="w-full h-80 md:h-96 object-cover"
                :src="sampleVideo_2"
                loop
                controls
                :poster="GALLERY_IMAGE_10"  
                preload="metadata"            
                muted                        
              ></video>
            </div>
          </div>
        </div>

        <!-- Mission Section -->
        <div class="w-full lg:w-1/2">
          <div class="bg-gray-800/30 rounded-2xl p-8 md:p-10 border border-gray-700">
            
            <!-- Mission Header -->
            <div class="mb-8">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-1 h-12 bg-primary-green rounded-full"></div>
                <h2 class="text-3xl font-bold text-white">Our Mission</h2>
              </div>
            </div>

            <!-- Mission Content -->
            <div class="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Our dedicated team of professional trainers and nutritional consultants are here to
                support and guide you every step of the way.
              </p>
              
            
            </div>

          
          </div>
        </div>
      </div>

      <!-- Simple Values Section -->
      <div class="mt-20">
        <div class="text-center mb-12">
          <h3 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Action Fitness?
          </h3>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Professional Team -->
          <div class="bg-gray-800/30 rounded-xl p-8 border border-gray-700 text-center group hover:bg-gray-800/50 transition-all duration-300">
            <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-4">Professional Team</h4>
            <p class="text-gray-400 leading-relaxed">Certified trainers and nutritional consultants with years of experience</p>
          </div>

          <!-- Personalized Programs -->
          <div class="bg-gray-800/30 rounded-xl p-8 border border-gray-700 text-center group hover:bg-gray-800/50 transition-all duration-300">
            <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-4">Personalized Programs</h4>
            <p class="text-gray-400 leading-relaxed">Customized fitness and nutrition plans tailored to your individual goals</p>
          </div>

          <!-- Holistic Approach -->
          <div class="bg-gray-800/30 rounded-xl p-8 border border-gray-700 text-center group hover:bg-gray-800/50 transition-all duration-300">
            <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-4">Holistic Approach</h4>
            <p class="text-gray-400 leading-relaxed">Combining physical training, mental well-being, and nutritional guidance</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { sampleVideo_2, GALLERY_IMAGE_10 } from '@/data/constants'
</script>

