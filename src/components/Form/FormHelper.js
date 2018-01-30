import {isBlank} from "../../utils/util";
import {Form} from 'antd';
import moment from 'moment';
import './Form.less';

const COL_LBL_4 = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 8,
  }
}

const COL_LBL_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  }
}

const COL_LBL_1 = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  }
}

const COL_4 = {
  className: 'col-inline-4',
  ...COL_LBL_4,
}

const COL_2 = {
  className: 'col-inline-2',
  ...COL_LBL_2,
}

const COL_1 = {
  className: 'col-inline-1',
  ...COL_LBL_1,
}

const COL_BTN = {
  className: 'col-inline-btn',
  wrapperCol: {
    offset: 3,
  }
}

const FMT_TIME = 'HH:mm';
const FMT_DATE = 'YYYY-MM-DD';

const buildValuesChange = (values, value) => {
  if (values) {
    for (let field in value) {
      if (!isBlank(value[field])) {
        values[field] = value[field];
      }
    }
  }
}

const buildMapPropsToFields = (values) => {
  const fieldValues = {};
  if (values) {
    for (let field in values) {
      fieldValues[field] = Form.createFormField({
        value: values[field],
      })
    }
    return fieldValues;
  }
}

const mapPropsToForm = {
  //支持"."分割符
  onValuesChange: ({values}, value) => {
    buildValuesChange(values, value);
  },
  //不支持"."分割符
  mapPropsToFields: ({values}) => {
    return buildMapPropsToFields(values);
  },
}

const submit = (e, form, onSubmit) => {
  e.preventDefault();
  form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      onSubmit && onSubmit(values);
    }
  });
}

const getMinuteTime = (val) => moment(0).hour(0).minute(val || 0);

const formatMinute = (val) => getMinuteTime(val).format(FMT_TIME);

const getMinute = (time) => time ? (time.hour() * 60 + time.minute()) : 0;

const getDate = (val) => val ? moment(val, FMT_DATE) : moment();

const formatDate = (val) => (typeof val == 'string') ? val.split(' ')[0] : val.format(FMT_DATE);

export {
  COL_1, COL_2, COL_4, COL_BTN,
  COL_LBL_2, COL_LBL_4,
  FMT_TIME,
  mapPropsToForm,
  buildValuesChange,
  buildMapPropsToFields,
  submit,
  FMT_DATE, getMinute, formatMinute, getMinuteTime, getDate, formatDate,
};
