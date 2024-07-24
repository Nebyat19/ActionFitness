<template>
  <div class="pt-32"></div>
    <ContactUs />
  <div class=" bg-gray-100 py-12 px-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6 ">
     <div class=" grid place-items-center">   <img class="h-16 w-auto" :src="ACTION_IMAGE" alt=""></div>
        <h1 class="text-3xl font-bold text-black  mt-5 font-bebas mb-6">Contact Us</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Your Name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Your Email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              required
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              placeholder="Subject"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              required
            />
            <p v-if="errors.subject" class="text-red-500 text-sm mt-1">{{ errors.subject }}</p>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              placeholder="Your Message"
              rows="4"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              required
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
          </div>
          <button
            type="submit"
            class="inline-block px-6 py-3 bg-primary-red text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import ContactUs from '@/components/ContactUs.vue';
import { ACTION_IMAGE } from '@/data/constants';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref({});

const handleSubmit = () => {
  errors.value = {};

  if (!form.value.name) {
    errors.value.name = 'Name is required.';
  }
  if (!form.value.email) {
    errors.value.email = 'Email is required.';
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = 'Invalid email format.';
  }
  if (!form.value.subject) {
    errors.value.subject = 'Subject is required.';
  }
  if (!form.value.message) {
    errors.value.message = 'Message is required.';
  }

  if (Object.keys(errors.value).length === 0) {
    // Simulate form submission
    console.log('Form submitted:', form.value);
    alert('Message sent successfully!');
    resetForm();
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
