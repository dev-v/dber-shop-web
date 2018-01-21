import {Input} from 'antd';

export default class FInput extends React.Component {
  static format = (text) => text;

  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }

  setValue(value) {
    this.setState({value});
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const {size} = this.props;
    return (<Input size={size} value={this.state.value} onChange={(e) => {
      this.setValue(e.target.value);
    }}/>);
  }
};
