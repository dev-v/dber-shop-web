import {shopService} from '../utils/request';

export default (namespace, serviceRootPath, methodNameSuffix = '') => {

  return {
    namespace,
    state: {},
    reducers: {},
    effects: {
      * [`query${methodNameSuffix}`]({page, condition}, {call}) {
        return (yield call(shopService.post,
          `${serviceRootPath}/query/${page}`, condition)).response;
      },
      * [`queryWithoutPage${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(shopService.post, `${serviceRootPath}/query`,
          condition)).response;
      },
      * [`del${methodNameSuffix}`]({id}, {call}) {
        return (yield call(shopService.get,
          `${serviceRootPath}/del/${id}`)).response;
      },
      * [`delWithCondition${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(shopService.post,
          `${serviceRootPath}/delWithCondition`, condition)).response;
      },
      * [`save${methodNameSuffix}`]({data}, {call}) {
        return (yield call(shopService.post, `${serviceRootPath}/save`,
          data)).response;
      },
      * [`get${methodNameSuffix}`]({id}, {call}) {
        return (yield call(shopService.get,
          `${serviceRootPath}/get/${id}`)).response;
      },
    },
  };
}
