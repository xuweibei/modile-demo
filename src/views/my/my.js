import React from 'react';
import Footer from '../../component/Footer';

export default class MyPage extends React.Component {
  componentDidMount() {
    window.axios('haha');
  }
  render() {
    return (
      <div>
        我的
        <Footer />
      </div>
    );
  }
}
