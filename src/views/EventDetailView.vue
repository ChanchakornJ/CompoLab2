<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = Number(route.params.id)

const event = ref<Event | null>(null)

onMounted(() => {
  EventService.getEvent(id)
    .then((response) => {
      console.log(response.data)
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  </div>
</template>
