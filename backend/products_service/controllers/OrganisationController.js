const OrganisationModel = require("../models/OrganisationModel");
const WarehouseModel = require("../models/WarehouseModel");
const TplWarehouseModel = require("../models/TplWarehouse");
const TplOrgModel = require("../models/tplOrg");
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const { responses } = require("../helpers/responses");
const EmployeeModel = require("../models/EmployeeModel");
const CounterModel = require("../models/CounterModel");

exports.getOrganisations = [
  auth,
  async (req, res) => {
    try {
      let orgDetails = await OrganisationModel.findOne({ id: req.user.organisationId})
      let organisations =  orgDetails.type=="Third Party Logistics" ? await TplOrgModel.find({}) 
      : await OrganisationModel.find({
        $or: [{ status: "ACTIVE" }, { status: { $exists: false } }],
      })

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
      const orgCounter = await CounterModel.findOneAndUpdate(
        { "counters.name": "orgId" },
        {
          $inc: {
            "counters.$.value": 1,
          },
        },
        { new: true }
      );
      const organisationId =
        orgCounter.counters[2].format + orgCounter.counters[2].value;
      req.body.id = organisationId
      let newOrg = new TplOrgModel(req.body)
      await newOrg.save();
      return apiResponse.successResponseWithData(res,"Added org successfully",newOrg)
    } catch (err) {
      console.log(err)
      return apiResponse.ErrorResponse(res, err.message)
    }
  }
]

exports.saveNewWarehouse = [
  auth,
  async(req,res) => {
    try {
      const warehouseCounter = await CounterModel.findOneAndUpdate(
        { "counters.name": "warehouseId" },
        {
          $inc: {
            "counters.$.value": 1,
          },
        },
        {
          new: true,
        }
      );
      const warehouseId =
        warehouseCounter.counters[3].format +
        warehouseCounter.counters[3].value;
        req.body.id = warehouseId;
      let newWarehouse = new TplWarehouseModel(req.body)
      await newWarehouse.save();
      return apiResponse.successResponseWithData(res,"Added warehouse successfully",newWarehouse)
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
      console.log("1")
      let organisations
      if (!req.query.type == "TPL") organisations = await WarehouseModel.find({
        organisationId: req.query.id,
        status: "ACTIVE",
        id: { $nin: existingWarehouses }
      });
      else organisations = await TplWarehouseModel.find({
        organisationId: req.query.id,
      })
      console.log("1",organisations)
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
