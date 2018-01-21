import {TimePicker} from 'antd';
import moment from 'moment';
import {FMT_TIME} from './FormHelper';


export default class FTime extends React.Component {

  static format = (text, {format = FMT_TIME}) => {
    return moment(text).format(format);
  };

  constructor(props) {
    super(props);
    this.state = {value: moment(props.value)};
    props.onChange(this.state.value);
  }

  setValue(value) {
    this.setState({value});
    this.props.onChange(value);
  }

  render() {
    const {size} = this.props;
    return (
      <TimePicker size={size} value={this.state.value} format={FMT_TIME} onChange={(time) => {
        this.setValue(time);
      }}/>);
  }
};
