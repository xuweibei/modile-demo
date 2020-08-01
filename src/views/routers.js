import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import HomeRouters from './home/route';

export const ViewRouter = () => (
  <Router>
    <HomeRouters />
  </Router>
);
