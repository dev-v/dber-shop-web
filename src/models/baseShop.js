import {shopService} from '../utils/request';

export default (namespace, serviceRootPath, methodNameSuffix = '') => {

  return {
    namespace,
    state: {},
    reducers: {},
    effects: {
      * [`query${methodNameSuffix}`]({page}, {call}) {
        return (yield call(shopService.post,
          `${serviceRootPath}/query/${page}`)).response;
      },
      * [`queryWithoutPage${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(shopService.post, `${serviceRootPath}/query`,
          condition)).response;
      },
      * [`del${methodNameSuffix}`]({id}, {call}) {
        return (yield call(shopService.get,
          `${serviceRootPath}/del/${id}`)).response;
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
