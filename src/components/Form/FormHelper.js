import {isBlank} from "../../utils/util";
import {Form} from 'antd';

const COL_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  }
}

const FMT_TIME = 'HH:mm';

const mapPropsToForm = {
  onValuesChange: (props, value) => {
    const {values} = props
    if (values) {
      for (let field in value) {
        if (!isBlank(value[field])) {
          values[field] = value[field];
        }
      }
    }
  },
  mapPropsToFields: (props) => {
    const {values = {}} = props, fieldValues = {};
    for (let field in values) {
      fieldValues[field] = Form.createFormField({
        value: values[field],
      })
    }
    return fieldValues;
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

export {COL_2, FMT_TIME, mapPropsToForm, submit};
