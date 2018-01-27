import {connect} from 'dva';
import DictSelect from '../Form/DictSelect';
import FNumber from '../Form/FNumber';
import FTime from '../Form/FTime';
import FInput from '../Form/FInput';

const CellType = {
  input: FInput,
  time: FTime,
  number: FNumber,
  dictSelect: DictSelect,
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
  fitnessShareSite: 15,
  groupCourseBooking: 16,
};

export {CellType, DictCategory};

export default CellType;
