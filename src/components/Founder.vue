<template>
  <section id="founder" class="pb-24 p-16 bg-black">
    <div class=" flex flex-col md:flex-row  justify-start gap-16 md:gap-10">
       
        <div class="w-full md:w-96 h-96 relative  border-2">
        <img class=" absolute inset-0 w-full h-full object-cover object-top" :src="founderInfo.image" alt="">
        <h1 class=" absolute -bottom-10 md:-bottom-20 pmd:b-5 border-b-2  w-full text-center  z-10 font-bebas text-3xl md:text-4xl text-primary-green">{{ founderInfo.title }}</h1>
       </div> 

     <div class="flex flex-col ">
        <h1 class="text-4xl text-center md:text-6xl font-bebas text-white"><span class="text-primary-green">{{ founderInfo.sub }}</span> {{ founderInfo.name }}</h1>
        <p class="text-white mt-5">{{ founderInfo.info }}</p>
        
        <button class="px-4 w-80 mt-10 rounded-xl py-2 bg-primary-green text-white">Read More</button>
     </div>
   
    </div>

  </section>
</template>

<script setup>
import { founderInfo } from '@/data/constants'
</script>
