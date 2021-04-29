const { body, validationResult, sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
const auth = require("../middlewares/jwt");
const checkToken = require("../middlewares/middleware").checkToken;
const LastMileModel = require("../models/LastMileModel");
const init = require("../logging/init");
const logger = init.getLog();


exports.getEOLInfoBySerialNumber = [
    async (req, res) => {
      try {
            logger.log(
              "info",
              "<<<<< LastMileService < LastMileController < getEOLInfoBySerialNumber : token verified successfullly, querying data by publisher"
            );
              console.log(req.query)
                let  serialNumber  = req.query.id;
                await LastMileModel.findOne({
                    eol_id: serialNumber,
                  }).then((eolResult) => {
                    console.log("eolResult is ====> ", eolResult)
                    return apiResponse.successResponseWithData(
                      res,
                      "EOL Info by serial Number",
                      eolResult
                    );
                  }).catch((err) => {
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