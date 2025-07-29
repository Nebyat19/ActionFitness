<template>
  <section id="follow-us" class="py-20 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-green/30 to-transparent"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Premium Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-anton">
          Follow Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-green-600">Journey</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Stay connected with our community and get inspired by daily fitness tips, transformation stories, and behind-the-scenes content.
        </p>
      </div>

      <!-- Premium Social Media Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        <!-- TikTok Card -->
        <div class="group relative bg-gradient-to-br from-primary-green to-green-600 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">TikTok</h3>
            <p class="text-white/80 mb-4">@action_fitness_a.a</p>
            <p class="text-sm text-white/70 mb-6">Daily fitness tips and transformation videos</p>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener" 
               class="inline-block px-6 py-3 bg-white text-primary-green font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300">
              Follow Us
            </a>
          </div>
        </div>

        <!-- Instagram Card -->
        <div class="group relative bg-gradient-to-br from-primary-green to-green-600 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Instagram</h3>
            <p class="text-white/80 mb-4">@action_fitness</p>
            <p class="text-sm text-white/70 mb-6">Behind-the-scenes and member spotlights</p>
            <a href="https://www.instagram.com" target="_blank" rel="noopener" 
               class="inline-block px-6 py-3 bg-white text-primary-green font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300">
              Follow Us
            </a>
          </div>
        </div>

        <!-- Facebook Card -->
        <div class="group relative bg-gradient-to-br from-primary-green to-green-600 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Facebook</h3>
            <p class="text-white/80 mb-4">Action Fitness</p>
            <p class="text-sm text-white/70 mb-6">Community updates and events</p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener" 
               class="inline-block px-6 py-3 bg-white text-primary-green font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300">
              Follow Us
            </a>
          </div>
        </div>
      </div>

      <!-- Premium CTA Section -->
      <div class="text-center">
        <div class="bg-gradient-to-r from-primary-green to-green-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 class="text-2xl md:text-4xl font-bold mb-4">Join Our Community</h3>
          <p class="text-lg mb-8 opacity-90">Get daily motivation, fitness tips, and exclusive content from our expert trainers.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://www.tiktok.com" target="_blank" rel="noopener" 
               class="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200">
              Follow on TikTok
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener" 
               class="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary-green transition-all duration-200">
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>