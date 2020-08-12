import axios from 'axios';

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // const state = store.getState();
    // const userToken = state.get('base').get(LOCALSTORAGE.USER_TOKEN);
    if (!config.data) config.data = {};
    config.data.userToken = 'c2ef10fUcandc4X3073ced33b3ef462862d38485a5f';
    // config.data.userToken =
    //   userToken ||
    //   (window.localStorage.getItem('zpyg_userToken') === 'null'
    //     ? ''
    //     : window.localStorage.getItem('zpyg_userToken'));
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// http response 拦截器
axios.interceptors.response.use((response) => {
  if (response.data.status === 100 || response.data.status === 101) {
    if (process.env.NATIVE) {
      // removeValue(LOCALSTORAGE.USER_TOKEN); // 清除token,localstorage
      // store.dispatch(actionCreator.setUserToken('')); // 清除redux的userToken
    } else {
      // appHistory.push('/login');
    }
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
