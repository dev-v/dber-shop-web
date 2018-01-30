import {connect} from 'dva';
import {message, Steps} from 'antd';
import {runs, storage} from "../../../utils/util";
import Apply from './Apply';
import Audit from './Audit';
import Enquiry from './Enquiry';
import Business from './Business';

const Step = Steps.Step;

class Shop extends React.Component {
  componentWillMount() {
    this.state = {};
    this.caculateStatus();
  }

  caculateStatus() {
    runs(
      this.props.dispatch({type: 'global/getShop'}),
      this.props.dispatch({type: 'shopPosition/get', id: storage('global').shop.id})).then(([shop, position]) => {
      const current = Math.floor(shop.status / 10) - 1;
      let method, msg;
      position = position || {id: shop.id, name: shop.name};
      if (current == 0 || current == 1) {
        shop.feature = shop;
        msg = '申请成功，请等待审核结果！'
        method = 'apply'
        shop.position = position;
      } else if (current == 2) {
        msg = '提交成功，处理中！'
        method = 'enquiry'
      } else if (current == 3) {
        shop.feature = shop;
        msg = '保存成功！'
        method = 'save'
        shop.position = position;
      }
      this.setState({shop, current, method, msg, position});
    });
  }

  onSubmit = () => {
    const {shop, method, msg} = this.state;
    const status = shop.status;
    this.props.dispatch({
      type: `shop/${method}`,
      data: {...shop, feature: null},
    }).then((data) => {
      storage('global', {shop: data});
      message.success(msg);
      this.caculateStatus();
    });
    if (status == 11 ||status == 22 || status == 41 || status == 42) {
      this.savePosition();
    }
  }

  setPrice = () => {
    const {id, price, status} = this.state.shop;
    this.props.dispatch({
      type: `shop/setPrice`,
      data: {id, price, status},
    }).then((res) => {
      if (res > 0) {
        message.success('设置成功！');
      } else {
        message.warn('设置失败！');
      }
    });
  }

  savePosition = () => {
    const {name, position} = this.state.shop;
    this.props.dispatch({
      type: 'shopPosition/save',
      data: {
        ...position,
        name,
      },
    });
  }

  render() {
    const {current, shop} = this.state;
    return <div>
      <Steps current={current}>
        <Step title='注册'/>
        <Step title='审核'/>
        <Step title='询价'/>
        <Step title='营业'/>
      </Steps>
      <div style={{margin: '22px 0px'}}/>
      {
        current == 0 ?
          <Apply values={shop} onSubmit={this.onSubmit}/> : current == 1 ?
          <Audit values={shop} onSubmit={this.onSubmit}/> : current == 2 ?
            <Enquiry values={shop} onSubmit={this.onSubmit}/> : current == 3 ?
              <Business values={shop} onSubmit={this.onSubmit} setPrice={this.setPrice}/> : ''
      }
    </div>
  }
}

export default connect(({shop}) => shop)(Shop);
