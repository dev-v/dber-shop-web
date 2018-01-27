import {connect} from 'dva';
import {message} from 'antd';
import GrouCourseList from "./GroupCourseList";
import GroupCourseForm from "./GroupCourseForm";
import {storage} from "../../utils/util";

class GroupCourse extends React.Component {

  state = {
    isList: true,
    operate: undefined,
    values: undefined,//当前新增或编辑的数据
  }

  onEdit = (values, operate) => {
    if (values) {
      values.times = [values.timeBegin, values.timeEnd];
    } else {
      values = {};
    }
    this.setState({
      isList: false,
      operate,
      values,
    });
  }

  onSubmit = () => {
    const {values} = this.state, {times} = values;
    values.timeBegin = times[0];
    values.timeEnd = times[1];
    values.shopName = storage('global').shop.name;
    this.props.dispatch({
      type: 'siteGroupBooking/save',
      data: values,
    }).then(() => {
      message.success('保存成功！');
      this.setState({
        isList: true,
      });
    });
    console.log(values)
  }

  render() {
    return this.state.isList ?
      <GrouCourseList onEdit={this.onEdit}/> :
      <GroupCourseForm onSubmit={this.onSubmit} values={this.state.values} operate={this.state.operate} onBack={() => {
        this.setState({
          isList: true,
        });
      }}/>
  }
}

export default connect(({siteGroupBooking}) => ({siteGroupBooking}))(GroupCourse);
