import {InputNumber} from 'antd';

export default class FNumber extends React.Component {

  static format = (text) => text;

  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
  }

  setValue(value) {
    this.setState({value});
    this.props.onChange(value);
  }

  render() {
    return (
      <InputNumber {...this.props} value={this.state.value} onChange={(val) => {
        this.setValue(val);
      }}/>);
  }
};
