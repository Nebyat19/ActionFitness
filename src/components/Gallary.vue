<template>
  <section id="gallery" class="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl mx-auto">
      <!-- Premium Gallery Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-anton">
          Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-green-600">Gallery</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our state-of-the-art facilities and see the transformation stories of our members.
        </p>
      </div>

      <!-- Premium Category Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="activeCategory = category.id"
          :class="[
            'px-6 py-3 rounded-full font-semibold transition-all duration-300',
            activeCategory === category.id 
              ? 'bg-gradient-to-r from-primary-green to-green-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-primary-green hover:text-primary-green'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Premium Gallery Grid -->
      <div class="space-y-12">
        <!-- Gym Gallery -->
        <div v-if="activeCategory === 'gym' || activeCategory === 'all'" class="space-y-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">GYM Gallery</h3>
            <p class="text-gray-600">State-of-the-art equipment and premium training spaces</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(image, index) in galleryImages" :key="index" 
                 class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img 
                :src="image" 
                :alt="`Gym Image ${index + 1}`"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                @click="openLightbox(image)"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 class="font-semibold text-lg">Premium Facility</h4>
                <p class="text-sm opacity-90">Click to view larger</p>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-8">
            <router-link to="/gallery/gymGallery">
              <button class="group relative px-8 py-4 bg-gradient-to-r from-primary-green to-green-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-green/25">
                <span class="relative z-10 flex items-center justify-center gap-2">
                  View All Gym Photos
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-primary-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </router-link>
          </div>
        </div>

        <!-- Other Gallery -->
        <div v-if="activeCategory === 'other' || activeCategory === 'all'" class="space-y-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Special Events & Programs</h3>
            <p class="text-gray-600">Behind the scenes of our special programs and events</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="item in otherGalleryImages" :key="item.title" 
                 class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img 
                :src="item.image" 
                :alt="item.title"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                @click="openLightbox(item.image)"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h4 class="text-xl font-bold mb-2">{{ item.title }}</h4>
                <router-link :to="item.path" class="inline-block">
                  <button class="px-4 py-2 bg-primary-green text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200">
                    View Gallery
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Premium CTA Section -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-primary-green to-green-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 class="text-2xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p class="text-lg mb-8 opacity-90">Experience our premium facilities and expert training firsthand.</p>
          <router-link to="/contact">
            <button class="px-8 py-4 bg-white text-primary-green font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Schedule a Tour
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Premium Lightbox Modal -->
    <div v-if="lightboxOpen" @click="closeLightbox" 
         class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div class="relative max-w-4xl max-h-full">
        <button @click="closeLightbox" 
                class="absolute -top-12 right-0 text-white text-4xl hover:text-primary-green transition-colors duration-200">
          ×
        </button>
        <img :src="selectedImage" alt="Gallery Image" 
             class="max-w-full max-h-full object-contain rounded-lg" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { galleryImages, otherGalleryImages } from '@/data/constants'

const activeCategory = ref('all')
const lightboxOpen = ref(false)
const selectedImage = ref('')

const categories = [
  { id: 'all', name: 'All Photos' },
  { id: 'gym', name: 'Gym Facilities' },
  { id: 'other', name: 'Events & Programs' }
]

const openLightbox = (image) => {
  selectedImage.value = image
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  selectedImage.value = ''
}
</script>
