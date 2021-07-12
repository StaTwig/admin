import axios from "axios";
import { useSelector } from "react-redux";

const setAuthToken = token => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
   axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


  //  if(axios.defaults.params)
  //   axios.defaults.params['warehouseId'] = localStorage.getItem("location");
  // else{
  //   axios.defaults.params = {};
  //    axios.defaults.params['warehouseId'] = localStorage.getItem("location");
  // }


  // const location=window.localStorage.getItem('location');
  // console.log("loc",loc);
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.interceptors.request.use(function (config) {
      console.log("inAuth",localStorage.getItem("location"));
      if (config.method === 'get' && localStorage.getItem("location")!="undefined") {
        if (config.url.indexOf('warehouseId=') === -1)
          config.url = config.url + (config.url.indexOf('?') === -1 ? '?' : '&') + 'warehouseId=' + localStorage.getItem('location');
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
