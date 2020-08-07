import React from "react";

import { Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

const MyPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ "./my"),
  loading: () => null,
});

const EditPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ "./subpage/edit/edit"),
  loading: () => null,
});

const My = () => (
  <React.Fragment>
    <Route exact path="/my" component={MyPage} />
    <Route exact path="/edit" component={EditPage} />
  </React.Fragment>
);

export default My;
