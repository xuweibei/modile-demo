import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';

class NavPage extends React.Component {
  render() {
    const { title, bgColor } = this.props;
    const isOff = bgColor === 'white';
    // console.log(bgColor);
    return (
      <div className="wrap_tab_nav">
        <div
          style={{
            background: isOff ? bgColor : 'red',
            color: isOff ? '#333' : '#fff',
          }}
          className="navbar"
        >
          <div
            onClick={() => {
              this.props.history.goBack();
            }}
            className="black_nav_left"
          >
            <div className="icons icon_left "></div>
          </div>
          <span className="black_nav_title">{title}</span>
        </div>
      </div>
    );
  }
}
export default withRouter(NavPage);
