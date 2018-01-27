import {connect} from 'dva';
import {Alert, Col, Row} from 'antd';
import RowContentRoute from "../Content/RowContentRoute";
import TableEdit from "../../components/TableEdit/TableEdit";
import Imgs from "../../components/Imgs";
import {ImgType} from "../../components/Bucket";
import {storage} from "../../utils/util";

const columns = [
  {
    title: '场地名称',
    dataIndex: 'name',
  },];

class ServiceSite extends React.Component {
  state = {
    site: {},
    shopId: storage('global').shop.id
  }

  setImgs = (siteId, site) => {
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
    const shopServiceId = 1;
    const {id, name} = this.state.site;
    const {shopId} = this.state;
    return <div>
      <Alert message='共享场地可用于团体课程开设、公共区域展示等。'></Alert>
      <Row style={{marginTop: '16px'}}>
        <Col span={11}>
          <RowContentRoute
            dispatch={this.props.dispatch}
            modelName='site'
            columns={columns} queryParams={{shopServiceId, shopId}}
            addModel={{
              editable: true,
              shopServiceId,
              name: '一号场地',
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
    </div>
  }
}

export default connect(({site}) => ({site}))(ServiceSite);
