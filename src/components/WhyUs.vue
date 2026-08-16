<template>
  <section id="why-us" class="relative w-full min-h-[320px] md:min-h-[400px] flex items-center overflow-hidden">
    <img class="absolute inset-0 w-full h-full object-cover" :src="taekwondo_2" alt="" />
    <div class="absolute inset-0 bg-black/70"></div>

    <div class="relative z-10 w-full py-16 px-6 flex flex-col items-center text-center">
      <span class="site-eyebrow mb-5">Why Us</span>
      <h2 class="font-anton text-3xl md:text-5xl text-white tracking-tight max-w-3xl">
        Discipline, expertise, and a team that shows up for you
      </h2>
      <p class="font-poppins text-white/80 md:text-lg mt-5 max-w-xl">
        We are a team of fitness enthusiasts who are passionate about helping you achieve your fitness goals.
      </p>
    </div>
  </section>
</template>
<script setup>
import taekwondo_2 from '@/assets/images/services/taekwondo-2.jpg'
</script>
