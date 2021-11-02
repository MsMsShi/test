<template>
	<el-container>
		<el-aside>
			<el-row class="tac">
				<el-col :span="24">
					<el-menu   class="el-menu-vertical-demo" mode="vertical"
						@select="handleAsideSelect" background-color="#545c64" text-color="#fff"
						active-text-color="#ffd04b">
						<el-menu-item  v-for="nav in asideMenus" :index="nav.path">
						{{nav.menuName}}{{nav.path}}
						</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
			<el-row>
				<img src="~pubimg2/logo.png"  width="30" height="30"/>
				<img src="../public/img/APP.ico" width="30" height="30" />
				<img :src="imgurl2"  width="30" height="30"/>
<!--				 <img src="src/assets/logo.png" />
				  <img src="pubimg2/logo.pnp" /><br>-->
				 {{$route.path}}
			</el-row>
		</el-aside>
		<el-container>
			<el-header>

				<el-menu  :default-active="activeMenu" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<el-menu-item index="/">Home</el-menu-item>
					<el-menu-item index="/login" v-show="!userInfo.isValidate" @select="toLogin">登录</el-menu-item>
					<el-menu-item v-for="nav in userInfo.menus" v-show="userInfo.isValidate" :index="nav.path">
						{{nav.menuName}}--{{nav.path}}
					</el-menu-item>
				</el-menu>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer>
				footer
				<!-- {{asideMenus}}::{{userInfo}} -->
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
	import {
		h,
		ref,
		reactive,
		onBeforeMount,
		onMounted
	} from 'vue'
   import emp from "/pubjs/"
	import {
		useStore
	} from "vuex";
	import { useRouter} from 'vue-router'
	export default {
		name: 'App',
		data() {
			return {
				asideMenus: this.$store.getters.asideMenus("/SysMain"),
				imgurl:'../public/img/pycharm.ico',
				imgurl2:"~pubimg2/logo.png"
			}
		},
		computed:{
			activeMenu(){
				console.log(this.$route.path)
				console.log(this.$route.path.split("/")[1])
				return '/'+this.$route.path.split("/")[1]
			}
		},
		methods: {
			handleSelect(index, key, keyPath) {
				//console.log("++++",index, key, keyPath);
				this.asideMenus = this.$store.getters.asideMenus(index)
				this.$router.push({
					path: index
				})
			//console.log("父菜单:%o",this.$route)
			},
			handleAsideSelect(index, key, keyPath) {
				//console.log(index, key, keyPath);
				//console.log(index);
				//console.log("子菜单:%o",this.$route.fullPath)
				this.$router.push({
					path: index
				})
				
			}
		},
		mounted: function() {
			window.addEventListener('beforeunload', () => {
				//刷新前将目前登录的用户保存到sessionStorage中
				sessionStorage.setItem('state', JSON.stringify(this.$store.state))
				sessionStorage.setItem("refresh", "true")
			})
		},
		created: function() {
			//全局监听，页面刷新的时候将store里state的值存到sessionStorage中，
			//然后从sessionStorage中获取，再赋值给store。然后再把session里面
			//存的删除即可，相当于中间件的作用。在页面加载时读取sessionStorage
			//里的状态信息
			//console.group("in main.js created............................begin")

			if (sessionStorage.getItem("state")) {
				//替换 store 的根状态，状态合并
				//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性
				//，复制到目标对象（target）。Object.assign(target, source1, source2);
				this.store.replaceState(
					Object.assign({},
						this.store.state,
						JSON.parse(sessionStorage.getItem("state"))
					)
				)
				this.userInfo.uname = this.store.state.userInfo.uname
				this.userInfo.isValidate = this.store.state.userInfo.isValidate
				this.userInfo.token = this.store.state.userInfo.token
				this.userInfo.menus = this.store.state.userInfo.menus
			}

		},
		setup() {
            console.log("man=%o",emp)
			const store = useStore();
			const userInfo = ref(store.state.userInfo)

			function toLogin() {
				//const router = useRouter()
			/* 	router.push({
					to: "/login"
				}) */
				this.$router.push({
					to: "/login"
				})
			}
			return {
				userInfo,
				store,
				toLogin
			}
		}
	}
</script>
<style>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
	
		
	}

	.el-container {
		margin-bottom: 40px;
		height: 100%;
	}
</style>
