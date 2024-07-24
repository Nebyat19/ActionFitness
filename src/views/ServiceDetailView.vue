<template>
  {{ name }}
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const service = ref({})
const ServiceList = ['BodyBuilding']
defineProps({
  name: String
})
const ServiceInfo ={
    BodyBuilding:{
        title:"Body Building",
        description:"Bodybuilding is the use of progressive resistance exercise to control and develop one's musculature (muscle building) by muscle hypertrophy for aesthetic purposes. It is distinct from similar activities such as powerlifting because it focuses on physical appearance instead of strength.",
        image: null
    }
}
const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
   if (!ServiceList.includes(route.params.name)) {
      router.push('/services')
  }
  service.value = ServiceInfo[route.params.name]
})
</script>
