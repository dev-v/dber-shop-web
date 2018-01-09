import {shopService} from '../utils/request';

export default {
  namespace: 'login',
  state: {
    user: {},
  },
  reducers: {},
  effects: {
    * login({data}, {call}) {
      return (yield call(shopService.post, '/login/login', data)).response;
    },
    * logout(payload, {call}) {
      return (yield call(shopService.get, '/login/logout')).response;
    },
  },
};
