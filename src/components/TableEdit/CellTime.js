import {TimePicker} from 'antd';
import {PureComponent} from 'react';
import moment from 'moment';

export default class CellTime extends PureComponent {

  static format = (text, {format = 'HH:mm'}) => {
    return moment(text).format(format);
  };

  state = {
    format: 'HH:mm',
    value: undefined,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, props);
    this.state.value = moment(props.value);
    this.state.onChange(this.state.value);
  }

  setValue(time) {
    this.setState({value: time});
    this.state.onChange(time);
  }

  render() {
    return (
      <TimePicker {...this.state} onChange={(time) => {
        this.setValue(time);
      }}/>);
  }
};
