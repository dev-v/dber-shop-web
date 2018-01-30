/**
 * 使用实例
 */
/*
import basePlat from './basePlat';
1、直接使用
export default basePlat('fitness', 'fitness_service');

2、定制
const baseFitness = basePlat('fitness', 'fitness_service');
export default {
  ...baseFitness,
  effects: {
    ...baseFitness.effects,
    // 下面可以是扩展或覆盖默认的effects
  },
};*/

export default (service, namespace, serviceRootPath, methodNameSuffix = '') => {
  return {
    namespace,
    state: {},
    service,
    serviceRootPath,
    methodNameSuffix,
    reducers: {},
    effects: {
      * [`query${methodNameSuffix}`]({page, condition}, {call}) {
        return (yield call(service.post,
          `${serviceRootPath}/query/${page}`, condition)).response;
      },
      * [`queryWithoutPage${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(service.post, `${serviceRootPath}/query`,
          condition)).response;
      },
      * [`del${methodNameSuffix}`]({id}, {call}) {
        return (yield call(service.get,
          `${serviceRootPath}/del/${id}`)).response;
      },
      * [`delWithCondition${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(service.post,
          `${serviceRootPath}/delWithCondition`, condition)).response;
      },
      * [`save${methodNameSuffix}`]({data}, {call}) {
        return (yield call(service.post, `${serviceRootPath}/save`,
          data)).response;
      },
      * [`get${methodNameSuffix}`]({id}, {call}) {
        return (yield call(service.get,
          `${serviceRootPath}/get/${id}`)).response;
      },
    },
  };
}
