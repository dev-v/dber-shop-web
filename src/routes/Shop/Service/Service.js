import {connect} from 'dva';
import {Alert, message, Tabs} from 'antd';
import {dictCache, runs} from '../../../utils/util';
import {DictCategory} from "../../../components/TableEdit/CellHelp";
import ServiceForm from './ServiceForm';
import TagButton from "../../../components/Form/TagButton";

const TabPane = Tabs.TabPane;

class Service extends React.PureComponent {

  state = {
    types: {},
    service: undefined,
    allService: undefined,
  }

  componentWillMount() {
    runs(this.props.dispatch({
      type: 'service/queryWithoutPage',
    }), this.props.dispatch({
      type: 'pubPlat/getService',
    }), dictCache.getDict(DictCategory.fitnessType)).then(([shopService, allService, serviceType]) => {
      this.initService(serviceType, allService, shopService);
    });
  }

  initService = (serviceType, allService, shopService) => {
    serviceType.all = '全部';
    const types = {}, services = {};
    for (let val in serviceType) {
      types[val] = {label: serviceType[val], services: []};
    }
    allService.map((service) => {
      services[service.id] = service;
      types[service.category].services.push(service);
      types.all.services.push(service);
    });
    shopService.map((service) => {
      services[service.serviceId].shopService = {...service};
      services[service.serviceId].setting = true;
    });
    this.setState({
      ...this.state,
      allService,
      types,
    });
  }

  onSubmit = (data) => {
    this.props.dispatch({
      type: 'service/save',
      data: this.state.service.shopService,
    }).then((data) => {
      this.state.service.shopService = data;
      this.state.service.setting = true;
      this.setState({...this.state, service: {...this.state.service}});
      message.success('保存成功！');
    });
  }

  tagButtonProps = {
    labelField: 'name',
    valueField: 'id',
  }

  tagButtonClick = (service) => {
    this.state.allService.map((s) => {
      s._active = false;
    });
    service._active = true;
    if (!service.shopService) {
      const {id, name, group, shareSite} = service;
      service.shopService = {
        serviceName: name,
        serviceId: id,
        group: group,
        price: 1,
        groupPrice: 0.0001,
        coach: 1,
        shareSite: shareSite == 1 ? 1 : 2,
      };
    }
    this.setState({
      ...this.state,
      types: {...this.state.types},
      service,
    });
  }

  render() {
    const {types, service} = this.state;
    return <div>
      <Tabs>
        {
          Object.keys(types).map((val) => {
            const {label, services} = types[val];
            return <TabPane tab={label} key={val}>
              <TagButton tags={services} {...this.tagButtonProps} onClick={(service) => {
                this.tagButtonClick(service);
              }}/>
            </TabPane>
          })
        }
      </Tabs>
      {service ?
        <ServiceForm onSubmit={this.onSubmit} values={service}/> :
        <Alert message='您可以选择上面的服务进行详细服务设置！' style={{marginTop: '16px'}}/>
      }
    </div>
  }
}

export default connect(({service}) => ({service}))(Service);
