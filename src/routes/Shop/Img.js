import {connect} from 'dva';
import {Card} from 'antd';
import Imgs from "../../components/Imgs";

class Shop extends React.Component {

  render() {
    return (
      <div>
        <Card title='店铺主图' bordered={false}>
          未设置
        </Card>
        <Card title='所有图片' bordered={false}>
          <Imgs/>
        </Card>

      </div>)
  }
}

export default connect(({shop}) => ({shop}))(Shop);
