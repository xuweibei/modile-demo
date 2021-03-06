import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFooter } from '../../actions';
import './index.less';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.parentShow,
    };
  }
  handleClick = (value) => {
    this.props.setFooter(value.key);
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

function mapStateProps(state) {
  return {
    parentShow: state.showFooter.show,
  };
}

function mapDispatchProps(dispatch) {
  return {
    setFooter: (value) => {
      dispatch(setFooter(value));
    },
  };
}

export default connect(mapStateProps, mapDispatchProps)(Footer);
