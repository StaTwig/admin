require("dotenv").config();
const DemoRequestModel = require("../models/DemoRequestModel");
const CounterModel = require("../models/CounterModel");
const { default: axios } = require("axios");
const { body, validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sendMessageUrl = process.env.SEND_MESSAGE || "https://test.vaccineledger.com/notificationmanagement/api/notification/sendMessage";

exports.newDemoRequest = [
  body("name").notEmpty().withMessage("Name not provided!"),
  body("emailId").notEmpty().withMessage("Name not provided!"),
  body("companyName").notEmpty().withMessage("Name not provided!"),
  body("designation").notEmpty().withMessage("Name not provided!"),
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

      const requestCounter = await CounterModel.findOneAndUpdate(
        { "counters.name": "demoRequestId" },
        { $inc: { "counters.$.value": 1 } },
        { new: true }
      );

      const requestId =
        requestCounter.counters[12].format +
        requestCounter.counters[12].value;

      const newDemoReq = new DemoRequestModel({
        id: requestId,
        name: req.body.name,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber,
        companyName: req.body.companyName,
        designation: req.body.designation,
        softwareAppication: req.body.softwareApplication,
        numberOfEmployees: req.body.numberOfEmployees,
      });
      await newDemoReq.save();

      let demoReqContent =
        `<p>Hey, you've received a demo request for Vaccine Ledger by</p>` +
        `<p><b>${req.body.name}</b> who is a <b>${req.body.designation}</b> at the organization <b>${req.body.companyName}</b> with <b>${req.body.numberOfEmployees}</b> employees.</p>` +
        `<p>Please revert back to ${req.body.name}:</p>` +
        `<p>EmailID - ${req.body.emailId}</p>` +
        `<p>Phone Number - ${req.body.phoneNumber}</p>`;

      await axios.post(sendMessageUrl, {
        email: "dev@statwig.com",
        subject: `Demo Request from organization - ${req.body.companyName}`,
        content: demoReqContent,
      });

      return apiResponse.successResponse(req, res, "Your query was submitted successfully!");

    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, err.message);
    }
  }
];

exports.validateRequest = [
  async (req, res) => {
    try {
      let emailId = req.body.emailId;

      const existingRequests = await DemoRequestModel.findOne({
        emailId: emailId,
      });

      if (existingRequests) {
        return apiResponse.ErrorResponse(req, res, "Duplicate request!");
      }

      return apiResponse.successResponse(req, res, "Valid email!");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, err.message);
    }
  }
]