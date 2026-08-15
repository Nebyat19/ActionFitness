<template>
  <div>
    <div class="flex items-center justify-between gap-3 mb-6">
      <h1 class="text-xl sm:text-2xl font-semibold text-admin-ink">Users</h1>
      <button type="button" class="admin-btn-primary shrink-0" @click="creating = true">
        <AdminIcon name="plus" cls="w-4 h-4" />
        <span class="hidden sm:inline">New user</span>
      </button>
    </div>

    <p v-if="error" class="text-sm text-admin-danger bg-admin-danger-surface border border-red-200 rounded-lg px-3 py-2 mb-4">
      {{ error }}
    </p>
    <p v-if="loading" class="text-sm text-admin-muted">Loading…</p>

    <ul v-else class="admin-card divide-y divide-admin-line overflow-hidden">
      <li v-for="u in users" :key="u.id" class="flex flex-wrap items-center gap-3 px-4 py-3.5">
        <div class="flex-1 min-w-0 basis-40">
          <div class="font-medium text-admin-ink truncate">{{ u.email }}</div>
          <div class="text-xs mt-0.5" :class="u.isActive ? 'text-admin-accent-dark' : 'text-admin-subtle'">
            {{ u.isActive ? 'Active' : 'Deactivated' }}
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-1.5 shrink-0 ml-auto">
          <button type="button" class="admin-btn-secondary" @click="openResetPassword(u)">Reset password</button>
          <button type="button" class="admin-btn-secondary" @click="toggleActive(u)">
            {{ u.isActive ? 'Deactivate' : 'Reactivate' }}
          </button>
          <button type="button" class="admin-btn-danger !px-2.5" @click="handleDelete(u)">
            <AdminIcon name="trash" cls="w-4 h-4" />
          </button>
        </div>
      </li>
    </ul>

    <AdminModal v-if="creating" title="New user" @close="creating = false">
      <form class="flex flex-col gap-4" @submit.prevent="handleCreate">
        <label class="text-sm font-medium text-admin-ink flex flex-col gap-1.5">
          Email
          <input v-model="newEmail" type="email" required class="admin-input" />
        </label>
        <label class="text-sm font-medium text-admin-ink flex flex-col gap-1.5">
          Password
          <input v-model="newPassword" type="text" required minlength="8" class="admin-input" />
        </label>
        <p v-if="formError" class="text-sm text-admin-danger">{{ formError }}</p>
        <div class="flex justify-end gap-2">
          <button type="button" class="admin-btn-secondary" @click="creating = false">Cancel</button>
          <button type="submit" class="admin-btn-primary">Create</button>
        </div>
      </form>
    </AdminModal>

    <AdminModal v-if="resettingFor" :title="`Reset password for ${resettingFor.email}`" @close="resettingFor = null">
      <form class="flex flex-col gap-4" @submit.prevent="handleResetPassword">
        <label class="text-sm font-medium text-admin-ink flex flex-col gap-1.5">
          New password
          <input v-model="resetPassword" type="text" required minlength="8" class="admin-input" />
        </label>
        <p class="text-xs text-admin-muted">This immediately signs that user out everywhere else.</p>
        <p v-if="formError" class="text-sm text-admin-danger">{{ formError }}</p>
        <div class="flex justify-end gap-2">
          <button type="button" class="admin-btn-secondary" @click="resettingFor = null">Cancel</button>
          <button type="submit" class="admin-btn-primary">Reset</button>
        </div>
      </form>
    </AdminModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminApi } from '@/lib/adminApi'
import { confirmDialog } from '@/composables/useConfirm'
import AdminModal from '@/components/admin/AdminModal.vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const users = ref([])
const loading = ref(true)
const error = ref('')
const formError = ref('')

const creating = ref(false)
const newEmail = ref('')
const newPassword = ref('')

const resettingFor = ref(null)
const resetPassword = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    users.value = await adminApi.users.list()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
load()

async function handleCreate() {
  formError.value = ''
  try {
    await adminApi.users.create({ email: newEmail.value, password: newPassword.value })
    creating.value = false
    newEmail.value = ''
    newPassword.value = ''
    await load()
  } catch (err) {
    formError.value = err.message
  }
}

function openResetPassword(user) {
  formError.value = ''
  resetPassword.value = ''
  resettingFor.value = user
}

async function handleResetPassword() {
  formError.value = ''
  try {
    await adminApi.users.update(resettingFor.value.id, { password: resetPassword.value })
    resettingFor.value = null
    await load()
  } catch (err) {
    formError.value = err.message
  }
}

async function toggleActive(user) {
  try {
    await adminApi.users.update(user.id, { isActive: !user.isActive })
    await load()
  } catch (err) {
    error.value = err.message
  }
}

async function handleDelete(user) {
  const ok = await confirmDialog(`Delete ${user.email}? This can't be undone.`)
  if (!ok) return
  try {
    await adminApi.users.remove(user.id)
    await load()
  } catch (err) {
    error.value = err.message
  }
}
</script>
