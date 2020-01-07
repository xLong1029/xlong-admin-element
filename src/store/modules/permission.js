import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 使用meta.role判断当前用户是否具有权限访问
 * @param route
 * @param roleIds
 */
function hasPermission(route, roleIds) {
  if (route.meta && route.meta.roles) {
    return roleIds.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤动态路由表
 * @param routes asyncRoutes
 * @param roleIds
 */
export function filterAsyncRoutes(routes, roleIds) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, roleIds)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roleIds)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 生成路由
  generateRoutes({ commit }, roleIds) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roleIds)
      // 404重定向配置放结尾
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
