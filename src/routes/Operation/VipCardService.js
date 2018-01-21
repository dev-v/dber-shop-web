import {connect} from 'dva';
import TagCheck from "../../components/Form/TagCheck";

const columns = [
  {
    title: '服务名称',
    dataIndex: 'serviceName',
  },];

class VipCardService extends React.Component {
  state = {
    services: undefined,
    checkedServices: [],
  }

  componentWillMount() {
    this.props.dispatch({type: 'service/queryWithoutPage'}).then((shopServices) => {
      const services = [];
      shopServices.map((service) => {
        const {serviceId, serviceName} = service;
        services.push({
          shopServiceId: serviceId,
          serviceName,
          value: serviceId
        });
      });
      this.setState({
        ...this.state,
        services,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const {card} = nextProps;
    if (card) {
      const cardId = card.id;
      this.state.cardId = cardId;
      this.props.dispatch({
        type: 'vipCardService/queryWithoutPage',
        condition: {
          shopVipCardId: cardId,
        }
      }).then((cardServices) => {
        const checkedServices = {};
        cardServices.map((s) => {
          checkedServices[s.shopServiceId] = 1;
        });
        this.setState({
          ...this.state,
          checkedServices,
        });
      });
    }
  }

  onChange = (val, service) => {
    console.log(val, service);
    service.shopVipCardId = this.state.cardId;
    if (val[service.value] == 1) {
      this.props.dispatch({
        type: 'vipCardService/save',
        data: service,
      });
    } else {
      this.props.dispatch({
        type: 'vipCardService/delWithCondition',
        condition: service,
      });
    }
  }

  render() {
    return (this.state.services && this.state.cardId) ?
      <TagCheck tags={this.state.services} value={this.state.checkedServices} labelField='serviceName'
                onChange={this.onChange}/> :
      <div>选择左边的会员卡，进行服务关联！</div>;
  }
}

export default connect(({service, vipCardService}) => ({service, vipCardService}))(VipCardService);
