const { body, validationResult, sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
const auth = require("../middlewares/jwt");
const checkToken = require("../middlewares/middleware").checkToken;
const LastMileModel = require("../models/LastMileModel");
const WarehoseModel = require("../models/WarehouseModel");
const init = require("../logging/init");
const logger = init.getLog();
async function connectDB() {
  var MONGODB_URL = process.env.MONGODB_URL || config.MONGODB_URL;
  var mongoose = require("mongoose");
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      //don't show the log when it is test
      if (process.env.NODE_ENV !== "test") {
        console.log("connected to db");
        // console.log("Connected to %s", MONGODB_URL);
        // console.log("App is running ... \n");
        // console.log("Press CTRL + C to stop the process. \n");
      }
    })
    .catch((err) => {
      console.error("App starting error:", err.message);
      process.exit(1);
    });
  var db = mongoose.connection;
  return db;
}

exports.getEOLInfoBySerialNumber = [
  async (req, res) => {
    try {
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < getEOLInfoBySerialNumber : token verified successfullly, querying data by publisher"
      );
      console.log(req.query);
      let serialNumber = req.query.serial_number;
      await LastMileModel.findOne({
        "eol_id": serialNumber,
      })
        .then((eolResult) => {
          console.log("eolResult is ====> ", eolResult);
          return apiResponse.successResponseWithData(
            res,
            "EOL Info by serial Number",
            eolResult
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < getEOLInfoBySerialNumber : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.GetEOLInfoByProductId = [
  async (req, res) => {
    try {
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < GetEOLInfoByProductId : token verified successfullly, querying data by publisher"
      );
      console.log(req.query);
      let productID = req.query.id;
      await LastMileModel.findOne({
        "productAdministeredInfo.productId": productID,
      })
        .then((eolResult) => {
          console.log("eolResult is ====> ", eolResult);
          return apiResponse.successResponseWithData(
            res,
            "EOL Info by product id",
            eolResult
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < GetEOLInfoByProductId : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];


exports.getEOLInfo = [
  async (req, res) => {
    try {
      var i = 0;
      console.log(++i)
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < getEOLInfoBySerialNumber : token verified successfullly, querying data by publisher"
      );
      // console.log(req.query);
        let matchQuery = {}
        if(req.query.country){
          matchQuery[`eol_info.contact_address.country`] = req.query.country
        }
        // if(req.query.region){
        //   matchQuery[`eol_info.contact_address.country`] = req.query.region
        // }
        if(req.query.state){
          matchQuery[`eol_info.contact_address.state`] = req.query.state
        }
        if(req.query.city){
          matchQuery[`eol_info.contact_address.district`] = req.query.city
        }
        if(req.query.location){
          matchQuery[`productAdministeredInfo.locationInfo.warehouseId`] = req.query.location
        }
        if(req.query.product){
          matchQuery[`productAdministeredInfo.productId`] = req.query.product
        }
        console.log(matchQuery)
      await LastMileModel.find(matchQuery).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit))
        .then(async (eolResult) => {
          console.log("eolResult is ====> ", eolResult);
          let count = await LastMileModel.find(matchQuery).countDocuments()
          console.log(count)
          return apiResponse.successResponseWithData(
            res,
            "EOL Info with filters",
            {eolResult, count}
          );
        })
        .catch((err) => {
          console.log(err)
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < getEOLInfoBySerialNumber : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.GetEOLInfoByIdentityId = [
  async (req, res) => {
    try {
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < GetEOLInfoByIdentityId : token verified successfullly, querying data by publisher"
      );
      console.log(req.query);
      let ID = req.query.id;
      await LastMileModel.findOne({
        "eol_info.idProof.idNo": ID,
      })
        .then((eolResult) => {
          console.log("eolResult is ====> ", eolResult);
          return apiResponse.successResponseWithData(
            res,
            "EOL Info by Identity id",
            eolResult
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < GetEOLInfoByIdentityId : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
exports.GetEOLInfoByPlaceAdministered = [
  async (req, res) => {
    try {
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < GetEOLInfoByPlaceAdministered : token verified successfullly, querying data by publisher"
      );
      console.log(req.query);
      let place = req.query.place;
      await LastMileModel.findOne({
        "productAdministeredInfo.locationInfo.warehouseId": place,
      })
        .then((eolResult) => {
          console.log("eolResult is ====> ", eolResult);
          return apiResponse.successResponseWithData(
            res,
            "EOL Info by place Administered",
            eolResult
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < GetEOLInfoByPlaceAdministered : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
exports.getProductsByWarehouse = [
  auth,
  async (req, res) => {
    try {
      var products = await LastMileModel.aggregate([{ $match :{'productAdministeredInfo.locationInfo.warehouseId': req.query.location}},
      {
         $group:
           {
             _id: "$productAdministeredInfo.productId",
           }
       },
       {'$unwind': '$_id'}
  ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        products
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
exports.GetEOLListByDateWindow = [
  async (req, res) => {
    try {
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < GetEOLListByDateWindow : token verified successfullly, querying data by publisher"
      );
      // console.log(req.query)
      let { startDate, endDate } = req.query;
      console.log(startDate, endDate);
      await LastMileModel.findOne({
        "productAdministeredInfo.administeredData": {
          $gte: `${startDate}T00:00:00Z`,
          $lt: `${endDate}T23:59:59Z`,
        },
      })
        .then((eolResult) => {
          console.log("eolResult is ====> ", eolResult);
          return apiResponse.successResponseWithData(
            res,
            "EOL Info by date window",
            eolResult
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < GetEOLListByDateWindow : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.AddNewEOL = [
  async (req, res) => {
    try {
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < GetEOLListByDateWindow : token verified successfullly, querying data by publisher"
      );
      console.log(req.body);
      let lastmile = new LastMileModel(req.body);
      let connection = await connectDB();
      lastmile.save(function (err) {
        if (err) {
          console.log(connection.close());
          console.log(err);
          return apiResponse.ErrorResponse(res, err);
        } else {
          console.log("data stored succesfully");
          console.log(connection.close());
          return apiResponse.successResponseWithData(
            res,
            "Data Stored succesfully",
            req.body
          );
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < GetEOLListByDateWindow : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.UpdateExistingEOLByID = [
  async (req, res) => {
    try {
      logger.log(
        "info",
        "<<<<< LastMileService < LastMileController < GetEOLListByDateWindow : token verified successfullly, querying data by publisher"
      );
      console.log(req.body);
      LastMileModel.updateOne(
        { eol_id: req.body.eol_id },
        req.body,
        function (err, affected, resp) {
          console.log(resp, affected, err);
          if (err) {
            console.log(err);
            return apiResponse.ErrorResponse(res, err);
          } else {
            console.log("data updated succesfully");
            return apiResponse.successResponseWithData(
              res,
              "Data updated succesfully",
              req.body
            );
          }
        }
      );
    } catch (err) {
      logger.log(
        "error",
        "<<<<< LastMileService < LastMileController < GetEOLListByDateWindow : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
