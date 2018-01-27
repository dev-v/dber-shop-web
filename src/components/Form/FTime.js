import {TimePicker} from 'antd';
import {FMT_TIME, formatMinute, getMinute, getMinuteTime} from './FormHelper';


export default class FTime extends React.Component {

  static format = formatMinute;

  constructor(props) {
    super(props);
    this.state = {value: getMinuteTime(props.value)};
    props.onChange(getMinute(this.state.value));
  }

  setValue(value) {
    this.setState({value});
    this.props.onChange(getMinute(value));
  }

  render() {
    const {size, format = FMT_TIME} = this.props;
    return (
      <TimePicker size={size} value={this.state.value} format={format} onChange={(time) => {
        this.setValue(time);
      }}/>);
  }
};
