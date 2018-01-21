import baseShop from './baseShop';

const service = baseShop('service','shop_service');

export default {
  ...service,
  effects: {
    ...service.effects,
  },
}
