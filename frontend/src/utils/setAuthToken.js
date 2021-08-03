import axios from "axios";

const setAuthToken = token => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
   axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
 
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
