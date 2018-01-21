import {connect} from 'dva';
import RowContentRoute from "../Content/RowContentRoute";
import {DictCategory} from "../../components/TableEdit/CellHelp";
import CellDictRender from "../../components/TableEdit/CellDictRender";
import {storage} from "../../utils/util";

const columns = [
  {
    title: '服务名称',
    dataIndex: 'serviceName',
  },
  {
    title: '场地共享',
    dataIndex: 'shareSite',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.yesNo}/>;
    },
  },
  {
    title: '支持团体课',
    dataIndex: 'group',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.yesNo}/>;
    },
  },
  {
    title: '支持私教',
    dataIndex: 'coach',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.yesNo}/>;
    },
  },
  {
    title: '订场服务',
    children: [
      {
        title: '场地个数',
        dataIndex: 'count',
        editable: false,
      },
      {
        title: '服务单价(H)',
        dataIndex: 'price',
        editable: false,
      },
    ],
  },
  {
    title: '是否启用',
    dataIndex: 'status',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.yesNo}/>;
    },
  },];

class Service extends React.Component {

  toggleEnable = (s) => {
    console.log(s)
  }

  operations = [
    (record) => <a key='enabled' onClick={() => {
      record.status = record.status == 1 ? 2 : 1;
      this.props.dispatch({
        type: 'service/save',
        data: record,
      }).then(() => {
        this.setState({...this.state});
      });
    }}>{record.status == 1 ? '停用' : '启用'}</a>
  ];

  render() {
    const shopId = storage('login').accountId;
    return <RowContentRoute
      bordered={true}
      dispatch={this.props.dispatch}
      modelName='service'
      columns={[...columns]} queryParams={{shopId}}
      del={false}
      save={false}
      operations={this.operations}
    />
  }
}

export default connect(({service}) => ({service}))(Service);
