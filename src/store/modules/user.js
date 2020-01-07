/* eslint-disable */
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
      const token = getToken();

      Api.GetUser(token)
        .then(res => {
          // 登录成功
          if (res.code == 200) {
            const info = res.data;
            const avatar = info.userFace ? info.userFace : null;
            const roles = info.role ? strToArr(info.role, ',') : null;

            const data = {
              avatar,
              roles,
              realName: info.realName,
              username: info.username,
              nickName: info.nickName,              
              gender: info.gender,
              id: info.objectId
            }

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
