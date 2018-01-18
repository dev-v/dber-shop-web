import {loginService} from '../utils/request';
import {storage} from '../utils/util';
import {message} from 'antd';

export default {
  namespace: 'login',
  state: {
    captchaUrl: loginService.getUrl('login/captcha?'),
  },
  reducers: {},
  effects: {
    * login({data}, {call}) {
      const result = yield call(loginService.post, 'login/login', data);
      storage('login', result.response);
      if (result.code != 200) {
        message.error(result.msg);
      }
      return result;
    },
    * getLogin(_, {call}) {
      const result = yield call(loginService.get, 'login/getLogin');
      storage('login', result.response);
      if (result.code != 200) {
        message.error(result.msg);
      }
      return result;
    },
    * regist({data}, {call}) {
      const result = yield call(loginService.post, 'login/regist', data);
      if (result.code != 200) {
        message.error(result.msg);
      }
      return result;
    },
  }
}
