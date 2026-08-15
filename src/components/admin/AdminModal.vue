<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] p-0 sm:p-4"
      @click.self="$emit('close')"
    >
      <div
        class="bg-admin-surface w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto animate-modal-in"
      >
        <div class="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-admin-line sticky top-0 bg-admin-surface z-10">
          <h2 class="text-lg font-semibold text-admin-ink">{{ title }}</h2>
          <button
            type="button"
            class="p-1.5 -mr-1.5 rounded-lg text-admin-subtle hover:text-admin-ink hover:bg-admin-canvas transition-colors"
            aria-label="Close"
            @click="$emit('close')"
          >
            <AdminIcon name="close" cls="w-5 h-5" />
          </button>
        </div>
        <div class="p-5 sm:p-6">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'

defineProps({ title: { type: String, default: '' } })
const emit = defineEmits(['close'])

function handleKeydown(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-modal-in {
  animation: modal-in 0.18s ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .animate-modal-in {
    animation: none;
  }
}
</style>
