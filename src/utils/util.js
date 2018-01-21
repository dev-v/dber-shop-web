import {platService} from './request';

const isBlank = (val) => {
  return val != 0 && (!val || (typeof val == 'string' && !(val = val.trim())));
}

const storage = (key, val) => {
  const type = typeof val;
  if (type != 'undefined') {
    if (type == 'object') {
      const old = window.localStorage.getItem(key);
      if (old) {
        val = Object.assign(JSON.parse(old), val);
      }
    }
    window.localStorage.setItem(key, JSON.stringify(val));
    return val;
  }
  return JSON.parse(window.localStorage.getItem(key));
}

const removeStorage = (key) => {
  window.localStorage.removeItem('login');
}

const clearStorage = () => {
  window.localStorage.clear();
}


class DictCache {
  getDictKey = (categoryId) => {
    return `_plat_dict_${categoryId}`;
  }

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

const run = async (fns) => {
  const reses = [];
  if (Array.isArray(fns)) {
    const ps = [];
    for (let idx in fns) {
      let [fn, ...args] = fns[idx];
      ps.push(fn(...args));
    }
    for (let idx in ps) {
      await ps[idx].then((res) => {
        reses.push(res);
      });
    }
  }
  return reses;
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
export {dictCache, isBlank, storage, clearStorage, removeStorage, run, isSame, toObj,pickField};
