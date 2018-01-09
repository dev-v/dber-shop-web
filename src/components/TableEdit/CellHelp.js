import {connect} from 'dva';
import CellDictSelect from './CellDictSelect';
import CellNumber from './CellNumber';
import CellTime from './CellTime';
import CellInput from './CellInput';

const CellType = {
  input: CellInput,
  time: CellTime,
  number: CellNumber,
  dictSelect: CellDictSelect,
};

const DictCategory = {
  fitnessType: 1,
  yesNo: 2,
  elementActive: 3,
  msgType: 4,
  imgType: 5,
  imgStatus: 6,
  system: 7,
  jobTriggerType: 8,
  jobTaskType: 9,
  jobStatus: 10,
  jobExecuteStatus: 11,
  accountStatus: 12,
  accountType: 13,
  shopStatus: 14,
};

export {CellType, DictCategory};

export default CellType;
