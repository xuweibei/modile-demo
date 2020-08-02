import React from 'react';
import './App.css';
import { ViewRouter } from './views/routers';
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <div className="root-wrap">
        <ViewRouter />
      </div>
    </>
  );
}

export default App;
