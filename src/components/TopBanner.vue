<template>
  <div class="bg-primary-green text-white py-1 px-4 text-center">
    <div class="container mx-auto flex items-center justify-center gap-5">
      <p class="text-[10px]">
        🏆 Achieve your fitness goals with personalized training plans.
        <router-link to="/services" class="underline">Learn More</router-link>
      </p>
      <router-link to="/contact"
        ><button
          class="hidden md:flex bg-white text-sm text-primary-red px-4 py-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-opacity-50"
        >
          contact us
        </button>
      </router-link>
    </div>
  </div>
</template>
