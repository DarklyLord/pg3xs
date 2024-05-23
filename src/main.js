import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import loginSite from "@/components/loginSite.vue";
import testLogin from "@/components/testLogin.vue";


const routes = [
    { path: '/', component: loginSite},
    {path: '/test', component: testLogin}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
