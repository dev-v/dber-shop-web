import {shopService} from '../utils/request';

export default {
  namespace: 'pubShop',
  state: {},
  reducers: {},
  effects: {
    * getSiteBookings({condition}, {call}) {
      const result = yield call(shopService.post, 'pub/getSiteBookings', condition);
      return result.response;
    },
    * getShopPosition({shopId}, {call}) {
      return (yield call(shopService.get, `pub/getShopPosition/${shopId}`)).response;
    },
  },
}
