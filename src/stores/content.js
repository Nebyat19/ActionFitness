// Public-site content, fetched once from the aggregate /api/content endpoint
// (see defaultLayout.vue) and read by components via these getters instead
// of the old `@/data/constants` imports. Field shapes match what
// api/content.js and the admin's Site Text page (site_content.gym_info /
// site_content.founder) produce.
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    data: null,
    loading: false,
    error: null
  }),
  getters: {
    loaded: (state) => state.data !== null,
    branches: (state) => state.data?.branches ?? [],
    // The branch whose address/phone/hours represent "the gym" in shared
    // chrome (header/footer/contact) — falls back to the first branch if
    // none is explicitly marked primary.
    primaryBranch: (state) => {
      const list = state.data?.branches ?? []
      return list.find((b) => b.isPrimary) ?? list[0] ?? null
    },
    services: (state) => state.data?.services ?? [],
    trainers: (state) => state.data?.trainers ?? [],
    gallery: (state) => state.data?.gallery ?? [],
    certificates: (state) => state.data?.certificates ?? [],
    transformations: (state) => state.data?.transformations ?? [],
    gymInfo: (state) => state.data?.siteContent?.gym_info ?? {},
    founder: (state) => state.data?.siteContent?.founder ?? {},
    // Page-hero/background images, editable from the admin's Site Images
    // page. Public components should fall back to their bundled default
    // image when a field here is unset (nothing chosen yet in the admin).
    siteImages: (state) => state.data?.siteContent?.site_images ?? {},

    transformationVideos: (state) =>
      (state.data?.transformations ?? []).filter((t) => t.videoUrl),
    transformationImages: (state) =>
      (state.data?.transformations ?? []).filter((t) => t.imageUrl && !t.videoUrl),

    serviceBySlug: (state) => (slug) => (state.data?.services ?? []).find((s) => s.slug === slug),
    galleryBySlug: (state) => (slug) => (state.data?.gallery ?? []).find((g) => g.slug === slug)
  },
  actions: {
    async fetchContent() {
      if (this.loading || this.loaded) return
      this.loading = true
      this.error = null
      try {
        const res = await fetch('/api/content')
        if (!res.ok) throw new Error(`Failed to load site content (${res.status})`)
        this.data = await res.json()
      } catch (err) {
        this.error = err.message || 'Failed to load site content'
      } finally {
        this.loading = false
      }
    }
  }
})
