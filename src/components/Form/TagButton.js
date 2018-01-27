import {PureComponent} from 'react';
import {Card, Tag} from 'antd';

const defaultIsSetting = (tag) => {
  return tag.setting;
}

export default class TagButton extends PureComponent {

  events = {};

  /**
   * tags 为所有标签
   * value为已经设置值的标签
   * @param props
   */
  constructor(props) {
    super(props);
    const {labelField = 'label', valueField = 'value', isSetting = defaultIsSetting, onClick, tags} = props;
    this.events.onClick = onClick;
    this.labelField = labelField;
    this.valueField = valueField;
    this.isSetting = isSetting;
    this.state = {tags};
  }

  onClick = (tag) => {
    if (tag._active) {
      return false;
    }
    const {tags} = this.state;
    let lastTag;
    tags.map((t) => {
      if (t._active) {
        t._active = false;
        lastTag = t;
      }
    });
    tag._active = true;
    this.events.onClick && this.events.onClick(tag, lastTag, tags);
    this.setState({
      tags: [...tags],
    });
  }

  render() {
    const {tags = [], bordered = true} = this.state;
    return <Card bordered={bordered}>
      {tags.map((tag) => {
        const color = tag._active ? '#f50' : this.isSetting(tag) ? '#2db7f5' : '#bfbfbf';
        return <Tag color={color} key={tag[this.valueField]} onClick={() => {
          this.onClick(tag);
        }}>{tag[this.labelField]}</Tag>
      })}
    </Card>
  }
}
