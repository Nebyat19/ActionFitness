<template>
  <section class="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-32 right-20 w-36 h-36 bg-primary-red/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        class="absolute bottom-32 left-20 w-28 h-28 bg-accent-orange/10 rounded-full blur-2xl animate-pulse delay-700">
      </div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-block mb-6">
          <span
            class="bg-gradient-to-r from-primary-red to-accent-orange text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
            Fat Loss Success
          </span>
        </div>
        <h2 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          <span
            class="bg-gradient-to-r from-primary-red via-accent-orange to-accent-gold bg-clip-text text-transparent">
            WEIGHT LOSS
          </span>
          <br>
          <span class="text-white">Champions</span>
        </h2>
        <p class="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
          Witness incredible fat loss transformations. These
          <span class="text-primary-red font-semibold">before & after</span> results prove that sustainable weight loss
          is possible.
        </p>
      </div>

      <!-- Weight Loss Transformations Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-16">
        <div v-for="(transformation, index) in transformations" :key="index"
          class="group cursor-pointer transform transition-all duration-500 hover:scale-105"
          @click="openModal(transformation, index)" :style="{ animationDelay: `${index * 200}ms` }">
          <!-- Enhanced Transformation Container -->
          <div
            class="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary-red/20 transition-all duration-500 border border-gray-700 hover:border-primary-red/50">

            <!-- Before/After Image Container -->
            <div class="aspect-[4/3] relative overflow-hidden">
              <img :src="transformation.image || `/placeholder.svg?height=400&width=600&text=Before+After+${index + 1}`"
                :alt="transformation.title || `Weight loss transformation ${index + 1}`"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div
                    class="bg-primary-red/90 text-white p-4 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Before/After Labels -->
              <div
                class="absolute top-4 left-4 bg-gray-800/90 text-white px-3 py-1 rounded-full text-sm font-bold border border-gray-600">
                {{ index !== 1 ? "BEFORE" : "AFTER" }}
              </div>
              <div class="absolute top-4 right-4 bg-primary-red/90 text-white px-3 py-1 rounded-full text-sm font-bold">
                {{ index !== 1 ? "AFTER" : "BEFORE" }}
              </div>

              <!-- Results Badge -->
              <div class="absolute bottom-4 left-4">
                <div
                  class="bg-gradient-to-r from-accent-gold to-accent-orange text-black px-4 py-2 rounded-full text-sm font-black uppercase tracking-wide shadow-lg">
                  {{ transformation?.result }}
                </div>
              </div>

              <!-- Transformation Number -->
              <div
                class="absolute bottom-4 right-4 bg-black/70 text-primary-red border border-primary-red/50 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                {{ index + 1 }}
              </div>
            </div>

            <!-- Info Section -->
            <div class="p-6 bg-gradient-to-r from-gray-800 to-gray-900">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-primary-red transition-colors duration-300">
                {{ transformation?.title }}
              </h3>
              <p class="text-gray-300 text-sm leading-relaxed">
                {{ transformation?.description || 'Incredible fat loss transformation through dedicated training and nutrition' }}
              </p>

              <!-- Stats Row -->
              <div class="mt-4 flex justify-between items-center">
                <div class="text-primary-red font-bold text-lg">
                  {{ transformation?.weightLoss }}
                </div>
                <div class="text-accent-gold text-sm font-semibold">
                  {{ transformation?.timeframe }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Call to Action -->
      <div class="text-center">
        <div
          class="relative bg-gradient-to-r from-primary-red via-accent-orange to-accent-gold rounded-3xl p-1 max-w-5xl mx-auto">
          <div class="bg-black rounded-3xl p-12 md:p-16">
            <div class="mb-8">
              <div
                class="inline-block bg-gradient-to-r from-primary-red to-accent-orange text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                Your Fat Loss Journey
              </div>
              <h3 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Ready to
                <br>
                <span class="bg-gradient-to-r from-primary-red to-accent-gold bg-clip-text text-transparent">
                  LOSE THE WEIGHT?
                </span>
              </h3>
              <p class="text-gray-300 text-xl mb-10 max-w-3xl mx-auto">
                These transformations started with a single decision. Make yours today and join our
                <span class="text-primary-red font-semibold">weight loss success stories</span>.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                class="group relative bg-gradient-to-r from-primary-red to-accent-orange text-white font-black py-5 px-10 rounded-full text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-red/30">
                <span class="relative z-10">Start Losing Weight Now</span>
              </button>


            </div>
          </div>
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
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-red/90 hover:bg-primary-red text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button v-if="selectedTransformation < transformations.length - 1" @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-red/90 hover:bg-primary-red text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Large Image Container -->
        <div
          class="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-primary-red/30">
          <img :src="transformations[selectedTransformation].image"
            :alt="transformations[selectedTransformation].title || `Weight loss transformation ${selectedTransformation + 1}`"
            class="w-full h-auto max-h-[80vh] object-contain" @click.stop />

          <!-- Enhanced Image Info -->
          <div class="p-8 bg-gradient-to-r from-gray-900 to-black">

            <p class="text-gray-300 text-lg leading-relaxed mb-4">
              {{ transformations[selectedTransformation].description || 'Incredible fat loss transformation through dedicated training and nutrition' }}
            </p>
            <div class="flex gap-4">


            </div>
          </div>
        </div>

        <!-- Image Counter -->
        <div
          class="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-red to-accent-orange text-white px-6 py-3 rounded-full font-bold shadow-lg">
          {{ selectedTransformation + 1 }} of {{ transformations.length }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { transformationImage1, transformationImage2, transformationImage3 } from '@/data/constants'
export default {
  name: 'WeightLossSection',
  data() {
    return {
      transformations: [
        {
          image: transformationImage1, // Your before/after image

          description: 'Amazing weight loss journey with sustainable results and improved health',

        },
        {
          image: transformationImage2,

          description: 'Complete lifestyle transformation through proper nutrition and training',

        },
        {
          image: transformationImage3,

          description: 'Dramatic fat loss while maintaining muscle mass and gaining confidence',

        }
      ],
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