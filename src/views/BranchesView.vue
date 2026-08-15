<template>
  <div class="bg-black min-h-screen">
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-28 md:py-36 px-6 text-center overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-32 h-32 bg-primary-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-primary-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div class="relative z-10">
        <div class="inline-block mb-6">
          <span class="bg-gradient-to-r from-primary-green to-light-green text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
            Find Us
          </span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black mb-6 font-anton leading-tight">
          Our <span class="bg-gradient-to-r from-primary-green to-light-green bg-clip-text text-transparent">Locations</span>
        </h1>
        <p class="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Train wherever's convenient — every Action Fitness location, one page away.
        </p>
      </div>
    </section>

    <!-- Branch cards -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div v-if="content.branches.length" class="grid gap-8 md:grid-cols-2">
        <div
          v-for="branch in content.branches"
          :key="branch.id"
          class="group bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 hover:border-primary-green/50 p-8 transition-all duration-500 hover:-translate-y-1"
        >
          <h2 class="text-2xl font-bold text-white mb-6 group-hover:text-primary-green transition-colors duration-300">
            {{ branch.name }}
          </h2>

          <div class="space-y-5">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="min-w-0">
                <p class="text-gray-300 leading-relaxed">{{ branch.address }}</p>
                <a
                  :href="directionsUrl(branch.address)"
                  target="_blank"
                  rel="noopener"
                  class="inline-block mt-1 text-sm text-primary-green hover:text-light-green font-semibold transition-colors"
                >
                  Get directions →
                </a>
              </div>
            </div>

            <div v-if="branch.phone" class="flex items-center gap-4">
              <div class="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a :href="`tel:${branch.phone}`" class="text-gray-300 hover:text-primary-green font-semibold transition-colors">
                {{ branch.phone }}
              </a>
            </div>

            <div v-if="branch.openingHours" class="flex items-center gap-4">
              <div class="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-gray-300">{{ branch.openingHours }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <p class="text-gray-400 text-lg">No locations listed yet — check back soon.</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-5xl mx-auto px-6 pb-24">
      <div class="bg-gradient-to-r from-primary-green via-light-green to-primary-green rounded-3xl p-10 md:p-14 text-center">
        <h3 class="text-3xl md:text-4xl font-black text-black mb-4">Ready to Train with Us?</h3>
        <p class="text-black/80 text-lg mb-8">Reach out and we'll help you find the best fit for your schedule.</p>
        <router-link to="/contact">
          <button class="bg-black text-primary-green font-bold py-4 px-8 rounded-full hover:bg-gray-900 transition-colors duration-300">
            Contact Us
          </button>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useContentStore } from '@/stores/content'
const content = useContentStore()

function directionsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}
</script>
