import React from 'react';
import { createForm, formShape } from 'rc-form';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import methods from '../../http/request';
import './index.less';

let timer = null;
class Loign extends React.Component {
  submit = () => {
    this.props.form.validateFields((err, values) => {
      console.log(err, values, '是的罚款');
      if (!err) {
        console.log(values);
        window
          .axios(methods.login, {
            code: values.phone.replace(/\s+/g, '') + 'UUUUUUUUUU' + values.code,
            token: 'f3dd0b7A50Tdc9icaescc7k51Wb0w3k36S5d9f001c4',
            type: 3,
          })
          .then((res) => {
            if (res && res.status === 0) {
              Toast.success('登录成功');
              localStorage.setItem('userToken', res.LoginSessionKey);
              this.props.history.replace('/home');
            }
          });
      }
    });
  };

  //验证
  verificationFn = (getFieldError) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (getFieldError('phone')) {
        Toast.info('请输入正确的手机号');
      }
      if (getFieldError('code')) {
        Toast.info('请输入正确的验证码');
      }
    }, 1000);
  };

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="login_page">
        <p>欢迎登录中卖网</p>
        <div className="phone">
          <span className="iconfont">&#xe660;</span>
          <InputItem
            type="phone"
            {...getFieldProps('phone', {
              rules: [
                {
                  required: true,
                  pattern: /^1\s*[34578]\s*(\d\s*){9}$/,
                },
              ],
            })}
            placeholder="请输入手机号"
          />
        </div>
        <div className="password">
          <span className="iconfont">&#xe66c;</span>
          <InputItem
            type="number"
            {...getFieldProps('code', {
              rules: [
                {
                  required: true,
                },
              ],
            })}
            placeholder="请输入验证码"
          />
        </div>
        <Button className="login_btn" onClick={this.submit}>
          登录
        </Button>
        {/* {(errors = getFieldError('code'))
          ? Toast.info('请输入正确的验证码')
          : null} */}
        {this.verificationFn(getFieldError)}
      </div>
    );
  }
}

export default createForm()(Loign);
