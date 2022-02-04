const OrganisationModel = require("../models/OrganisationModel");
const WarehouseModel = require("../models/WarehouseModel");
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const { responses } = require("../helpers/responses");

exports.getOrganisations = [
  async (req, res) => {
    try {
      const organisations = await OrganisationModel.find({
        $or: [{ status: "ACTIVE" }, { status: { $exists: false } }],
      });
      return apiResponse.successResponseWithData(
        res,
        "Organisations",
        organisations
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getWarehouses = [
  auth,
  async (req, res) => {
    try {
      const organisations = await WarehouseModel.find({
        organisationId: req.query.id,
        status: "ACTIVE",
      });
      return apiResponse.successResponseWithData(
        res,
        "Warehouses",
        organisations
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(
        res,
        responses(req.user.preferredLanguage).orgid_not_found(req.query.id)
      );
    }
  },
];

exports.getAllWarehouses = [
  auth,
  async (req, res) => {
    try {
      const organizations = await WarehouseModel.find({
        'organisationId': req.user.organisationId,
        $or: [{ status: "ACTIVE" }, { status: { $exists: false } }],
      });
      return apiResponse.successResponseWithData(
        res,
        "All Warehouses",
        organizations
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(
        res,
        responses(req.user.preferredLanguage).orgid_not_found(req.query.id)
      );
    }
  },
];
