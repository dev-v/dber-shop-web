import {PureComponent} from 'react';
import {Card} from 'antd';
import Imgs from "../../../components/Imgs";
import ServiceSite from './ServiceSite';
import {ImgType} from "../../../components/Bucket";

export default class ServiceDetail extends PureComponent {
  state = {msg: undefined};

  constructor(props) {
    super(props);
  }

  render() {
    const {service} = this.props;
    return service.shareSite == 1 ?
      <Imgs title='服务图片设置' imgType={ImgType.SHOP_SERVICE} bsId={service.id}/> :
      <Card title='服务场地设置' bordered={false}>
        <ServiceSite service={service}/>
      </Card>
  }
}
