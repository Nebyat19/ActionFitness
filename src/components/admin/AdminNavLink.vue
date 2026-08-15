<template>
  <RouterLink
    :to="to"
    active-class="admin-nav-link-active"
    exact-active-class="admin-nav-link-active"
    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
    :class="isExactMatch
      ? 'bg-admin-accent text-admin-accent-ink'
      : 'text-admin-sidebar-text hover:bg-admin-sidebar-hover hover:text-white'"
    @click="$emit('navigate')"
  >
    <AdminIcon :name="icon" cls="w-5 h-5 shrink-0" />
    <span class="truncate">{{ label }}</span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const props = defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
  exact: { type: Boolean, default: false }
})
defineEmits(['navigate'])

const route = useRoute()
const isExactMatch = computed(() =>
  props.exact ? route.path === props.to : route.path === props.to || route.path.startsWith(props.to + '/')
)
</script>
