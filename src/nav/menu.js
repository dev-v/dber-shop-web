export default [
  {
    title: '店铺管理',
    path: 'shop',
    icon: 'shop',
    children: [
      {
        title: '服务设置',
        path: 'service',
        icon: 'solution',
        selected: true,
        models: () => [import('../models/shop')],
        component: () => import('../routes/Shop/Service'),
      },
      {
        title: '店铺设置',
        path: 'shop',
        icon: 'profile',
        models: () => [import('../models/shop')],
        component: () => import('../routes/Shop/Shop'),
      },
      {
        title: '图片设置',
        path: 'img',
        icon: 'picture',
        models: () => [import('../models/shop')],
        component: () => import('../routes/Shop/Img'),
      },],
  },
  {
    title: '登录管理',
    path: 'user',
    visible: false,
    children: [
      {
        title: '登录',
        path: 'login',
        selected: true,
        component: () => import('../routes/User/Login'),
      },
      {
        title: '登录',
        path: 'register',
        selected: true,
        component: () => import('../routes/User/Register'),
      },],
  }];
