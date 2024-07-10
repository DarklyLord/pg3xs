// Composables
import { createRouter, createWebHistory } from 'vue-router'
import loginSite from "@/components/loginSite.vue";
import theHub from "@/components/theHub.vue";
import timeMange from "@/components/timetableManagement.vue";
import selectorHub from "@/components/selectorHub.vue";
import timeTableManaAssign from "@/components/theHubSub/timeTableManaAssign.vue";
import timeTableView from "@/components/theHubSub/timeTableView.vue";
import timeTableManaSelect from "@/components/theHubSub/timeTableManaSelect.vue";
import userSettings from "@/components/theHubSub/userSettings.vue";
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
        path:'/hub/timeManagement/assign',
        component: timeTableManaAssign
      }
      ,      {
        path:'/hub/timeManagement/select',
        component: timeTableManaSelect
      }
      ,{
        path:'/hub/timeManagement/view',
        component: timeTableView
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
