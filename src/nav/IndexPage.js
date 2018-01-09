import {Layout, Menu, Icon} from 'antd';
import React from 'react';
import SideMenu from './SideMenu';
import ContentSwitch from './ContentSwitch';
import styles from './index.less';

const {Header, Content, Footer} = Layout;

class IndexPage extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const menuClick = {};
    return (
      <Layout>
        <Layout style={{minHeight: '100vh'}}>
          <SideMenu {...this.state}
                    onClick={(item, items) => {
                      menuClick.changeComponent &&
                      menuClick.changeComponent(item, items);
                    }}/>
          <Layout>
            <Header>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{background: '#fff', padding: '16px'}}>
              <ContentSwitch menuClick={menuClick}/>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default IndexPage;
