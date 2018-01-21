import {message, Popconfirm, Table} from 'antd';
import CellType from './CellHelp';
import CellDictRender from './CellDictRender';

const msg = '同时只能编辑一行数据！';
const _idKey = '_dber_key_';
let i = 0;

function renderColumns(text, record, column) {
  const Cell = column.editable || CellType.input;
  return (
    record.editable
      ? <Cell size='small' {...column} value={text}
              onChange={(val) => {
                record[column.dataIndex || column.key] = val;
              }}/>
      : ((Cell == CellType.dictSelect)
      ? <CellDictRender value={text} categoryId={column.categoryId}/>
      : Cell.format(text, column))
  );
}

//除antd.Table支持的属性以外，扩展的配置属性
const _default = {
  operations: [],
  rowKey: 'id',
  addModel: {editable: true},
  del: undefined,// (record) => {},
  edit: undefined,// (record) => {},
  onPage: undefined,//(page)=>{}
};

export default class TableEdit extends React.Component {

  static isAutoKey = (key) => {
    return key && key.toString().startsWith(_idKey);
  }

  // 客户端操作
  _custom = {
    del: undefined,
    edit: undefined,
  };

  // 客户端配置后便不再改变的属性
  _props;

  // 运行过程中改变的状态，配置时也可以给定
  state = {deleteFlag: false, dataSource: []};

  constructor(props) {
    super(props);

    this._props = {..._default, ...props};

    let {columns, operations = [], select, del, edit, pagination, onPage} = props;

    // 可行内编辑
    if (edit) {
      delete this._props.edit;
      this._custom.edit = edit;

      operations.push({
        text: '编辑',
        onClick: this.edit,
      });

      columns = columns.map((column) => {
        if (column.editable == false) {
          return column;
        }
        return this.getColumnRender(column);
      });
    }

    // 行内删除
    if (del) {
      delete this._props.del;
      this._custom.del = del;

      operations.push({
        confirm: '确定删除这条数据？',
        text: '删除',
        onClick: (record) => {
          this.del(record);
        },
      });
    }

    // 操作列
    delete this._props.operations;
    const operationColumn = this.getOperationColumn(operations);
    operationColumn && columns.push(operationColumn);

    this._props.columns = columns;

    //可选择行内数据 选择后的数据绑定到配置的数组对象上
    let rowSelection;

    if (select) {
      const {selectedRowKeys, type = 'checkbox', onChange} = select;
      delete this._props.select;
      this._props.rowSelection = {
        selectedRowKeys, type,
        onChange: (keys, rows) => {
          selectedRowKeys.length = 0;
          selectedRowKeys.push(...keys);
          onChange && onChange(keys, rows);
          this.setState({selectedRowKeys});
        },
      };
    }

    // 分页和数据源
    delete this._props.dataSource;
    delete this._props.datas;
    delete this._props.pagination;

    if (pagination != false) {
      this.state.pagination = {
        ...pagination,
        onChange: onPage,
        showTotal: (total, range) => `${range[0]}-${range[1]}/${total}`,
      };
    } else {
      this.state.pagination = false;
    }

    this.copyPropsToState(props);
  }

  getColumnRender = (column) => {
    if (column.children) {
      column.children = column.children.map((child) => {
        return this.getColumnRender(child);
      });
      return column;
    } else {
      return {
        ...column,
        render: (text, record) => renderColumns(text,
          record, column),
      };
    }
  };

  copyPropsToState(props) {
    const {total, currentPage, current, datas, dataSource} = props;
    this.state.dataSource = datas || dataSource || this.state.dataSource;
    if (this.state.pagination) {
      Object.assign(this.state.pagination,
        {total, current: currentPage || current});
    }
  }


  renderOperation = (item, record) => {
    const type = typeof item;
    if (type == 'object') {
      return item.confirm ?
        <Popconfirm okText="确定" cancelText="取消" key={item.text}
                    title={item.confirm}
                    onConfirm={() => item.onClick(record)}>
          <a href="#">{item.text}</a>
        </Popconfirm> :
        <a key={item.text} onClick={() => item.onClick(record)}>{item.text}</a>
    } else {//function
      return item(record);
    }
  }

  getOperationColumn = (operations) => {
    if (operations.length > 0) {
      return {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <span className='operation'>{
              record.editable ? [
                  <a key='保存' onClick={() => this.save(record)}>保存</a>,
                  <a key='取消' onClick={() => this.cancel(record)}>取消</a>
                ] :
                operations.map((item) => {
                  return this.renderOperation(item, record);
                })
            }</span>
          );
        },
      };
    }
  };

  edit = (record) => {
    if (this.editRecord && this.editRecord != record) {
      this.cancel(this.editRecord);
    }
    record.editable = true;
    this.setState({...this.state});
  };

  save = (record) => {
    delete record.editable;
    if (TableEdit.isAutoKey(record[this._props.rowKey] || '')) {
      delete record[this._props.rowKey];
    }
    this._custom.edit(record);
    this.setState({...this.state});
  };

  cancel = (record) => {
    delete record.editable;
    for (let key in record) {
      delete record[key];
    }
    Object.assign(record, this.cacheEditRecord);
    this.setState({...this.state});
  };

  del = (record) => {
    this.delRecord = record;
    if (!TableEdit.isAutoKey(record[this._props.rowKey]) &&
      this._custom.del) {
      this._custom.del(record).then(() => {
        this.realDel(record);
      });
    } else {
      this.realDel(record);
    }
  };

  realDel = (record) => {
    const newData = this.state.dataSource.filter(item => {
      return record != item;
    });
    this.state.deleteFlag = true;
    this.state.dataSource.length = 0;
    this.state.dataSource.push(...newData);
    this.setState({...this.state});
  };

  render() {
    let editRecord, flag = false;
    this.editRecord = null;
    if (!this.state.deleteFlag) {
      this.copyPropsToState(this.props);
      this.state.dataSource.map(item => {
        if (item.editable) {
          if (flag) {
            delete item.editable;
            message.warn(msg);
          } else {
            editRecord = item;
            flag = true;
          }
        }
        if (!item[this._props.rowKey]) {
          item[this._props.rowKey] = _idKey + i++;
        }
        return item;
      });
    }

    if (flag) {
      this.editRecord = editRecord;
      this.cacheEditRecord = {...editRecord};
      delete this.cacheEditRecord.editable;
    }

    this.state.deleteFlag = false;
    return <Table {...this._props} {...this.state}/>;

  }
}
