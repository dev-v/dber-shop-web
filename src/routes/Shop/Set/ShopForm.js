import {connect} from 'dva';
import {Button, Card, Form, Input, InputNumber} from 'antd';
import {PureComponent} from 'react';
import Map from '../../../components/Map/Map';
import {max, phone, required} from "../../../utils/rules";
import {COL_2, COL_BTN, FMT_TIME, mapPropsToForm, submit} from "../../../components/Form/FormHelper";
import TagCheck from '../../../components/Form/TagCheck';
import FTime from '../../../components/Form/FTime';

const FormItem = Form.Item;

const tags = [
  {value: 'bathing', label: '洗浴中心',},
  {value: 'sauna', label: '桑拿',},
  {value: 'airSystem', label: '新风系统',},
  {value: 'physicalTesting', label: '体能测试',},
  {value: 'chain', label: '连锁经营',},
];

class ShopForm extends React.Component {
  state = {
    shop: {},
    map: {
      address: undefined,
    }
  };

  constructor(props) {
    super(props);
    this.state.shop = props.values;
  }

  mapEvents = {
    positionChange: (state) => {
      const {position} = this.state.shop;
      const {location} = state;
      position.lng = location[0];
      position.lat = location[1];
      const {address} = state.position;
      this.setState({
        ...this.state,
        map: {
          address,
        }
      });
    }
  }

  copyAddress = () => {
    const {address} = this.state.map;
    this.state.shop.address = address;
    this.props.form.setFieldsValue({address})
  }

  render() {
    const {form, onSubmit, confirmText,} = this.props, {getFieldDecorator} = form;
    const {position} = this.state.shop;
    const location = position.lng && [position.lng, position.lat];
    return (<div>
      <Form layout={'inline'} onSubmit={(e) => {
        submit(e, form, onSubmit);
      }}>
        <Card title='基础信息' bordered={false}>
          <FormItem label='店铺名称' {...COL_2}>
            {getFieldDecorator('name', {
              rules: [required, max(20)],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label='电话' {...COL_2}>
            {getFieldDecorator('tellphone', {
              rules: [phone],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label='经理姓名' {...COL_2}>
            {getFieldDecorator('manager', {
              rules: [max(10)],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label='经理电话' {...COL_2}>
            {getFieldDecorator('managerPhone', {
              rules: [phone],
            })(
              <Input/>
            )}
          </FormItem>
        </Card>

        <Card title='店铺特征' bordered={false}>
          <FormItem label='营业开始时间' {...COL_2}>
            {getFieldDecorator('businessBegin', {
              rules: [required],
            })(
              <FTime format={FMT_TIME}/>
            )}
          </FormItem>
          <FormItem label='营业结束时间' {...COL_2}>
            {getFieldDecorator('businessEnd', {
              rules: [required],
            })(
              <FTime format={FMT_TIME}/>
            )}
          </FormItem>
          <FormItem label='店铺标签' {...COL_2}>
            {getFieldDecorator('feature', {})(
              <TagCheck tags={tags}/>
            )}
          </FormItem>
          <FormItem label='占地面积（平米）' {...COL_2}>
            {getFieldDecorator('area', {
              rules: [],
            })(
              <InputNumber precision={0}/>
            )}
          </FormItem>
        </Card>
        <Card title='店铺地址' bordered={false}>
          <FormItem label='地址' {...COL_2}>
            {getFieldDecorator('address', {
              rules: [required],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...COL_BTN}>
            <Button type='primary' htmlType='submit'>{confirmText}</Button>
          </FormItem>
          <div>
            <span>{this.state.map.address}</span>
            <Button type='primary' size='small' style={{float: 'right', bottom: '2px'}}
                    onClick={this.copyAddress}>复制地址</Button>
            <div style={{height: '500px'}}>
              <Map events={this.mapEvents} location={location}/>
            </div>
          </div>
        </Card>
      </Form>
    </div>)
  }
}

export default Form.create(mapPropsToForm)(ShopForm);
