import {Form, Input, Button, Row, Col, Popover, Progress, message} from 'antd';
import styles from './Register.less';
import {connect} from 'dva';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  pool: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception',
};

class Register extends React.PureComponent {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    captchaUrl: undefined,
    registing: false,
  };

  constructor(props) {
    super(props);
    this.state.captchaUrl = props.login.captchaUrl;
  }

  getCaptcha = () => {
    this.setState({
      ...this.state,
      captchaUrl: this.props.login.captchaUrl + Math.random()
    });
  };

  getPasswordStatus = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'pool';
  };

  setRegisting = (registing) => {
    this.setState({
      ...this.state,
      registing,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({force: true}, (err, data) => {
      if (!err) {
        this.setRegisting(true);
        this.props.dispatch({type: 'login/regist', data,}).then((result) => {
          if (result.code == 200) {
            message.info('注册成功，即将跳转登录界面！');
            setTimeout(() => {
              location.pathname = '/user/login';
            }, 2000)
          } else {
            this.getCaptcha();
          }
        }).catch(() => {
          this.getCaptcha();
        }).finally(() => {
          this.setRegisting(false);
        });
      }
    });
  };

  handleConfirmBlur = (e) => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  checkConfirm = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], {force: true});
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    const {count} = this.state;
    return (
      <div className={styles.main}>
        <h3>账号注册</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入昵称！',
                },
                {
                  max: 50,
                  message: '昵称长度不能超过50个字符！'
                },
              ],
            })(<Input size="large" placeholder="昵称"/>)}
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{padding: '4px 0'}}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{marginTop: 10}}>
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{width: 240}}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="至少6位密码，区分大小写"
                />,
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请确认密码！',
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(<Input size="large" type="password" placeholder="确认密码"/>)}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={14}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ],
                })(<Input size="large" placeholder="验证码"/>)}
              </Col>
              <Col span={10}>
                <a href='javascript:;'>
                  <img src={this.state.captchaUrl} className='captcha' onClick={this.getCaptcha}/>
                </a>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={this.state.registing}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <a className={styles.login} href="/user/login">使用已有账户登录</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(({login}) => ({login}))(Form.create()(Register));
