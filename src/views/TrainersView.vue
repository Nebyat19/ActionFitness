<template>
  <div class="bg-black min-h-screen ">
    <!-- Hero -->
    <div class="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-32 md:py-40 flex flex-col justify-center items-center text-center px-6">
      <span class="site-eyebrow mb-6">Our Team</span>
      <h1 class="site-heading mb-6">
        Meet Our
        <span class="bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
          Expert Trainers
        </span>
      </h1>
      <p class="site-subtext text-lg md:text-xl max-w-2xl">
        World-class certified professionals dedicated to your fitness journey
      </p>
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
            <!-- Trainer Card -->
            <div class="site-card-hover overflow-hidden">

              <!-- Trainer Image -->
              <div class="relative h-96 overflow-hidden">
                <img
                  :src="trainer.image"
                  :alt="trainer.name"
                  class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <!-- Rank Badge -->
                <div class="absolute top-4 right-4">
                  <div class="bg-black/70 border border-white/10 text-primary-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
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
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                  {{ trainer.title }}
                </p>

                <!-- Key Certifications Preview -->
                <div class="space-y-2 mb-6">
                  <div v-for="cert in trainer.certifications.slice(0, 2)" :key="cert"
                       class="flex items-center gap-2 text-gray-400 text-sm">
                    <div class="w-1.5 h-1.5 bg-primary-green rounded-full shrink-0"></div>
                    <span>{{ cert }}</span>
                  </div>
                  <div v-if="trainer.certifications.length > 2" class="text-primary-green text-sm font-semibold">
                    +{{ trainer.certifications.length - 2 }} more certifications
                  </div>
                </div>

                <button class="site-btn-primary w-full">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="py-20 px-4">
      <div class="max-w-5xl mx-auto text-center site-card p-12 md:p-16">
        <h3 class="text-3xl md:text-5xl font-anton text-white mb-6 leading-tight">
          Train with the
          <span class="block bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
            Best Team
          </span>
        </h3>
        <p class="site-subtext text-lg max-w-2xl mx-auto mb-10">
          Our certified trainers bring years of international experience and expertise to help you achieve your fitness goals.
        </p>
        <router-link to="/contact">
          <button class="site-btn-primary text-base px-10 py-4">Start Training Today</button>
        </router-link>
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
            <div class="mt-8 text-center bg-primary-green rounded-2xl p-6 md:p-8">
              <h3 class="text-3xl font-bold text-black mb-2">Ready to Train?</h3>
              <p class="text-black/70 mb-6">Experience professional training with certified expertise</p>
              <a :href="`tel:${gymPhone}`" class="inline-block bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-900 transition-colors duration-300">
                Give us a call — {{ gymPhone }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="relative bg-black py-16 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <img class="w-full h-full object-cover" :src="HERO_IMAGE" alt="" />
      </div>
      <div class="relative z-10 flex justify-center items-center">
        <div class="bg-black p-6 rounded-full border border-gray-800">
          <img class="h-24 w-auto" :src="ACTION_FITNESS_IMAGE" alt="Action Fitness">
        </div>
      </div>
    </div>

    <ContactUs />
  </div>
</template>

<script>
import ContactUs from '@/components/ContactUs.vue'
import HERO_IMAGE from '@/assets/images/heroImage-3.jpg'
import ACTION_FITNESS_IMAGE from '@/assets/images/logos/ActionFitnessBgRemoved.png'
import { useContentStore } from '@/stores/content'

export default {
  name: 'TrainersPage',
  components: {
    ContactUs
  },
  computed: {
    trainersInfo() {
      return useContentStore().trainers.map((t) => ({
        name: t.name,
        image: t.imageUrl,
        title: t.title,
        rank: t.rank,
        certifications: t.certifications
      }))
    },
    gymPhone() {
      return useContentStore().gymInfo.phone
    }
  },
  data() {
    return {
      selectedTrainer: null,
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