import axios from 'axios';
import appHistory from '../utils/appHistory';
import { Toast } from 'antd-mobile';

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (!config.data) config.data = {};
    config.data.userToken = localStorage.getItem('userToken');
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// http response 拦截器
axios.interceptors.response.use((response) => {
  if (response.data.status !== 0) {
    Toast.fail(response.data.message);
  }
  if (response.data.status === 100 || response.data.status === 101) {
    window.location.hash = '#/login';
  }
  return response;
});

window.axios = async function (url, parmas, method = 'post') {
  //   alert(url);
  let data = {};
  if (method === 'post') {
    data = await axios
      .post(url, parmas)
      .then((res) => {
        // console.log(res);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  } else {
    data = await axios
      .get(url, {
        params: parmas,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
  return data;
};
