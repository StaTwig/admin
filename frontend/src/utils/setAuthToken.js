import axios from "axios";
const setAuthToken = (token) => {
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios.interceptors.request.use(function (config) {
    //   const location = localStorage.getItem('location');
    //   // if (config.method === 'get' && location !="undefined") {
    //   if (location !="undefined") {
    //     if (config.url.indexOf('warehouseId=') === -1)
    //       config.url = config.url + (config.url.indexOf('?') === -1 ? '?' : '&') + 'warehouseId=' + location;
    //   }
    //   return config;
    // }, function (error) {
    //   return Promise.reject(error);
    // });
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
