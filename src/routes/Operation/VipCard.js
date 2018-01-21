import {connect} from 'dva';
import {Card, Col, Row} from 'antd';
import RowContentRoute from "../Content/RowContentRoute";
import CellType, {DictCategory} from "../../components/TableEdit/CellHelp";
import TableEdit from "../../components/TableEdit/TableEdit";
import {run, storage, toObj} from "../../utils/util";
import VipCardService from './VipCardService';

const columns = [
  {
    title: '名称',
    dataIndex: 'cardName',
  },
  {
    title: '价格',
    dataIndex: 'price',
    precision: 2,
    min: 1,
    editable: CellType.number,
  },
  {
    title: '是否启用',
    dataIndex: 'status',
    categoryId: DictCategory.yesNo,
    editable: CellType.dictSelect,
  },
  {
    title: '可使用天数',
    dataIndex: 'days',
    editable: false,
  },
  {
    title: '已售数量',
    dataIndex: 'count',
    editable: false,
  },
  {
    title: '转让中',
    dataIndex: 'transferingCount',
    editable: false,
  },
  {
    title: '已转让',
    dataIndex: 'transferedCount',
    editable: false,
  },];

class VipCard extends React.Component {
  state = {
    selectedRowKeys: [],
    card: undefined,
  }

  componentWillMount() {
    run([
      [this.props.dispatch, {type: 'plat/getVipCardStrategy'}],
      [this.props.dispatch, {type: 'vipCard/queryWithoutPage'}]
    ]).then(([strategies, cards]) => {
      const cMap = toObj(cards, 'cardStrategyId');
      const vipCards = [];
      strategies.map((strategy) => {
        const {id, name, days, discountDays} = strategy;
        vipCards.push({
          cardStrategyId: id,
          cardName: name,
          days,
          price: discountDays * 8,
          count: 0,
          transferingCount: 0,
          transferedCount: 0,
          status: 2,
          ...cMap[id],
        });
      });

      this.setState({...this.state, vipCards});
    });
  }

  setServices = (cardId, card) => {
    if (TableEdit.isAutoKey(cardId)) {
      delete card.id;
      this.props.dispatch({
        type: 'vipCard/save',
        data: card,
      }).then((data) => {
        Object.assign(card, data);
        this.state.selectedRowKeys.splice(0, 1, data.id);
        this.setState({card});
      });
    } else {
      this.setState({card});
    }
  }

  render() {
    const shopId = storage('login').accountId;
    return <div>
      <Row>
        <Col span={16}>
          <RowContentRoute
            dispatch={this.props.dispatch}
            modelName='vipCard'
            columns={columns} queryParams={{shopId}}
            select={{
              type: 'radio', selectedRowKeys: this.state.selectedRowKeys, onChange: (keys, rows) => {
                this.setServices(keys[0], rows[0]);
              }
            }}
            query={false}
            datas={this.state.vipCards}
            pagination={false}
            del={false}
            save={{toolBar: false,}}
          />
        </Col>
        <Col span={7} push={1}>
          <Card title='会员卡服务绑定使用规则' bordered={false}>
            <div>1、会员卡可以对店铺提供的服务进行绑定；</div>
            <div>2、绑定后的服务可以使用该会员卡自由使用，没有绑定的服务不能使用会员卡消费；</div>
            <div>3、会员卡一天只能最多到店消费一次；</div>
            <div>4、会员卡不能抵扣私教服务费用。</div>
          </Card>
          <Card title='服务绑定' bordered={false}>
            <VipCardService card={this.state.card}/>
          </Card>
        </Col>
      </Row>
    </div>
  }
}

export default connect(({vipCard}) => ({vipCard}))(VipCard);
