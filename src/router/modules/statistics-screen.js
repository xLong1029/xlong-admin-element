const router = {
  path: '/statistics-screen',
  component: () => import('@/views/statistics-screen/index'),
  name: 'StatisticsScreen',
  meta: {
    title: '监控大屏',
    icon: 'el-icon-s-platform',
    roles: ['admin', 'manage']
  }
}

export default router
