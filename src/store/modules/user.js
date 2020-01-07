/* eslint-disable */
import {
  getToken,
  setToken,
  removeToken
} from 'utils/auth'
// Api方法
import Api from 'api/user'
import {
  resetRouter
} from 'router'

const state = {
  token: getToken(),
  userInfo: {
    // 真实姓名
    realname: null,
    // 用户id
    id: null,
    /**
     * 角色id
     *
     * 权限配置有误： -1
     * 系统管理员(默认为住建厅管理员):  1
     * 住建厅人员:  2 ——————管理员 2-1，普通用户 2-2
     * 其它政府单位人员: 3 ——————管理员 3-1，普通用户 3-2
     * 社会企业: 4 ——————管理员 4-1，普通用户 4-2
     * 社会群众: 5
    */
    roleIds: [],
    // 部门名称
    organizationName: null,
    // 部门id
    organizationsId: null,
    // 账户名
    username: null,
    // 头像
    avatar: null,
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLE_IDS: (state, roleIds) => {
    state.userInfo.roleIds = roleIds
  },
  SET_REALNAME: (state, realname) => {
    state.userInfo.realname = realname
  },
  SET_USERNAME: (state, username) => {
    state.userInfo.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.userInfo.avatar = avatar
  }
}

const actions = {
  // 设置token
  setToken({
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      if (token) {
        commit('SET_TOKEN', token)
        setToken(token)
        resolve(token)
      } else {
        reject()
      }
    })
  },

  // 设置user
  setUser({
    commit
  }, user) {
    return new Promise((resolve, reject) => {
      if (user) {
        commit('SET_USER_INFO', user)
        setUser(user)
        resolve(user)
      } else {
        reject()
      }
    })
  },

  // 获取用户信息
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      /* 测试数据-start */
      const user = {
        realname: '住建厅管理员',
        roleIds: ['1'],
        id: 666,
        organizationName: '',
        organizationsId: '',
        username: 'sysmanager',
        avatar: ''
      }
      commit('SET_USER_INFO', user)
      resolve(user)
      /* 测试数据-end */


      // if (state.token) {
      //   const { RealName, id, OrganizationName, OrganizationsId, name, RoleIds, EmployeesType } = jwtDecode(state.token);

      //   const data = {
      //     realname: RealName,
      //     roleIds: getRole(RoleIds, EmployeesType),
      //     id,
      //     organizationName: OrganizationName,
      //     organizationsId: OrganizationsId,
      //     username: name,
      //     avatar: ''
      //   }

      //   commit('SET_USER_INFO', data)
      //   resolve(data)
      // } else {
      //   commit('SET_TOKEN', '')
      //   commit('SET_USER_INFO', {
      //     realname: null,
      //     roleIds: [],
      //     id: null,
      //     organizationName:  null,
      //     organizationsId:  null,
      //     username:  null,
      //     avatar:  null
      //   })
      //   removeToken()
      //   removeUser()
      //   resetRouter()
      //   reject()
      // }
    })
  },

  // 登出
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_USER_INFO', {
        realname: null,
        roleIds: [],
        id: null,
        organizationName: null,
        organizationsId: null,
        username: null,
        avatar: null
      })

      removeToken()
      removeUser()
      resetRouter()
      resolve()
    })
  },

  // 登录
  login({
    commit,
    state
  }, from) {
    return new Promise((resolve, reject) => {
      Api.Login(from)
        .then(res => {
          if (res.code == 200) {
            const result = res.data;

            // 存储token
            setToken(result.token);
            commit("SET_TOKEN", result.token);
            resolve(res);
          } else reject(res);
        })
        .catch(err => reject(err));
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
