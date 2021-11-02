import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
import logi from '../components/login/logi.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
},
    {
        path: '/logi',
        name: 'logi',
        component: logi
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router