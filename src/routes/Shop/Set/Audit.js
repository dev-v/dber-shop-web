import ShopForm from './ShopForm';
import {Alert} from 'antd';

export default class Audit extends React.Component {
  render() {
    const {status} = this.props.values;
    return status == 21 ?
      <Alert message='店铺申请正在审核中，请耐心等待审核结果！'/> :
      <div>
        <Alert type='warning' message='审核失败，提交信息无法验证店铺真实性，如店铺地址错误、店铺重复等，您可以补全或更正信息后重新申请！'/>
        <ShopForm {...this.props} confirmText='重新申请'/>
      </div>
  }
}
