import {PureComponent} from 'react';
import {Menu, Icon, Layout} from 'antd';
import menus from './menu';

const {SubMenu, Item} = Menu;
const {Sider} = Layout;

export default class SideMenu extends PureComponent {
  pathMap = new Map();
  defaultSelectedKeys = [];
  defaultSelectedParent = [];

  componentDidMount() {
    this.onSelect({
      key: this.defaultSelectedKeys[0],
    });
  }

  onSelect = ({key}) => {
    this.props.onClick &&
    this.props.onClick(this.getItem(key), this.getItems(key));
  };

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
    const menuItems = this.getMenuItems(menus);
    return (<Sider collapsible
                   collapsed={this.props.collapsed}>
      <div className="logo">
      </div>
      <Menu
        defaultSelectedKeys={this.defaultSelectedKeys} mode="inline"
        defaultOpenKeys={this.defaultSelectedParent}
        onSelect={this.onSelect}>
        {menuItems}
      </Menu>
    </Sider>);
  }
}
