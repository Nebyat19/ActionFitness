<template>
  <ResourceCrud resource="gallery-collections" title="Gallery Collections" item-noun="Collection" :fields="fields">
    <template #item-actions="{ item }">
      <RouterLink :to="`/admin/gallery/${item.id}`" active-class="" exact-active-class="" class="admin-btn-secondary">
        <AdminIcon name="image" cls="w-4 h-4" />
        <span class="hidden sm:inline">Photos</span>
      </RouterLink>
    </template>
  </ResourceCrud>
</template>

<script setup>
import ResourceCrud from '@/components/admin/ResourceCrud.vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const fields = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'slug', label: 'Slug (used in the URL)', type: 'text', required: true, placeholder: 'e.g. gym-gallery' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'isActive', label: 'Visible on site', type: 'boolean', default: true }
]
</script>
