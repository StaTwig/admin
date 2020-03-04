const axios = require('axios');
const url = 'http://3.91.225.127:3002'
const checkToken = require('../common/middleware').checkToken;

exports.updateDetails = async function(req, res) {
  const { authorization } = req.headers;
 checkToken(req, res, async result => {
   if(result.success) {
      const { data } = result;
      const { username } = data;
      const { details } = req.body;
      const stream = {
        "stream": "vaccineledger_data_stream",
        "key": username,
        "data": details
      }
      const response = await axios.post(`${url}/signUpUser`, stream);

      res.json(response.data);
   }else {
     res.json(result);
   }
 });

};

exports.index = async function(req, res) {
  res.json({
    success: true,
    message: 'Index page',
  });
};

