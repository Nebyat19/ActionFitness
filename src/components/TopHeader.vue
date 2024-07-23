<template>
  <div class="bg-black  flex justify-end py-2 border-b px-3 md:px-16 text-primary-green">
    <span class="flex gap-2 items-center"
      ><svg
        class="h-5 w-5 text-white"
        data-slot="icon"
        aria-hidden="true"
        fill="none"
        stroke-width="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <span class="text-sm">Addis Ababa, Ethiopia | {{ gymInfo.phone }}</span>
    </span>
  </div>
  <header ref="navBar"
    class="transition-all z-10 h-16 relative border-red-500 flex justify-between  bg-white px-3 py-4 items-center md:px-16"
  >
    <img class="h-14 w-auto" src="/src/assets/images/logos/logoBgRemoved.png" alt="" />
    <nav class="md:hidden">
      <ul
        v-show="showMenu"
        class="py-5 left-0 top-16 bg-black flex flex-col absolute gap-5 text-md w-full justify-center items-center text-primary-green"
      >
        <li
          class="hover:text-primary-red uppercase"
          v-for="navlink in navigationLinks"
          :key="navlink.name"
        >
          <router-link :to="navlink.path">{{ navlink.name }}</router-link>
        </li>
      </ul>
      <span class="lg:hidden cursor-pointer" @click="showMenu = !showMenu"
        ><svg
          class="w-10 h-10 text-primary-red"
          data-slot="icon"
          aria-hidden="true"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path></svg
      ></span>
    </nav>
    <nav class="hidden md:flex">
      <ul class="flex gap-5 text-sm font-poppins text-primary-red">
        <li
          class="hover:text-primary-green uppercase"
          v-for="navlink in navigationLinks"
          :key="navlink.name"
        >
        <router-link :to="navlink.path">{{ navlink.name }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup>
import { gymInformation } from '@/data/constants'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const showMenu = ref(false)



const navBar = ref(null)

onClickOutside(navBar, () => {showMenu.value = false})
const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Services', path: '/services' },
  { name: 'Classes', path: '/classes' },
  { name: 'Trainers', path: '/trainers' },
  { name: 'Contact', path: '/contact' },
  {name: 'Gallery', path: '/gallery'}
]

const gymInfo = gymInformation 
</script>
