import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import LoginView from '../components/LoginView.vue'
//一次性将components目录下所有组件进行导入，键为文件名（全路径），值为该组件
const modules =
	import.meta.glob('../components/**/*.vue');

import {
	createStore
} from 'vuex'
const routes = [{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView
	}
]
// for (const path in modules) {
//   modules[path]().then((mod) => {
//     console.log("modules="+path, mod)
//   })
// }
const router = createRouter({
	history: createWebHistory(),
	routes
})
//全局前置守卫，可用作前端权限验证的简单实现
router.beforeEach(function(to, from, next) {
	console.log("in main.js to:" + to.path + "  from:" + from.path)
	const state = JSON.parse(sessionStorage.getItem('state'));

	if ((to.name !== 'login' && state == null) || (to.name !== 'login' && !state.userInfo.isValidate)) {
		console.log("跳至登录")
		console.log("state=%o", state)
		next({
			name: 'login'
		})
	} else {
		if (sessionStorage.getItem('refresh') == "true") {
			console.log("---------------------------------------------------")
			for (var i = 0; i < state.userInfo.menus.length; i++) {
				let comp = '../components/' + state.userInfo.menus[i].componentPath
				//console.log(state.userInfo.menus[i].path)
				//console.log(comp)
				const rou = {
					path: state.userInfo.menus[i].path,
					name: state.userInfo.menus[i].componentName,
					//从modules中取出对应comp名的组件
					//component: modules[`${comp}`],
					//动态导入
					component:() => import(comp),
					children:[]
				}
				
				let chm = state.userInfo.menus[i].asideChildren
				for (var k = 0; k < chm.length; k++) {
					let cpath = '../components/' + chm[k].componentPath
					const rouc = {
						path: chm[k].path,
						name: chm[k].componentName,
						// component: modules[`${cpath}`]
						component:() => import(cpath),
					}
					rou.children.push(rouc)
				}
				router.addRoute(rou)
				//console.log(rou)
			}
			sessionStorage.setItem("refresh", "false")
			next({
				path: to.path
			})
			return
		}
		next()
	}
})

export default router
