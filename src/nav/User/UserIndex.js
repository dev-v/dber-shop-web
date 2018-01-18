import {PureComponent} from 'react';
import {Route, Switch, Link} from 'dva/router';
import {connect} from 'dva';
import GlobalFooter from '../../components/GlobalFooter/index';
import styles from './UserIndex.less';
import logo from '../../assets/logo.svg';
import {getComponent} from '../Component';
import {storage} from "../../utils/util";

export default class UserIndex extends PureComponent {

  render() {
    const login = storage('login') || {};
    if (login.logined) {
      location.pathname = '/';
    }
    const {pathname} = location;
    const component = getComponent(pathname);
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo}/>
              <span className={styles.title}>DBER SHOP</span>
            </Link>
          </div>
          <div className={styles.desc}>动吧店铺描述</div>
        </div>
        <Switch>
          <Route component={component}/>
        </Switch>
        <GlobalFooter className={styles.footer}/>
      </div>
    );
  }
}
