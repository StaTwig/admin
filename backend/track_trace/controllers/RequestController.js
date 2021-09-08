const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const ShipmentModel = require("../models/ShipmentModel");
const ShippingOrderModel = require("../models/ShippingOrderModel");
const RecordModel = require("../models/RecordModel");
const AtomModel = require("../models/AtomModel");
const OrganisationModel = require("../models/OrganisationModel");
const ProductModel = require("../models/ProductModel");
const RequestModel = require("../models/RequestModel");
const checkPermissions =
  require("../middlewares/rbac_middleware").checkPermissions;

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
      const { id } = req.params;
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
      let request;
      const { id, status, payload } = req.body;
      if (payload) {
        request = await RequestModel.findOneAndUpdate(
          { id: id },
          { $set: { status: status, payload: payload } },
          { new: true }
        );
      } else {
        request = await RequestModel.findOneAndUpdate(
          { id: id },
          { $set: { status: status } },
          { new: true }
        );
      }
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
      const { from, to, payload, labelId } = req.body;
      const request = new RequestModel({
        from,
        to,
        payload,
        labelId,
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
