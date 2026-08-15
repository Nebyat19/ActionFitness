<template>
  <main id="home">
    <div class="w-full bg-black py-24 text-black relative grid place-items-center">
      <h1 class="mt-24"></h1>
      <div class="flex flex-col justify-center place-items-center text-black">
        <h1 class="font-bebas mb-3 text-white tracking-wide text-3xl text-center md:text-6xl grid place-items-center">
          {{ gallery.head }}
        </h1>
        <div ref="imageModal" class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <img class="md:h-80 bg-black border-gray-600 p-3 w-full object-cover border-2" v-for="image in gallery.images"
            :src="image" :alt="image" :key="image" @click="openModal(image)" />
        </div>

        <FullScreenImageModal v-if="isModalOpen" :isOpen="isModalOpen" :imageSrc="selectedImage"
          @close="isModalOpen = false" />
      </div>
      <div class="text-white mx-5 flex flex-col" v-show="gallery.desc">
        <p>
          {{ gallery.desc }}
        </p>
      </div>
      <button @click="router.back()" class="mx-16 px-5 mt-10 py-2 bg-primary-green text-white rounded-xl">
        Go Back
      </button>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FullScreenImageModal from '@/components/FullScreenImageModal.vue'
import { onClickOutside } from '@vueuse/core'
import { useContentStore } from '@/stores/content'

const imageModal = ref(null)

onClickOutside(imageModal, () => {
  isModalOpen.value = false
})
const isModalOpen = ref(false)
const selectedImage = ref('')
const openModal = (image) => {
  selectedImage.value = image
  isModalOpen.value = true
}

defineProps({
  name: String
})

const router = useRouter()
const route = useRoute()
const content = useContentStore()

const found = computed(() => content.galleryBySlug(route.params.name))
const gallery = computed(() =>
  found.value
    ? { head: found.value.title, images: found.value.items.map((i) => i.mediaUrl), desc: found.value.description }
    : {}
)

// Real slug-backed lookup — replaces the old hardcoded allow-list + object.
watchEffect(() => {
  if (content.loaded && !found.value) {
    router.push('/')
  }
})
</script>
