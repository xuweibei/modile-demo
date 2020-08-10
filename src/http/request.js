import https from './methods';

const { api } = https;

const methods = {
  homeRsShop: api + 'home-rs-shop',
  homeBanner: api + 'home-banner',
  homeGetCategoryOne: api + 'home-get-category-one',
  sortGetCategory: api + 'sort-get-category',
  MyUserinfo: api + 'my-userinfo',
  setUsed: api + 'set-used',
  vcode: api + 'vcode',
  checkVcode: api + 'check-vcode',
};

export default methods;
