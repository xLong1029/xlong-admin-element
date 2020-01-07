const router = {
  path: '/statistics-screen/index',
  component: () => import('@/views/statistics-screen/index'),
  name: 'StatisticsScreen',
  meta: {
    title: '监控大屏',
    icon: 'el-icon-s-platform',
    roles: ['1']
  }
}

export default router
