<template>
  <section class="py-20 bg-black relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="site-eyebrow mb-6">Fat Loss Success</span>
        <h2 class="site-heading mb-6">
          Weight Loss <span class="text-primary-green">Champions</span>
        </h2>
        <p class="site-subtext text-xl max-w-3xl mx-auto">
          Witness incredible fat loss transformations that prove sustainable weight loss is possible.
        </p>
      </div>

      <!-- Weight Loss Transformations Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-16">
        <div
          v-for="(transformation, index) in transformations"
          :key="index"
          class="site-card-hover group cursor-pointer overflow-hidden"
          @click="openModal(transformation, index)"
        >
          <div class="aspect-[4/3] relative overflow-hidden">
            <img
              :src="transformation.image"
              :alt="transformation.description || `Weight loss transformation ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div class="bg-primary-green/90 text-black p-4 rounded-full">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="p-6">
            <p class="text-gray-300 text-sm leading-relaxed">
              {{ transformation.description || 'Incredible fat loss transformation through dedicated training and nutrition' }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <div class="site-card max-w-4xl mx-auto p-12 md:p-16">
          <span class="site-eyebrow mb-6">Your Fat Loss Journey</span>
          <h3 class="text-3xl md:text-5xl font-anton text-white mb-6 leading-tight">
            Ready to
            <span class="block bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
              Lose the Weight?
            </span>
          </h3>
          <p class="site-subtext text-lg max-w-2xl mx-auto mb-10">
            These transformations started with a single decision. Make yours today and join our weight loss success stories.
          </p>
          <router-link to="/contact">
            <button class="site-btn-primary text-base px-10 py-4">Start Losing Weight Now</button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Full Screen Image Modal -->
    <div v-if="selectedTransformation !== null"
      class="fixed inset-0 bg-black/98 flex items-center justify-center z-50 p-4 backdrop-blur-sm" @click="closeModal">
      <div class="relative max-w-6xl max-h-[95vh] w-full">
        <!-- Enhanced Close Button -->
        <button @click="closeModal"
          class="absolute -top-16 right-0 bg-primary-red hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Navigation Buttons -->
        <button v-if="selectedTransformation > 0" @click.stop="previousImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-green/90 hover:bg-primary-green text-black p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button v-if="selectedTransformation < transformations.length - 1" @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-green/90 hover:bg-primary-green text-black p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Large Image Container -->
        <div class="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          <img :src="transformations[selectedTransformation].image"
            :alt="transformations[selectedTransformation].description || `Weight loss transformation ${selectedTransformation + 1}`"
            class="w-full h-auto max-h-[80vh] object-contain" @click.stop />

          <!-- Image Info -->
          <div class="p-8 bg-gray-900">
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ transformations[selectedTransformation].description || 'Incredible fat loss transformation through dedicated training and nutrition' }}
            </p>
          </div>
        </div>

        <!-- Image Counter -->
        <div class="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-primary-green text-black px-6 py-3 rounded-full font-bold shadow-lg">
          {{ selectedTransformation + 1 }} of {{ transformations.length }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useContentStore } from '@/stores/content'
export default {
  name: 'WeightLossSection',
  computed: {
    transformations() {
      return useContentStore().transformationImages.map((t) => ({
        image: t.imageUrl,
        description: t.description
      }))
    }
  },
  data() {
    return {
      selectedTransformation: null
    }
  },
  methods: {
    openModal(transformation, index) {
      this.selectedTransformation = index
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.selectedTransformation = null
      document.body.style.overflow = 'auto'
    },
    nextImage() {
      if (this.selectedTransformation < this.transformations.length - 1) {
        this.selectedTransformation++
      }
    },
    previousImage() {
      if (this.selectedTransformation > 0) {
        this.selectedTransformation--
      }
    }
  },
  mounted() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.selectedTransformation !== null) {
        if (e.key === 'Escape') this.closeModal()
        if (e.key === 'ArrowRight') this.nextImage()
        if (e.key === 'ArrowLeft') this.previousImage()
      }
    })

    // Staggered animation
    const cards = document.querySelectorAll('.group')
    cards.forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(50px)'
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 200)
    })
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>