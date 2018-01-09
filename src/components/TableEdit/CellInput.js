
import {Input} from 'antd';
import {PureComponent} from 'react';

export default class InputEdit extends PureComponent {
  static format = (text) => text;

  state = {
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
    delete this.state.categoryId;
    return (<Input {...this.state} onChange={(e) => {
      this.setValue(e.target.value);
    }}/>);
  }
};
