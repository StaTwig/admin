const { body, validationResult, sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
const auth = require("../middlewares/jwt");
const checkToken = require("../middlewares/middleware").checkToken;
const LastMileModel = require("../models/LastMileModel");
const init = require("../logging/init");
const logger = init.getLog();


exports.getEOLInfoBySerialNumber = [
    auth,
    async (req, res) => {
      try {
        checkToken(req, res, async (result) => {
          if (result.success) {
            logger.log(
              "info",
              "<<<<< LastMileService < LastMileController < getEOLInfoBySerialNumber : token verified successfullly, querying data by publisher"
            );
  
            // permission_request = {
            //   result: result,
            //   permissionRequired: "viewInventory",
            // };
            // checkPermissions(permission_request, async (permissionResult) => {
            //   if (permissionResult.success) {
                const { serialNumber } = req.query;
  
                const eolResult = await LastMileModel.findOne({
                    eol_id: serialNumber,
                  })
  
                res.json({
                  data: eolResult,
                });
            //   } else {
            //     res.json("Sorry! User does not have enough Permissions");
            //   }
            // });
          } else {
            logger.log(
              "warn",
              "<<<<< LastMileService < LastMileController < getEOLInfoBySerialNumber : refused token"
            );
            res.status(403).json(result);
          }
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