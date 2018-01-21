import {PureComponent} from 'react';
import {Card} from 'antd';
import Imgs from "../../components/Imgs";
import ServiceSite from './ServiceSite';

export default class ServiceDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {service} = this.props;
    return service.shareSite == 1 ?
      <Card title='服务图片设置' bordered={false}>
        <Imgs action={'aa'}/>
      </Card> :
      <Card title='服务场地设置' bordered={false}>
        <ServiceSite service={service}/>
      </Card>
  }
}
