const getters = {
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.userInfo.avatar,
  realname: state => state.user.userInfo.realname,
  username: state => state.user.userInfo.username,
  roleIds: state => state.user.userInfo.roleIds,
  organizationName: state => state.user.userInfo.organizationName,
  organizationId: state => state.user.userInfo.organizationId,
  permissionRoutes: state => state.permission.routes,
  oidcSettings: state => state.oidc.oidcSettings,
  oidcAuth: state => state.oidc.oidcAuth
}
export default getters
