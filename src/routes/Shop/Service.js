import {connect} from 'dva';
import {PureComponent} from 'react';

class Shop extends React.Component {

  render() {
    return (<div>aaaa
    </div>)
  }
}

export default connect(({shop, global}) => ({shop, global}))(Shop);
