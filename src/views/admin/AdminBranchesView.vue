<template>
  <ResourceCrud resource="branches" title="Branches" item-noun="Branch" :fields="fields" />
</template>

<script setup>
import ResourceCrud from '@/components/admin/ResourceCrud.vue'

const fields = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'slug', label: 'Slug (used in the URL — auto-filled from the name, edit to customize)', type: 'text' },
  { key: 'address', label: 'Address', type: 'textarea', required: true },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'openingHours', label: 'Opening hours', type: 'text', placeholder: 'Mo-Sa 05:00-21:00, Su 05:00-12:00' },
  { key: 'imageMediaId', label: 'Photo', type: 'media-image' },
  {
    key: 'isPrimary',
    label: 'Primary branch (its address/phone/hours show in the header, footer, and contact page)',
    type: 'boolean',
    default: false
  },
  { key: 'isActive', label: 'Visible on site', type: 'boolean', default: true }
]
</script>
