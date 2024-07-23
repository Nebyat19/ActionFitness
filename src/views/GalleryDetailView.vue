<template>
  <main id="home">
    <div class="w-full bg-black py-24 text-black relative grid place-items-center">
      <div class="flex flex-col justify-center place-items-center text-black">
        <h1 class="font-bebas tracking-wide text-6xl grid place-items-center mb-5 mt-16">
          GYM Gallery
        </h1>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <img
            class="md:h-80 bg-black border-gray-600 p-3 w-full object-cover border-2"
            v-for="image in galleryImages"
            :src="image"
            alt=""
            :key="image"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { gymGallary } from '@/data/constants'
const galleryImages = ref([])
const gallaryNames = [
  'gymGallery',
  'afterSchoolGallery',
  'boxingGallery',
  'TaekwondoClubGallery',
  'WTPARTNERSHIPGallery'
]
const gallary = {
  gymGallery: gymGallary
}

defineProps({
  name: String
})

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
  const name = route.params.name
  if (!gallaryNames.includes(name)) {
    router.push('/')
  } else {
    galleryImages.value = gallary[name]
  }
})
</script>
