<template>
  <main class="bg-black min-h-screen">
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-28 md:py-32 px-6 text-center">
      <img class="h-16 w-auto mx-auto mb-6" :src="ACTION_FITNESS_IMAGE" alt="Action Fitness" />
      <span class="site-eyebrow mb-6">About Us</span>
      <h1 class="site-heading">Our Mission</h1>
      <p class="site-subtext text-lg max-w-2xl mx-auto mt-6">
        Our mission is to inspire and empower individuals to lead healthier lives through personalized fitness and
        nutrition programs. We believe in a holistic approach to health and wellness, combining physical training,
        mental well-being, and nutritional guidance to help you achieve optimal results.
      </p>
    </section>

    <!-- Core Values -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <h2 class="text-3xl md:text-4xl font-anton text-white text-center mb-12">Core Values</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li v-for="value in values" :key="value.title" class="site-card-hover p-8">
          <h3 class="text-lg md:text-xl font-bold text-white mb-2">{{ value.title }}</h3>
          <p class="text-gray-400 leading-relaxed">{{ value.description }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import ACTION_FITNESS_IMAGE from '@/assets/images/logos/ActionFitnessBgRemoved.png'

const values = [
  {
    title: 'Commitment to Excellence',
    description: 'We strive for the highest standards in every aspect of our services to ensure you receive the best possible experience.'
  },
  {
    title: 'Personalized Training',
    description: 'Our training programs are tailored to meet your individual needs and goals, providing a customized fitness journey.'
  },
  {
    title: 'Holistic Approach',
    description: 'We integrate physical training, mental well-being, and nutrition to promote overall health and wellness.'
  },
  {
    title: 'Community and Support',
    description: 'We foster a supportive community where members encourage each other and grow together in their fitness journey.'
  }
]
</script>
