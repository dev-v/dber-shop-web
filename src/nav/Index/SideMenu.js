import {PureComponent} from 'react';
import {Menu, Icon, Layout} from 'antd';
import {menu as menus} from '../Component';
import styles from './SideMenu.less';

const {SubMenu, Item} = Menu;
const {Sider} = Layout;

export default class SideMenu extends PureComponent {
  pathMap = new Map();
  defaultSelectedKeys = [];
  defaultSelectedParent = [];

  state = {
    collapsed: false,
    menuItems: undefined,
    onSelect: undefined,
  }

  constructor(props) {
    super(props);
    this.state.menuItems = this.getMenuItems(menus);
    this.state.onSelect = props.onSelect;
  }

  toogleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    this.onSelect({
      key: this.defaultSelectedKeys[0],
    });
  }

  onSelect = ({key}) => {
    this.state.onSelect && this.state.onSelect(this.getItem(key), this.getItems(key));
  }

  getMenuItems(menus, parentPath = '') {
    if (!Array.isArray(menus)) {
      return;
    }

    return menus.map((item) => {
      if (item.visible == false) {
        return;
      }
      const path = `${parentPath}/${item.path}`;
      item.realPath = path;
      this.pathMap.set(path, item);
      if (Array.isArray(item.children)) {
        const title = <span>{item.icon &&
        <Icon type={item.icon}/>}<span>{item.title}</span></span>;
        return <SubMenu
          key={path}
          title={title}>
          {this.getMenuItems(item.children, path)}
        </SubMenu>;
      } else {
        if (item.selected) {
          this.defaultSelectedKeys.push(path);
          if (parentPath) {
            this.defaultSelectedParent.push(parentPath);
          }
        }
        return <Item
          key={path}>
          {item.icon && <Icon type={item.icon}/>}
          {item.title}
        </Item>
          ;
      }
    });
  }

  getItems(key) {
    const items = [];
    let p = '';
    key.split('/').map((k) => {
      if (k) {
        p += '/' + k;
        items.push(this.pathMap.get(p));
      }
    });
    return items;
  }

  getItem(key) {
    return this.pathMap.get(key);
  }

  render() {
    const {collapsed, menuItems} = this.state;
    return (<Sider collapsible collapsed={collapsed}>
      <Icon className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toogleCollapse}
      />
      <div className="logo"></div>
      <Menu mode="inline"
            defaultSelectedKeys={this.defaultSelectedKeys}
            defaultOpenKeys={this.defaultSelectedParent}
            onSelect={this.onSelect}>
        {menuItems}
      </Menu>
    </Sider>);
  }
}
