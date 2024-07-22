<template>
  <footer class="w-full h-auto p-5 md:p-16 bg-black">
    <div class="text-primary-green flex md:flex-row flex-col gap-5 md:justify-between">
      <div class="flex flex-row md:flex-col md:w-56 w-full items-center gap-6 text-sm">
        <img class="h-auto w-24" :src="ACTION_FITNESS_IMAGE" alt="" />
        <p class="">
          {{ gymInformation.info }}
        </p>
      </div>
      <div>
        <h1 class="text-lg font-bebas">Location</h1>
        <p>{{ gymInformation.location }}</p>
        <h1 class="text-lg font-bebas mt-5">Opening Hours</h1>
        <p>{{ gymInformation.openingHours }}</p>
      </div>
      <div class="flex flex-col">
        <h1 class="text-lg font-bebas">Links</h1>
        <ul class="flex flex-col text-sm">
          <li v-for="link in gymInformation.links" class="hover:text-primary-red" :key="link">
            <router-link :to="link.path">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
      <div>
        <h1 class="text-lg font-bebas">Follow us on Social</h1>
        <ul class="text-primary-green flex gap-4 mt-3">
          <li>
            <a :href="socialLinks.facebook"> <FacebookIcon /></a>
          </li>
          <li>
            <a :href="socialLinks.tiktok"> <TiktokIcon /></a>
          </li>
          <li>
            <a :href="socialLinks.instagram"> <InstagramIcon /> </a>
          </li>
          <li>
            <a :href="socialLinks.linkedin"> <LinkedinIcon /></a>
          </li>
        </ul>
        <h1 class="text-lg font-bebas mt-5">Contact Us</h1>
        <p>{{ gymInformation.phone }}</p>
        <p>{{ gymInformation.email }}</p>
      </div>
    </div>
    <div
      class="text-sm text-accent-gold grid place-content-center py-3 border-t mt-6 border-gray-600"
    >
      <p>©{{ new Date().getFullYear() }} Action Fitness</p>
    </div>
  </footer>
</template>
<script setup>
import { ACTION_FITNESS_IMAGE, gymInformation } from '@/data/constants'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'

const socialLinks = gymInformation.socialMedia
</script>
