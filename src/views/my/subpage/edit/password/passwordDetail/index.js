import React from 'react';
import NavPage from '../../../../../../component/Nav';
import { InputItem, Modal, Toast } from 'antd-mobile';

import methods from '../../../../../../http/request';
import './index.less';

const alert = Modal.alert;

export default class PassWordDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNow: 10, //验证倒计时默认时间
      isDown: false,
      phoneShow: true, //显示手机验证
      passShow: false, //显示密码验证
      passwordValue: '', //输入密码value
      sureValue: '', //确认密码value
      passType: true, //第一个密码框的状态
      passAType: true, //第二个密码框的状态
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
      Toast.info('请输入手机号', 1);
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(telInput)) {
      Toast.info('请输入正确的手机号', 1);
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
            passShow: true,
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
      Toast.info('密码不能为空', 1);
    }
    if (sureValue === '') {
      Toast.info('密码不能为空', 1);
    }
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

  alertModal = () => {
    alert('登入密码设置成功，是否现在去设置支付密码', '', [
      {
        text: '稍后',
        onPress: () => {
          this.props.history.push('/password');
        },
      },
      {
        text: '好的',
        onPress: () => {
          this.props.history.push('/passWordDetailPayment');
        },
      },
    ]);
  };
  //控制眼睛
  changeEyes = (onOff) => {
    if (onOff === '1') {
      this.setState((prevState) => ({
        passAType: !prevState.passAType,
      }));
    } else {
      this.setState((prevState) => ({
        passType: !prevState.passType,
      }));
    }
  };

  render() {
    const {
      timeNow,
      isDown,
      phoneShow,
      passShow,
      passwordValue,
      sureValue,
      passType,
      passAType,
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
        {passShow && (
          <div className="set_password">
            <NavPage title="设置登录密码" />
            <div className="cipher_box">
              <div className="input_item">
                <div className="input_wrap">
                  <div className="icon_box" onClick={this.changeEyes}>
                    <div
                      className={`icons ${
                        passType ? 'icon_close' : 'icon_open'
                      }`}
                    ></div>
                    {/* <div className="icons icon_close"></div> */}
                  </div>
                  <div className="list_line">
                    <div className="input_lable">输入密码</div>
                    <div className="input_control">
                      <InputItem
                        type={passType ? 'password' : 'text'}
                        onChange={(e) => {
                          this.setState({
                            passwordValue: e,
                          });
                        }}
                        placeholder="******"
                        maxLength="8"
                        value={passwordValue}
                        clear
                        editable
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="input_item">
                <div className="input_wrap">
                  <div
                    className="icon_box"
                    onClick={() => {
                      this.changeEyes('1');
                    }}
                  >
                    <div
                      className={`icons ${
                        passAType ? 'icon_close' : 'icon_open'
                      }`}
                    ></div>
                  </div>
                  <div className="list_line">
                    <div className="input_lable">确认密码</div>
                    <div className="input_control">
                      <InputItem
                        onChange={(e) => {
                          this.setState({
                            sureValue: e,
                          });
                        }}
                        type={passAType ? 'password' : 'text'}
                        value={sureValue}
                        ref="inputPassword"
                        placeholder="******"
                        maxLength="8"
                        clear
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="next_button" onClick={this.sureFn}>
                <span>确定</span>
              </div>
              {/* 
              <Modal
                title="登入密码设置成功，是否现在去设置支付密码"
                transparent
                visible={this.state.visible} //设置默认隐藏
              ></Modal> */}
            </div>
          </div>
        )}
      </div>
    );
  }
}