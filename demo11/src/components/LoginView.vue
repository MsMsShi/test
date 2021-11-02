<template>
	<el-row>
		<el-col :span="16" :offset="8">
			<el-form ref="loginForm" :model="loginData" label-width="100px" style="width:380px;">
				<el-form-item label="用户名" prop="uname">
					<el-input v-model="loginData.uname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="loginData.pwd"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="toLogin">登录</el-button>&nbsp;
					<el-button type="primary" @click="rest">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	/*import.meta.glob添加页面可以自动生成映射关系，而不用手动添加,生成类似如下对象
	Object { "../components/HelloWorld.vue": vue(), "../components/LoginView.vue": vue())
	这样作后，在动态生态菜单时可以直接component:modules[`${comp}`]，comp是从后台读取的组件路径，这里
	则正好对应上modules中对象的键，如"../components/HelloWorld.vue"
	*/
	const modules = import.meta.glob('../components/**/*.vue');
/* 	import { defineAsyncComponent } from 'vue' */
	export default {
		name: "LoginForm",
		data() {
			return {
				loginData: {
					uname: '',
					pwd: ''
				}
			}
		},
		methods: {
			toLogin() {
				const _this=this;
				console.log("modules=%o",modules)
				//return
				this.axios.post("http://localhost:8089/navboot/toLogin", this.loginData)
					.then(function(res) {
						console.log(res)
						console.log(res.data.data)
						_this.$store.commit("updateUserInfo",res.data.data)
						 for(var i=0;i<_this.$store.state.userInfo.menus.length;i++){
							 let comp='../components/'+_this.$store.state.userInfo.menus[i].componentPath
							 console.log("comp=%s",comp)
							 const rou={
								path: _this.$store.state.userInfo.menus[i].path,
								name:_this.$store.state.userInfo.menus[i].componentName,
							   //component:()=>import(`${comp}`)
							    component:modules[`${comp}`],
								children:[]
							 }
							//_this.$router.addRoute(rou)
							// console.log(rou)
							 let chm=_this.$store.state.userInfo.menus[i].asideChildren
							 for(var k=0;k<chm.length;k++){
								  let cpath='../components/'+chm[k].componentPath
								 //console.log("有子菜单哦:%o",chm[k])
								 const rouc={
								 	path: chm[k].path,
								 	name:chm[k].componentName,
								    //component:()=>import(`${cpath}`)
								     component:modules[`${cpath}`]
								  }
								 //_this.$router.addRoute(rouc)
								 rou.children.push(rouc)
							 }
							 _this.$router.addRoute(rou)
						 }
						
						_this.$router.push({name:'HelloWorld'})
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			rest() {
				console.log("开始重置")
				this.$refs.loginForm.resetFields()
			}
		}
	}
</script>

<style>
	.el-row{
		border: #000000 solid 1px;
	}
	.el-form{
		border: #aa0000 solid 1px;
	}
</style>
