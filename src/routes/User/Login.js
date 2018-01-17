import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Form, Input, Button, Icon, Checkbox, Row, Col, message} from 'antd';
import styles from './Login.less';
import {shopService} from "../../utils/request";
import {storage} from '../../utils/util';

class Login extends Component {
  state = {
    type: 'account',
    needCaptcha: false,
    captchUrl: undefined,
    submiting: false,
  };

  componentWillMount() {
    Object.assign(this.state, storage('login'));
    this.state.needCaptcha && this.getCaptcha();
  }

  getCaptcha = () => {
    this.setState({
      ...this.state,
      needCaptcha: true,
      captchUrl: shopService.getUrl('login/captcha?' + Math.random()),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({force: true},
      (err, data) => {
        if (!err) {
          data.verifyWay = this.state.type;
          shopService.post('/login/login', data).then((result) => {
            if (result.code == 200) {
              storage('login', result.response);
              location.pathname = '/';
            } else {
              message.error(result.msg);
              this.getCaptcha();
            }
          }).catch(() => {
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
            this.state.needCaptcha && (
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
                      <img src={this.state.captchUrl} className='captcha' onClick={this.getCaptcha}/>
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
          <Link className={styles.register} to="/user/register">注册账户</Link>
        </div>
      </div>
    );
  }
}

export default connect(({global}) => ({global}))(Form.create()(Login));
