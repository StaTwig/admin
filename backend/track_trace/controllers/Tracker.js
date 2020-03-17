const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
// const jwt = require("jsonwebtoken");

/**
 * User registration.
 *
 *
 *
 * @returns {Object}
 */
exports.trackStats = [
  (req, res) => {
    try {
      return apiResponse.successResponseWithData(res, "Data sent", dataObject);
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.fetchTransactions = [
  (req, res) => {
    try {
      res.json("User profile details");
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
];
