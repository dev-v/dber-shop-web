import {Select} from 'antd';
import {PureComponent} from 'react';
import {dictCache} from '../../utils/util';

export default class DictSelect extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {value: props.value};
    this.init(props);
  }

  init = ({categoryId}) => {
    dictCache.getDict(categoryId, (dict, remote) => {
      const {opts, firstVal} = this.getOptions(dict);
      if (firstVal) {// 有数据的行为
        this.opts = opts;
        let value;
        if (this.state.value) {
          value = dict[this.state.value];
        } else {
          value = dict[firstVal];
          this.props.onChange(firstVal);
        }
        if (remote) {
          this.setState({value});
        } else {
          this.state.value = value;
        }
      }
    });
  };

  setValue = (value) => {
    this.setState({value,});
    this.props.onChange(value);
  };

  getOptions(dict) {
    const opts = [];
    let firstVal;
    for (let val in dict) {
      opts.push(<Select.Option key={val} value={val}>{dict[val]}</Select.Option>);
      if (!firstVal) {
        firstVal = val;
      }
    }
    return {opts, firstVal};
  }

  render() {
    const {size} = this.props;
    return (
      <Select size={size} style={{minWidth: 100}} value={this.state.value} onChange={this.setValue}>
        {this.opts}
      </Select>);
  }
};
