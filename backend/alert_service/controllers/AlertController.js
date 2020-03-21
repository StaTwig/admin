const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.getShipmentReceived = [

        (req, res) => {
                try {
                        res.json("Shipment Received")
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
