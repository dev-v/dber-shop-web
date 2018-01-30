import {Alert, Button, Card, Form, InputNumber} from 'antd';
import {COL_4, mapPropsToForm, submit} from "../../../components/Form/FormHelper";
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
            <Form.Item label='期望门店价格（元）' {...COL_4}>
              {getFieldDecorator('expectPrice', {
                rules: [required],
              })(
                <InputNumber precision={2} min={5}/>
              )}
            </Form.Item>
            <Form.Item {...COL_4}>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Form.Item>
          </Form></Card></div>)
  }
}

export default Form.create(mapPropsToForm)(Enquiry);
