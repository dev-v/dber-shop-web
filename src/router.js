import React from 'react';
import {Router, Switch, Route} from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import {getUserIndex, getIndexPage, hasMenu, getNotFound} from './nav/Component';
import {shopService} from './utils/request';
import {storage} from './utils/util';

const removePreloader = () => {
  let preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
}

class RootRoute extends React.PureComponent {

  state = {};

  getComponent = () => {
    let component;
    const login = storage('login');
    if (login.logined) {
      if (location.pathname != '/') {
        location.pathname = '/';
      } else {
        component = getIndexPage();
      }
    } else {
      if (hasMenu('/user/' + location.pathname.split('/')[2])) {
        component = getUserIndex();
      } else {
        location.pathname = '/user/login';
      }
    }
    return component;
  }

  constructor(props) {
    super(props);
    if (storage('login')) {
      this.state.component = this.getComponent();
      removePreloader();
    } else {
      shopService.request('/login/getLogin').then((data) => {
        storage('login', data.response);
        this.setState({
          component: this.getComponent()
        });
      }).catch(() => {
        this.setState({
          component: getNotFound(),
        });
      }).finally(() => {
        removePreloader();
      });
    }

  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router history={this.props.history}>
          <Route component={this.state.component}></Route>
        </Router>
      </LocaleProvider>
    );
  }
}

export default function RouterConfig({history}) {
  return <RootRoute history={history}/>
}
