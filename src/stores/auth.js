// Client-side auth state for gating the admin UI. This is convenience only —
// every /api/admin/* request independently re-verifies the session cookie
// server-side, so nothing here is actually trusted for security.
import { defineStore } from 'pinia'
import { adminApi } from '@/lib/adminApi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    checked: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user)
  },
  actions: {
    async checkSession() {
      try {
        this.user = await adminApi.me()
      } catch {
        this.user = null
      } finally {
        this.checked = true
      }
      return this.user
    },
    async login(email, password) {
      this.user = await adminApi.login(email, password)
      this.checked = true
      return this.user
    },
    async logout() {
      try {
        await adminApi.logout()
      } finally {
        this.user = null
      }
    }
  }
})
