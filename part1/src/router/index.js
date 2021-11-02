import {createRouter,createWebHashHistory,createWebHistory} from "vue-router"

import DeptView from '../components/dept/DeptView.vue'
import EmpView from '../components/emp/EmpView.vue'
import imgzs from '../components/img/imgzs.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes=[
	{
		path:"/",
		component:HelloWorld
	},
	{
		path:"/Dept",
		component:DeptView
	},
	{
		path:"/Emp",
		component:EmpView
	},
	{
		path:"/imgzs",
		component: imgzs
	}
]
const router=createRouter({
	history:createWebHistory(),
	routes
})
export default router