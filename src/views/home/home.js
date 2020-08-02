import React from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import methods from '../../http/request';

import './home.less';
import Footer from '../../component/Footer';

const { SubMenu } = Menu;

class Home extends React.Component {
  state = {
    current: 'mail',
  };

  componentDidMount() {}
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

function mapStateProps(state) {
  const { showFooter } = state;
  return {
    show: showFooter.show,
  };
}
function mapDispatchProps(dispatch) {
  return {};
}
export default connect(mapStateProps, mapDispatchProps)(Home);
