import {dictCache} from '../../utils/util';
import {PureComponent} from 'react';

export default class CellDictRender extends PureComponent {

  state = {
    value: undefined,
  };

  static waitingRefresh = {};

  /**
   * 用categoryId作为key缓存的数据
   * @type {{}}
   */
  dictRender = ({value, categoryId}) => {
    dictCache.getDict(categoryId, (dict, remote) => {
      const val = dict[value];
      if (!val) {
        this.setWaitingRefresh(categoryId);
      } else {
        if (remote) {
          this.refresh(categoryId, dict);
        } else {
          this.state.value = val;
        }
      }
    });
  };

  setWaitingRefresh = (categoryId) => {
    let instances = CellDictRender.waitingRefresh[categoryId];
    if (!instances) {
      instances = [this];
      CellDictRender.waitingRefresh[categoryId] = instances;
    } else {
      instances.push(this);
    }
    return instances;
  };

  refresh = (categoryId, dict) => {
    const instances = this.setWaitingRefresh(categoryId);
    instances.map((instance) => {
      instance.setState({
        value: dict[instance.props.value],
      });
    });
    CellDictRender.waitingRefresh[categoryId] = undefined;
  };

  render() {
    this.dictRender(this.props);
    return <span>{this.state.value}</span>;
  }
};
