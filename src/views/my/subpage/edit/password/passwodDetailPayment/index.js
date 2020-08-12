import React from 'react';
import NavPage from '../../../../../../component/Nav';
import { InputItem, Modal, Toast } from 'antd-mobile';

import methods from '../../../../../../http/request';
import './index.less';

const alert = Modal.alert;

export default class PassWordPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNow: 60, //验证倒计时默认时间
      isDown: false,
      phoneShow: true, //显示手机验证
      setPaymentShow: false, //显示设置支付密码
      setPasswordValue: '', //设置支付密码框的值
      setPasswordRepeat: '', //确认设置支付密码框的值
      phoneValue: '', //手机号
    };
  }

  //获取验证码
  getPhone = () => {
    const telInput = this.nextStep();
    if (!telInput) return;
    this.countDown();
    this.setState({
      isDown: true,
    });
    window.axios(methods.vcode, { phone: telInput }).then((res) => {
      if (res.status === 0) {
        Toast.info('验证码发送成功', 1);
      }
    });
  };
  //下一步
  nextStep = () => {
    let telInput = this.refs.telInput.state.value;
    if (!telInput) {
      Toast.info('请输入内容', 1);
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(telInput)) {
      Toast.info('输入有误', 1);
      return;
    }
    return telInput;
  };
  //点击下一步的时候
  nextFn = () => {
    let gainCode = this.refs.gainCode.state.value;
    const telInput = this.nextStep();
    if (!telInput) return;
    if (!gainCode || gainCode !== '8888') {
      Toast.info('请输入正确的验证码', 1);
    }
    window
      .axios(methods.checkVcode, {
        phone: telInput,
        vcode: gainCode,
        chk_pass: 0,
      })
      .then((res) => {
        if (res.status === 0) {
          this.setState({
            phoneShow: false,
            setPaymentShow: true,
          });
        }
      });
  };
  // 获取验证码
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

  // 确认按钮
  sureFn = () => {
    const { passwordValue, sureValue } = this.state;
    if (passwordValue === '') {
      Toast.info('输入密码不能为空', 1);
    }
    if (sureValue === '') {
      Toast.info('确认密码不能为空', 1);
    }
    // ||
    if (passwordValue.trim().length >= 6) {
      console.log(passwordValue, sureValue);
      console.log(passwordValue === sureValue);
      if (passwordValue === sureValue) {
        //弹窗
        this.alertModal();
      } else {
        Toast.info('密码不一致', 1);
      }
    } else {
      Toast.info('密码输入错误', 1);
    }
  };

  //输入支付密码不足6位时
  blurFn = () => {
    const { setPasswordValue } = this.state;
    if (setPasswordValue.length !== 6) {
      Toast.info('请输入6位数字密码', 1);
    }
  };
  //再次输入支付密码不足6位时
  blurFnTwo = () => {
    const { setPasswordRepeat } = this.state;
    if (setPasswordRepeat.length !== 6) {
      Toast.info('请输入6位数字密码', 1);
    }
  };
  //判断设置密码是否一致
  setPasswordFn = () => {
    const { setPasswordValue, setPasswordRepeat, phoneValue } = this.state;
    const reg = /^[0-9]*$/;
    if (setPasswordValue.length === 6 && setPasswordRepeat.length === 6) {
      if (reg.test(setPasswordValue) && reg.test(setPasswordRepeat)) {
        if (setPasswordValue === setPasswordRepeat) {
          window
            .axios(methods.modifyPaypwd, {
              phone: phoneValue,
              pwd: setPasswordRepeat,
            })
            .then((res) => {
              if (res.status === 0) {
                this.props.history.push('/edit');
                Toast.info('支付密码设置成功！', 1);
              } else {
                Toast.info('支付密码不能和登录密码一样！', 1);
              }
            });
        } else {
          Toast.info('密码不一致', 1);
        }
      } else {
        Toast.info('密码必须为数字', 1);
      }
    }
    // if (setPasswordValue === setPasswordRepeat) {

    // }
  };
  render() {
    const {
      timeNow,
      isDown,
      phoneShow,
      setPaymentShow,
      setPasswordValue,
      setPasswordRepeat,
      phoneValue,
    } = this.state;
    // console.log(phoneShow);
    return (
      <div className="password_detail">
        {phoneShow && (
          <div className="authentication">
            <NavPage title="身份验证" />
            <div className="input_box">
              <div className="input_item">
                <div className="input_item_line">
                  <div className="input_lable">输入手机号</div>
                  <div className="input_control">
                    <InputItem
                      maxLength="11"
                      ref="telInput"
                      type="tel"
                      placeholder="请输入手机号码"
                      onChange={(e) => {
                        this.setState({
                          phoneValue: e,
                        });
                      }}
                      value={phoneValue}
                    />
                  </div>
                </div>
              </div>
              <div className="input_item">
                <div className="input_item_line">
                  <div className="code_input_lable">
                    <span>验证码</span>
                    <InputItem
                      ref="gainCode"
                      className="code_input_control"
                      type="number"
                      maxLength="4"
                    />
                  </div>
                  <div className="gain_code_wrap">
                    {!isDown ? (
                      <div className="gain_code" onClick={this.getPhone}>
                        获取验证码
                      </div>
                    ) : (
                      <div className="verificartioncode">
                        重新发送<span>{timeNow}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="next_button" onClick={this.nextFn}>
                {/* <div className="next_button" onClick={this.alertModal}> */}
                <span>下一步</span>
              </div>
            </div>
          </div>
        )}
        {setPaymentShow && (
          <div className="set_payment">
            <NavPage title="设置支付密码" />
            <div className="payment_box">
              <div className="payment_item">
                <p>请输入支付密码</p>
                <div className="payment_main">
                  <InputItem
                    onBlur={() => {
                      this.blurFn();
                    }}
                    onChange={(e) => {
                      this.setState(
                        {
                          setPasswordValue: e,
                        },
                        () => {
                          this.setPasswordFn();
                        }
                      );
                    }}
                    value={setPasswordValue}
                    type="password"
                    maxLength="6"
                    clear
                  />
                </div>
              </div>
              <div className="payment_item">
                <p>请再次输入支付密码</p>
                <div className="payment_main">
                  <InputItem
                    onBlur={() => {
                      this.blurFnTwo();
                    }}
                    onChange={(e) => {
                      this.setState(
                        {
                          setPasswordRepeat: e,
                        },
                        () => {
                          this.setPasswordFn();
                        }
                      );
                    }}
                    maxLength="6"
                    type="password"
                    value={setPasswordRepeat}
                    clear
                  />
                </div>
              </div>
              <p className="tips">不可与登入密码相同</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
