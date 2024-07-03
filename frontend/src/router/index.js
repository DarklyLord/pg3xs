// Composables
import { createRouter, createWebHistory } from 'vue-router'
import loginSite from "@/components/loginSite.vue";
import theHub from "@/components/theHub.vue";
import timeMange from "@/components/timetableManagement.vue";
import userMange from "@/components/userManagement.vue";

const routes = [
  { path: '/', component: loginSite },
  { path: '/hub', component: theHub },
  { path: '/hub/timetable', component: timeMange },
  { path: '/hub/userManagement', component: userMange },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
