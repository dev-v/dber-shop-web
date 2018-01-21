import {shopService} from '../utils/request';
import baseService from '../utils/baseService';

export default (namespace, serviceRootPath, methodNameSuffix) => {
  return baseService(shopService, namespace, serviceRootPath, methodNameSuffix);
}
