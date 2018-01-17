import {TimePicker} from 'antd';
import {PureComponent} from 'react';
import moment from 'moment';

export default class WTimePicker extends PureComponent {
  state = {
    format: 'yyyy-mm-dd hh:MM:ss',
  }

  constructor(props) {
    super(props);
    Object.assign(this.state, props);
  }

  componentWillMount() {
    this.setValue(moment(this.state.value));
  }

  setValue = (time) => {
    this.setState({
      ...this.state,
      value: time,
    });
    if (this.state.onChange) {
      this.state.onChange(time);
    }
  }

  render() {
    return <TimePicker {...this.state} onChange={(time) => {
      this.setValue(time);
    }}/>
  }
}
