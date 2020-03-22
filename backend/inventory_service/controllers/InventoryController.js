const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");
const auth = require("../middlewares/jwt");
exports.getTotalCount = [
        auth,
        (req, res) => {
                try {
                        res.json("Total Inventory count")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getTotalCountOnHold = [
        auth,
        (req, res) => {
                try {
                        res.json("Total Inventory count on Hold")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getExpiringInventory = [
        auth,
        (req, res) => {
                try {
                        res.json("Expiring Inventory")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];

exports.getInventoryforProduct = [
        auth,
        (req, res) => {
                try {
                        res.json("Inventory for the specific Product")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getInventoryDetailsForProduct = [
        auth,
        (req, res) => {
                try {
                        res.json("Inventory details for the specific Product")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
exports.getAllInventoryDetails = [
        auth,
        (req, res) => {
                try {
                        res.json("Inventory details for the all Products")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
		
		
exports.addNewInventory = [
        auth,
        (req, res) => {
                try {
                        res.json("Added new Inventroy")


                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
