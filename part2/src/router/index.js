import {createRouter,createWebHashHistory,createWebHistory} from "vue-router"
import dept from '../components/dept/dept.vue'
import HelloWorld from '../components/HelloWorld.vue'
import table11 from "../components/table1/table11.vue"

const routes=[
    {
        path:"/",
        component:HelloWorld
    },
    {
        path:"/dept",
        component:dept
    },
    {
        path:"/table11",
        component: table11
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router