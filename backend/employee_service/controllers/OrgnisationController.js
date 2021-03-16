const OrganisationModel = require("../models/OrganisationModel");
const { check, validationResult } = require("express-validator");
const uniqid = require("uniqid");
const mongoose = require("mongoose");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
var base64Img = require("base64-img");
const auth = require("../middlewares/jwt");
const axios = require("axios");
const dotenv = require("dotenv").config();
const blockchain_service_url = process.env.URL;
const stream_name = process.env.INV_STREAM;

const checkToken = require("../middlewares/middleware").checkToken;

exports.getOrgs = [
  auth,
  async (req, res) => {
    try {
      const users = await OrganisationModel.find({
        // status: "NOTVERIFIED",
      }).select(
        "name postalAddress country primaryContactId createdAt type status logoId id"
      );
      return apiResponse.successResponseWithData(
        res,
        "Organisation list",
        users
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateOrg = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { id, status } = req.body;
          await OrganisationModel.updateOne(
            {
              id: id,
            },
            {
              $set: {
                status: status,
              },
            }
          )
            .then((resUpdate) => {
              let res_message = "Organisation updated!!";
              if (resUpdate.nModified == 0)
                res_message =
                  "Organisation not updated. Refresh the page and try again!!!";
              return apiResponse.successResponseWithData(
                res,
                res_message,
                resUpdate
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
