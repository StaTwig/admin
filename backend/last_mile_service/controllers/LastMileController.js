const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
const auth = require("../middlewares/jwt");
const LastMileModel = require("../models/LastMileModel");
const WarehoseModel = require("../models/WarehouseModel");

exports.getEOLInfoBySerialNumber = [
  async (req, res) => {
    try {
      const serialNumber = req.query.serial_number;
      const eolResult = await LastMileModel.findOne({
        eol_id: serialNumber,
      });
      return apiResponse.successResponseWithData(
        res,
        "EOL Info by serial Number",
        eolResult
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.GetEOLInfoByProductId = [
  async (req, res) => {
    try {
      const productID = req.query.id;
      const eolResult = await LastMileModel.findOne({
        "productAdministeredInfo.productId": productID,
      });
      return apiResponse.successResponseWithData(
        res,
        "EOL Info by product id",
        eolResult
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getEOLInfo = [
  async (req, res) => {
    try {
      let matchQuery = {};
      if (req.query.country) {
        matchQuery[`eol_info.contact_address.country`] = req.query.country;
      }
      if (req.query.state) {
        matchQuery[`productAdministeredInfo.locationInfo.state`] =
          req.query.state;
      }
      if (req.query.city) {
        matchQuery[`productAdministeredInfo.locationInfo.district`] =
          req.query.city;
      }
      if (req.query.location) {
        matchQuery[`productAdministeredInfo.locationInfo.warehouseId`] =
          req.query.location;
      }
      if (req.query.product) {
        matchQuery[`productAdministeredInfo.productId`] = req.query.product;
      }
      const eolResult = await LastMileModel.find(matchQuery)
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit));
      const count = await LastMileModel.find(matchQuery).countDocuments();
      return apiResponse.successResponseWithData(res, "EOL Info with filters", {
        eolResult,
        count,
      });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.GetEOLInfoByIdentityId = [
  async (req, res) => {
    try {
      const ID = req.query.id;
      const eolResult = await LastMileModel.findOne({
        "eol_info.idProof.idNo": ID,
      });
      return apiResponse.successResponseWithData(
        res,
        "EOL Info by Identity id",
        eolResult
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.GetEOLInfoByPlaceAdministered = [
  async (req, res) => {
    try {
      const place = req.query.place;
      const eolResult = await LastMileModel.findOne({
        "productAdministeredInfo.locationInfo.warehouseId": place,
      });
      return apiResponse.successResponseWithData(
        res,
        "EOL Info by place Administered",
        eolResult
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getProductsByWarehouse = [
  auth,
  async (req, res) => {
    try {
      const products = await LastMileModel.aggregate([
        {
          $match: {
            "productAdministeredInfo.locationInfo.warehouseId":
              req.query.location,
          },
        },
        {
          $group: {
            _id: "$productAdministeredInfo.productId",
          },
        },
        { $unwind: "$_id" },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Products by warehouse",
        products
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.GetEOLListByDateWindow = [
  async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const eolResult = await LastMileModel.findOne({
        "productAdministeredInfo.administeredData": {
          $gte: `${startDate}T00:00:00Z`,
          $lt: `${endDate}T23:59:59Z`,
        },
      });
      return apiResponse.successResponseWithData(
        res,
        "EOL Info by date window",
        eolResult
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.AddNewEOL = [
  async (req, res) => {
    try {
      const lastmile = req.body;
      const warehouse = await WarehoseModel.find({
        id: req.body.productAdministeredInfo[0].locationInfo.warehouseId,
      });
      if (warehouse) {
        lastmile.productAdministeredInfo[0].locationInfo.firstLine =
          warehouse[0].warehouseAddress.firstLine;
        lastmile.productAdministeredInfo[0].locationInfo.secondLine =
          warehouse[0].warehouseAddress.secondLine;
        lastmile.productAdministeredInfo[0].locationInfo.city =
          warehouse[0].warehouseAddress.city;
        lastmile.productAdministeredInfo[0].locationInfo.state =
          warehouse[0].warehouseAddress.state;
        lastmile.productAdministeredInfo[0].locationInfo.country =
          warehouse[0].warehouseAddress.country;
        lastmile.productAdministeredInfo[0].locationInfo.region =
          warehouse[0].warehouseAddress.region;
        lastmile.productAdministeredInfo[0].locationInfo.landmark =
          warehouse[0].warehouseAddress.landmark;
        lastmile.productAdministeredInfo[0].locationInfo.zipCode =
          warehouse[0].warehouseAddress.zipCode;
        const last_mile = new LastMileModel(lastmile);
        await last_mile.save();
        return apiResponse.successResponseWithData(
          res,
          "Last mile Data Stored successfully",
          last_mile
        );
      } else {
        return apiResponse.ErrorResponse(res, "Invalid warehouse");
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.UpdateExistingEOLByID = [
  async (req, res) => {
    try {
      await LastMileModel.updateOne({ eol_id: req.body.eol_id }, req.body);
      return apiResponse.successResponseWithData(
        res,
        "Data updated successfully",
        req.body
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
