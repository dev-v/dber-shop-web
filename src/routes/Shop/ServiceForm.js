import {
  COL_INLINE,
  COL_INLINE_BUTTON,
  buildValuesChange,
  buildMapPropsToFields,
  submit
} from "../../components/Form/FormHelper";
import {Form, InputNumber, Button, Card} from 'antd';
import {required} from "../../utils/rules";
import {PureComponent} from 'react';
import Show from "../../components/Form/Show";
import YesNoSwitch from "../../components/Form/YesNoSwitch";
import ServiceDetail from "./ServiceDetail";

const FormItem = Form.Item;

class ServiceForm extends PureComponent {
  render() {
    const {form, onSubmit, values} = this.props, {getFieldDecorator} = form;
    const {shareSite, group, shopService} = values;
    return (<div>
      <Card title={`基本信息（${values.name}）`} bordered={false}>
        <Form layout='inline' onSubmit={(e) => {
          submit(e, form, onSubmit);
        }}>
          <FormItem label='是否支持场地共享' {...COL_INLINE}>
            {shareSite == 1 ? <Show label={'场地共享'}/> :
              shareSite == 2 ? <Show label={'需预定或预约'}/> :
                getFieldDecorator('shareSite')(
                  <YesNoSwitch tip='开启后，允许多人共用场地，若关闭则需预约（支持到店后下单）！'/>
                )
            }
          </FormItem>

          {
            shopService.shareSite == 2 && <FormItem label='消费单价（每小时）' {...COL_INLINE}>
              {getFieldDecorator('price', {rules: [required]})(
                <InputNumber precision={2} min={1}/>
              )}
            </FormItem>
          }

          {
            group == 1 && <FormItem label='是否开设团体课程' {...COL_INLINE}>
              {getFieldDecorator('group')(
                <YesNoSwitch tip='开启后，可在团体课程设置中开设团体课程！'/>
              )}
            </FormItem>
          }

          <FormItem label='允许开设私教课程' {...COL_INLINE}>
            {getFieldDecorator('coach')(
              <YesNoSwitch tip='开启后，可允许私教授课！'/>
            )}
          </FormItem>

          <FormItem {...COL_INLINE_BUTTON}>
            <Button type='primary' htmlType='submit'>保存</Button>
          </FormItem>
        </Form>
      </Card>
      <ServiceDetail service={{...shopService}}/>
    </div>)
  }
}

export default Form.create({
  onValuesChange: ({values}, value) => {
    buildValuesChange(values.shopService, value);
  },
  mapPropsToFields: ({values}) => {
    return buildMapPropsToFields(values.shopService);
  }
})(ServiceForm);
