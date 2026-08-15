<template>
  <ResourceCrud resource="trainers" title="Trainers" item-noun="Trainer" :fields="fields" />
</template>

<script setup>
import ResourceCrud from '@/components/admin/ResourceCrud.vue'

const fields = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'title', label: 'Title', type: 'text', placeholder: 'e.g. Taekwondo & Fitness Trainer' },
  { key: 'rank', label: 'Rank', type: 'text', placeholder: 'e.g. 3rd Dan Black Belt' },
  { key: 'certifications', label: 'Certifications (one per line)', type: 'string-list' },
  { key: 'imageMediaId', label: 'Photo', type: 'media-image' },
  { key: 'isActive', label: 'Visible on site', type: 'boolean', default: true }
]
</script>
