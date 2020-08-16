import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import HomeRouters from './home/route';
import My from './my/route';
import Category from './category/route';
import ShopCartPage from './shopaCart/route';
import Login from './login/route.js';

export const ViewRouter = () => (
  <Router>
    <HomeRouters />
    <Category />
    <ShopCartPage />
    <My />
    <Login />
  </Router>
);
