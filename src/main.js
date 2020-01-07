// 解决 ie11打开vue2.0项目空白 问题
import 'babel-polyfill'

import Vue from 'vue'

import Cookies from 'js-cookie'

import App from './App'
import store from './store'
import router from './router'

// 权限
import './permission'

import Element from 'element-ui'
import './styles/element-variables.scss'

// 全局样式
import '@/styles/index.scss'
// 字体样式
import '@/assets/font/iconfont.css'

// element组件尺寸配置
Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

// 引用Bomb
import Bmob from "hydrogen-js-sdk";
// Bmob封装方法
import BmobServer from './bmob/bmob-server'

// 挂载到全局使用
Vue.prototype.Bmob = Bmob
// 初始化BmobSDK
BmobServer.Init();

// 过滤器配置
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

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
