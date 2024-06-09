// Composables
import { createRouter, createWebHistory } from 'vue-router'
import loginSite from "@/components/loginSite.vue";
import userPage from "@/components/userPage.vue";
import adminPage from "@/components/adminPage.vue";


const routes = [
  { path: '/', component: loginSite },
  { path: '/user', component: userPage },
  { path: '/admin', component: adminPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
