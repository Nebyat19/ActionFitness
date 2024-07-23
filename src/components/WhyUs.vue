<template>
    <section id="why-us" class=" relative w-full h-52">
        
        <img class=" -z-50 fixed w-full h-full inset-0 object-cover" :src="taekwondo_2" alt="">
 <div class=" absolute bg-gray-950 bg-opacity-50 w-full h-full inset-0"></div>
        <div class=" z-10 py-5 md:py-10 mx-auto flex flex-col items-center justify-center">
            <h1 class="z-10 text-4xl md:text-4xl font-bebas font-bold  tracking-tighter text-primary-green">Why Us</h1>
            
            <div class="flex">
                <p class=" font-poppins text-md font-serif z-10 text-center text-white  md:text-xl  mt-5 ">We are a team of fitness enthusiasts who are passionate about helping you achieve your fitness goals.</p>
            
            </div>
        </div>
    </section>
</template>
<script setup>
import {taekwondo_2} from '@/data/constants'
</script>