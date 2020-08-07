import React from "react";
import "./index.less";

export default class NavPage extends React.Component {
  render() {
    return (
      <div className="wrap_tab_nav">
        <div className="navbar">
          <div className="black_nav_left">
            <div className="icons icon_left "></div>
          </div>
          <span className="black_nav_title">设置</span>
        </div>
      </div>
    );
  }
}
