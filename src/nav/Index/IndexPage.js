import {Layout} from 'antd';
import React from 'react';
import SideMenu from './SideMenu';
import ContentSwitch from './ContentSwitch';
import './IndexPage.less';
import {connect} from 'dva';
import IndexHeader from './IndexHeader';
import {storage} from '../../utils/util';
import {shopService} from '../../utils/request';

const {Content, Footer} = Layout;

export default class IndexPage extends React.Component {
  evnents = {
    changeComponent: undefined,
  };

  init = () => {
    if (!storage('shop')) {
      shopService.get(`shop/get/${storage('login').accountId}`).then((data) => {
        if (data.code == 200) {
          storage('shop', data.response);
          this.setState({
            ...this.state
          });
        }
      });
    }
  }

  constructor(props) {
    super(props);
    this.init();
  }

  render() {
    return (
      <Layout>
        <Layout style={{minHeight: '100vh'}}>
          <SideMenu {...this.state} events={this.evnents}/>
          <Layout>
            <IndexHeader {...this.state}/>
            <Content style={{background: '#fff', padding: '16px'}}>
              <ContentSwitch menuClick={this.evnents} showBreadcrumb={false}/>
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
