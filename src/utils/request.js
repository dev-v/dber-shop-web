import fetch from 'dva/fetch';
import nprogress from 'nprogress';
import {isBlank, clearStorage} from './util';

function checkSystemStatus(response) {
  if (response.code == 200) {
    return response;
  }

  // status为9999以下的系统异常，平台统一处理
  const code = response.code;
  if (code == 200 || code > 9999) {
    return response;
  } else if (code == 600) {//请求登录
    clearStorage();
    location.pathname = '/user/login';
  }

  throw new Error(response.msg);
}

function checkStatus(response) {
  // status为9999以下的系统异常，平台统一处理
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  const error = new Error('请求错误！');
  error.response = response;
  throw error;
}

class Progress {
  n = 0;

  inc() {
    if (this.n < 1) {
      this.n = 1;
      nprogress.inc();
    } else {
      ++this.n;
    }
  }

  done() {
    --this.n;
    if (this.n < 1) {
      nprogress.done();
    }
  }
}

const progress = new Progress();

export default function request(url, options) {
  console.log(url, options && options.body);
  progress.inc();
  return fetch(url, options)
    .then(checkStatus)
    .then(checkSystemStatus)
    .finally(() => {
      progress.done();
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

export const shopService = new WrapService('http://localhost:8080/');
