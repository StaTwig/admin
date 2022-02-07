const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return apiResponse.unauthorizedResponse(
        res,
        "Authorization token is not found"
      );
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          return apiResponse.unauthorizedResponse(res, "Token expired");
        }
        return apiResponse.unauthorizedResponse(res, "Invalid token");
      }
      req.user = payload;
      next();
    });
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, "Auth Error");
  }
};
