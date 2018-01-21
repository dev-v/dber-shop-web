import {Form, Input, Card, Row, Col, InputNumber, Button,} from 'antd';
import {PureComponent} from 'react';
import TagCheck from '../../components/Form/TagCheck';
import {max, required, phone} from '../../utils/rules';
import {COL, FMT_TIME, mapPropsToForm, submit} from '../../components/Form/FormHelper';
import FTime from '../../components/Form/FTime';

const FormItem = Form.Item;

const tags = [
  {value: 'bathing', label: '洗浴中心',},
  {value: 'sauna', label: '桑拿',},
  {value: 'airSystem', label: '新风系统',},
  {value: 'physicalTesting', label: '体能测试',},
  {value: 'chain', label: '连锁经营',},
];

class ShopForm extends PureComponent {
  render() {
    const {form, onSubmit} = this.props, {getFieldDecorator} = form;
    return (<Form onSubmit={(e) => {
      submit(e, form, onSubmit);
    }}>
      <Card title='基础信息' bordered={false}>
        <Row>
          <Col span={12}>
            <FormItem label='店铺名称' {...COL}>
              {getFieldDecorator('name', {
                rules: [required, max(20)],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='电话' {...COL}>
              {getFieldDecorator('tellphone', {
                rules: [phone],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label='经理姓名' {...COL}>
              {getFieldDecorator('manager', {
                rules: [max(10)],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='经理电话' {...COL}>
              {getFieldDecorator('managerPhone', {
                rules: [phone],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Card>

      <Card title='店铺特征' bordered={false}>
        <Row>
          <Col span={12}>
            <FormItem label='营业开始时间' {...COL}>
              {getFieldDecorator('businessBegin', {
                rules: [required],
              })(
                <FTime format={FMT_TIME}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='营业结束时间' {...COL}>
              {getFieldDecorator('businessEnd', {
                rules: [required],
              })(
                <FTime format={FMT_TIME}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label='店铺标签' {...COL}>
              {getFieldDecorator('feature', {})(
                <TagCheck tags={tags}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='占地面积（平米）' {...COL}>
              {getFieldDecorator('area', {
                rules: [],
              })(
                <InputNumber precision={0}/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card title='店铺地址' bordered={false}>
        <Row>
          <Col span={12}>
            <FormItem label='地址' {...COL}>
              {getFieldDecorator('address', {
                rules: [required],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              <Button type='primary' htmlType='submit'>保存</Button>
            </FormItem>
          </Col>
        </Row>
      </Card>
    </Form>)
  }
}

export default Form.create(mapPropsToForm)(ShopForm);
