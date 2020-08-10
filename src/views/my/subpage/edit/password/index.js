import React from 'react';
import NavPage from '../../../../../component/Nav';
import './index.less';

export default class PassWord extends React.Component {
  render() {
    return (
      <div className="password">
        <NavPage title="密码设置" />
        <div
          onClick={() => {
            this.props.history.push('/passwordDetail');
          }}
          className="land"
        >
          <div className="icons land_lo"></div>
          <div className="land_c">
            <span>修改登录密码</span>
          </div>
          <div className="icons land_r"></div>
        </div>
        <div className="land">
          <div className="icons land_lt"></div>
          <div className="land_c">
            <span>修改支付密码</span>
          </div>
          <div className="icons land_r"></div>
        </div>
      </div>
    );
  }
}
