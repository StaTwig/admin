const dotenv = require('dotenv').config({path: __dirname+'/../.env'})
// console.log(`${`${__dirname}/../.env`}`)
const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
	secret: secret , algorithms: ['RS256']
});

module.exports = authenticate;