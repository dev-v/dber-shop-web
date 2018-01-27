import {platService} from './request';

const storageService = function* storageService(key, call, fn, ...args) {
  let _s = storage(key);
  if (_s) {
    return _s;
  } else {
    _s = (yield call(fn, ...args)).response;
    if (_s) {
      storage(key, _s);
    }
    return _s;
  }
}

const isBlank = val => (val == 0 && typeof val == 'string') || (!val && val != 0);

const storage = (key, val) => {
  const type = typeof val;
  if (type != 'undefined') {
    if (type == 'object') {
      const old = window.localStorage.getItem(key);
      if (old) {
        val = Object.assign(JSON.parse(old), val);
      }
      window.localStorage.setItem(key, JSON.stringify(val));
    } else {
      window.localStorage.setItem(key, val);
    }
    return val;
  }

  val = window.localStorage.getItem(key);

  if (val) {
    if (val.startsWith('{') || val.startsWith('[')) {
      return JSON.parse(val);
    } else {
      const num = Number(val);
      return isNaN(num) ? val : num;
    }
  }
}

const removeStorage = key => window.localStorage.removeItem(key);

const clearStorage = () => window.localStorage.clear();

class DictCache {
  getDictKey = categoryId => `_plat_dict_${categoryId}`;

  /**
   * @param categoryId
   * @param fn 参数为键值对object格式
   */
  getDict = async (categoryId, fn) => {
    const key = this.getDictKey(categoryId);
    let dict = storage(key);
    let temp = {...dict};
    if (dict) {
      fn && fn(temp);
    } else {
      // 避免多次重复加载
      this.setDict(key, []);
      return platService.get(`pub/getDictByCategoryId/${categoryId}`).then((response) => {
        dict = this.setDict(key, response.response);
        temp = {...dict};
        fn && fn(temp, true);
        return temp;
      });
    }
    return temp;
  };

  setDict = (key, datas) => {
    let dict = storage(key) || {};
    datas && datas.map((item) => {
      const {value, label} = item;
      dict[value] = label;
    });
    return storage(key, dict);
  };
}

const dictCache = new DictCache();

const runs = async (...promises) => {
  const rest = [];
  let p;
  for (let idx in promises) {
    p = promises[idx];
    if (p.then) {
      await p.then((res) => {
        rest.push(res);
      });
    } else {
      rest.push(p)
    }
  }
  return rest;
}

const isSame = (s, t) => {
  if (s == t) {
    return true;
  }
  if (s == undefined || t == undefined) {
    return false;
  }
  if (typeof s == 'object') {
    for (let k in s) {
      if (s[k] != t[k]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

const toObj = (arr, idField = 'id') => {
  const obj = {};
  if (arr) {
    arr.map((a) => {
      obj[a[idField]] = a;
    });
  }
  return obj;
}

const pickField = (arr, field = 'id') => {
  const fs = [];
  if (arr) {
    arr.map((a) => {
      fs.push(a[field]);
    });
  }
  return fs;
}
export {dictCache, isBlank, storage, clearStorage, removeStorage, isSame, toObj, pickField, storageService, runs};
