
<template>
    <div v-if="isOpen" class="fixed  my-auto inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div class="relative">
        <button @click="close" class="absolute -top-8 right-5  md:top-1/2 px-3 bg-primary-green rounded-full z-50 mt-10 text-white text-2xl">&times;</button>
        <img :src="imageSrc" class="max-w-[90%] max-h-[90%]  m-auto object-contain" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      imageSrc: {
        type: String,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
 
  