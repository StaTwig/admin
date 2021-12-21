const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
  secret: secret,
  algorithms: ["sha1", "HS256"],
});

module.exports = authenticate;
