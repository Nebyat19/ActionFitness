<template>
  <ResourceCrud resource="transformations" title="Transformations" item-noun="Transformation" :fields="fields" />
</template>

<script setup>
import ResourceCrud from '@/components/admin/ResourceCrud.vue'

const fields = [
  { key: 'title', label: 'Title (optional)', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'imageMediaId', label: 'Before/after photo', type: 'media-image' },
  { key: 'videoMediaId', label: 'Video', type: 'media-video' }
]
</script>
