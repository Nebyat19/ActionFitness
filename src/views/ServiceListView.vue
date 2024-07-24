<template>
  <main id="home">
    <div class="w-full bg-black p-5 pt-32 relative grid place-items-center">
      <Services />
      <ContactUs/>
    </div>
  </main>
</template>
<script setup>
import Services from '@/components/Services.vue'
import ContactUs from '@/components/ContactUs.vue';
</script>
