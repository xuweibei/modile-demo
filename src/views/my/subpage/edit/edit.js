import React from 'react';
import NavPage from '../../../../../src/component/Nav';
import methods from '../../../../http/request';
import './edit.less';
class Edit extends React.Component {
  state = {
    userData: '',
  };
  componentDidMount() {
    window.axios(methods.setUsed).then((res) => {
      if (res && res.status === 0) {
        this.setState({
          userData: res.data,
        });
      }
    });
  }
  // 初始化数据
  initListData = () => {
    const { userData } = this.state;
    const itemList = [
      {
        key: '1',
        name: 'margin',
        child: [
          {
            key: '1-1',
            extra: '修改',
            param: '/extname?router=extname',
            subName: 'pig',
            value: '昵称',
            moredes: userData && userData.nickname,
          },
          {
            key: '1-2',
            name: 'pho',
            extra: '暂不可修改',
            subName: 'phone',
            value: '手机号',
            moredes: userData && userData.phone,
          },
          {
            key: '1-3',
            name: 'pass',
            arrow: 'horizontal',
            param: '/password',
            subName: 'lock',
            value: '密码管理',
          },
          {
            key: '1-4',
            name: 'see',
            arrow: 'horizontal',
            param: '/enid?router=enid',
            subName: 'before',
            more: true,
            value: '源头UID',
          },
          {
            key: '1-5',
            name: 'adr',
            arrow: 'horizontal',
            param: '/address',
            subName: 'address',
            value: '地址管理',
          },
        ],
      },
      {
        key: '3',
        name: 'margin',
        child: [
          {
            key: '3-1',
            extra:
              userData && userData.etone_acc_user && userData.etone_acc_shopper
                ? '修改'
                : '绑定',
            param: '/bankCard',
            subName: 'bankCard',
            value: '我的银行卡',
          },
          {
            key: '3-2',
            extra:
              userData && userData.address.length > 0
                ? userData.address
                : '修改', //只允许修改一次
            param:
              userData && userData.address.length > 0
                ? ''
                : '/locationarea?router=locationarea', //只允许修改一次
            subName: 'locationarea',
            name: 'area',
            value: '当前区域',
            // moredes: userInfo && (userInfo.address ? userInfo.address.join('-') : '')
          },
        ],
      },
      {
        key: '5',
        name: 'not',
        arrow: 'horizontal',
        param: '/userAgreementDetail?router=userAgreementDetail',
        subName: 'about',
        value: '关于中卖网',
      },
    ];
    return this.renderListItem(itemList);
  };
  //渲染列表
  renderListItem = (list) => {
    const listItem = [];
    list.forEach((item) => {
      // console.log(item);
      if (item) {
        if (item.child) {
          listItem.push(
            <div key={item.key} className={item.name}>
              {this.renderListItem(item.child)}
            </div>
          );
        } else {
          listItem.push(
            <div
              key={item.key}
              onClick={() => {
                if (item.param) {
                  // console.log(this.props);
                  this.props.history.push(`${item.param}`);
                }
              }}
              className="list_item"
            >
              <div className="item_content">
                <span className={`icons ${item.subName}`}></span>
                <span>{item.value}</span>
                {item.moredes && (
                  <span className="moredes">{item.moredes}</span>
                )}
              </div>
              {item.extra ? <div className="item_extra">{item.extra}</div> : ''}

              {item.arrow ? <div className="icons am_list_arrow"></div> : ''}
            </div>
          );
        }
      }
    });
    return listItem;
  };
  render() {
    const { userData } = this.state;
    // console.log(userData);
    return (
      <div className="edit">
        <NavPage bgColor="white" title="设置" />
        <div className="banner">
          <div className="banner_center">
            <img src={userData.defaultUrl} />
            <div>UID:{userData.no}</div>
          </div>
        </div>
        <div className="my_list">
          <div className="my_list_body">{this.initListData()}</div>
        </div>
        <a className="log_out">
          <span>退出当前账号</span>
        </a>
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
