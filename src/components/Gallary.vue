<template>
  <section id="gallery" class="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="inline-flex items-center gap-2 border border-primary-green text-primary-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-6">
          Gallery
        </span>
        <h2 class="text-4xl md:text-6xl font-black text-gray-900 font-anton leading-[1.05]">
          Our <span class="text-primary-green">Gallery</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
          Explore our state-of-the-art facilities and see the transformation stories of our members.
        </p>
      </div>

      <!-- Category Tabs -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id" :class="[
          'px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300',
          activeCategory === category.id
            ? 'bg-primary-green text-black'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-green hover:text-primary-green'
        ]">
          {{ category.name }}
        </button>
      </div>

      <!-- Premium Gallery Grid -->
      <div class="space-y-12">
        <!-- Gym Gallery -->
        <div v-if="gymCollection && (activeCategory === 'gym' || activeCategory === 'all')" class="space-y-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">GYM Gallery</h3>
            <p class="text-gray-600">State-of-the-art equipment and premium training spaces</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(item, index) in gymCollection.items" :key="item.id"
              class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img :src="item.mediaUrl" :alt="`Gym Image ${index + 1}`"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                @click="openLightbox(item.mediaUrl)" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
              <div
                class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 class="font-semibold text-lg">Premium Facility</h4>
                <p class="text-sm opacity-90">Click to view larger</p>
              </div>
            </div>
          </div>

          <div class="text-center mt-8">
            <router-link :to="`/gallery/${gymCollection.slug}`" class="site-btn-primary">
              View All Gym Photos
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
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
            <div v-for="collection in otherCollections" :key="collection.id"
              class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img :src="collection.items[0]?.mediaUrl" :alt="collection.title"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                @click="openLightbox(collection.items[0]?.mediaUrl)" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h4 class="text-xl font-bold mb-2">{{ collection.title }}</h4>
                <router-link :to="`/gallery/${collection.slug}`" class="inline-block">
                  <button class="px-4 py-2 bg-primary-green text-black text-sm font-semibold rounded-full hover:bg-light-green transition-colors duration-200">
                    View Gallery
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities Gallery -->
        <div v-if="activityCollection && (activeCategory === 'Activities' || activeCategory === 'all')" class="space-y-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{{ activityCollection.title }}</h3>
            <p class="text-gray-600">Behind the scenes of our special programs and events</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="item in activityCollection.items" :key="item.id"
              class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img :src="item.mediaUrl" :alt="activityCollection.title"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                @click="openLightbox(item.mediaUrl)" />
            </div>
          </div>
        </div>
      </div>
      <!-- CTA -->
      <div class="text-center mt-16">
        <div class="bg-primary-green rounded-2xl p-8 md:p-12">
          <h3 class="text-2xl md:text-4xl font-bold text-black mb-4">Ready to Join Our Community?</h3>
          <p class="text-black/70 text-lg mb-8">Experience our premium facilities and expert training firsthand.</p>
          <router-link to="/contact">
            <button class="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-colors duration-200">
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
        <img :src="selectedImage" alt="Gallery Image" class="max-w-full max-h-full object-contain rounded-lg" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useContentStore } from '@/stores/content'

const content = useContentStore()
const gymCollection = computed(() => content.galleryBySlug('gym-gallery'))
const activityCollection = computed(() => content.galleryBySlug('activity-gallery'))
const otherCollections = computed(() =>
  content.gallery.filter((g) => g.slug !== 'gym-gallery' && g.slug !== 'activity-gallery')
)

const activeCategory = ref('all')
const lightboxOpen = ref(false)
const selectedImage = ref('')

const categories = [
  { id: 'all', name: 'All Photos' },
  { id: 'gym', name: 'Gym Facilities' },
  { id: 'other', name: 'Events & Programs' },
  { id: 'Activities', name: 'Activities' }
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
