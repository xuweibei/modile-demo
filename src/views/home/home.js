import React from 'react';
import { Menu } from 'antd';

import './home.less';
import Footer from '../../component/Footer';

const { SubMenu } = Menu;

export default class Home extends React.Component {
  state = {
    current: 'mail',
  };
  render() {
    const { current } = this.state;
    return (
      <>
        <p>首页</p>
        <Footer />
      </>
    );
  }
}
