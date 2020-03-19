const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.getTotalCount = [

        (req, res) => {
                try {
                        res.json("Total Inventory count")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getTotalCountOnHold = [

        (req, res) => {
                try {
                        res.json("Total Inventory count on Hold")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getExpiringInventory = [

        (req, res) => {
                try {
                        res.json("Expiring Inventory")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];

exports.getInventoryforProduct = [

        (req, res) => {
                try {
                        res.json("Inventory for the specific Product")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getInventoryDetailsForProduct = [

        (req, res) => {
                try {
                        res.json("Inventory details for the specific Product")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getAllInventoryDetails = [

        (req, res) => {
                try {
                        res.json("Inventory details for the all Products")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
		
exports.addNewInventory = [

        (req, res) => {
                try {
                        res.json("Added new Inventroy")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
