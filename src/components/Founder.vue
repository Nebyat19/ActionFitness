<template>
  <section id="founder"
    class="py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-green/20 to-transparent"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Premium Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-6 font-anton">
          Meet Our <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-light-green">Founder</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          The visionary behind Action Fitness, dedicated to transforming lives through premium fitness training.
        </p>
      </div>

      <!-- Premium Founder Card -->
      <div class="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12">
        <div class="flex flex-col lg:flex-row items-center gap-12">

          <!-- Premium Image Section -->
          <div class="lg:w-2/5">
            <div class="relative group">
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary-green to-light-green rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500">
              </div>
              <div
                class="relative bg-gray-900 rounded-2xl overflow-hidden transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500">
                <img class="w-full h-96 md:h-[500px] object-cover object-top" :src="founderInfo.image"
                  :alt="founderInfo.name" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <!-- Premium Badge -->
              <div
                class="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary-green to-light-green text-black px-6 py-3 rounded-full shadow-lg">
                <span class="font-bold text-sm">{{ founderInfo.title }}</span>
              </div>
            </div>
          </div>

          <!-- Premium Content Section -->
          <div class="lg:w-3/5 space-y-8">
            <div class="text-center lg:text-left">
              <h3 class="text-3xl md:text-5xl font-black text-white mb-4">
                <span class="text-primary-green">{{ founderInfo.sub }}</span> {{ founderInfo.name }}
              </h3>
              <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
                {{ founderInfo.info }}
              </p>
            </div>

            <!-- Premium Achievements -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-2xl font-bold text-primary-green mb-2">10+</div>
                <div class="text-sm text-gray-300">Years Experience</div>
              </div>
              <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-2xl font-bold text-primary-green mb-2">1000+</div>
                <div class="text-sm text-gray-300">Students Trained</div>
              </div>
              <div class="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-2xl font-bold text-primary-green mb-2">25+</div>
                <div class="text-sm text-gray-300">Certifications</div>
              </div>
            </div>

            <!-- Premium CTA -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="openStoryModal"
                class="group relative px-8 py-4 bg-gradient-to-r from-primary-green to-light-green text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-green/25 hover:scale-105">
                <span class="relative z-10 flex items-center justify-center gap-2">
                  Read Full Story
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </button>
              <button
                @click="openCertificationsModal"
                class="px-8 py-4 border-2 border-primary-red text-primary-red font-bold rounded-xl hover:bg-primary-red hover:text-white transition-all duration-300 hover:scale-105">
                View Certifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Story Modal -->
    <div 
      v-if="showStoryModal" 
      class="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      @click="closeStoryModal"
    >
      <div class="relative w-full max-w-6xl max-h-[95vh] overflow-auto">
        <!-- Close Button -->
        <button 
          @click="closeStoryModal"
          class="absolute -top-12 right-0 bg-primary-red hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Modal Content -->
        <div class="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-primary-green/30" @click.stop>
          
          <!-- Header Section -->
          <div class="relative bg-gradient-to-r from-primary-green via-light-green to-primary-green p-8 md:p-12">
            <div class="flex flex-col md:flex-row items-center gap-8">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-black shadow-2xl">
                <img :src="founderInfo.image" :alt="founderInfo.name" class="w-full h-full object-cover">
              </div>
              <div class="text-center md:text-left">
                <h2 class="text-4xl md:text-6xl font-black text-black mb-2">
                  Master Eskender Worku
                </h2>
                <p class="text-xl text-black/80 font-semibold">
                  Founder & Master Trainer | Addis Ababa, Ethiopia
                </p>
                <p class="text-black/70 mt-2">
                  (+251) 9 1053 1281
                </p>
              </div>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="p-8 md:p-12 space-y-12">
            
            <!-- Introduction -->
            <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-primary-green/20">
              <h3 class="text-3xl font-bold text-primary-green mb-6 flex items-center gap-3">
                <div class="w-2 h-8 bg-gradient-to-b from-primary-green to-light-green rounded-full"></div>
                About Master Eskender
              </h3>
              <p class="text-gray-300 text-lg leading-relaxed">
                I am pleased to present my comprehensive training expertise in Taekwondo, Kickboxing, and Fitness Activities. 
                My mission is to provide a detailed and transformative training experience that promotes physical fitness, 
                discipline, and personal growth among all students. The goal is to offer a well-rounded training experience 
                that builds not just physical strength, but mental resilience and character.
              </p>
            </div>

            <!-- Work Experience -->
            <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-accent-orange/20">
              <h3 class="text-3xl font-bold text-accent-orange mb-8 flex items-center gap-3">
                <div class="w-2 h-8 bg-gradient-to-b from-accent-orange to-accent-gold rounded-full"></div>
                Professional Experience
              </h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div v-for="(experience, index) in workExperience" :key="index" 
                     class="bg-black/30 rounded-xl p-6 border border-gray-700 hover:border-accent-orange/50 transition-colors duration-300">
                  <div class="flex items-start gap-4">
                    <div class="w-3 h-3 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 class="text-white font-semibold text-lg mb-2">{{ experience.title }}</h4>
                      <p class="text-gray-400 text-sm">{{ experience.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Key Achievements -->
            <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-primary-red/20">
              <h3 class="text-3xl font-bold text-primary-red mb-8 flex items-center gap-3">
                <div class="w-2 h-8 bg-gradient-to-b from-primary-red to-accent-orange rounded-full"></div>
                Key Achievements
              </h3>
              <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center bg-black/30 rounded-xl p-6 border border-gray-700">
                  <div class="text-4xl font-black text-primary-red mb-2">5th</div>
                  <div class="text-primary-red font-semibold mb-1">DAN Black Belt</div>
                  <div class="text-gray-400 text-sm">Certified Master from South Korea</div>
                </div>
                <div class="text-center bg-black/30 rounded-xl p-6 border border-gray-700">
                  <div class="text-4xl font-black text-accent-gold mb-2">10+</div>
                  <div class="text-accent-gold font-semibold mb-1">Years Teaching</div>
                  <div class="text-gray-400 text-sm">Taekwondo & Fitness Experience</div>
                </div>
                <div class="text-center bg-black/30 rounded-xl p-6 border border-gray-700">
                  <div class="text-4xl font-black text-light-green mb-2">25+</div>
                  <div class="text-light-green font-semibold mb-1">Certifications</div>
                  <div class="text-gray-400 text-sm">International & Local</div>
                </div>
              </div>
            </div>

            <!-- Education -->
            <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-accent-gold/20">
              <h3 class="text-3xl font-bold text-accent-gold mb-6 flex items-center gap-3">
                <div class="w-2 h-8 bg-gradient-to-b from-accent-gold to-accent-orange rounded-full"></div>
                Education & Qualifications
              </h3>
              <div class="space-y-4">
                <div class="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-gray-700">
                  <div class="w-2 h-2 bg-accent-gold rounded-full"></div>
                  <span class="text-gray-300">M.A Counseling Psychology (2nd year student) - AAU</span>
                </div>
                <div class="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-gray-700">
                  <div class="w-2 h-2 bg-accent-gold rounded-full"></div>
                  <span class="text-gray-300">BA Degree Accounting - Africa Beza University College</span>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center bg-gradient-to-r from-primary-green via-light-green to-primary-green rounded-2xl p-8">
              <h3 class="text-3xl font-bold text-black mb-4">Ready to Train with a Master?</h3>
              <p class="text-black/80 text-lg mb-6">Experience world-class training with over 10 years of expertise</p>
              <button class="bg-black text-primary-green font-bold py-4 px-8 rounded-full hover:bg-gray-900 transition-colors duration-300">
                Start Your Journey Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Certifications Modal -->
    <div 
      v-if="showCertificationsModal" 
      class="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      @click="closeCertificationsModal"
    >
      <div class="relative w-full max-w-5xl max-h-[95vh] overflow-auto">
        <!-- Close Button -->
        <button 
          @click="closeCertificationsModal"
          class="absolute -top-12 right-0 bg-primary-red hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Certifications Content -->
        <div class="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-primary-red/30" @click.stop>
          
          <!-- Header -->
          <div class="bg-gradient-to-r from-primary-red to-accent-orange p-8">
            <h2 class="text-4xl font-black text-white text-center">Professional Certifications</h2>
            <p class="text-white/80 text-center mt-2">International and Local Qualifications</p>
          </div>

          <!-- Certifications Grid -->
          <div class="p-8 space-y-6">
            <div v-for="(cert, index) in certifications" :key="index" 
                 class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-primary-red/50 transition-all duration-300">
              <div class="flex items-start gap-4">
                <div class="w-4 h-4 bg-primary-red rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h4 class="text-white font-bold text-lg mb-1">{{ cert.title }}</h4>
                  <p class="text-primary-red font-semibold mb-2">{{ cert.institution }}</p>
                  <p class="text-gray-400 text-sm">{{ cert.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { founderInfo } from '@/data/constants'
export default {
  name: 'FounderSection',
  data() {
    return {
      showStoryModal: false,
      showCertificationsModal: false,
      founderInfo,
      workExperience: [
        {
          title: 'Co-owner and Founder',
          description: 'Master Eskinder Taekwondo Club and Action Body Building and Fitness Center'
        },
        {
          title: 'Turkish Schools / Intellectual Schools',
          description: 'Over five years of martial arts and fitness instruction'
        },
        {
          title: 'Flipper International Schools',
          description: 'Over 6 years of continuous training programs'
        },
        {
          title: 'German Embassy Schools',
          description: 'Specialized training programs for embassy staff and families'
        },
        {
          title: 'Addis International Academy',
          description: 'Comprehensive fitness and martial arts curriculum'
        },
        {
          title: 'Head to Toe Early Learning Center',
          description: 'Youth fitness and development programs'
        },
        {
          title: 'Enat Alem Children Care Organization',
          description: 'Fitness programs for children in care'
        },
        {
          title: 'Iqra Academy / Elysian Academy',
          description: 'School-based fitness and martial arts programs'
        },
        {
          title: 'Personal Training',
          description: 'One-to-one home-to-home private coaching services'
        }
      ],
      certifications: [
        {
          title: '5th Degree DAN Black Belt',
          institution: 'World Taekwondo Headquarters (Kukkiwon), South Korea',
          description: 'Certified Master level qualification from the global headquarters of Taekwondo'
        },
        {
          title: 'Global Taekwondo Master Course',
          institution: 'Muju, South Korea',
          description: 'Advanced master-level training and certification program'
        },
        {
          title: 'Fitness Instructor Certificate',
          institution: 'London New Skills Academy',
          description: 'Professional fitness instruction and program design certification'
        },
        {
          title: 'Diploma in Sport Nutrition',
          institution: 'FAB Academy, California, USA',
          description: 'Comprehensive nutrition science and sports nutrition specialization'
        },
        {
          title: 'Diploma in Physical Fitness',
          institution: 'Alison, Ireland',
          description: 'Physical fitness principles and exercise science qualification'
        },
        {
          title: 'CrossFit Workout Programming',
          institution: 'CF Education, USA',
          description: 'Advanced CrossFit methodology and program design certification'
        },
        {
          title: 'Certified Personal Trainer',
          institution: 'FIT Thailand',
          description: 'International personal training certification and methodology'
        },
        {
          title: 'Muaythai Thai Boxing Course',
          institution: 'Bangkok, Thailand',
          description: 'Traditional Thai boxing techniques and training methods'
        },
        {
          title: 'Health and Fitness Trainer (Level 1 & 2)',
          institution: 'A.A Sport Commission',
          description: 'Local certification for health and fitness instruction'
        },
        {
          title: 'Body Building and Weight Lifting Coach',
          institution: 'A.A Sport Commission',
          description: 'Specialized certification in bodybuilding and strength training'
        },
        {
          title: 'World Taekwondo Referee Course',
          institution: 'Ethiopian World Taekwondo Federation',
          description: 'Official referee certification for international competitions'
        },
        {
          title: 'Zumba Instructor Course',
          institution: 'ZIN (Zumba Instructor Network)',
          description: 'Certified Zumba fitness instruction and choreography'
        },
        {
          title: 'First Aid Course',
          institution: 'A.A World Taekwondo Federation',
          description: 'Emergency response and first aid certification for sports environments'
        },
        {
          title: 'Tabata, TRX and Functional Training',
          institution: 'Udemy',
          description: 'Specialized high-intensity and functional training methodologies'
        }
      ]
    }
  },
  methods: {
    openStoryModal() {
      this.showStoryModal = true
      document.body.style.overflow = 'hidden'
    },
    closeStoryModal() {
      this.showStoryModal = false
      document.body.style.overflow = 'auto'
    },
    openCertificationsModal() {
      this.showCertificationsModal = true
      document.body.style.overflow = 'hidden'
    },
    closeCertificationsModal() {
      this.showCertificationsModal = false
      document.body.style.overflow = 'auto'
    }
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>

