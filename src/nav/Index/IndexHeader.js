import React, {PureComponent} from 'react';
import {Layout, Menu, Icon, Spin, Dropdown, Avatar} from 'antd';
import styles from './IndexHeader.less';
import {storage, removeStorage} from '../../utils/util';
import {loginService} from '../../utils/request';

const {Header} = Layout;

const menuClick = {
  logout: () => {
    loginService.get('/login/logout').then(() => {
      removeStorage('login');
      location.pathname = '/';
    });
  }
}

export default class IndexHeader extends PureComponent {
  onMenuClick = (item) => {
    menuClick[item.key]();
  }

  render() {
    const logined = storage('login') || {};
    const {account = {}} = logined;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled><Icon type="user"/>个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting"/>设置</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header}>
        <div className={styles.right}>
          {account.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={account.avatar}/>
                <span className={styles.name}>{account.name}</span>
              </span>
            </Dropdown>
          ) : <Spin size="small" style={{marginLeft: 8}}/>}
        </div>
      </Header>
    );
  }
}
