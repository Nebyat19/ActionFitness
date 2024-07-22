<template>
  <TopBanner />
  <TopHeader />


    <RouterView />


 <Footer />
 
</template>
<script setup>
import TopBanner from '../components/TopBanner.vue'
import TopHeader from '../components/TopHeader.vue'
import Footer from '../components/Footer.vue'
</script>
