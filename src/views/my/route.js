import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
//我的页面
const MyPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './my'),
  loading: () => null,
});
//设置页面
const EditPage = Loadable({
  loader: () => import('./subpage/edit/edit'),
  loading: () => null,
});
//密码设置页面
const PassWord = Loadable({
  loader: () => import('./subpage/edit/password'),
  loading: () => null,
});
//修改登录密码页面
const PassWordDetail = Loadable({
  loader: () => import('./subpage/edit/password/passwordDetail'),
  loading: () => null,
});
//修改支付密码页面
const PassWordDetailPayment = Loadable({
  loader: () => import('./subpage/edit/password/passwodDetailPayment'),
  loading: () => null,
});
//收藏夹页面
const Collect = Loadable({
  loader: () => import('./subpage/my-collect'),
  loading: () => null,
});

const My = () => (
  <React.Fragment>
    <Route exact path="/my" component={MyPage} />
    <Route exact path="/edit" component={EditPage} />
    <Route exact path="/password" component={PassWord} />
    <Route exact path="/passWordDetail" component={PassWordDetail} />
    <Route
      exact
      path="/passWordDetailPayment"
      component={PassWordDetailPayment}
    />
    <Route exact path="/collect" component={Collect} />
  </React.Fragment>
);

export default My;
