import React from "react";
import NavPage from "../../../../../src/component/Nav";
import "./edit.less";
class Edit extends React.Component {
  componentDidMount() {}
  // 初始化数据
  initListData = () => {
    const itemList = [
      {
        key: "1",
        name: "margin",
        child: [
          {
            key: "1-1",
            extra: "修改",
            param: "/extname?router=extname",
            subName: "pig",
            value: "昵称",
            // moredes: userInfo && userInfo.nickname,
          },
        ],
      },
    ];
    return this.renderListItem(itemList);
  };
  //渲染列表
  renderListItem = (list) => {
    const listItem = [];
    list.forEach((item) => {
      console.log(item);
      if (item) {
        if (item.child) {
          listItem.push(
            <div key={item.key} className={item.name}>
              {this.renderListItem(item.child)}
            </div>
          );
        } else {
          listItem.push(
            <div className="list_item">
              <div className="item_content">
                <span className={item.subName}></span>
                <span>昵称</span>
                <span className="moredes">zp_190054</span>
              </div>
              <div className="item_extra">修改</div>
            </div>
          );
        }
      }
    });
    return listItem;
  };
  render() {
    return (
      <div className="edit">
        <NavPage />
        <div className="banner">
          <div className="banner_center">
            <img src="https://img.zzha.vip/cam/assets/img/myAccount/default.png?0" />
            <div>UID:190054</div>
          </div>
        </div>
        <div className="my_list">
          <div className="my_list_body">{this.initListData()}</div>
        </div>
        {/* <div className="my_list">
          <div className="my_list_body">
            <div className="list_item">
              <div className="item_content">
                <span className="icons pig"></span>
                <span>昵称</span>
                <span className="moredes">zp_190054</span>
              </div>
              <div className="item_extra">修改</div>
            </div>
            <div className="list_item">
              <div className="item_content">
                <span className="icons phone"></span>
                <span>手机号</span>
                <span className="moredes">158***5798</span>
              </div>
              <div className="item_extra">暂不可修改</div>
            </div>
            <div className="list_item">
              <div className="item_content">
                <span className="icons lock"></span>
                <span>密码管理</span>
              </div>
              <div className="icons am_list_arrow"></div>
            </div>
          </div>
        </div>
      */}
      </div>
    );
  }
}
export default Edit;
