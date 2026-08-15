<template>
  <ResourceCrud resource="branches" title="Branches" item-noun="Branch" :fields="fields" />
</template>

<script setup>
import ResourceCrud from '@/components/admin/ResourceCrud.vue'

const fields = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'slug', label: 'Slug (used in the URL)', type: 'text', required: true, placeholder: 'e.g. main-branch' },
  { key: 'address', label: 'Address', type: 'textarea', required: true },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'openingHours', label: 'Opening hours', type: 'text', placeholder: 'Mo-Sa 05:00-21:00, Su 05:00-12:00' },
  { key: 'isActive', label: 'Visible on site', type: 'boolean', default: true }
]
</script>
