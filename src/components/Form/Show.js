import {PureComponent} from 'react';

export default class Show extends PureComponent {
  render() {
    return <span>{this.props.value || this.props.label}</span>
  }
}
