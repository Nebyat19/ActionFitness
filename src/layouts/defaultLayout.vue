<template>
  <div v-if="content.loading && !content.loaded" class="min-h-screen grid place-items-center bg-black">
    <div class="text-white text-lg font-poppins">Loading…</div>
  </div>

  <div v-else-if="content.error" class="min-h-screen grid place-items-center bg-black text-center px-4">
    <div>
      <p class="text-white text-lg mb-4">Couldn't load the site right now.</p>
      <button class="px-4 py-2 bg-primary-green text-black rounded" @click="content.fetchContent()">
        Retry
      </button>
    </div>
  </div>

  <template v-else>
    <div class="fixed z-50 w-full shadow-lg">
      <TopBanner />
      <TopHeader />
    </div>

    <RouterView />

    <Footer />
  </template>
</template>
<script setup>
import { onMounted } from 'vue'
import TopBanner from '../components/TopBanner.vue'
import TopHeader from '../components/TopHeader.vue'
import Footer from '../components/Footer.vue'
import { useContentStore } from '@/stores/content'

const content = useContentStore()
onMounted(() => content.fetchContent())
</script>
