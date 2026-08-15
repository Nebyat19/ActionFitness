<template>
  <section class="admin-card p-5 sm:p-6">
    <h2 class="text-base font-semibold text-admin-ink mb-4">{{ title }}</h2>

    <p v-if="loading" class="text-sm text-admin-muted">Loading…</p>
    <form v-else class="flex flex-col gap-4" @submit.prevent="handleSave">
      <AdminFieldInput
        v-for="field in fields"
        :key="field.key"
        :field="field"
        v-model="form[field.key]"
      />

      <p v-if="error" class="text-sm text-admin-danger">{{ error }}</p>
      <p v-if="saved" class="text-sm text-admin-accent-dark flex items-center gap-1.5">
        <AdminIcon name="badge" cls="w-4 h-4" /> Saved
      </p>

      <div>
        <button type="submit" :disabled="saving" class="admin-btn-primary">
          {{ saving ? 'Saving…' : 'Save' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { adminApi } from '@/lib/adminApi'
import AdminFieldInput from '@/components/admin/AdminFieldInput.vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const props = defineProps({
  contentKey: { type: String, required: true },
  title: { type: String, required: true },
  fields: { type: Array, required: true }
})

const loading = ref(true)
const saving = ref(false)
const saved = ref(false)
const error = ref('')
const form = ref({})

function toFormValue(field, raw) {
  if (field.type === 'string-list') return (raw || []).join('\n')
  return raw ?? (field.type === 'boolean' ? false : null)
}
function fromFormValue(field, value) {
  if (field.type === 'string-list') {
    return value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return value
}

async function load() {
  loading.value = true
  try {
    let value = {}
    try {
      const row = await adminApi.siteContent.get(props.contentKey)
      value = row.value || {}
    } catch (err) {
      if (err.status !== 404) throw err // 404 just means this block hasn't been saved yet
    }
    const out = {}
    for (const field of props.fields) out[field.key] = toFormValue(field, value[field.key])
    form.value = out
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
load()

async function handleSave() {
  error.value = ''
  saved.value = false
  saving.value = true
  try {
    const value = {}
    for (const field of props.fields) value[field.key] = fromFormValue(field, form.value[field.key])
    await adminApi.siteContent.set(props.contentKey, value)
    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}
</script>
