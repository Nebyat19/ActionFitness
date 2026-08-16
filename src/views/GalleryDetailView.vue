<template>
  <main class="bg-black min-h-screen pt-32 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      <button
        @click="router.back()"
        class="text-sm text-gray-400 hover:text-primary-green transition-colors inline-flex items-center gap-1 mb-8"
      >
        &larr; Back
      </button>

      <div class="text-center mb-12">
        <h1 class="font-anton text-3xl md:text-5xl text-white tracking-wide">
          {{ gallery.head }}
        </h1>
        <p v-if="gallery.desc" class="text-gray-400 max-w-2xl mx-auto mt-4">
          {{ gallery.desc }}
        </p>
      </div>

      <div ref="imageModal" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="image in gallery.images"
          :key="image"
          class="group relative aspect-square rounded-xl overflow-hidden border border-gray-800 hover:border-primary-green/50 transition-colors"
          @click="openModal(image)"
        >
          <img :src="image" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </button>
      </div>

      <FullScreenImageModal v-if="isModalOpen" :isOpen="isModalOpen" :imageSrc="selectedImage" @close="isModalOpen = false" />
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
