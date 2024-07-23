<template>
  <section id="gallary" class="bg-black pt-10 border-t p-5 md:p-16">
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
      <router-link to="/gallery/gymGallery">
        <button class="px-10 py-1 rounded-lg bg-primary-red mt-16">See more</button></router-link
      >
    </div>
    <div class="mt-16 flex flex-col justify-center place-items-center text-white">
      <h1 class="font-bebas tracking-wide text-6xl grid place-items-center mb-5">Other Gallery</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div class="relative" v-for="image in otherGalleryImages" :key="image">
          <div class="absolute w-full h-full bg-black opacity-50"></div>
          <img class="md:h-80 w-full object-cover border-2" :src="image.image" :alt="image.title" />
          <span
            class="grid place-content-center font-bebas text-3xl text-center text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >{{ image.title }}
            <router-link  class="px-3 py-1 text-sm mt-5 bg-primary-green rounded-full block" :to="image.path">
              <button >
                see more
              </button>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { galleryImages, otherGalleryImages } from '@/data/constants'
</script>
