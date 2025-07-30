<template>
    <section class="py-20 bg-black relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-32 h-32 bg-primary-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-primary-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-light-green/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
  
      <div class="container mx-auto px-4 relative z-10">
        <!-- Enhanced Section Header -->
        <div class="text-center mb-16">
          <div class="inline-block mb-6">
            <span class="bg-gradient-to-r from-primary-red to-accent-orange text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              Real Results
            </span>
          </div>
          <h2 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span class="bg-gradient-to-r from-light-green via-primary-green to-primary-red bg-clip-text text-transparent">
              EPIC
            </span>
            <br>
            <span class="text-white">Transformations</span>
          </h2>
          <p class="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
            Watch real people achieve extraordinary results. These aren't just transformations – they're 
            <span class="text-primary-green font-semibold">life-changing journeys</span> that prove anything is possible.
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
            <!-- Enhanced Video Container -->
            <div class="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary-green/20 transition-all duration-500 border border-gray-800 hover:border-primary-green/50">
              
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
  
                <!-- Animated Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500">
                  <div class="relative">
                    <!-- Pulsing Ring -->
                    <div class="absolute inset-0 bg-primary-green rounded-full animate-ping opacity-30"></div>
                    <div class="absolute inset-0 bg-primary-green rounded-full animate-pulse opacity-50"></div>
                    
                    <!-- Play Button -->
                    <div class="relative bg-gradient-to-r from-primary-green to-light-green rounded-full p-6 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <svg class="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
  
                <!-- Premium Info Overlay -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <div class="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 v-if="video.title" class="text-white font-bold text-lg mb-2 leading-tight">
                      {{ video.title }}
                    </h3>
                    <p class="text-gray-300 text-sm mb-3">
                      {{ video.description || `Transformation Story ${index + 1}` }}
                    </p>
                    
                    <!-- Stats Badge -->
                    <div v-if="video.stats" class="flex flex-wrap gap-2">
                      <span class="bg-primary-red/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {{ video.stats }}
                      </span>
                    </div>
                  </div>
                </div>
  
                <!-- Success Badge with Animation -->
                <div class="absolute top-4 right-4">
                  <div class="relative">
                    <div class="absolute inset-0 bg-accent-gold rounded-full animate-ping opacity-40"></div>
                    <div class="relative bg-gradient-to-r from-accent-gold to-accent-orange text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide shadow-lg">
                      Success
                    </div>
                  </div>
                </div>
  
                <!-- Video Number -->
                <div class="absolute top-4 left-4 bg-black/70 text-primary-green border border-primary-green/50 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Enhanced Call to Action -->
        <div class="text-center">
          <div class="relative bg-gradient-to-r from-primary-red via-accent-orange to-accent-gold rounded-3xl p-1 max-w-5xl mx-auto">
            <div class="bg-black rounded-3xl p-12 md:p-16">
              <div class="mb-8">
                <div class="inline-block bg-gradient-to-r from-light-green to-primary-green text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                  Your Turn
                </div>
                <h3 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Ready to Become a
                  <br>
                  <span class="bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
                    SUCCESS STORY?
                  </span>
                </h3>
                <p class="text-gray-300 text-xl mb-10 max-w-3xl mx-auto">
                  Join these incredible transformations and write your own success story. 
                  Your journey to greatness starts with a single decision.
                </p>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button class="group relative bg-gradient-to-r from-primary-green to-light-green text-black font-black py-5 px-10 rounded-full text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-green/30">
                  <span class="relative z-10">Start Your Transformation</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-light-green to-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
             
              </div>
            </div>
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
  import {transformation1, transformation2, transformation3, transformation4, transformation5} from '@/data/constants'
  export default {
    name: 'PremiumTransformationVideos',
    data() {
      return {
        videos: [
            {
        src:transformation1,
        title: 'Incredible Results',
        description: 'From struggle to strength - witness this amazing fitness journey'
      },
      {
        src: transformation2, 
        title: 'Body Transformation',
        description: 'Real dedication leads to real results - see the proof'
      },
      {
        src: transformation3,
        title: 'Success Story', 
        description: 'Hard work pays off - watch this inspiring transformation'
      },
      {
        src:transformation4,
        title: 'Fitness Journey',
        description: 'Commitment and consistency create incredible changes'
      },
      {
        src:transformation5,
        title: 'Life Changed',
        description: 'More than just physical - a complete lifestyle transformation'
      }
        ],
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