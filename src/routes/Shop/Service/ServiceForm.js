import {buildMapPropsToFields, buildValuesChange, COL_4, COL_BTN, submit} from "../../../components/Form/FormHelper";
import {Button, Card, Form, InputNumber} from 'antd';
import {required} from "../../../utils/rules";
import {PureComponent} from 'react';
import Show from "../../../components/Form/Show";
import YesNoSwitch from "../../../components/Form/YesNoSwitch";
import ServiceDetail from "./ServiceDetail";

const FormItem = Form.Item;

class ServiceForm extends PureComponent {

  render() {
    const {form, onSubmit, values} = this.props, {getFieldDecorator} = form;
    const {shareSite, group, shopService} = values;
    this.state = {...shopService};
    return (<div>
      <Card title={`基本信息（${values.name}）`} bordered={false}>
        <Form layout='inline' onSubmit={(e) => {
          submit(e, form, onSubmit);
        }}>
          <FormItem label='支持场地共享' {...COL_4}>
            {shareSite == 1 ? <Show label={'场地共享'}/> :
              shareSite == 2 ? <Show label={'需预定或预约'}/> :
                getFieldDecorator('shareSite')(
                  <YesNoSwitch tip='开启后，允许多人共用场地，若关闭则需预约（支持到店后下单）！'/>
                )
            }
          </FormItem>

          <FormItem style={{display: shopService.shareSite == 2 ? 'inline-block' : 'none',}}
                    label='场地单价（每小时）'  {...COL_4}>
            {getFieldDecorator('price', {rules: [required]})(
              <InputNumber precision={2} min={1}/>
            )}
          </FormItem>

          {
            group == 1 && <FormItem label='开设团体课程' {...COL_4}>
              {getFieldDecorator('group')(
                <YesNoSwitch tip='开启后，可在团体课程设置中开设团体课程，团体课程可以额外收费（但不建议收费）！'/>
              )}
            </FormItem>
          }

          <FormItem style={{display: shopService.group == 1 ? 'inline-block' : 'none',}} label='课程单价' {...COL_4}>
            {getFieldDecorator('groupPrice', {rules: [required]})(
              <InputNumber precision={2} min={0}/>
            )}
          </FormItem>

          <FormItem label='允许私教授课' {...COL_4}>
            {getFieldDecorator('coach')(
              <YesNoSwitch tip='私教授课课时费的40-60%归店铺所有！'/>
            )}
          </FormItem>

          <FormItem {...COL_BTN}>
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
