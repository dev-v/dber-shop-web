import {connect} from 'dva';
import {Alert} from 'antd';
import Imgs from "../../components/Imgs";
import {storage} from "../../utils/util";
import {ImgType} from "../../components/Bucket";

class Shop extends React.Component {

  state = {
    bsId: storage('global').shop.id,
  };

  render() {
    const {bsId} = this.state;
    return (
      <div>
        <Alert message="店铺封面、环境、服务及场地图片都会公开展示给顾客，请确保图片可以对外公开，同时不需要上传重复图片"/>
        <Imgs title='店铺封面' imgType={ImgType.SHOP} bsId={bsId} multiple={false} onChange={(_, m, shopMsg) => {
          this.setState({
            ...this.state,
            shopMsg,
          });
        }}/>
        <Imgs title='店铺环境' imgType={ImgType.SHOP_ENV} bsId={bsId}/>
      </div>)
  }
}

export default connect(({shop}) => ({shop}))(Shop);
