import fetch from 'dva/fetch';
import nprogress from 'nprogress';

function checkSystemStatus(response) {
  if (response.code == 200) {
    return response;
  }
  throw new Error(response.msg);
}

function checkStatus(response) {
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
  return fetch(url, options).
    then(checkStatus).
    then(checkSystemStatus).finally(() => {
      progress.done();
    });
}

class WrapService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  request = (path, options) => {
    return request(`${this.baseUrl}${path}`, options);
  };

  get = (path) => {
    return this.request(path);
  };

  post = (path, data) => {
    let body = '';
    if (typeof data == 'object') {
      let val;
      if (Array.isArray(data)) {
        body = JSON.stringify(data);
      } else {
        Object.keys(data).map((key) => {
          val = data[key];

          // 空字符串舍弃
          if (typeof val == 'string' && !(val = val.trim())) {
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

    return this.request(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
  };
}

export const shopService = new WrapService('http://localhost:8080/');
