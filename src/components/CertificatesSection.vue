<template>
    <section id="Certifications" class="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-green/20 to-transparent"></div>
        </div>
      <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span class="text-primary-green">Certifications</span>
          </h2>
          <p class="text-gray-300 text-lg">
            Scroll to view all certifications →
          </p>
        </div>
  
        <!-- Horizontal Scroll Container -->
        <div class="overflow-x-auto scrollbar-hide">
          <div class="flex gap-6 pb-4" style="width: max-content;">
            <div 
              v-for="(certificate, index) in certificates" 
              :key="index"
              class="flex-shrink-0 cursor-pointer group"
              @click="openModal(certificate, index)"
            >
              <div class="w-80 h-96 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <img 
                  :src="certificate" 
                  :alt="`Certificate ${index + 1}`"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Scroll Hint -->
        <div class="text-center mt-6">
          <p class="text-gray-500 text-sm">click any certificate to view larger</p>
        </div>
      </div>
  
      <!-- Simple Modal -->
      <div 
        v-if="selectedCertificate !== null" 
        class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        @click="closeModal"
      >
        <div class="relative max-w-4xl max-h-[90vh]">
          <button 
            @click="closeModal"
            class="absolute -top-12 right-0 text-white hover:text-green-400"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <img 
            :src="certificates[selectedCertificate]" 
            :alt="`Certificate ${selectedCertificate + 1}`"
            class="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            @click.stop
          />
        </div>
      </div>
    </section>
  </template>
  
  <script>
import { certificate1,certificates11, certificate10, certificate2, certificate3, certificate4, certificate5, certificate6, certificate7, certificate8, certificate9, certificate12, certificate13, certificate14, certificate15, certificate16, certificate17, certificate18, certificate19, certificate20, certificate21, certificate22, certificate23, certificate24 } from '@/data/constants'

  export default {
    name: 'CertificateScroll',
    data() {
      return {
        certificates: [
          // Your certificate image paths here
         certificate1,
         certificate2,
         certificate3,
         certificate4,
         certificate5,
         certificate10,
         certificate6,
         certificate7,
         certificate8,
         certificates11,
         certificate9,
         certificate12, certificate13, certificate14, certificate15, certificate16, certificate17, certificate18, certificate19, certificate20, certificate21, certificate22, certificate23, certificate24
        
          // ... more certificates
        ],
        selectedCertificate: null
      }
    },
    methods: {
      openModal(certificate, index) {
        this.selectedCertificate = index
        document.body.style.overflow = 'hidden'
      },
      closeModal() {
        this.selectedCertificate = null
        document.body.style.overflow = 'auto'
      }
    }
  }
  </script>
  
  <style scoped>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  </style>