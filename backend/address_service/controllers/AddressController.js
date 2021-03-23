const apiResponse = require("../utils/apiResponse");
const Organisation = require("../models/organisationModel");
const Warehouse = require("../models/warehouseModel");
const Inventory = require("../models/inventoryModel");
const auth = require("../middlewares/jwt");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 10);

exports.addressOfOrg = [
  auth,
  async (req, res) => {
    try {
      await Organisation.find({ id: req.user.organisationId })
        .then((org) => {
          return apiResponse.successResponseWithData(
            res,
            "Organisations Addresses",
            org
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addressesOfOrgWarehouses = [
  auth,
  async (req, res) => {
    try {
      await Warehouse.find({ organisationId: req.user.organisationId })
        .then((warehouses) => {
          return apiResponse.successResponseWithData(
            res,
            "Warehouses Addresses",
            warehouses
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateAddressOrg = [
  auth,
  async (req, res) => {
    try {
      await Organisation.findOneAndUpdate(
        { id: req.user.organisationId },
        req.body.address,
        { new: true }
      )
        .then((org) => {
          return apiResponse.successResponseWithData(
            res,
            "Organisation Address Updated",
            org
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateWarehouseAddress = [
  auth,
  async (req, res) => {
    try {
      await Warehouse.findOneAndUpdate(
        { id: req.query.warehouseId },
        req.body.WarehouseAddress,
        { new: true }
      )
        .then((warehouse) => {
          return apiResponse.successResponseWithData(
            res,
            "Warehouse Address Updated",
            warehouse
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.AddWarehouse = [
  auth,
  async (req, res) => {
    try {
      const inventoryId = "inv-" + nanoid();
      const inventoryResult = new Inventory({ id: inventoryId });
      await inventoryResult.save();
      const {
        organisationId,
        postalAddress,
        title,
        region,
        country,
        location,
        supervisors,
        employees,
        warehouseAddress,
      } = req.body;
      const warehouseId = "war-" + nanoid();
      const warehouse = new Warehouse({
        id: warehouseId,
        title,
        organisationId,
        postalAddress,
        region,
        country,
        location,
        supervisors,
        employees,
        warehouseAddress,
        warehouseInventory: inventoryResult.id,
      });
      await warehouse.save();
      return apiResponse.successResponseWithData(
        res,
        "Warehouse added success",
        warehouse
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.AddOffice = [
  auth,
  async (req, res) => {
    try {
      const {
        organisationId,
        title,
        postalAddress,
        region,
        country,
        location,
        supervisors,
        employees,
      } = req.body;
      const officeId = "office-" + nanoid();
      const office = new Warehouse({
        id: officeId,
        title,
        organisationId,
        postalAddress,
        region,
        country,
        location,
        supervisors,
        employees,
      });
      await office.save();
      return apiResponse.successResponseWithData(
        res,
        "Office added success",
        office
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
