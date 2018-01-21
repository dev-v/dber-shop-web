import {PureComponent} from 'react';
import {Switch, Tooltip} from 'antd';

export default class YesNoSwitch extends PureComponent {

  constructor(props) {
    super(props);
    const {onChange, tip} = props;
    this.tip = tip;
    this.onChange = onChange;
    this.state = {}
  }

  render() {
    this.state.checked = this.props.value == 1;
    const dom = <Switch checked={this.state.checked} onChange={(checked) => {
      this.onChange && this.onChange(checked ? 1 : 2);
      this.setState({checked});
    }}/>;
    if (this.tip) {
      return <Tooltip title={this.tip} placement='bottom'>
        {dom}
      </Tooltip>
    } else {
      return dom;
    }
  }
}
