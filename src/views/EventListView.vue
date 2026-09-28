<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import {ref, onMounted, computed, watchEffect} from 'vue'
import EventService from '@/services/EventService'
import BaseInput from '@/components/BaseInput.vue'
import router from '@/router'


const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)
const hasNextPage = computed (() =>{
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})
const page = computed (() => props.page)
const perPage = computed (() => props.perPage)


onMounted(() =>{
  watchEffect(() =>{
    // EventService.getEvents(3, page.value)
    // .then((response) =>{
    //   events.value = response.data
    //   totalEvents.value = response.headers['x-total-count']
    // })
    // .catch((error) => {
    //   console.error('There was an error!', error)
    // })
    updateKeyword()
    
  })
   
})
const keyword = ref('')
function updateKeyword(){
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = EventService.getEvents(3, page.value)
  }else{
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }
  queryFunction.then((response) =>{
    events.value = response.data
    console.log('events', events.value)
    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvent', totalEvents.value)
  }).catch(() =>{
    router.push({name: 'network-error-view'})
  })
}
</script>

<template>
  <h1 class="text-3xl font-bold text-center mb-6">
    Events For Good
  </h1>

  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput v-model="keyword" label="Search..." @input="updateKeyword" class="w-full" />
    </div>
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />

    <div class="flex w-[290px] mt-6">
      <RouterLink
        v-if="page != 1"
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, limit: perPage } }"
        rel="prev"
        class="flex-1 text-left text-slate-700 no-underline hover:text-blue-600"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        v-if="hasNextPage"
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, limit: perPage } }"
        rel="next"
        class="flex-1 text-right text-slate-700 no-underline hover:text-blue-600"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>
