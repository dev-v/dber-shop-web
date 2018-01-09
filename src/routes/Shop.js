import {connect} from 'dva';
import {PureComponent} from 'react';
import RowContent from '../components/Content/RowContent';
import {DictCategory} from '../components/TableEdit/CellHelp';
import CellDictRender from '../components/TableEdit/CellDictRender';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '电话',
    dataIndex: 'tellphone',
  },
  {
    title: '店铺经理',
    dataIndex: 'manager',
  },
  {
    title: '经理电话',
    dataIndex: 'managerPhone',
  },
  {
    title: '营业开始时间',
    dataIndex: 'businessBegin',
  },
  {
    title: '营业结束时间',
    dataIndex: 'businessEnd',
  },
  {
    title: '店铺面积',
    dataIndex: 'area',
  },
  {
    title: '连锁',
    dataIndex: 'chain',
  },
  {
    title: '洗浴',
    dataIndex: 'bathing',
  },
  {
    title: '桑拿',
    dataIndex: 'sauna',
  },
  {
    title: '新风',
    dataIndex: 'airSystem',
  },
  {
    title: '体能测试',
    dataIndex: 'physicalTesting',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render:(value)=>{
      return <CellDictRender value={value} categoryId={DictCategory.shopStatus}/>;
    },
  },
  {
    title: '二维码',
    dataIndex: 'matrixCodeId',
  },
  {
    title: '最近评分',
    dataIndex: 'score',
  },
  {
    title: '店铺等级',
    dataIndex: 'level',
  },
  {
    title: '期望门店价',
    dataIndex: 'expectPrice',
  },
  {
    title: '门店价格',
    dataIndex: 'price',
  },
  {
    title: '首页图片',
    dataIndex: 'imgId',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
  },];

class Shop extends PureComponent {
  query = (page) => {
    return this.props.dispatch({
      type: `shop/query`,
      page: page,
    });
  };

  render() {
    return (
      <RowContent
        query={this.query}
        columns={columns}
      />);
  };

};

export default connect(({shop}) => {
  return shop;
})(Shop);
