import ShopForm from './ShopForm';

export default class Apply extends React.Component {
  render() {
    return <ShopForm {...this.props} confirmText='店铺申请'/>
  }
}
