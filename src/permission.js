/* eslint-disable */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login', '/401', '/404'] // 重定向白名单

router.beforeEach(async (to, from, next) => {
  // 页面标题
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 已登录跳转到首页
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          const { roles } = await store.dispatch('user/getInfo')

          console.log(`Get role's value, and the user's roles is ${roles}.`)

          // 获取可通过的路由
          await store.dispatch('permission/generateRoutes', roles)

          // hack方法以确保addroutes是完整的
          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (err) {
          // 重登录
          Message.error(err || '用户信息已失效，请重新登录')
          setTimeout(() => {
            store.dispatch('user/logout')
            next('/login')
          }, 500)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 无权限则跳转到认证页面
      next('/login')
    }
  }
})

router.afterEach(() => {
})
