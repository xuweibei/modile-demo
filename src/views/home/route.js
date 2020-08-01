import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './home'),
  loading: () => null,
});
const Home = () => (
  <React.Fragment>
    <Route exact path="/" component={() => <Redirect to="/home" />} />
    <Route path="/home" component={HomePage} />
  </React.Fragment>
);

export default Home;
