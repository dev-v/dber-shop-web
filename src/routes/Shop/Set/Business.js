import ShopForm from './ShopForm';
import {Alert, Button, Card, Form, InputNumber} from 'antd';
import {COL_4, mapPropsToForm, submit} from "../../../components/Form/FormHelper";
import {required} from "../../../utils/rules";

class Business extends React.Component {
  render() {
    const {form, setPrice,} = this.props, {getFieldDecorator} = form;
    const {values} = this.props;
    const {status, basePrice} = values;
    const minPrice = 0.7 * basePrice, maxPrice = 1.3 * basePrice;
    return <div>
      {status == 41 && <Alert type='warning' message='您的店铺已核对成功，现在去设置或启用服务，开始营业吧！'/>}
      <Form layout={'inline'} onSubmit={(e) => {
        submit(e, form, setPrice);
      }}>
        <Card bordered={false} title='门店价格设置'
              extra={`当前可设置范围（元）：【${minPrice}  -  ${maxPrice}】（仅对共享场地类型服务收取，订场服务不会收取）`}>
          <Form.Item label='门店价格（元）' {...COL_4}>
            {getFieldDecorator('price', {
              rules: [required],
            })(
              <InputNumber precision={2} min={minPrice} max={maxPrice}/>
            )}
          </Form.Item>
          <Form.Item {...COL_4}>
            <Button type='primary' htmlType='submit'>设置</Button>
          </Form.Item>
        </Card>
      </Form>
      <ShopForm {...this.props} confirmText='保存信息'/></div>
  }
}

export default Form.create(mapPropsToForm)(Business);
