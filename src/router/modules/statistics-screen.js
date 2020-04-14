const router = {
  path: '/statistics-screen',
  component: () => import('@/layout/fullscreen'),
  meta: {
    title: '监控大屏',
    icon: 'el-icon-s-platform',
    roles: ['admin', 'manage']
  },
  children: [
    {
      path: 'page-one',
      component: () => import('@/views/statistics-screen/page-one/index'),
      name: 'StatisticsScreenPageOne',
      meta: {
        title: '展示一',
        icon: 'el-icon-s-platform',
        roles: ['admin', 'manage']
      }
    },
    {
      path: 'page-two',
      component: () => import('@/views/statistics-screen/page-two/index'),
      name: 'StatisticsScreenPageTwo',
      meta: {
        title: '展示二',
        icon: 'el-icon-s-platform',
        roles: ['admin', 'manage']
      }
    }
  ]
}

export default router
