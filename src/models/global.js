import {shopService} from '../utils/request';
import {storage} from '../utils/util';

export default {
  namespace: 'global',
  state: {},
  reducers: {},
  effects: {
    * getLogin(_, {call, put}) {
      const result = yield call(shopService.get, 'login/getLogin');
      return storage('login', result.response);
    },
    * login({data}, {call, put}) {
      const result = yield call(shopService.post, 'login/login', data);
      return storage('login', result.response);
    },
    * regist({data}, {call}) {
      const result = yield call(shopService.post, 'login/regist', data);
      return result;
    },
    * logout(payload, {call, put}) {
      yield call(shopService.get, 'login/logout');
      location.pathname = '/';
    },
  },
};
