import baseShop from './baseShop';

const shop = baseShop('shop', 'shop')

export default {
  ...shop,
  effects: {
    ...shop.effects,
    * apply({data}, {call}) {
      return (yield call(shop.service.post, `${shop.serviceRootPath}/apply`, data)).response;
    },
    * enquiry({data}, {call}) {
      return (yield call(shop.service.post, `${shop.serviceRootPath}/enquiry`, data)).response;
    },
    * setPrice({data}, {call}) {
      return (yield call(shop.service.post, `${shop.serviceRootPath}/setPrice`, data)).response;
    },
    * stop({data}, {call}) {
      return (yield call(shop.service.post, `${shop.serviceRootPath}/stop`, data)).response;
    }
  }
}
