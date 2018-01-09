import {PureComponent} from 'react';
import RowContent from '../../components/Content/RowContent';
import CellDictSelect from '../../components/TableEdit/CellDictSelect';

export default class RowContentRoute extends PureComponent {
  columns;
  modelName;
  otherProps;

  constructor(props, modelName, columns,otherProps) {
    super(props);
    this.columns = columns;
    this.modelName = modelName;
    this.otherProps=otherProps;
  }

  query = (page) => {
    return this.props.dispatch({
      type: `${this.modelName}/query`,
      page: page,
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
        columns={this.columns}
        edit={this.save}
        del={this.del}
        query={this.query}
        {...this.otherProps}
      />);
  };
};
