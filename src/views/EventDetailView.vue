<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {type Event} from '@/types'
import EventService from '@/services/EventService'

const event = ref<Event | null>(null)

onMounted(() =>{
    
   EventService.getEvents(id)
    .then((response) =>{
      console.log(response.data)
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>
<template>
    <div>
        <h1>{{ event.title }}</h1>
        <p>{{ event.time}} on {{ event.date }} @ {{ event.location }}</p>

    </div>
</template>