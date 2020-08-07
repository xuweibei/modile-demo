import https from "./methods";

const { api } = https;

const methods = {
  homeRsShop: api + "home-rs-shop",
  homeBanner: api + "home-banner",
  homeGetCategoryOne: api + "home-get-category-one",
  sortGetCategory: api + "sort-get-category",
  MyUserinfo: api + "my-userinfo",
};

export default methods;
