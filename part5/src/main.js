import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import VueAxios from 'vue-axios'
import router from './router'
import axios from 'axios'

/**
 *以下代码为2021年10月21日最新加入代码，主要是解决最新
 *版本的icons导入问题。注：el官方目前尚在不断升级，
 *暂无统一导出，只能单独注册组件，该形式为自行拓展
 **/
//element-plus最新版本导入，该版本支持vue3
import 'element-plus/dist/index.css'
// 统一导入el-icon图标
import * as ElIcons from '@element-plus/icons'
//导入转换图标名称的函数,主要是在原有图标的名称前加入前缀el-，
//如果不加前缀则有些图标组件的名称和原有vue组件名称冲突.
//，
function prefixIconName(iconName){
    //将图标文件名称对应官网SVG图标集合进行重新命名，如文件名为AddLocation，则更名为
    //el-add-location。其中add-location为官方网站上的名称
    return 'i'+iconName.replace(/[A-Z]/g,(match)=>'-'+match.toLowerCase())
}
const app=createApp(App).use(ElementPlus)
// 统一注册el-icon图标
for(let iconName in ElIcons){
    let comname=prefixIconName(iconName);
    app.component(comname,ElIcons[iconName])
}
/**以上代码为最新代码**/
app.use(router).use(VueAxios,axios).mount('#app')