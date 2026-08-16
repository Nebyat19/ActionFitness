<template>
  <section id="services" class="py-20 px-6 bg-black relative overflow-hidden">
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Services Header -->
      <div class="text-center mb-16">
        <span class="site-eyebrow mb-6">What We Offer</span>
        <h2 class="site-heading mb-6">
          Premium
          <span class="bg-gradient-to-r from-primary-green via-light-green to-primary-green bg-clip-text text-transparent">
            Services
          </span>
        </h2>
        <p class="site-subtext text-xl max-w-3xl mx-auto">
          Discover our comprehensive range of premium fitness services designed to transform your body, mind, and spirit.
        </p>
      </div>

      <!-- Enhanced Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="service.name"
          class="site-card-hover group overflow-hidden hover:-translate-y-1 transition-transform duration-300"
        >
          <!-- Service Image -->
          <div class="relative h-56 overflow-hidden">
            <img
              v-if="service.image"
              :src="service.image"
              :alt="service.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-primary-green to-light-green flex items-center justify-center"
            >
              <img class="w-16 h-16 opacity-80" :src="ACTION_FITNESS_IMAGE" :alt="service.name" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div class="absolute top-4 right-4 bg-black/70 border border-white/10 text-primary-green w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm">
              {{ String(index + 1).padStart(2, '0') }}
            </div>
          </div>

          <!-- Service Content -->
          <div class="p-8">
            <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary-green transition-colors duration-300 leading-tight">
              {{ service.name }}
            </h3>
            <p class="text-gray-400 mb-6 leading-relaxed">
              {{ service.description }}
            </p>
            <router-link :to="service.path" class="site-btn-primary w-full">
              Learn More
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-20">
        <div class="site-card max-w-4xl mx-auto p-12 md:p-16">
          <span class="site-eyebrow mb-6">Get Started Today</span>
          <h3 class="text-3xl md:text-5xl font-anton text-white mb-6 leading-tight">
            Ready to Start Your
            <span class="block bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">
              Transformation?
            </span>
          </h3>
          <p class="site-subtext text-lg max-w-2xl mx-auto">
            Join thousands of members who have already achieved their fitness goals with Action Fitness.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ACTION_FITNESS_IMAGE from '@/assets/images/logos/ActionFitnessBgRemoved.png'
import { useContentStore } from '@/stores/content'

const content = useContentStore()
const services = computed(() =>
  content.services.map((s) => ({
    name: s.name,
    description: s.shortDescription,
    image: s.imageUrl,
    path: `/services/${s.slug}`
  }))
)
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