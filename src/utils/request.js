import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

export function handelRequestError(error) {
  switch (error.response.status) {
    case 401:
      Message({
        message: '未授权！请重新登录',
        type: 'error',
        duration: 5 * 1000
      })
      setTimeout(() => {
        store.dispatch('user/logout')
      }, 500)
      break
    case 403:
      Message({
        message: error.response.content,
        type: 'error',
        duration: 5 * 1000
      })
      break
    case 500:
      Message({
        message: '系统繁忙',
        type: 'error',
        duration: 5 * 1000
      })
      break
    default:
      break
  }
}

export function configSetting(config) {
  config.headers['Content-Type'] = 'application/json'

  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + store.getters.token
  }
  return config
}

const service = axios.create({
  baseURL: '', // url = base url + request url
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    return configSetting(config)
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.status) {
      if (res.status.code === 0) {
        Message({
          message: res.status.text || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        return Promise.reject(new Error(res.status.text || 'Error'))
      } else {
        return res
      }
    }

    return res.custom
  },
  error => {
    if (error && error.response) {
      handelRequestError(error)
    }
    return Promise.reject(error)
  }
)

export default service
