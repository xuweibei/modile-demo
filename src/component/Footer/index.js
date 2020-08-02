import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

export default class Footer extends React.Component {
  state = {
    current: 'home',
  };
  handleClick = (value) => {
    this.setState({
      current: value.key,
    });
  };
  render() {
    const { current } = this.state;
    return (
      <div className="menu-wrap">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="menus-list"
        >
          <Menu.Item
            key="home"
            icon={<span className="iconfont">&#xe613;</span>}
          >
            <Link to="/home">首页</Link>
          </Menu.Item>
          <Menu.Item
            key="category"
            icon={<span className="iconfont">&#xe623;</span>}
          >
            <Link to="/category">分类</Link>
          </Menu.Item>
          <Menu.Item
            key="shopCart"
            icon={<span className="iconfont">&#xe600;</span>}
          >
            <Link to="/shopCart">购物车</Link>
          </Menu.Item>
          <Menu.Item key="my" icon={<span className="iconfont">&#xe658;</span>}>
            <Link to="/my">我的</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
