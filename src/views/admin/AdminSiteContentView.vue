<template>
  <div>
    <h1 class="text-xl sm:text-2xl font-semibold text-admin-ink mb-1">Site Text</h1>
    <p class="text-admin-muted mb-6 max-w-2xl">
      Gym contact info and the founder's core bio. Page headlines, button wording, and other design-baked
      copy elsewhere on the site aren't editable here yet — those still require a code change.
    </p>
    <div class="flex flex-col gap-6 max-w-2xl">
      <SiteContentBlock
        content-key="gym_info"
        title="Gym info (email, phone list, socials — address/hours are set per-branch under Branches)"
        :fields="gymInfoFields"
      />
      <SiteContentBlock content-key="founder" title="Founder bio (used on the homepage founder section)" :fields="founderFields" />
    </div>
  </div>
</template>

<script setup>
// Field keys here define the shape of each site_content JSON block, and must
// match what src/stores/content.js / the public components read (Phase 5).
import SiteContentBlock from '@/components/admin/SiteContentBlock.vue'

const gymInfoFields = [
  { key: 'name', label: 'Gym name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phones', label: 'All phone numbers (one per line)', type: 'string-list' },
  { key: 'info', label: 'Short blurb (footer/contact)', type: 'textarea' },
  { key: 'facebook', label: 'Facebook URL', type: 'text' },
  { key: 'instagram', label: 'Instagram URL', type: 'text' },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'tiktok', label: 'TikTok URL', type: 'text' }
]

const founderFields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'sub', label: 'Sub-title (e.g. "Master")', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'info', label: 'Bio paragraph', type: 'textarea' },
  { key: 'imageMediaId', label: 'Photo', type: 'media-image' }
]
</script>
