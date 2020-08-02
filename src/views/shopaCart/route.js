import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const ShopCartPage = Loadable({
  loader: () => import(/* webpackChunkName: 'ShopCartPage' */ './index'),
  loading: () => null,
});

const ShopCart = () => (
  <>
    <Route exact path="/shopCart" component={ShopCartPage} />
  </>
);

export default ShopCart;
