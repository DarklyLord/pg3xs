// Composables
import { createRouter, createWebHistory } from 'vue-router'
import loginSite from "@/components/loginSite.vue";
import theHub from "@/components/theHub.vue";
import timeMange from "@/components/timetableManagement.vue";
import selectorHub from "@/components/selectorHub.vue";
import timeMana from "@/components/theHubSub/userManagement.vue";
import userSettings from "@/components/theHubSub/userManagement.vue";
import userMana from "@/components/theHubSub/userManagement.vue";

const routes = [
  { path: '/', component: loginSite },
  { path: '/hub', component: theHub,
    children:[
      {
        path:'/hub',
        component: selectorHub
      },
      {
        path:'/hub/timeManagement',
        component: timeMana
      }
      ,
      {
        path:'/hub/userSettings',
        component: userSettings
      }
      ,
      {
        path:'/hub/userManagement',
        component: userMana
      }
    ] },
  { path: '/hub/timetable', component: timeMange },
  // { path: '/hub/userManagement', component: userMange },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
