import {Alert, Button, Card, Form, InputNumber} from 'antd';
import {COL_2 as COL, COL_BTN, mapPropsToForm, submit} from "../../../components/Form/FormHelper";
import {required} from "../../../utils/rules";

class Enquiry extends React.Component {

  render() {
    const {form, onSubmit, values} = this.props, {getFieldDecorator} = form;
    const {basePrice, status, expectPrice} = values;
    return (
      <div>
        {(status == 32) && <Alert message='已有提交的期望门店价在处理中，处理完成之前，您可以重新提交期望门店价！'/>}
        {(status == 33) && <Alert type='warning' message='期望价设置过高，请重新设置！'/>}
        {(status == 34) && <Alert type='warning' message='期望价设置过低，请重新设置！'/>}
        <Card bordered={false} title='设置期望门店价'>
          <Form layout='inline' onSubmit={(e) => {
            submit(e, form, onSubmit);
          }}>
            {
              basePrice &&
              <Form.Item label='建议门店价格范围（元）' {...COL}>
                <span>{`${basePrice * 0.7}  -  ${basePrice * 1.3}`}</span>
              </Form.Item>
            }
            <Form.Item label='期望门店价格（元）' {...COL}>
              {getFieldDecorator('expectPrice', {
                rules: [required],
              })(
                <InputNumber precision={2}/>
              )}
            </Form.Item>
            <Form.Item {...COL_BTN}>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Form.Item>
          </Form></Card></div>)
  }
}

export default Form.create(mapPropsToForm)(Enquiry);
