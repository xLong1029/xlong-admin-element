
import {
  getToken,
  setToken,
  removeToken
} from 'utils/auth'
import { strToArr } from 'utils'
import Api from 'api/user'
import {
  resetRouter
} from 'router'

// 清空账户信息
function clearAccount(_commit) {
  removeToken();
  resetRouter();
  _commit('SET_TOKEN', null);
  _commit('SET_USER', {
    id: 0,
    avatar: '',
    gender: '',
    username: '',
    realName: '',
    nickName: '',
    roles: []
  });
}

const state = {
  token: getToken(),
  user: {
    id: 0,
    avatar: '',
    gender: '',
    username: '',
    realName: '',
    nickName: '',
    roles: []
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
}

const actions = {
  // 获取用户信息
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      Api.GetUser()
        .then(res => {
          console.log(res);
          const { code, data } = res;
          // 登录成功
          if (code == 200) {
            data.roles = data.roles ? strToArr(data.roles, ',') : null

            commit('SET_USER', data);
            resolve(data);
          }
          // 登录失败
          else {
            clearAccount(commit);
            reject(res);
          }
        })
        .catch(err => {
          clearAccount(commit);
          reject(err);
        });
    })
  },

  // 登出
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      clearAccount(commit);
      resolve();
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
          const { code, data } = res;
          if (code == 200) {
            // 存储token
            setToken(data.token);
            commit("SET_TOKEN", data.token);
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
