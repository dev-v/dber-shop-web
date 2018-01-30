import {Button, Card, Col, Form, Input, Row,} from 'antd';
import {connect} from 'dva';
import {max, phone, required} from '../../utils/rules';
import {COL_1, COL_2, COL_BTN, COL_LBL_2, mapPropsToForm, submit} from '../../components/Form/FormHelper';
import FSelect from "../../components/Form/FSelect";
import FDate from "../../components/Form/FDate";
import TimeSlider from "../../components/Form/TimeSlider";
import {runs} from "../../utils/util";

const FormItem = Form.Item;

class GroupCourseForm extends React.Component {


  componentWillMount() {
    const {siteId, bookingDate} = this.props.values;
    this.state = {
      slider: {checkes: []},
      siteId,
      bookingDate,
    };
    this.siteOrDateChange();
    runs(this.props.dispatch({
      type: 'service/queryWithoutPage',
      condition: {group: 1},
    }), this.props.dispatch({
      type: 'site/queryWithoutPage',
      condition: {shopServiceId: 1},
    })).then(([services, sites]) => {
      this.setState({
        ...this.state,
        services,
        sites,
      });
    });
  }

  siteOrDateChange = () => {
    const {siteId, bookingDate} = this.state;
    if (siteId && bookingDate) {
      this.props.dispatch({
        type: 'pubShop/getSiteBookings',
        condition: {
          siteId,
          bookingDate,
        },
      }).then((siteBookings) => {
        const checkes = [];
        siteBookings.map((booking) => {
          checkes.push([booking.timeBegin, booking.timeEnd])
        });
        this.setState({
          ...this.state,
          slider: {checkes},
        });
      });
    }
  }

  render() {
    const {form, onSubmit, values, operate} = this.props, {getFieldDecorator} = form;
    return (<Form layout='inline' onSubmit={(e) => {
      submit(e, form, onSubmit);
    }}>
      <Card title={`【${operate}】课程基础信息`} extra={<Button type='primary' onClick={this.props.onBack}>返回</Button>}
            bordered={false}>
        <Row>
          <Col span={12}>
            <FormItem label='选择服务' {...COL_1} {...COL_LBL_2}>
              {getFieldDecorator('shopServiceId')(
                <FSelect datas={this.state.services} labelField='serviceName' onChange={(_, {serviceName}) => {
                  values.serviceName = serviceName;
                }}/>
              )}
            </FormItem>
            <FormItem label='教练姓名' {...COL_1} {...COL_LBL_2}>
              {getFieldDecorator('coacherName', {
                rules: [max(20)],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label='教练电话' {...COL_1} {...COL_LBL_2}>
              {getFieldDecorator('coacherCellphone', {
                rules: [phone],
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='课程介绍' {...COL_1} {...COL_LBL_2}>
              {getFieldDecorator('content', {rules: [max(200)]})(
                <Input.TextArea rows={6}/>
              )}
            </FormItem>
          </Col></Row>
      </Card>

      <Card title='课程时间' bordered={false}>
        <FormItem label='开课日期' {...COL_2}>
          {getFieldDecorator('bookingDate', {
            rules: [required],
          })(
            <FDate onChange={(bookingDate) => {
              this.state.bookingDate = bookingDate;
              this.siteOrDateChange();
            }}/>
          )}
        </FormItem>
        <FormItem label='选择场地' {...COL_2}>
          {getFieldDecorator('siteId')(
            <FSelect datas={this.state.sites} onChange={(siteId, {name}) => {
              this.state.siteId = siteId;
              values.siteName = name;
              this.siteOrDateChange();
            }}/>
          )}
        </FormItem>
        <FormItem label='开课时间' {...COL_1}>
          {getFieldDecorator('times', {
            rules: [required]
          })(
            <TimeSlider {...this.state.slider}/>
          )}
        </FormItem>
        <FormItem {...COL_BTN}>
          <Button type='primary' htmlType='submit'>保存</Button>
        </FormItem>
      </Card>
    </Form>)
  }
}

export default connect(({service, site}) => ({service, site}))(Form.create(mapPropsToForm)(GroupCourseForm));
