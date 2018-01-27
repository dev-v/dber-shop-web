import {Select} from 'antd';
import {isSame} from "../../utils/util";

export default class FSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: props.value};
    const {valueField = 'id', labelField = 'name'} = this.props;
    this.vF = valueField;
    this.lF = labelField;
  }

  getOptions = (datas) => {
    let value = this.state.value;
    const ds = {}
    const opts = datas.map((d) => {
      const val = d[this.vF], lab = d[this.lF];
      ds[val] = d;
      if (!value) {
        value = val;
        this.props.onChange(value,d);
      }
      if (value == val) {
        this.state.value = lab;
      }
      return <Select.Option key={val} value={val}>{lab}</Select.Option>;
    });
    this.datas = ds;
    return opts;
  }

  setValue = (value) => {
    this.setState({value});
    this.props.onChange(value, this.datas[value]);
  };

  componentWillUpdate(nextProps, nextState) {
    if (!isSame(nextProps.datas, this.props.datas)) {
      nextState.opts = this.getOptions(nextProps.datas || nextState.datas || this.props.datas || []);
    }
  }

  render() {
    const {value, opts} = this.state;
    return <Select size={this.props.size} style={{minWidth: 100}} value={value}
                   onChange={this.setValue}>{opts}</Select>;
  }
};
