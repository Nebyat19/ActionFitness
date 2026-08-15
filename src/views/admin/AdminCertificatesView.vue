<template>
  <ResourceCrud resource="certificates" title="Certificates" item-noun="Certificate" :fields="fields" />
</template>

<script setup>
import ResourceCrud from '@/components/admin/ResourceCrud.vue'

const fields = [{ key: 'imageMediaId', label: 'Certificate image', type: 'media-image', required: true }]
</script>
