import {InputNumber} from 'antd';
import {PureComponent} from 'react';

export default class CellNumber extends PureComponent {

  static format = (text, format = 'HH:mm') => text;

  state = {
    precision: 0,
    value: undefined,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, props);
  }

  setValue(value) {
    this.setState({value});
    this.state.onChange(value);
  }

  render() {
    return (
      <InputNumber {...this.state} onChange={(val) => {
        this.setValue(val);
      }}/>);
  }
};
