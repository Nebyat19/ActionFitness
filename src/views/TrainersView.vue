<template>
  <div class="bg-black min-h-screen ">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-black via-gray-900 to-black text-white h-96 flex flex-col justify-center items-center overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-32 h-32 bg-primary-green/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-primary-red/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="relative z-10 text-center mt-60">
        <div class="inline-block mb-6">
          <span class="bg-gradient-to-r from-primary-red to-accent-orange text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
            Our Team
          </span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black mb-6 font-anton">
          Meet Our 
          <span class="bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
            Expert Trainers
          </span>
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-primary-green to-light-green mx-auto rounded-full"></div>
        <p class="text-gray-300 text-xl mt-6 max-w-3xl mx-auto">
          World-class certified professionals dedicated to your fitness journey
        </p>
      </div>
    </div>

    <!-- Trainers Grid -->
    <div class="py-20 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div 
            v-for="(trainer, index) in trainersInfo" 
            :key="trainer.name"
            class="group cursor-pointer transform transition-all duration-500 hover:scale-105"
            :style="{ animationDelay: `${index * 200}ms` }"
            @click="openTrainerModal(trainer, index)"
          >
            <!-- Enhanced Trainer Card -->
            <div class="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 hover:border-primary-green/50 transition-all duration-500">
              
              <!-- Trainer Image -->
              <div class="relative h-96 overflow-hidden">
                <img 
                  :src="trainer.image" 
                  :alt="trainer.name"
                  class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <!-- Rank Badge -->
                <div class="absolute top-4 right-4">
                  <div class="bg-gradient-to-r from-accent-gold to-accent-orange text-black px-3 py-1 rounded-full text-sm font-black uppercase tracking-wide shadow-lg">
                    {{ trainer.rank }}
                  </div>
                </div>

                <!-- Hover Info -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div class="bg-primary-green/90 text-black p-4 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Trainer Info -->
              <div class="p-8">
                <h2 class="text-3xl font-bold text-white mb-2 group-hover:text-primary-green transition-colors duration-300">
                  {{ trainer.name }}
                </h2>
                <p class="text-primary-green font-semibold text-lg mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                  {{ trainer.title }}
                </p>
                
                <!-- Key Certifications Preview -->
                <div class="space-y-2 mb-6">
                  <div v-for="cert in trainer.certifications.slice(0, 2)" :key="cert" 
                       class="flex items-center gap-2 text-gray-400 text-sm">
                    <div class="w-2 h-2 bg-primary-red rounded-full"></div>
                    <span>{{ cert }}</span>
                  </div>
                  <div v-if="trainer.certifications.length > 2" class="text-accent-orange text-sm font-semibold">
                    +{{ trainer.certifications.length - 2 }} more certifications
                  </div>
                </div>

                <!-- View Details Button -->
                <button class="w-full bg-gradient-to-r from-primary-green to-light-green text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-primary-green/25 transition-all duration-300 group-hover:scale-105">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="py-20 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <div class="relative bg-gradient-to-r from-primary-red via-accent-orange to-accent-gold rounded-3xl p-1">
          <div class="bg-black rounded-3xl p-12 md:p-16">
            <h3 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Train with the
              <br>
              <span class="bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
                BEST TEAM
              </span>
            </h3>
            <p class="text-gray-300 text-xl mb-10 max-w-3xl mx-auto">
              Our certified trainers bring years of international experience and expertise to help you achieve your fitness goals.
            </p>
            <button class="bg-gradient-to-r from-primary-green to-light-green text-black font-black py-5 px-10 rounded-full text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-green/30">
              Start Training Today
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Trainer Detail Modal -->
    <div 
      v-if="selectedTrainer !== null" 
      class="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-2 md:p-4 backdrop-blur-sm"
      @click="closeTrainerModal"
    >
      <div class="relative w-full max-w-5xl max-h-[95vh] overflow-auto">
        <!-- Modal Content -->
        <div class="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-primary-green/30" @click.stop>
          
          <!-- Mobile Close Button -->
          <div class="md:hidden sticky top-0 z-30 bg-gradient-to-r from-primary-green to-light-green p-4 flex justify-between items-center">
            <h2 class="text-xl font-bold text-black">{{ trainersInfo[selectedTrainer].name }}</h2>
            <button 
              @click="closeTrainerModal"
              class="bg-black/20 hover:bg-black/40 text-black p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Desktop Close Button -->
          <button 
            @click="closeTrainerModal"
            class="hidden md:block absolute -top-12 right-0 bg-primary-red hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-lg"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Header Section -->
          <div class="hidden md:block relative bg-gradient-to-r from-primary-green via-light-green to-primary-green p-8 md:p-12">
            <div class="flex flex-col md:flex-row items-center gap-8">
              <div class="w-40 h-40 rounded-full overflow-hidden border-4 border-black shadow-2xl">
                <img :src="trainersInfo[selectedTrainer].image" :alt="trainersInfo[selectedTrainer].name" class="w-full h-full object-cover object-top">
              </div>
              <div class="text-center md:text-left">
                <h2 class="text-4xl md:text-6xl font-black text-black mb-2">
                  {{ trainersInfo[selectedTrainer].name }}
                </h2>
                <p class="text-2xl text-black/80 font-bold mb-2">
                  {{ trainersInfo[selectedTrainer].title }}
                </p>
                <p class="text-lg text-black/70 font-semibold">
                  {{ trainersInfo[selectedTrainer].rank }}
                </p>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-4 md:p-8 lg:p-12">
            <!-- Certifications -->
            <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-4 md:p-6 lg:p-8 border border-primary-green/20">
              <h3 class="text-3xl font-bold text-primary-green mb-8 flex items-center gap-3">
                <div class="w-2 h-8 bg-gradient-to-b from-primary-green to-light-green rounded-full"></div>
                Professional Certifications
              </h3>
              <div class="space-y-4">
                <div v-for="(cert, index) in trainersInfo[selectedTrainer].certifications" :key="index" 
                     class="bg-black/30 rounded-xl p-6 border border-gray-700 hover:border-primary-green/50 transition-colors duration-300">
                  <div class="flex items-start gap-4">
                    <div class="w-3 h-3 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                    <p class="text-gray-300 leading-relaxed">{{ cert }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="mt-8 text-center bg-gradient-to-r from-primary-red to-accent-orange rounded-2xl p-4 md:p-6 lg:p-8">
              <h3 class="text-3xl font-bold text-white mb-4">Ready to Train?</h3>
              <p class="text-white/80 text-lg mb-6">Experience professional training with certified expertise</p>
              <button class="bg-white text-primary-red font-bold  px-8 rounded-full hover:bg-gray-100 transition-colors duration-300">
                <a href="tel:+251910531281"> <p>Give us a call</p>
                <div class="text-black text-sm m-2">
                  <p>(+251)9 1053 1281</p>
             
                </div>
              </a>

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Fitness Logo Section -->
    <div class="relative bg-gradient-to-br from-gray-900 to-black py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <img class="w-full h-full object-cover" :src="HERO_IMAGE" alt="" />
      </div>
      <div class="relative z-10 flex justify-center items-center">
        <div class="bg-gradient-to-r from-black to-gray-900 p-8 rounded-full shadow-2xl border-4 border-black">
          <img class="h-32 w-auto" :src="ACTION_FITNESS_IMAGE" alt="Action Fitness">
        </div>
      </div>
    </div>

    <ContactUs />
  </div>
