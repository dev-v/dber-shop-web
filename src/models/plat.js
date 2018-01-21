import {platService} from '../utils/request';
import {dictCache, storage} from '../utils/util';

function* storageService(key, call, fn, ...args) {
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

export default {
  namespace: 'plat',
  state: {},
  reducers: {},
  effects: {
    * getDictByCategoryId({categoryId}, {call}) {
      return dictCache.getDict(categoryId);
    },
    * getService(_, {call}) {
      const response = yield storageService('_plat_service_', call, platService.get, 'pub/getService');
      return [...response] || [];
    },
    * getBookingStrategy(_, {call}) {
      const result = yield call(platService.get, 'pub/getBookingStrategy');
      return result.response;
    },
    * getElementMedals(_, {call}) {
      const result = yield call(platService.get, 'pub/getElementMedals');
      return result.response;
    },
    * getVipCardStrategy(_, {call}) {
      const response = yield storageService('_plat_vipcard_strategy_', call, platService.get, 'pub/getVipCardStrategy');
      return [...response] || [];
    },
  },
}
