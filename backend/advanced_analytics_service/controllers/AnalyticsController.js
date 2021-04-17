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
exports.getAllAnalytics = [
	auth,
	async function (req, res) {
		try {
			///Logic goes here
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.getAnalyticsByActorId = [
	auth,
	async function (req, res) {
		try {
			///Logic goes here
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getAnalyticsByCaId = [
	auth,
	async function (req, res) {
		try {
			///Logic goes here
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getAnalyticsById = [
	auth,
	async function (req, res) {
		try {
			///Logic goes here
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getAnalyticsBySecondOrgId = [
	auth,
	async function (req, res) {
		try {
			///Logic goes here
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getAnalyticsByActorOrgId = [
	auth,
	async function (req, res) {
		try {
			///Logic goes here
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.deleteAnalyticsById = [
	auth,
	async function (req, res) {
		try {
			///Logic goes here
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];