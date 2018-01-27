import React from 'react';
import {Switch, Route} from 'dva/router';
import {Icon, Breadcrumb} from 'antd';
import {nProgress} from '../../utils/progress';
import {getComponent} from '../Component';

export default class ContentSwitch extends React.Component {
  state = {
    showBreadcrumb: true,
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    nProgress.inc();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item) {
      return true;
    } else {
      nProgress.done();
      return false;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    nProgress.inc();
    nProgress.done();
  }

  componentDidUpdate(prevProps, prevState) {
    nProgress.done();
  }

  componentWillUnmount() {
    nProgress.done();
  }

  constructor(props) {
    super(props);
    this.state.showBreadcrumb = props.showBreadcrumb;
  }


  render() {
    const {item, items} = this.props;
    const component = item ? getComponent(item.realPath) : undefined;
    return (
      <div>
        {
          this.state.showBreadcrumb && item && (<Breadcrumb style={{paddingBottom: '16px'}}>
            {items.map((item) => {
              return <Breadcrumb.Item key={item.realPath || item.path}>
                {item.icon && <Icon type={item.icon}/>}
                {item.title}
              </Breadcrumb.Item>;
            })}
          </Breadcrumb>)
        }
        <Switch>
          {component && <Route component={component}></Route>}
        </Switch>
      </div>);
  }
}
