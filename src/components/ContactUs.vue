<template>
  <section id="contact-us" class="py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-green/20 to-transparent"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Premium Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-6 font-anton">
          Get In <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-green-400">Touch</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Ready to start your fitness journey? Contact us today and let's discuss how we can help you achieve your goals.
        </p>
      </div>

      <!-- Premium Contact Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- Premium Contact Information -->
        <div class="space-y-8">
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h3 class="text-2xl md:text-3xl font-bold text-white mb-8">Contact Information</h3>
            
            <div class="space-y-6">
              <!-- Location -->
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-green to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-white mb-2">Location</h4>
                  <p class="text-gray-300 leading-relaxed">{{ gymInformation.location }}</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-green to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-white mb-2">Email</h4>
                  <a :href="`mailto:${gymInformation.email}`" class="text-primary-green hover:text-green-400 transition-colors duration-200">
                    {{ gymInformation.email }}
                  </a>
                </div>
              </div>

              <!-- Phone Numbers -->
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-green to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-white mb-2">Phone Numbers</h4>
                  <div class="space-y-2">
                    <a v-for="phone in gymInformation.phones" :key="phone" 
                       :href="`tel:${phone}`" 
                       class="block text-primary-green hover:text-green-400 transition-colors duration-200">
                      {{ phone }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Opening Hours -->
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-green to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-white mb-2">Opening Hours</h4>
                  <p class="text-gray-300">{{ gymInformation.openingHours }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Premium Contact Form -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-8">Send Us a Message</h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-white font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  v-model="form.name"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-green focus:bg-white/20 transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label class="block text-white font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  v-model="form.email"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-green focus:bg-white/20 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label class="block text-white font-semibold mb-2">Phone</label>
              <input 
                type="tel" 
                v-model="form.phone"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-green focus:bg-white/20 transition-all duration-300"
                placeholder="Your Phone Number"
              />
            </div>
            
            <div>
              <label class="block text-white font-semibold mb-2">Message</label>
              <textarea 
                v-model="form.message"
                rows="4"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-green focus:bg-white/20 transition-all duration-300 resize-none"
                placeholder="Tell us about your fitness goals..."
                required
              ></textarea>
            </div>
            
            <button type="submit" class="group relative w-full px-8 py-4 bg-gradient-to-r from-primary-green to-green-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-green/25">
              <span class="relative z-10 flex items-center justify-center gap-2">
                Send Message
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-primary-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>
      </div>

      <!-- Premium CTA Section -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-primary-green to-green-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 class="text-2xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p class="text-lg mb-8 opacity-90">Book your free consultation today and take the first step towards your fitness goals.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-8 py-4 bg-white text-primary-green font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Book Free Consultation
            </button>
            <button class="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary-green transition-all duration-200">
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gymInformation } from '@/data/constants'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
}
</script>

