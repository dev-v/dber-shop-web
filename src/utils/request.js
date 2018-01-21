import fetch from 'dva/fetch';
import {nProgress} from './progress';
import {isBlank, removeStorage} from './util';

function checkSystemStatus(response) {
  // status为9999以下的系统异常，平台统一处理
  const code = response.code;
  if (code == 200 || code > 9999) {
    return response;
  } else if (code == 600) {//请求登录
    removeStorage('login');
    location.pathname = '/user/login';
  } else {
    throw new Error(response.msg);
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  const error = new Error('请求错误！');
  error.response = response;
  throw error;
}

export default function request(url, options) {
  console.log(url, options && options.body);
  nProgress.inc();
  return fetch(url, options)
    .then(checkStatus)
    .then(checkSystemStatus)
    .finally(() => {
      nProgress.done();
    });
}

class WrapService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * 同步请求
   * @param path
   * @param options
   * @returns {*}
   */
  request = (path, options) => {
    return request(`${this.baseUrl}${path}`,
      //此处后续需研究 same-origin
      {credentials: 'include', ...options});
  };

  getUrl = (path) => {
    return this.baseUrl + path;
  }

  get = async (path) => {
    return await this.request(path);
  };

  post = async (path, data) => {
    let body = '';
    if (typeof data == 'object') {
      data = JSON.parse(JSON.stringify(data));
      let val;
      if (Array.isArray(data)) {
        body = JSON.stringify(data);
      } else {
        Object.keys(data).map((key) => {
          val = data[key];
          if (isBlank(val)) {
            return;
          }

          // body += `&${key}=${(typeof val == 'object')
          //   ? JSON.stringify(val)
          //   : val}`;

          body += `&${key}=${encodeURI(val)}`;
        });
        body = body.substring(1);
      }
    } else {
      body = encodeURI(data);
    }

    return await this.request(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
  };
}

const shopService = new WrapService('http://localhost:8080/');

const platService = new WrapService('http://localhost:8081/');

const loginService = shopService;

export {loginService, shopService, platService};
