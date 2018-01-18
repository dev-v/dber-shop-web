import {connect} from 'dva';
import {Row, Col, Icon, message} from 'antd';
import {PureComponent} from 'react';
import ShopForm from './ShopForm';
import Map from '../../components/Map/Map';
import {storage} from '../../utils/util';

const modelName = 'shop';

class Shop extends React.Component {
  state = {
    notShop: true,
    values: {},
    map: {
      address: undefined,
    }
  };

  mapEvents = {
    positionChange: (state) => {
      console.log(state);
      this.setState({
        ...this.state,
        map: {
          ...this.state.map,
          address: state.position.address,
        }
      });
    }
  }

  constructor(props) {
    super(props);
    const shop = storage('global').shop;
    if (shop) {
      this.state.notShop = false;
      shop.feature = shop;
      this.state.values = shop;
    } else {
      this.state.notShop = true;
    }
  }

  onSubmit = (data) => {
    this.props.dispatch({
      type: 'shop/save',
      data: {...this.state.values, feature: null},
    }).then((data) => {
      storage('global', {shop: data});
      message.success('保存成功！');
    });
  }

  render() {
    return (<div>
      <ShopForm values={this.state.values} onSubmit={this.onSubmit}/>
      <div>
        <span>{this.state.map.address}   </span>
        <Icon type="copy" style={{cursor: 'pointer', color: '#108ee9'}} title={'点我复制'} onClick={() => {
          this.setState({
            ...this.state,
            values: {
              ...this.state.values,
              address: this.state.map.address,
            }
          });
        }}/>
        <Row>
          <Col span={22} style={{height: '500px'}}>
            <Map events={this.mapEvents}/>
          </Col>
        </Row></div>
    </div>)
  }
}

export default connect(({shop}) => shop)(Shop);
