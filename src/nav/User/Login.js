import {Form, Input, Button, Icon, Checkbox, Row, Col, message} from 'antd';
import styles from './Login.less';
import {connect} from 'dva';
import {storage} from "../../utils/util";

class Login extends React.PureComponent {
  state = {
    type: 'account',
    captchaUrl: undefined,
    submiting: false,
  };

  constructor(props) {
    super(props);
    this.state.captchaUrl = props.login.captchaUrl;
  }

  getCaptcha = () => {
    storage('login', {
      needCaptcha: true,
    });
    this.setState({
      ...this.state,
      captchaUrl: this.props.login.captchaUrl + Math.random()
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({force: true},
      (err, data) => {
        if (!err) {
          data.verifyWay = this.state.type;
          this.props.dispatch({type: 'login/login', data}).then((result) => {
            if (result.code == 200) {
              location.pathname = '/';
            } else {
              this.getCaptcha();
            }
          }).catch((e) => {
            this.getCaptcha();
          });
        }
      },
    );
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入账户名！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon}/>}
                placeholder="请输入账号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入密码！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon}/>}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          {
            storage('login').needCaptcha && (
              <Form.Item>
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
              </Form.Item>
            )
          }
          <Form.Item className={styles.additional}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className={styles.autoLogin}>自动登录</Checkbox>,
            )}
            <a className={styles.forgot} href="">忘记密码</a>
            <Button size="large" loading={this.state.submitting}
                    className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.other}>
          其他登录方式
          {/* 需要加到 Icon 中 */}
          <span className={styles.iconAlipay}/>
          <span className={styles.iconTaobao}/>
          <span className={styles.iconWeibo}/>
          <a className={styles.register} href="/user/register">注册账户</a>
        </div>
      </div>
    );
  }
}

export default connect(({login}) => ({login}))(Form.create()(Login));
