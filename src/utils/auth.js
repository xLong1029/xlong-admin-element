import Cookies from 'js-cookie'

const TokenKey = 'xlong_admin_token'
const UserKey = 'xlong_admin_user'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
