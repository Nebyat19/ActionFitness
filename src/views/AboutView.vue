<template>
  <main id="home">
    <div class="w-full pt-24 relative grid place-items-center">
      <div class="bg-black h-56 w-full gap-5 text-white flex items-center justify-center">
        <img class="h-24 w-auto" :src="ACTION_FITNESS_IMAGE" alt="">
        <h1 class=" text-6xl font-bebas border-b-2">About Us</h1>
  
      
      </div>
          <!-- Mission Statement -->
    <section class="mt-12">
      <h2 class="text-4xl font-bebas font-semibold text-black text-center mb-2">Our Mission</h2>
      <p class=" text-md p-2 md:text-lg text-gray-700 md:px-24 text-center">
        Our mission is to inspire and empower individuals to lead healthier lives through personalized fitness and nutrition programs. We believe in a holistic approach to health and wellness, combining physical training, mental well-being, and nutritional guidance to help you achieve optimal results.
      </p>
    </section>

    <!-- Core Values -->
    <section class="mt-12 bg-black pt-10 p-2 md:p-16">
      <h2 class="text-4xl font-bebas text-center mb-10 font-semibold text-white ">Core Values</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-10 md:text-lg text-gray-700 text-center">
  <li class="bg-gray-50 shadow-xl p-10 border-black border rounded-lg">
    <h3 class=" text-lg md:text-xl font-semibold  mb-2">Commitment to Excellence</h3>
    <p>We strive for the highest standards in every aspect of our services to ensure you receive the best possible experience.</p>
  </li>
  <li class="bg-gray-50 shadow-lg p-10 border-black border rounded-lg">
    <h3 class="  text-lg md:text-xl font-semibold mb-2">Personalized Training</h3>
    <p>Our training programs are tailored to meet your individual needs and goals, providing a customized fitness journey.</p>
  </li>
  <li class="bg-gray-50 shadow-lg p-10 border-black border rounded-lg">
    <h3 class="  text-lg md:text-xl font-semibold  mb-2">Holistic Approach</h3>
    <p>We integrate physical training, mental well-being, and nutrition to promote overall health and wellness.</p>
  </li>
  <li class="bg-gray-50 shadow-lg p-10 border-black border rounded-lg">
    <h3 class="  text-lg md:text-xl font-semibold  mb-2">Community and Support</h3>
    <p>We foster a supportive community where members encourage each other and grow together in their fitness journey.</p>
  </li>

</ul>
    </section>


    </div>
  </main>
</template>

<script setup>
import {ACTION_FITNESS_IMAGE } from '@/data/constants'

</script>
