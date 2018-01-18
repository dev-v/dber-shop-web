import {Layout} from 'antd';
import React from 'react';
import SideMenu from './SideMenu';
import ContentSwitch from './ContentSwitch';
import IndexHeader from './IndexHeader';
import {connect} from 'dva';
import GlobalInit from './GlobalInit';

const {Content, Footer} = Layout;

class IndexPage extends React.Component {

  componentDidMount() {
    GlobalInit(this.props,()=>{
    });
  }

  state = {
    contentProps: {
      item: undefined,
      items: undefined,
      showBreadcrumb: false,
    }
  }

  onMenuSelect = (item, items) => {
    this.setState({
      ...this.state,
      contentProps: {
        ...this.state.contentProps,
        item,
        items,
      }
    });
  }

  render() {
    return (
      <Layout>
        <Layout style={{minHeight: '100vh'}}>
          <SideMenu onSelect={this.onMenuSelect}/>
          <Layout>
            <IndexHeader/>
            <Content style={{background: '#fff', padding: '16px'}}>
              <ContentSwitch {...this.state.contentProps}/>
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

export default connect((global) => ({global}))(IndexPage);
