import {platService} from './request';

class DictCache {
  _cache = {};
  getDict = (categoryId, fn) => {
    let dict = this._cache[categoryId];
    if (dict) {
      fn && fn(dict);
    } else {
      platService.post('dict/query', {categoryId}).then((response) => {
        dict = this.setDict(categoryId, response.response);
        fn && fn(dict, true);
      });
      // 避免多次重复加载
      this.setDict(categoryId, []);
    }
  };

  setDict = (categoryId, datas) => {
    let dict = this._cache[categoryId];
    if (!dict) {
      dict = {};
    }
    datas.map((item) => {
      const {value, label} = item;
      dict[item.value] = item.label;
    });
    this._cache[categoryId] = dict;
    return dict;
  };
}

const dictCache = new DictCache();

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

const clearStorage = () => {
  window.localStorage.clear();
}

export {dictCache, isBlank, storage, clearStorage};
