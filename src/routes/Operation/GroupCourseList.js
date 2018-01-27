import {connect} from 'dva';
import RowContentRoute from "../Content/RowContentRoute";
import {DictCategory} from "../../components/TableEdit/CellHelp";
import CellDictRender from "../../components/TableEdit/CellDictRender";
import {storage} from "../../utils/util";
import {formatDate, formatMinute} from "../../components/Form/FormHelper";

const columns = [
  {
    title: '服务名称',
    dataIndex: 'serviceName',
  },
  {
    title: '场地名称',
    dataIndex: 'siteName',
  },
  {
    title: '教练',
    dataIndex: 'coacherName',
  },
  {
    title: '教练电话',
    dataIndex: 'coacherCellphone',
  },
  {
    title: '日期',
    dataIndex: 'bookingDate',
    render: formatDate
  },
  {
    title: '开始时间',
    dataIndex: 'timeBegin',
    render: formatMinute,
  },
  {
    title: '结束时间',
    dataIndex: 'timeEnd',
    render: formatMinute,
  },
  {
    title: '课程状态',
    dataIndex: 'status',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.groupCourseBooking}/>;
    },
  },];

class GroupCourseList extends React.Component {

  operations = [
    (record) => <a key='enabled' onClick={() => {
      record.status = record.status == 1 ? 2 : 1;
      this.props.dispatch({
        type: 'groupCourse/save',
        data: record,
      }).then(() => {
        this.setState({...this.state});
      });
    }}>{record.status == 1 ? '撤销' : '发布'}</a>,
    {
      text: '编辑',
      onClick: (data) => this.props.onEdit(data, '编辑'),
    },
    {
      text: '复制',
      onClick: (data) => {
        const copy = {...data};
        delete copy.id;
        delete copy.siteBookingId;
        delete copy.status;
        this.props.onEdit(copy, '复制')
      },
    },
  ];

  render() {
    const shopId = storage('login').accountId;
    return <RowContentRoute
      dispatch={this.props.dispatch}
      modelName='groupCourse'
      columns={[...columns]} queryParams={{shopId}}
      del={false}
      save={false}
      operations={this.operations}
      toolbar={{
        left: [{
          text: '添加', onClick: () => {
            this.props.onEdit(undefined, '添加')
          }
        }]
      }}
    />
  }
}

export default connect(({groupCourse}) => ({groupCourse}))(GroupCourseList);
