<template>
    <section class="py-20 bg-black relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="site-eyebrow mb-6">Real Results</span>
          <h2 class="site-heading mb-6">
            <span class="bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
              Epic
            </span>
            Transformations
          </h2>
          <p class="site-subtext text-xl max-w-3xl mx-auto">
            Watch real people achieve extraordinary results — life-changing journeys that prove anything is possible.
          </p>
        </div>
  
        <!-- Premium Video Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto mb-16">
          <div 
            v-for="(video, index) in videos" 
            :key="index"
            class="group cursor-pointer transform transition-all duration-500 hover:scale-105"
            @click="openModal(video, index)"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <!-- Video Container -->
            <div class="site-card-hover overflow-hidden">

              <!-- Video Element -->
              <div class="aspect-[9/16] relative overflow-hidden">
                <video 
                  :ref="`video-${index}`"
                  :src="video.src || `/placeholder.svg?height=600&width=400&text=Video+${index + 1}`"
                  :poster="video.thumbnail"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  muted
                  loop
                  preload="metadata"
                  @mouseenter="playPreview(index)"
                  @mouseleave="pausePreview(index)"
                >
                  Your browser does not support the video tag.
                </video>
  
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all duration-500">
                  <div class="bg-primary-green rounded-full p-5 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-7 h-7 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                <!-- Info Overlay -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <h3 v-if="video.title" class="text-white font-bold text-lg leading-tight">
                    {{ video.title }}
                  </h3>
                  <p class="text-gray-300 text-sm mt-1">
                    {{ video.description || `Transformation Story ${index + 1}` }}
                  </p>
                </div>

                <!-- Video Number -->
                <div class="absolute top-4 left-4 bg-black/70 text-primary-green border border-white/10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- CTA -->
        <div class="text-center">
          <div class="site-card max-w-4xl mx-auto p-12 md:p-16">
            <span class="site-eyebrow mb-6">Your Turn</span>
            <h3 class="text-3xl md:text-5xl font-anton text-white mb-6 leading-tight">
              Ready to Become a
              <span class="block bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
                Success Story?
              </span>
            </h3>
            <p class="site-subtext text-lg max-w-2xl mx-auto mb-10">
              Join these incredible transformations and write your own success story. Your journey to greatness
              starts with a single decision.
            </p>
            <router-link to="/contact">
              <button class="site-btn-primary text-base px-10 py-4">Start Your Transformation</button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Premium Full Screen Video Modal -->
      <div 
        v-if="selectedVideo !== null" 
        class="fixed inset-0 bg-black/98 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        @click="closeModal"
      >
        <div class="relative w-full max-w-lg max-h-[95vh]">
          <!-- Enhanced Close Button -->
          <button 
            @click="closeModal"
            class="absolute -top-4 right-0 bg-primary-red hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-lg"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
  
          <!-- Enhanced Navigation Buttons -->
          <button 
            v-if="selectedVideo > 0"
            @click.stop="previousVideo"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-green/90 hover:bg-primary-green text-black p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-xl"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
  
          <button 
            v-if="selectedVideo < videos.length - 1"
            @click.stop="nextVideo"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-green/90 hover:bg-primary-green text-black p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-xl"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
  
          <!-- Premium Video Container -->
          <div class="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-primary-green/30">
            <div class="aspect-[9/16] relative">
              <video 
                :src="videos[selectedVideo].src"
                :poster="videos[selectedVideo].thumbnail"
                controls
                autoplay
                class="w-full h-full object-cover"
                @click.stop
              >
                Your browser does not support the video tag.
              </video>
            </div>
  
            <!-- Enhanced Video Info -->
            <div v-if="videos[selectedVideo].title || videos[selectedVideo].description" class="p-8 bg-gradient-to-r from-gray-900 to-black">
              <h3 v-if="videos[selectedVideo].title" class="text-2xl font-bold text-white mb-3">
                {{ videos[selectedVideo].title }}
              </h3>
              <p v-if="videos[selectedVideo].description" class="text-gray-300 text-lg leading-relaxed mb-4">
                {{ videos[selectedVideo].description }}
              </p>
              <div v-if="videos[selectedVideo].stats" class="inline-block bg-gradient-to-r from-primary-red to-accent-orange text-white px-4 py-2 rounded-full text-sm font-bold">
                {{ videos[selectedVideo].stats }}
              </div>
            </div>
          </div>
  
          <!-- Enhanced Video Counter -->
          <div class="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-green to-light-green text-black px-6 py-3 rounded-full font-bold shadow-lg">
            {{ selectedVideo + 1 }} of {{ videos.length }}
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { useContentStore } from '@/stores/content'
  export default {
    name: 'PremiumTransformationVideos',
    computed: {
      videos() {
        return useContentStore().transformationVideos.map((t) => ({
          src: t.videoUrl,
          title: t.title,
          description: t.description
        }))
      }
    },
    data() {
      return {
        selectedVideo: null
      }
    },
    methods: {
      openModal(video, index) {
        this.selectedVideo = index
        document.body.style.overflow = 'hidden'
      },
      closeModal() {
        this.selectedVideo = null
        document.body.style.overflow = 'auto'
      },
      nextVideo() {
        if (this.selectedVideo < this.videos.length - 1) {
          this.selectedVideo++
        }
      },
      previousVideo() {
        if (this.selectedVideo > 0) {
          this.selectedVideo--
        }
      },
      playPreview(index) {
        const video = this.$refs[`video-${index}`]?.[0]
        if (video) {
          video.play().catch(() => {
            // Handle autoplay restrictions
          })
        }
      },
      pausePreview(index) {
        const video = this.$refs[`video-${index}`]?.[0]
        if (video) {
          video.pause()
          video.currentTime = 0
        }
      }
    },
    mounted() {
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (this.selectedVideo !== null) {
          if (e.key === 'Escape') this.closeModal()
          if (e.key === 'ArrowRight') this.nextVideo()
          if (e.key === 'ArrowLeft') this.previousVideo()
        }
      })
  
      // Add staggered animation to video cards
      const cards = document.querySelectorAll('.group')
      cards.forEach((card, index) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(50px)'
        setTimeout(() => {
          card.style.transition = 'all 0.6s ease'
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        }, index * 150)
      })
    },
    beforeUnmount() {
      document.body.style.overflow = 'auto'
    }
  }
  </script>
  
  <style scoped>
  /* Custom Tailwind classes for your brand colors */
  .bg-primary-red { background-color: #ef212f; }
  .bg-primary-green { background-color: #93b902; }
  .bg-accent-orange { background-color: #c7621e; }
  .bg-accent-gold { background-color: #af8b10; }
  .bg-light-green { background-color: #c7fc00; }
  
  .text-primary-red { color: #ef212f; }
  .text-primary-green { color: #93b902; }
  .text-accent-orange { color: #c7621e; }
  .text-accent-gold { color: #af8b10; }
  .text-light-green { color: #c7fc00; }
  
  .border-primary-red { border-color: #ef212f; }
  .border-primary-green { border-color: #93b902; }
  
  .shadow-primary-green\/20 { box-shadow: 0 25px 50px -12px rgba(147, 185, 2, 0.2); }
  .shadow-primary-green\/30 { box-shadow: 0 25px 50px -12px rgba(147, 185, 2, 0.3); }
  
  /* Custom animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
  }
  </style>