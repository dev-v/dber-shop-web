import {Col, Icon, message, Row, Slider, TimePicker, Tooltip} from 'antd';
import {FMT_TIME, formatMinute, getMinute, getMinuteTime} from './FormHelper';
import styles from './TimeSlider.less';
import {isSame} from "../../utils/util";

export default class TimeSlider extends React.Component {

  /**
   * 验证指定的值是否不在指定的范围内
   * 不在指定范围内返回true
   * 在指定范围内返回false
   * @param minute
   * @param checkes
   * @returns {boolean}
   */
  static valid(minute, checkes) {
    if (!checkes || checkes.length < 1) {
      return true;
    }
    for (let idx in checkes) {
      const [begin, end] = checkes[idx];
      if (minute > begin && minute < end) {
        return false;
      }
    }
    return true;
  }

  componentWillMount() {
    const {min = 570, max = 1350, point = 12, value = [840, 900],} = this.props;
    this.state = {value, min, max};
    this.cMarks({min, max, point});
    this.props.onChange && this.props.onChange(this.state.value);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!isSame(nextProps, this.props)) {
      const checkes = nextProps.checkes || this.props.checkes;
      if (!isSame(checkes, nextState.checkes)) {
        this.state.checkes = checkes;
        this.checkesDiv = this.getCheckes();
      }
    }
  }

  getCheckes = () => {
    const {min, max, checkes} = this.state, rang = max - min + 1;
    return checkes.map((check) => {
      const [begin, end] = check;
      const left = (begin - min) / rang * 100 + '%';
      const width = (end - begin + 1) / rang * 100 + '%';
      return <Tooltip key={begin} title={`时间段【${formatMinute(begin)}-${formatMinute(end)}】已被预订`} placement='bottom'>
        <div className={styles.dberSliderDisabled} style={{left, width}}>
          <div className={styles.slider}></div>
        </div>
      </Tooltip>
    });
  }

  cMarks = ({min, max, point}) => {
    // span为跨度
    let span = Math.ceil((max - min) / (point * 60)) * 60;
    if (span < 60) {
      span = 60;
    }

    const marks = {};
    marks[min] = formatMinute(min);
    let mark = min + span + min % 60;
    do {
      marks[mark] = formatMinute(mark);
    } while ((mark += span) <= (max - span / 2));//离最大必须超过1/2span才能显示mark
    marks[max] = formatMinute(max);

    this.state.marks = marks;
  }

  setValue([begin, end]) {
    const value = [begin || this.state.value[0], end || this.state.value[1]];
    this.setState({value});
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    return <div>
      <Row>
        <Col span={11}>
          <TimePicker format={FMT_TIME} value={getMinuteTime(this.state.value[0])} onChange={(time) => {
            const minute = getMinute(time), {value, min} = this.state, max = value[1];
            if (minute < min || minute > max) {
              message.warn('可选择的时间范围为：' + formatMinute(min) + '-' + formatMinute(max));
              return;
            }
            this.setValue([minute]);
          }}/>
        </Col>
        <Col span={2} style={{textAlign: 'center'}}><Icon type="minus"/></Col>
        <Col span={11} style={{textAlign: 'right'}}>
          <TimePicker format={FMT_TIME} value={getMinuteTime(this.state.value[1])} onChange={(time) => {
            const minute = getMinute(time), {value, max} = this.state, min = value[0];
            if (minute < min || minute > max) {
              message.warn('可选择的时间范围为：' + formatMinute(min) + '-' + formatMinute(max));
              return;
            }
            this.setValue([, minute]);
          }}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Slider{...this.state} step={10} range={true} tipFormatter={formatMinute} onChange={(range) => {
            this.setValue(range);
          }}>
            {this.checkesDiv}
          </Slider>
        </Col>
      </Row>
    </div>;
  }
};
