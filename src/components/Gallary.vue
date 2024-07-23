<template>
  <section id="gallary" class="bg-black p-5 md:p-16">
    <div class="flex flex-col justify-center place-items-center text-white">
      <h1 class="font-bebas tracking-wide text-6xl grid place-items-center mb-5">GYM Gallery</h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
        <img
          class="md:h-80 w-full object-cover border-2"
          v-for="image in galleryImages"
          :src="image"
          alt=""
          :key="image"
        />
      </div>
      <button class="px-10 py-1 rounded-lg bg-primary-red mt-16">See more</button>
    </div>
    <div class=" mt-16 flex flex-col justify-center place-items-center text-white">
        <h1 class="font-bebas tracking-wide text-6xl grid place-items-center mb-5">Other Gallery</h1>

    </div>
  </section>
</template>

<script setup>
import { galleryImages } from '@/data/constants'
</script>
