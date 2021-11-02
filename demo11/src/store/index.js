import {createStore} from 'vuex'
const store=createStore({
	state:{
		userInfo:{
			uname:"",
			isValidate:false,
			token:"",
			menus:[]
		}
	},
	getters:{
		token:(state)=>        {
			return state.      userInfo.token
		},
		menus:(state)=>{
			return state.userInfo.menus
		},
		isValidate:(state)=>{
			return state.userInfo.isValidate
		},
		asideMenus:(state)=>(path)=>{
			var m=state.userInfo.menus.filter(aside=>aside.path==path)
			if(m.length>0){
				//console.log("m=",m[0].asideChildren)
				return m[0].asideChildren
			}
			return null
			 
		}
	},
	mutations:{
		updateUserInfo(state,user){
			console.log("更新用户状态.......用户名:%s",user.uname)
			state.userInfo.uname=user.uname
			state.userInfo.isValidate=true
			state.userInfo.token=user.token
			state.userInfo.menus=user.menus
			console.log("更新用户状态.......用户信息:%o",state.userInfo)
			sessionStorage.setItem('state', JSON.stringify(state))
		}
	}
})
export default store