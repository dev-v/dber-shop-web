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

export {dictCache};
