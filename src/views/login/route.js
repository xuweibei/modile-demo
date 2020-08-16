import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const LoginPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './index'),
  loading: () => null,
});

const Login = () => (
  <React.Fragment>
    <Route exact path="/login" component={LoginPage} />
  </React.Fragment>
);

export default Login;
