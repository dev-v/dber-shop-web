import {platService} from '../utils/request';
import {storageService} from '../utils/util';

export default {
  namespace: 'pubUpload',
  state: {},
  reducers: {},
  effects: {
    * keys({type, bsId}, {call}) {
      const result = yield call(platService.get, `pub/keys/${type}/${bsId}`);
      return result.response;
    },
    * url(_, {call}) {
      const response = yield storageService('_upload_url_', call, platService.get, 'pub/url');
      return response;
    },
    * _url(_, {call}) {
      const response = yield storageService('_upload__url_', call, platService.get, 'pub/_url');
      return response;
    },
  },
}
