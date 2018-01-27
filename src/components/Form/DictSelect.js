import {dictCache} from '../../utils/util';
import FSelect from "./FSelect";

export default class DictSelect extends FSelect {

  static dictToArr = (dict) => {
    const arr = [];
    for (let k in dict) {
      arr.push({id: k, name: dict[k]});
    }
    return arr;
  }

  componentWillMount() {
    dictCache.getDict(this.props.categoryId, (dict) => {
      this.setState({
        ...this.state,
        opts: this.getOptions(DictSelect.dictToArr(dict)),
      });
    });
  }
};
