require("dotenv").config();
const UserQueryModel = require("../models/UserQueryModel");
const auth = require("../middlewares/jwt");
const { body, validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const CounterModel = require("../models/CounterModel");
const { default: axios } = require("axios");

exports.newUserQuery = [
  auth,
  body("queryType").exists().withMessage("Query type not provided!"),
  body("queryDescription")
    .exists()
    .withMessage("Query description not provided"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          req,
          res,
          "validation_error",
          errors.array()
        );
      }

      const userQueryCounter = await CounterModel.findOneAndUpdate(
        { "counters.name": "userQueryId" },
        { $inc: { "counters.$.value": 1 } },
        { new: true }
      );

      const userQueryId =
        userQueryCounter.counters[11].format +
        userQueryCounter.counters[11].value;

      const userQuery = new UserQueryModel({
        id: userQueryId,
        userId: req.user.id,
        queryType: req.body.queryType,
        queryDescription: req.body.queryDescription,
        queryStatus: "PENDING",
      });

      await userQuery.save();

      let queryContent =
        `<p>${req.user.firstName}, with user ID - ${req.user.id}, has submitted a query.</p>` +
        `<p><i>${req.body.queryDescription}</i></p>` +
        `<p>Please revert back to the user:</p>` +
        `<p>EmailID - ${req.user?.emailId ? req.user?.emailId : "N/A"}</p>` +
        `<p>Phone Number - ${
          req.user?.phoneNumber ? req.user?.phoneNumber : "N/A"
        }</p>`;

      await axios.post(process.env.SEND_MESSAGE, {
        email: "dev@statwig.com",
        subject: `User Query - ${userQuery.queryType}`,
        content: queryContent,
        cc: req.user?.emailId,
      });

      return apiResponse.successResponse(
        req,
        res,
        "Your query was submitted successfully!"
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, err.message);
    }
  },
];

exports.getUserQueries = [
  auth,
  async (req, res) => {
    try {
      const userQueries = await UserQueryModel.find({ userId: req.user.id });

      return apiResponse.successResponseWithData(
        req,
        res,
        "User queries found - " + userQueries.length,
        userQueries
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, err.message);
    }
  },
];
