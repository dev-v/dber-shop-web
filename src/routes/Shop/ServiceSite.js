import {connect} from 'dva';
import {Col, Row} from 'antd';
import RowContentRoute from "../Content/RowContentRoute";
import CellType from "../../components/TableEdit/CellHelp";
import TableEdit from "../../components/TableEdit/TableEdit";
import Imgs from "../../components/Imgs";
import {ImgType} from "../../components/Bucket";

const columns = [
  {
    title: '场地名称',
    dataIndex: 'name',
  },
  {
    title: '场地单价（每小时）',
    dataIndex: 'price',
    precision: 2,
    min: 1,
    editable: CellType.number,
  },];

class ServiceSite extends React.Component {
  state = {
    site: {},
  }

  constructor(props) {
    super(props);
  }

  setImgs = (_, site) => {
    this.setState({
      site,
    });
  }

  onImgChange = (len, max, msg) => {
    this.setState({
      ...this.state,
      msg,
    });
  }

  render() {
    const {service} = this.props;
    const shopServiceId = service.id || -1;
    const {id, name} = this.state.site;
    return <Row>
      <Col span={11}>
        <RowContentRoute
          dispatch={this.props.dispatch}
          modelName='site'
          columns={columns} queryParams={{shopServiceId}}
          addModel={{
            editable: true,
            shopServiceId,
            price: service.price,
            name: `${service.serviceName}一号场地`
          }}
          select={{
            type: 'radio', selectedRowKeys: [], onChange: (keys, rows) => {
              this.setImgs(keys[0], rows[0]);
            }
          }}
        />
      </Col>
      <Col span={11} push={2}>
        {
          <Imgs title={`${name || ''}【场地图片】`} imgType={ImgType.SHOP_SITE} bsId={id} onChange={this.onImgChange}
                content={id ? TableEdit.isAutoKey(id) ?
                  <div>请先保存场地信息！</div> : undefined :
                  <div>选择左边的场地，进行场地图片上传！</div>}/>
        }
      </Col>
    </Row>
  }
}

export default connect(({site}) => ({site}))(ServiceSite);
