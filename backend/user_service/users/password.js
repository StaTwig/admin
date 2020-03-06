const init = require('../common/init.js');
const jwt = require('jsonwebtoken');
let config = require('../common/config.js');
let middleware = require('../common/middleware.js');

const multichain = init.getMultichain();

const url = 'http://3.91.225.127:3000';
const url1 = 'http://3.91.225.127:3002';

exports.forgotPassword = async function(req, res) {
  let username = req.body.username;

  const stream = 'bb_stream';

  try {
    const response = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${username}`);
    const items = response.data.items;
    let data = {}
    if (items.length > 0) {
      data = JSON.parse(items[items.length -1].data);
      const password  = data.password;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'info@babyboo.in', // generated ethereal user
          pass: 'NetStar2019' // generated ethereal password
        }
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'info@babyboo.in', // sender address
        to: `${username}`, // list of receivers
        subject: 'Password', // Subject line
        text: `Hello your password is ${password}`, // plain text body
      });

      console.log('Message sent: %s', info.messageId);
      res.json('success');
    }
    else {
      res.status(403).json(`Email doesn't exist`);
    }
  }catch(e) {
    res.status(403).json(e);
  }
};

exports.resetPassword = async function(req, res) {
  checkToken(req, res, async result => {
    if(result.success) {
      const { data } = result;
      const { username } = data;
      const { currentPassword, newPassword } = req.body;
      try {
        const stream = 'bb_stream';
        const qureyResponse = await axios.get(`${url}/queryDataByKey?stream=${stream}&key=${username}`);
        const items = qureyResponse.data.items;

        if (items.length > 0) { //if user found then change password
          const userObject = JSON.parse(items[items.length-1].data);
          const key = items[0].key;
          if(currentPassword !== userObject.password) return res.status(403).json(`CurrentPassword doesn't match`);
          const userData = {
            "stream": "bb_stream",
            "key": key,
            "data":{...userObject, password: newPassword}
          };
          const response = await axios.post(`${url1}/signUpUser`, userData);
          res.json(response.data);
        }else { //if user not found
          res.status(403).json('User not found');
        }

      }catch(e) {
        res.status(403).json(e);
      }
    }else {
      res.json(result);
    }
  });
};

exports.index = async function (req, res) {
        res.json({
      success: true,
      message: 'Index page'
    });
}
