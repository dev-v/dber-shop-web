import menu from './menu';
import dynamic from 'dva/dynamic';

let app;

const setApp = (useApp) => {
  app = useApp;
};

let notFound, indexPage, userIndex;

const getIndexPage = () => {
  if (!indexPage) {
    indexPage = dynamic({
      app,
      models: () => [import('../models/global')],
      component: () => import('./Index/IndexPage'),
    });
  }
  return indexPage;
};

const getNotFound = () => {
  if (!notFound) {
    notFound = dynamic({
      app,
      component: () => import('../routes/Exception/404'),
    });
  }
  return notFound;
};

const getUserIndex = () => {
  if (!userIndex) {
    userIndex = dynamic({
      app,
      component: () => import('./User/UserIndex'),
    });
  }
  return userIndex;
};

const getMenu = (paths, menus) => {
  let path, menu;
  for (let i = 0, len = paths.length; i < len; i++) {
    path = paths[i];
    for (let j = 0, jLen = menus.length; j < jLen; j++) {
      menu = menus[j];
      if (path == menu.path) {
        if (i == len - 1) {
          return menu;
        } else if (menu.children) {
          menus = menu.children;
          break;
        } else {
          return menu;
        }
      }
    }
  }
};

const getItem = (path) => {
  if (path.startsWith('/')) {
    path = path.substr(1);
  }
  const paths = path.split('/');
  return getMenu(paths, menu);
};

const pathDynamics = new Map();

const getComponent = (path) => {
  let component = pathDynamics.get(path);

  if (!component) {
    const item = getItem(path);
    if (item && item.component) {
      component = dynamic({
        app,
        models: item.models,
        component: item.component,
      });
      pathDynamics.set(item.realPath, component);
    } else {
      return getNotFound();
    }
  }

  return component;
};

const hasMenu = (path) => {
  return getItem(path) ? true : false;
};

export {
  getComponent,
  setApp,
  getIndexPage,
  menu,
  getUserIndex,
  getNotFound,
  hasMenu,
};
