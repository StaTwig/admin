const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const RequestModel = require("../models/RequestModel");

exports.getRequests = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const requests = await RequestModel.find({
        "to.organisationId": organisationId,
      });
      return apiResponse.successResponseWithData(res, "All Requests", requests);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getRequestById = [
  auth,
  async (req, res) => {
    try {
      const { id } = req.query;
      const request = await RequestModel.findOne({ id: id });
      return apiResponse.successResponseWithData(res, "Request", request);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.updateRequest = [
  auth,
  async (req, res) => {
    try {
      const { id, status } = req.query;
      const request = await RequestModel.findOneAndUpdate(
        { id: id },
        { $set: { status: status } },
        { new: true }
      );
      return apiResponse.successResponseWithData(
        res,
        "Request Updated",
        request
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.createRequest = [
  auth,
  async (req, res) => {
    try {
      const { from, to, labelId, type } = req.body;
      const request = new RequestModel({
        from,
        to,
        labelId,
        type,
      });
      await request.save();
      return apiResponse.successResponseWithData(
        res,
        "Request Created",
        request
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
