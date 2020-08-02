import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const CategoryPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './index'),
  loading: () => null,
});

const Category = () => (
  <>
    <Route exact path="/category" component={CategoryPage} />
  </>
);

export default Category;
