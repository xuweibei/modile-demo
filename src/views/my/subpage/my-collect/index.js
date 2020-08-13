import React from 'react';
import NavPage from '../../../../component/Nav';
import './index.less';
class Collect extends React.Component {
  render() {
    return (
      <div className="collect">
        <NavPage bgColor="white" title="我的收藏" rightEdit />
        <div className=""></div>
      </div>
    );
  }
}
export default Collect;
