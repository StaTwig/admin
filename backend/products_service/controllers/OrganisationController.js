const OrganisationModel = require("../models/OrganisationModel");
const WarehouseModel = require("../models/WarehouseModel");
const TplWarehouseModel = require("../models/TplWarehouse");
const TplOrgModel = require("../models/tplOrg");
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const { responses } = require("../helpers/responses");
const EmployeeModel = require("../models/EmployeeModel");

exports.getOrganisations = [
  async (req, res) => {
    try {
      let organisations
      if(!req.query.type == "TPL") organisations = await OrganisationModel.find({
        $or: [{ status: "ACTIVE" }, { status: { $exists: false } }],
      });
      else organisations = await TplOrgModel.find({});
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

exports.saveNewOrg = [
  auth,
  async(req,res) => {
    try {
      let newOrg = new TplOrgModel(req.body)
      await newOrg.save();
      return apiResponse.successResponseWithData(res,"Added org successfully",newOrg)
    } catch (err) {
      console.log(err)
      return apiResponse.ErrorResponse(res, err.message)
    }
  }
]
exports.getWarehouses = [
  auth,
  async (req, res) => {
    try {
      let existingWarehouses = ['NA'];
      if (req.query.showNewWarehouses) {
        // Fetch user and return only new warehouses
        const user = await EmployeeModel.findOne({ id: req.user.id });

        existingWarehouses = user.warehouseId;
        existingWarehouses = existingWarehouses.concat(user.pendingWarehouseId);
      }
      const organisations = await WarehouseModel.find({
        organisationId: req.query.id,
        status: "ACTIVE",
        id: { $nin: existingWarehouses }
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
