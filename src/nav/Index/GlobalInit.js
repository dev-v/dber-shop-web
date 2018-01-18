import {connect} from 'dva';
import {storage} from '../../utils/util';

const GlobalInit = (props, fn) => {
  if (!storage('global')) {
    props.dispatch({
      type: 'global/getShop',
    }).then(() => {
      fn && fn(storage('global'));
    });
  }
}

export default GlobalInit;
