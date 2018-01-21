import {isBlank} from "../../utils/util";
import {Form} from 'antd';

const COL = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  }
}

const COL_INLINE = {
  className:'col-inline',
}

const COL_INLINE_BUTTON = {
  className:'col-inline-btn'
}

const COL_BUTTON = {
  wrapperCol: {
    offset: 8,
  }
}

const FMT_TIME = 'HH:mm';

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

export {
  COL,
  COL_BUTTON,
  COL_INLINE_BUTTON,
  COL_INLINE,
  FMT_TIME,
  mapPropsToForm,
  buildValuesChange,
  buildMapPropsToFields,
  submit
};
