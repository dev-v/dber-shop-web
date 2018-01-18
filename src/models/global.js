import {shopService} from '../utils/request';
import {storage} from '../utils/util';
import {message} from 'antd';

export default {
  namespace: 'global',
  state: {},
  reducers: {},
  effects: {
    * getShop(_, {call}) {
      const result = yield call(shopService.get, `shop/get/${storage('login').accountId}`);
      if (result.code != 200) {
        message.error(result.msg);
      } else {
        storage('global', {shop: result.response});
      }
      return result;
    },
  }
}
