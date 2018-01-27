import {platService} from '../utils/request';
import {dictCache, storageService} from '../utils/util';

export default {
  namespace: 'pubPlat',
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
