<template>
  <div>
    <h1 class="text-xl sm:text-2xl font-semibold text-admin-ink mb-1">Site Images</h1>
    <p class="text-admin-muted mb-6 max-w-2xl">
      Hero/background images used behind page headers. Leave a field empty to keep the site's built-in default
      image.
    </p>
    <div class="flex flex-col gap-6 max-w-2xl">
      <SiteContentBlock content-key="site_images" title="Page heroes" :fields="heroFields" />
    </div>
  </div>
</template>

<script setup>
// Field keys here define the shape of the site_content.site_images JSON
// block, and must match what api/content.js resolves (*MediaId -> *Url) and
// what src/stores/content.js / the public views read (Phase 5 pattern, same
// as AdminSiteContentView.vue's gym_info/founder blocks).
import SiteContentBlock from '@/components/admin/SiteContentBlock.vue'

const heroFields = [
  { key: 'homeHeroMediaId', label: 'Home page hero background', type: 'media-image' },
  { key: 'trainersHeroMediaId', label: 'Trainers page hero background', type: 'media-image' }
]
</script>
