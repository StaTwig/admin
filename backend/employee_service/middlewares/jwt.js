const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return apiResponse.unauthorizedResponse(req, res, "no_token");
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return apiResponse.unauthorizedResponse(req, res, "expired_token");
        }
        return apiResponse.unauthorizedResponse(req, res, "invalid_token");
      }
      req.user = payload;
      next();
    });
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(req, res, "default_error");
  }
};