</template>

<script>
import ContactUs from '@/components/ContactUs.vue'
import  { HERO_IMAGE, trainersInfo, ACTION_FITNESS_IMAGE} from '@/data/constants'


export default {
  name: 'TrainersPage',
  components: {
    ContactUs
  },
  data() {
    return {
      selectedTrainer: null,
      trainersInfo,
      HERO_IMAGE,
      ACTION_FITNESS_IMAGE
    }
  },
  methods: {
    openTrainerModal(trainer, index) {
      this.selectedTrainer = index
      document.body.style.overflow = 'hidden'
    },
    closeTrainerModal() {
      this.selectedTrainer = null
      document.body.style.overflow = 'auto'
    }
  },
  mounted() {
    // Staggered animation for trainer cards
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

<style scoped>
/* Custom brand colors */
.text-primary-red { color: #ef212f; }
.text-primary-green { color: #93b902; }
.text-accent-orange { color: #c7621e; }
.text-accent-gold { color: #af8b10; }
.text-light-green { color: #c7fc00; }

.bg-primary-red { background-color: #ef212f; }
.bg-primary-green { background-color: #93b902; }
.bg-accent-orange { background-color: #c7621e; }
.bg-accent-gold { background-color: #af8b10; }
.bg-light-green { background-color: #c7fc00; }

.border-primary-green { border-color: #93b902; }
.border-primary-red { border-color: #ef212f; }
</style>