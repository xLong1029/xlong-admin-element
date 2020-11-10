const router = {
  path: '/account-manage',
  component: () => import('@/layout/default'),
  redirect: '/account-manage/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/account-manage/index'),
      name: 'AccountManage',
      meta: {
        title: '账户管理',
        icon: 'el-icon-user-solid',
        roles: ['admin']
      }
    }
  ]
}

export default router
