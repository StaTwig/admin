let jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({path: __dirname+'/../.env'})
const config = require('./jwt.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  // console.log('token', token);
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        next({
          success: false,
          message: 'Token is not valid'
        });

      } else {
        next({
          success: true,
          message: 'Token is valid',
          data: decoded
        })
      }
    });
  } else {
    console.log('Token ', token);
    next({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}

