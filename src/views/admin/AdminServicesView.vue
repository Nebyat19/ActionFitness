<template>
  <ResourceCrud resource="services" title="Services" item-noun="Service" :fields="fields" />
</template>

<script setup>
import ResourceCrud from '@/components/admin/ResourceCrud.vue'

const fields = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'slug', label: 'Slug (used in the URL — auto-filled from the name, edit to customize)', type: 'text' },
  { key: 'shortDescription', label: 'Short description (shown on the homepage grid)', type: 'textarea' },
  { key: 'longDescription', label: 'Full description (shown on the service detail page)', type: 'textarea' },
  { key: 'benefits', label: 'Benefits (one per line)', type: 'string-list' },
  { key: 'imageMediaId', label: 'Photo', type: 'media-image' },
  { key: 'videoMediaId', label: 'Video (optional)', type: 'media-video' },
  { key: 'isActive', label: 'Visible on site', type: 'boolean', default: true }
]
</script>
