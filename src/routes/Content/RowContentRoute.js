import {PureComponent} from 'react';
import RowContent from '../../components/Content/RowContent';

export default class RowContentRoute extends PureComponent {
  columns;
  modelName;
  otherProps;

  parseOperate = (key, operate) => {
    if (typeof operate == 'object') {
      this[key] = {
        operate: this[key],
        ...operate,
      };
    } else {
      this[key] = operate;
    }
  }

  constructor(props, modelName, columns, otherProps) {
    super(props);
    const {query = this.query, save = this.save, del = this.del} = props;
    this.columns = props.columns || columns;
    this.modelName = props.modelName || modelName;
    this.otherProps = otherProps;
    this.parseOperate('query', query);
    this.parseOperate('save', save);
    this.parseOperate('del', del);
  }

  query = (page, condition) => {
    return this.props.dispatch({
      type: `${this.modelName}/query`,
      page: page,
      condition,
    });
  };

  save = (record) => {
    return this.props.dispatch({
      type: `${this.modelName}/save`,
      data: record,
    });
  };

  del = (record) => {
    return this.props.dispatch({
      type: `${this.modelName}/del`,
      id: record.id,
    });
  };

  render() {
    return (
      <RowContent
        {...this.otherProps}
        {...this.props}
        columns={this.columns}
        edit={this.save}
        del={this.del}
        query={this.query}
      />);
  };
};
