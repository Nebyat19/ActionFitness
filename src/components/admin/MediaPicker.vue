<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-admin-ink mb-1.5">{{ label }}</label>

    <div class="flex items-center gap-3">
      <div
        class="w-20 h-20 rounded-lg border border-admin-line bg-admin-canvas flex items-center justify-center overflow-hidden shrink-0"
      >
        <img v-if="selected && selected.kind === 'image'" :src="selected.blobUrl" class="w-full h-full object-cover" />
        <video v-else-if="selected && selected.kind === 'video'" :src="selected.blobUrl" class="w-full h-full object-cover" muted />
        <AdminIcon v-else name="photo" cls="w-6 h-6 text-admin-subtle" />
      </div>

      <div class="flex flex-col gap-2">
        <button type="button" class="admin-btn-secondary" @click="open = true">
          {{ selected ? 'Change' : 'Choose' }} {{ kind }}
        </button>
        <button
          v-if="selected"
          type="button"
          class="text-xs text-admin-muted hover:text-admin-danger text-left"
          @click="$emit('update:modelValue', null)"
        >
          Clear
        </button>
      </div>
    </div>

    <AdminModal v-if="open" @close="open = false" :title="`Choose ${kind}`">
      <div class="flex flex-col gap-4">
        <label class="text-sm">
          <span class="block text-admin-ink font-medium mb-1.5">Upload new {{ kind }}</span>
          <input type="file" :accept="kind === 'image' ? 'image/*' : 'video/*'" class="text-sm" @change="handleUpload" />
        </label>
        <p v-if="uploadError" class="text-sm text-admin-danger">{{ uploadError }}</p>
        <div v-if="uploading" class="flex items-center gap-2 text-sm text-admin-muted">
          <AdminIcon name="spinner" cls="w-4 h-4 animate-spin" />
          Uploading… {{ uploadPercent }}%
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
          <button
            v-for="item in filteredItems"
            :key="item.id"
            type="button"
            class="border rounded-lg overflow-hidden aspect-square hover:ring-2 hover:ring-admin-accent transition-shadow"
            :class="item.id === modelValue ? 'ring-2 ring-admin-accent border-transparent' : 'border-admin-line'"
            @click="select(item)"
          >
            <img v-if="item.kind === 'image'" :src="item.blobUrl" class="w-full h-full object-cover" />
            <video v-else :src="item.blobUrl" class="w-full h-full object-cover" muted />
          </button>
        </div>
        <p v-if="!loading && filteredItems.length === 0" class="text-sm text-admin-muted">
          No {{ kind }}s uploaded yet — upload one above.
        </p>
      </div>
    </AdminModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMediaLibrary } from '@/composables/useMediaLibrary'
import AdminModal from '@/components/admin/AdminModal.vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const props = defineProps({
  modelValue: { type: Number, default: null },
  kind: { type: String, required: true }, // 'image' | 'video'
  label: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const { items, loading, upload } = useMediaLibrary()
const open = ref(false)
const uploading = ref(false)
const uploadPercent = ref(0)
const uploadError = ref('')

const filteredItems = computed(() => items.value.filter((m) => m.kind === props.kind))
const selected = computed(() => items.value.find((m) => m.id === props.modelValue) || null)

function select(item) {
  emit('update:modelValue', item.id)
  open.value = false
}

async function handleUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  uploadError.value = ''
  uploading.value = true
  uploadPercent.value = 0
  try {
    const row = await upload(file, {
      onUploadProgress: (p) => {
        uploadPercent.value = Math.round((p.loaded / p.total) * 100)
      }
    })
    emit('update:modelValue', row.id)
    open.value = false
  } catch (err) {
    uploadError.value = err.message || 'Upload failed'
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}
</script>
