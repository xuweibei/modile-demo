import React from 'react';
import NavPage from '../../../../../../component/Nav';
import { Input, message } from 'antd';

import methods from '../../../../../../http/request';
import './index.less';

export default class PassWordDetail extends React.Component {
  state = {
    timeNow: 10,
    isDown: false,
  };

  getPhone = () => {
    const telInput = this.nextStep();
    if (!telInput) return;
    this.countDown();
    this.setState({
      isDown: true,
    });
    window.axios(methods.vcode, { phone: telInput }).then((res) => {
      if (res.status == 0) {
        message.success('验证码发送成功');
      }
    });
  };

  nextStep = () => {
    let telInput = this.refs.telInput.state.value;
    if (!telInput) {
      message.warning(' 请输入内容');

      return;
    }
    if (!/^1[3456789]\d{9}$/.test(telInput)) {
      message.error('输入有误');
      return;
    }
    return telInput;
  };

  nextFn = () => {
    let gainCode = this.refs.gainCode.state.value;
    const telInput = this.nextStep();
    if (!telInput) return;
    if (!gainCode || gainCode != '8888') {
      message.warning('请输入正确的验证码');
    }
    window
      .axios(methods.checkVcode, {
        phone: telInput,
        vcode: gainCode,
        chk_pass: 0,
      })
      .then((res) => {
        if (res.status == 0) {
          this.props.history.push('/edit');
        }
      });
  };

  countDown = () => {
    const _this = this;
    const { timeNow } = this.state;
    let num = timeNow;
    clearInterval(timer);
    var timer = setInterval(function () {
      if (num <= 0) {
        _this.setState({
          timeNow: 10,
          isDown: false,
        });
        clearInterval(timer);
      } else {
        num--;
        _this.setState({
          timeNow: num,
        });
      }
    }, 1000);
  };

  render() {
    const { timeNow, isDown } = this.state;
    return (
      <div className="password_detail">
        <NavPage title="身份验证" />
        <div className="input_box">
          <div className="input_item">
            <div className="input_item_line">
              <div className="input_lable">输入手机号</div>
              <div className="input_control">
                <Input
                  maxLength="11"
                  ref="telInput"
                  type="tel"
                  placeholder="请输入手机号码"
                />
              </div>
            </div>
          </div>
          <div className="input_item">
            <div className="input_item_line">
              <div className="input_lable code_input_lable">
                <span>验证码</span>
                <Input
                  ref="gainCode"
                  className="code_input_control"
                  type="number"
                ></Input>
              </div>
              <div className="input_control">
                {!isDown ? (
                  <div className="gain_code" onClick={this.getPhone}>
                    获取验证码
                  </div>
                ) : (
                  <div className="verificartioncode">
                    重新发送<span>{timeNow}</span>
                  </div>
                )}
                {/* <div className="gain_code" onClick={this.getPhone}>
                  获取验证码
                </div> */}
                {/* <div className="verificartioncode">
                  重新发送<span>{timeNow}</span>
                </div> */}
              </div>
            </div>
          </div>
          <a className="next_button" onClick={this.nextFn}>
            <span>下一步</span>
          </a>
        </div>
      </div>
    );
  }
}
