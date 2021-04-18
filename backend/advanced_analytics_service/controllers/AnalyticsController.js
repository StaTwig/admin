/* eslint-disable linebreak-style */
const ExcelModal = require("../models/ExcelModel");
const AnalyticsModel = require("../models/AnalyticsModel");
const { body, validationResult, param } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
require("dotenv").config();
const auth = require("../middlewares/jwt");

/**
 * getAllStats.
 *
 * @returns {Object}
 */
exports.getAllStats = [
	//auth,
	async function (req, res) {
		try {
			const resPerPage = 10; 
			const page = req.query.page || 1; 
			const totalRecords = await AnalyticsModel.count({...req.params})
			console.log(totalRecords)
			AnalyticsModel.find({ ...req.params }).skip((resPerPage * page) - resPerPage)
				.limit(resPerPage).then(
					Analytics => {
						if (Analytics.length > 0) {
							const finalData = {
								totalRecords : totalRecords,
								data : Analytics
							}
							return apiResponse.successResponseWithData(
								res,
								"Operation success",
								finalData
							);
						} else {
							return apiResponse.successResponseWithData(
								res,
								"No Results Found",
								[]
							);
						}
					}
				);
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * getStatsBySKU.
 *
 * @returns {Object}
 */
 exports.getStatsBySKU = [
	//auth,
	async function (req, res) {
		try {
			const resPerPage = 10; 
			const page = req.query.page || 1; 
			const totalRecords = await AnalyticsModel.count({...req.params})
			console.log(totalRecords)
			AnalyticsModel.find({ ...req.params }).skip((resPerPage * page) - resPerPage)
				.limit(resPerPage).then(
					Analytics => {
						if (Analytics.length > 0) {
							const finalData = {
								totalRecords : totalRecords,
								data : Analytics
							}
							return apiResponse.successResponseWithData(
								res,
								"Operation success",
								finalData
							);
						} else {
							return apiResponse.successResponseWithData(
								res,
								"No Results Found",
								[]
							);
						}
					}
				);
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

