import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../component/Footer';
import methods from '../../http/request';
import './my.less';

export default class MyPage extends React.Component {
  state = {
    dataList: [],
    dataInfo: '',
    offLineMenu: [],
    onLineMenu: [],
    conumerMenu: [],
  };
  componentDidMount() {
    window.axios(methods.MyUserinfo, { iden_type: 0 }).then((res) => {
      if (res && res.status === 0) {
        this.setState({
          dataList: res.data,
          dataInfo: res.data.info,
          offLineMenu: res.data.menuc,
          onLineMenu: res.data.menub,
          conumerMenu: res.data.cam_menu,
        });
      }
    });
  }
  render() {
    const {
      dataList,
      dataInfo,
      offLineMenu,
      onLineMenu,
      conumerMenu,
    } = this.state;
    // console.log(offLine);
    return (
      <div className="my">
        <div className="my_content">
          <div className="my_top">
            <div className="my_top_info">
              <div className="my_info_icon">
                <div className="white_space"></div>
                {/* <Link to='/edit'><div className="icons icon_setUp"></div></Link> */}
                <div
                  onClick={() => {
                    // console.log(this.props);
                    this.props.history.push('/edit');
                  }}
                  className="icons icon_setUp"
                ></div>
                <div className="icons icon_notice"></div>
              </div>
              <div className="my_top_basic">
                <div className="info_basic_portrait">
                  <div className="basic_img_wrap">
                    <img src={dataInfo.avatarUrl} />
                  </div>
                </div>
                <div className="info_basic_data">
                  <div className="designation">
                    <span className="basic_data_name">{dataInfo.nickname}</span>
                    <span className="am_badge_wrap">
                      <sup className="am_badge_text">{dataInfo.typeName}</sup>
                    </span>
                  </div>
                  <div className="basic_data_UID">UID:{dataInfo.no}</div>
                </div>
              </div>
            </div>
            <div className="my_top_icon">
              <ul className="navigation_bar">
                <li className="left">
                  <div className="icons sharing"></div>
                  <div>收藏夹</div>
                </li>
                <li>
                  <div className="icons history"></div>
                  <div>浏览记录</div>
                </li>
                <li>
                  <div className="icons  assessment_center"></div>
                  <div>评价中心</div>
                </li>
                <li className="right">
                  <div className="icons qr_code"></div>
                  <div>二维码</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="my_set_shop">
            <img src={dataInfo.shop_url} />
          </div>
          <div className="my_order_form">
            <div className="my_order_top">
              <h4 className="order_box_name">线下订单</h4>
              <div className="order_box_see">
                查看全部
                <span className="icons arrow"></span>
              </div>
            </div>
            <div className="my_order_icon">
              <ul className="my_order_list">
                {offLineMenu.map((item) => {
                  return (
                    <li className="order_info">
                      <img src={item.image} />
                      <div>{item.value}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="my_order_form">
            <div className="my_order_top">
              <h4 className="order_box_name">线上订单</h4>
              <div className="order_box_see">
                查看全部
                <span className="icons arrow"></span>
              </div>
            </div>
            <div className="my_order_icon">
              <ul className="my_order_list">
                {onLineMenu.map((item) => {
                  return (
                    <li className="order_info">
                      <img src={item.image} />
                      <div>{item.value}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="my_order_form">
            <div className="my_order_content">
              <div className="conumer_info">
                {conumerMenu.map((item) => {
                  return (
                    <div className="am_list">
                      <div className="am_list_content">
                        <img src={item.image} />
                        {/* <span className="icons busin">
                            
                        </span> */}
                        <p>{item.value}</p>
                      </div>
                      <div className="am_list_arrow"></div>
                    </div>
                  );
                })}
              </div>

              <div className="my-banner">
                <img src="https://img.zzha.vip/apppic/under.png?233333" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
