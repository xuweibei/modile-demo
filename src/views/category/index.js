import React from 'react';
import Footer from '../../component/Footer';
import methods from '../../http/request';

export default class Category extends React.Component {
  componentDidMount() {
    window.axios(methods.sortGetCategory, { id: 0, types: 1 }).then((res) => {
      console.log(res);
    });
  }
  render() {
    return (
      <div>
        <h2>分类</h2>
        <div>
          <div></div>
          <div></div>
        </div>
        <Footer />
      </div>
    );
  }
}
