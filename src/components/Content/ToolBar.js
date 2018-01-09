import {Button, Row, Col} from 'antd';
import {PureComponent} from 'react';

export default class ToolBar extends PureComponent {
  toolBar = <span></span>;

  constructor(props) {
    super(props);

    const {left, right} = props;

    if ((left && left.length > 0) || (right && right.length > 0)) {
      this.toolBar = (<Row style={{paddingBottom: '2px'}}>
        <Col span={8}>
          {(() => {
            if (left) {
              return left.map((item) => {
                return <Button key={item.text} type='primary'
                               onClick={item.onClick}>{item.text}</Button>;
              });
            }
          })()}
        </Col>

        <Col span={16} style={{textAlign: 'right'}}>
          {(() => {
            if (right) {
              return right.map((item) => {
                return <Button key={item.text} type='primary'
                               onClick={item.onClick}>{item.text}</Button>;
              });
            }
          })()}
        </Col>
      </Row>);
    }
  }

  render() {
    return this.toolBar;
  }
}
