<template>
  <section id="contact-us" class="p-10 grid place-content-center bg-white w-full  text-black">
    <div class="grid place-items-center">
      <p class="text-6xl font-bebas mb-5">Contact Info</p>
      <h1 class="text-md font-poppins text-gray-700 mb-7">Get in touch with us</h1>

     <div class="flex flex-col md:flex-row md:gap-16 gap-5">
        <div>
        <h1 class="text-2xl font-bebas mb-3 ">Location</h1>
        <p class="text-gray-800">{{ gymInformation.location }}</p>
      </div>
      <div>
        <h1 class="text-2xl font-bebas mb-3 ">Email</h1>
          <p class="text-gray-800">  <a :href="'mailto:'+gymInformation.email">{{ gymInformation.email }}</a></p>
      </div>
      <div>
        <h1 class="text-2xl font-bebas  mb-3">Phone Number</h1>
        <p  class="text-gray-800" v-for="phone in gymInformation.phones" :key="phone"> <a :href="'tel:'+phone">{{ phone }}</a></p>
      </div>
    </div>
     </div>
  </section>
</template>
<script setup>
import {gymInformation} from '@/data/constants'

</script>

