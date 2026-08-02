<script setup lang="ts">
import {toRefs} from 'vue'
import {type Event} from '@/types'
import { useMessageStore} from '@/stores/message'
import { storeToRefs } from 'pinia';
const store = useMessageStore()
const { detailMessage } = storeToRefs(store)
const props = defineProps<{
    event: Event
}> ()
const {event} = toRefs(props)
</script>
<template >
    <div id="flashMessage" v-if="detailMessage">
        <h4>{{ detailMessage }}</h4>
    </div>
    
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>

<style>
@keyframes yellowFade{
  from{
    background-color: yellow;
  }
  to{
    background-color: transparent;
  }
}
#flashMessage{
  animation: yellowFade 3s ease-in-out;
}
</style>