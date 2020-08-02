import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/stroe';
import { ViewRouter } from './views/routers';
import './http';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <div className="root-wrap">
        <ViewRouter />
      </div>
    </Provider>
  );
}

export default App;
