import {DatePicker} from 'antd';
import {FMT_DATE, formatDate, getDate} from './FormHelper';

export default class FTime extends React.Component {

  static format = formatDate;

  constructor(props) {
    super(props);
    this.state = {value: getDate(props.value)};
    props.onChange(formatDate(this.state.value));
  }

  setValue(value) {
    this.setState({value});
    this.props.onChange(formatDate(value));
  }

  render() {
    const {size} = this.props;
    return (
      <DatePicker size={size} value={this.state.value} format={FMT_DATE} onChange={(time) => {
        this.setValue(time);
      }}/>);
  }
};
