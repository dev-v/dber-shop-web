import {PureComponent} from 'react';
import TableEdit from '../TableEdit/TableEdit';
import ToolBar from './ToolBar';
import {isSame} from "../../utils/util";

//除TableEdit.Index支持的属性以外，扩展的配置属性
const _default = {
  query: undefined,// ({toolbar: false, operate: (page, data) => {}} ||((page, data) => {})),返回promise
  edit: undefined,// ({toolbar: false, operate: (record) => {}} || ((record) => {})), 返回promise
  del: undefined,//((page, data) => {}) 返回promize
};
export default class RowContent extends PureComponent {
  toolbar = {left: [], right: []};

  _props;

  state = {
    currentPage: 1,
    total: 0,
    datas: [],
  };

  _custom = {
    query: undefined,
    edit: undefined,
  };

  constructor(props) {
    super(props);
    this._props = {..._default, ...props};

    const {
      edit, query, del, addModel = {editable: true},
    } = props;

    this._props.addModel = addModel;

    this.parseQuery(query);
    this.parseEdit(edit);

    if (del) {
      this._props.del = (record) => {
        return del(record).then((result) => {
          if (result) {
            this.query();
          }
        });
      };
    }
  }

  parseQuery = (query) => {
    if (query) {
      delete this._props.query;

      let barFlag = true;
      if (typeof query == 'function') {
        this._custom.query = query;
      } else {
        barFlag = query.toolbar;
        this._custom.query = query.operate;
      }

      if (barFlag) {
        this.toolbar.right.push({
          text: '查询',
          onClick: () => {
            this.query(1);
          },
        });
      }

      this._props.onPage = (page) => {
        this.query(page);
      };
    }
  };

  parseEdit = (edit) => {
    if (edit) {
      let barFlag = true;
      if (typeof edit == 'function') {
        this._custom.edit = edit;
      } else {
        barFlag = edit.toolbar;
        this._custom.edit = edit.operate;
      }

      if (barFlag) {
        this.toolbar.left.push({
          text: '添加',
          onClick: this.add,
        });
      }

      this._props.edit = (record) => {
        this._custom.edit(record).then((result) => {
          if (result) {
            this.query();
          }
        });
      };
    }
  };

  componentWillMount() {
    this.query(1);
  }

  add = () => {
    const datas = [...this.state.datas.reverse()];
    datas.push({...this._props.addModel});
    datas.reverse();
    this.setState({
      ...this.state,
      datas,
    });
  };

  query = (page, data) => {
    if (this._custom.query) {
      this._custom.query(page || this.state.currentPage, {...this.props.queryParams,...data}).then((data) => {
        if (data) {
          this.setState({...data});
        }
      });
    }
  };

  render() {
    if (this.props.datas) {
      this.state.datas = this.props.datas;
    }
    if (!isSame(this._props.addModel, this.props.addModel)) {
      this._props.addModel = this.props.addModel;
      this.query(1);
    }
    return (
      <div>
        <ToolBar {...this.toolbar}/>
        <TableEdit
          {...this._props}
          {...this.state}
        />
      </div>);
  };
};
