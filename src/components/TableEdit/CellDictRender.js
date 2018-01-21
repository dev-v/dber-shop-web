import {dictCache} from '../../utils/util';
import {DictCategory} from "./CellHelp";

export default class CellDictRender extends React.Component {

  state = {
    label: undefined,
  };

  static waitingRefresh = {};

  /**
   * 用categoryId作为key缓存的数据
   * @type {{}}
   */
  dictRender = ({value, categoryId}) => {
    dictCache.getDict(categoryId, (dict, remote) => {
      const label = dict[value];
      if (!label) {
        this.setWaitingRefresh(categoryId);
      } else {
        if (remote) {
          this.refresh(categoryId, dict);
        } else {
          this.state.label = label;
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
        label: dict[instance.props.value],
      });
    });
    CellDictRender.waitingRefresh[categoryId] = undefined;
  };

  render() {
    this.dictRender(this.props);
    const {categoryId, value,} = this.props;
    const style = {
      color: (DictCategory.yesNo == categoryId) ? value == 1 ? 'green' : 'red' : '',
    }
    return <span style={style}>{this.state.label}</span>;
  }
};
