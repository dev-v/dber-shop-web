import {Select} from 'antd';
import {PureComponent} from 'react';
import {dictCache} from '../../utils/util';

export default class CellDictSelect extends PureComponent {

  state = {
    value: undefined,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, props);
    this.init(props);
  }

  init = ({categoryId}) => {
    dictCache.getDict(categoryId, (dict, remote) => {
      const {opts, firstVal} = this.getOptions(dict);
      if (firstVal) {// 有数据的行为
        this.state.opts = opts;
        let value;
        if (this.state.value) {
          value = dict[this.state.value];
        } else {
          value = dict[firstVal];
          this.state.onChange(firstVal);
        }
        if (remote) {
          this.setState({
            ...this.state,
            value,
          });
        } else {
          this.state.value = value;
        }
      }
    });
  };

  setValue = (value) => {
    this.setState({
      ...this.state,
      value,
    });
    this.state.onChange(value);
  };

  getOptions(dict) {
    const opts = [];
    let firstVal;
    for (let val in dict) {
      opts.push(<Select.Option key={val}
                               value={val}>{dict[val]}</Select.Option>);
      if (!firstVal) {
        firstVal = val;
      }
    }
    return {opts, firstVal};
  }

  render() {
    return (
      <Select style={{minWidth: 100}} {...this.state} onChange={(val) => {
        this.setValue(val);
      }}>
        {this.state.opts}
      </Select>);
  }
};
