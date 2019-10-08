// electron依赖
import { ipcRenderer } from 'electron'

// 如何在electron中使用vue
// 1.使用electron-webpack-quick-start脚手架构建一个项目
// 2.安装vue electron-webpack-vue
// 3.在renderer下额index.js中new Vue
import Vue from 'vue'
// 引入elementui
import ElementUI from 'element-ui'
import App from './App'
import router from './router.js'

// 引入的样式文件
// 重置样式表
import './assets/style/reset.css'
// element样式表
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// 判断网络是否连接
// onlineStatu: 回调函数
// online: 网络连接时触发
// offline: 网络断开时触发
// 首次渲染时判断
// navigator.onLine ? ipcRenderer.send('isOnline', navigator.onLine ? true : false) : ipcRenderer.send('isOnline', navigator.onLine ? true : false)
const onlineStatus = () => {
  ipcRenderer.send('isOnline', navigator.onLine ? true : false)
}
// 网络连接
window.addEventListener('online', onlineStatus)
// 断开连接
window.addEventListener('offline', onlineStatus)