<template>
  <div class="fixed z-50 w-full shadow-lg">
    <TopBanner />
    <TopHeader />
  </div>

  <RouterView />

  <Footer />
</template>
<script setup>
import TopBanner from '../components/TopBanner.vue'
import TopHeader from '../components/TopHeader.vue'
import Footer from '../components/Footer.vue'
</script>
