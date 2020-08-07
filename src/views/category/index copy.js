import React from "react";
import Footer from "../../component/Footer";
import methods from "../../http/request";

import "./index.less";

export default class Category extends React.Component {
  state = {
    dataList: [],
    activeId: "",
  };
  classList = (item) => {
    // console.log(item);
    this.setState({
      activeId: item,
    });
  };
  componentDidMount() {
    // console.log(methods.sortGetCategory, "较好的萨菲");
    window.axios(methods.sortGetCategory, { id: 0, types: 1 }).then((res) => {
      console.log(res);
      if (res && res.status === 0) {
        this.setState({
          dataList: res.data,
          activeId: res.data[0].id1,
        });
      }
    });
  }

  render() {
    const { dataList, activeId } = this.state;

    const active = dataList.find((item) => {
      if (item.id1 === activeId) {
        return item;
      }
    });

    console.log(active);
    // console.log(dataList);
    return (
      <div className="category">
        <h2>分类</h2>
        <div className="cate_center">
          <div className="cate_left">
            <ul>
              {dataList.map((item) => {
                return (
                  <li
                    key={item.id1}
                    className={item.id1 === activeId ? "active-color" : ""}
                    onClick={() => this.classList(item.id1)}
                  >
                    <span>{item.cate_name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="cate_right">
            <div className="cate_right_content">
              <div className="cate_right_title">
                <p className="line"></p>
                <p className="cate_name">{active ? active.cate_name : ""}</p>
                <p className="line"></p>
              </div>
              <div className="cate_right_imgs">
                {active
                  ? active.cate2.map((item) => {
                      console.log(item);
                      return (
                        <div key={item.img_url} className="imgs_item">
                          <img src={item.img_url} />
                          <p>{item.cate_name}</p>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
