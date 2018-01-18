import {connect} from 'dva';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

class Service extends React.PureComponent {

  state = {
    aa: 1
  }

  componentWillMount() {
    this.setState({...this.state, aa: Math.random()});
  }

  render() {
    return <Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1">{this.state.aa}</TabPane>
      <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
      <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
    </Tabs>
  }
}

export default connect(({shop}) => ({shop}))(Service);
