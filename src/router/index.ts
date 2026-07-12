import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import StudentListView from '@/views/StudentListView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      
    },
    {
      path: '/about',
      name: 'about',
     component: AboutView
    },
    {
      path: '/student',
      name: 'student-list-view',
     component: StudentListView
    }
  ],
})

export default router
