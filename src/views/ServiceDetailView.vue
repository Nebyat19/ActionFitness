<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 pt-36">
    <div class="max-w-5xl mx-auto mt-10">
      
      <!-- Enhanced Service Card -->
      <div class="bg-gradient-to-br from-gray-900 to-black shadow-2xl rounded-3xl overflow-hidden border border-gray-800">
        
        <!-- Hero Image Section -->
        <div class="relative h-80 md:h-96 overflow-hidden">
          <img
            :src="service.image || '/placeholder.svg?height=400&width=800&text=Service+Image'"
            :alt="service.name"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <!-- Service Title Overlay -->
          <div class="absolute bottom-8 left-8 right-8">
            <div class="bg-primary-green text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider inline-block mb-4">
              Premium Service
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-white leading-tight">
              {{ service.name }}
            </h1>
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-8 md:p-12">

          <!-- Service Description -->
          <div class="mb-12">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-1 h-12 bg-primary-green rounded-full"></div>
              <h2 class="text-2xl font-bold text-white">About This Service</h2>
            </div>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ service.description }}
            </p>
          </div>

          <!-- Benefits Section -->
          <div v-if="service.benefits && service.benefits.length" class="mb-12">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-1 h-12 bg-primary-green rounded-full"></div>
              <h2 class="text-2xl font-bold text-white">
                Benefits of Our {{ service.name }} Program
              </h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div
                v-for="benefit in service.benefits"
                :key="benefit"
                class="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-primary-green/50 transition-all duration-300 group"
              >
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p class="text-gray-300 font-medium leading-relaxed">{{ benefit }}</p>
                </div>
              </div>
            </div>
          </div>

          

          <!-- Action Fitness Logo -->
          <div class="flex justify-center mt-12">
            <div class="bg-black p-4 rounded-full">
              <img
                class="h-16 w-auto"
                :src="ACTION_FITNESS_IMAGE"
                alt="Action Fitness"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div class="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
          <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Flexible Schedule</h4>
          <p class="text-gray-400 text-sm">Train at times that work for you</p>
        </div>

        <div class="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
          <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Certified Trainers</h4>
          <p class="text-gray-400 text-sm">Expert guidance from professionals</p>
        </div>

        <div class="bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
          <div class="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Proven Results</h4>
          <p class="text-gray-400 text-sm">Achieve your fitness goals faster</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ACTION_FITNESS_IMAGE from '@/assets/images/logos/ActionFitnessBgRemoved.png'
import { useContentStore } from '@/stores/content'

defineProps({
  name: String
})

const router = useRouter()
const route = useRoute()
const content = useContentStore()

const found = computed(() => content.serviceBySlug(route.params.name))
const service = computed(() =>
  found.value
    ? {
        name: found.value.name,
        description: found.value.longDescription || found.value.shortDescription,
        benefits: found.value.benefits,
        image: found.value.imageUrl
      }
    : {}
)

// Real slug-backed lookup — redirects to the list page for an unknown/
// removed slug instead of the old hardcoded allow-list. watchEffect (rather
// than onBeforeMount) so navigating directly between two service detail
// pages re-checks too, since Vue Router reuses this component instance.
watchEffect(() => {
  if (content.loaded && !found.value) {
    router.replace('/services')
  }
})
</script>

<style scoped>
.text-primary-green { color: #93b902; }
.bg-primary-green { background-color: #93b902; }
.border-primary-green { border-color: #93b902; }
.hover\:bg-primary-green\/90:hover { background-color: rgba(147, 185, 2, 0.9); }
.hover\:border-primary-green\/50:hover { border-color: rgba(147, 185, 2, 0.5); }
.hover\:text-primary-green:hover { color: #93b902; }
.shadow-primary-green\/25 { box-shadow: 0 25px 50px -12px rgba(147, 185, 2, 0.25); }
</style>