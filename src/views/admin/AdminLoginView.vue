<template>
  <div class="min-h-screen bg-admin-sidebar flex items-center justify-center p-4">
    <form
      class="w-full max-w-sm bg-admin-surface rounded-2xl shadow-xl p-7 flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-1">
        <div class="text-sm font-medium text-admin-accent-dark mb-1">Action Fitness</div>
        <h1 class="text-xl font-semibold text-admin-ink">Admin login</h1>
      </div>

      <label class="flex flex-col gap-1.5 text-sm font-medium text-admin-ink">
        Email
        <input
          v-model="email"
          type="email"
          required
          autocomplete="username"
          class="admin-input"
        />
      </label>

      <label class="flex flex-col gap-1.5 text-sm font-medium text-admin-ink">
        Password
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="admin-input"
        />
      </label>

      <p v-if="error" class="text-sm text-admin-danger bg-admin-danger-surface border border-red-200 rounded-lg px-3 py-2">
        {{ error }}
      </p>

      <button type="submit" :disabled="loading" class="admin-btn-primary w-full py-2.5 mt-1">
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push(route.query.redirect || '/admin')
  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
