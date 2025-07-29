<template>
  <div class="mb-10 text-center">
    <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 font-anton">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-lg md:text-xl text-primary-green font-medium">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script> 