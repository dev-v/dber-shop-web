export default [
  {
    title: '店铺管理',
    path: 'shop',
    icon: 'profile',
    children: [
      {
        title: '店铺',
        path: 'shop',
        selected: true,
        models: () => [import('../models/shop')],
        component: () => import('../routes/Shop'),
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
        models: () => [import('../models/login')],
        component: () => import('../routes/User/Login'),
      },],
  }];
