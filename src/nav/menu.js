export default [
  {
    title: '运营管理',
    path: 'operation',
    icon: 'solution',
    children: [
      {
        title: '团体课程管理',
        path: 'groupCourse',
        icon: 'solution',
        models: () => [import('../models/groupCourse'), import('../models/service'), import('../models/site'), import('../models/shopGroup')],
        component: () => import('../routes/Operation/GroupCourse'),
      },
      {
        title: '服务管理',
        path: 'service',
        icon: 'solution',
        models: () => [import('../models/service')],
        component: () => import('../routes/Operation/Service'),
      },
      {
        title: '会员卡管理',
        path: 'vipCard',
        models: () => [import('../models/service'), import('../models/vipCard'), import('../models/vipCardService')],
        component: () => import('../routes/Operation/VipCard'),
      },],
  },
  {
    title: '店铺设置',
    path: 'shop',
    icon: 'shop',
    children: [
      {
        title: '服务设置',
        path: 'service',
        icon: 'solution',
        models: () => [import('../models/service'), import('../models/site')],
        component: () => import('../routes/Shop/Service/Service'),
      },
      {
        title: '店铺设置',
        path: 'shop',
        icon: 'profile',
        selected: true,
        models: () => [import('../models/shop'), import('../models/shopPosition')],
        component: () => import('../routes/Shop/Set/Shop'),
      },
      {
        title: '共享场地设置',
        path: 'shopSite',
        icon: 'picture',
        models: () => [import('../models/site')],
        component: () => import('../routes/Shop/ShopSite'),
      },
      {
        title: '图片管理',
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
        component: () => import('./User/Login'),
      },
      {
        title: '注册',
        path: 'register',
        component: () => import('./User/Register'),
      },],
  }];
