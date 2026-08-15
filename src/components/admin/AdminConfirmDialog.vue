<template>
  <AdminModal v-if="state.open" :title="state.title" @close="resolveConfirm(false)">
    <p class="text-sm text-admin-muted mb-6">{{ state.message }}</p>
    <div class="flex justify-end gap-2">
      <button type="button" class="admin-btn-secondary" @click="resolveConfirm(false)">Cancel</button>
      <button
        type="button"
        :class="state.danger ? 'admin-btn bg-admin-danger text-white hover:bg-red-700' : 'admin-btn-primary'"
        @click="resolveConfirm(true)"
      >
        {{ state.confirmLabel }}
      </button>
    </div>
  </AdminModal>
</template>

<script setup>
import AdminModal from '@/components/admin/AdminModal.vue'
import { useConfirmState, resolveConfirm } from '@/composables/useConfirm'

const state = useConfirmState()
</script>
