import React from 'react';
import {Switch, Route} from 'dva/router';
import {Icon, Breadcrumb} from 'antd';
import {getComponent} from '../Component';

export default class ContentSwitch extends React.Component {
  state = {
    component: undefined,
    showBreadcrumb: true,
    items: [],
  };

  componentWillMount() {
    Object.assign(this.state, {showBreadcrumb: this.props.showBreadcrumb});
    if (this.props.menuClick) {
      const menuClick = this.props.menuClick;
      menuClick.changeComponent = (item, items) => {
        this.setState({
          ...this.state,
          component: getComponent(item.realPath),
          items,
        });
      };
    }
  }

  render() {
    const {component, items, showBreadcrumb} = this.state;
    return (
      <div>
        {
          showBreadcrumb && (<Breadcrumb style={{paddingBottom: '16px'}}>
            {items.map((item) => {
              return <Breadcrumb.Item key={item.realPath || item.path}>
                {item.icon && <Icon type={item.icon}/>}
                {item.title}
              </Breadcrumb.Item>;
            })}
          </Breadcrumb>)
        }
        <Switch>
          <Route component={component}></Route>
        </Switch>
      </div>);
  }
}
