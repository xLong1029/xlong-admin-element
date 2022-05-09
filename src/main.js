import 'babel-polyfill'
import Vue from 'vue'
import Cookies from 'js-cookie'

import App from './App'
import store from './store'
import router from './router'

// 权限
import './permission'

// 全局样式
import '@/styles/index.scss'
// 字体样式
import '@/assets/font/iconfont.css'

// Element配置
import Element from 'element-ui'
import './styles/element-variables.scss'
Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

// 过滤器配置
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 启动Mock
import { setupMock } from './mock/mock-server'
setupMock()

// 注册组件
const requireComponents = require['context'](
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[-|\w]+\.vue$/
)
requireComponents.keys().map(fileName => {
  try {
    const name = fileName.match(/\w+\/([-|\w]+)\/\w+\.vue$/)[1]
    Vue.component(name, requireComponents(fileName).default)
  } catch (e) {
    if (name) {
      console.error('注册组件时出错', name)
    } else {
      console.error('注册组件时获取不到文件名', name)
    }
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
