const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return apiResponse.unauthorizedResponse(res, "no_token");
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return apiResponse.unauthorizedResponse(res, "expired_token");
        }
        return apiResponse.unauthorizedResponse(res, "invalid_token");
      }
      req.user = payload;
      next();
    });
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, "default_error");
  }
};
