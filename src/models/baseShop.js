import {selfService} from '../utils/request';
import baseService from '../utils/baseService';

export default (namespace, serviceRootPath, methodNameSuffix) => {
  return baseService(selfService, namespace, serviceRootPath, methodNameSuffix);
}
