/* eslint-disable linebreak-style */
const EventModal = require("../models/EventModal");
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
 * getAllEvents.
 *
 * @returns {Object}
 */
exports.getAllEvents = [
	auth,
	async function (req, res) {
		try {
			const resPerPage = 9; 
			const page = req.query.page || 1; 
			const totalRecords = await EventModal.count({...req.params})
			EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").skip((resPerPage * page) - resPerPage)
				.limit(resPerPage).then(
					Events => {
						if (Events.length > 0) {
							const finalData = {
								totalRecords : totalRecords,
								data : Events
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
 * getEventById.
 *
 * @param {string}      eventID
 *
 * @returns {Object}
 */
exports.getEventById = [
	auth,
	param("eventID", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	async function (req, res) {
		try {
			const resPerPage = 9; 
			const page = req.query.page || 1; 			
			const totalRecords = await EventModal.count({...req.params})
			console.log(req.params)
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").skip((resPerPage * page) - resPerPage)
					.limit(resPerPage).then(
						Events => {
							if (Events.length > 0) {
								const finalData = {
									totalRecords : totalRecords,
									data : Events
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
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * getEventByActorId.
 *
 * @param {string}      actorId
 *
 * @returns {Object}
 */
exports.getEventByActorId = [
	auth,
	param("actorId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	async function (req, res) {
		try {
			const resPerPage = 9; 
			const page = req.query.page || 1; 
			const totalRecords = await EventModal.count({...req.params})
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").skip((resPerPage * page) - resPerPage)
					.limit(resPerPage).then(
						Events => {
							if (Events.length > 0) {
								const finalData = {
									totalRecords : totalRecords,
									data : Events
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
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * getEventByCaId
 *
 * @param {string}      caId
 *
 * @returns {Object}
 */
exports.getEventByCaId = [
	auth,
	param("caId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	async function (req, res) {
		try {
			const resPerPage = 9; 
			const page = req.query.page || 1; 
			const totalRecords = await EventModal.count({...req.params})
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").skip((resPerPage * page) - resPerPage)
					.limit(resPerPage).then(
						Events => {
							if (Events.length > 0) {
								const finalData = {
									totalRecords : totalRecords,
									data : Events
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
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * getEventByActorOrgId
 *
 * @param {string}      actorOrgId
 *
 * @returns {Object}
 */
exports.getEventByActorOrgId = [
	auth,
	param("actorOrgId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	async function (req, res) {
		try {
			const resPerPage = 9; 
			const page = req.query.page || 1; 
			const totalRecords = await EventModal.count({...req.params})
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").skip((resPerPage * page) - resPerPage)
					.limit(resPerPage).then(
						Events => {
							if (Events.length > 0) {
								const finalData = {
									totalRecords : totalRecords,
									data : Events
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
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * getEventBySecondOrgId
 *
 * @param {string}      secondaryOrgId
 *
 * @returns {Object}
 */
exports.getEventBySecondOrgId = [
	auth,
	param("secondaryOrgId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	async function (req, res) {
		try {
			const resPerPage = 9; 
			const page = req.query.page || 1; 
			const totalRecords = await EventModal.count({...req.params})
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").skip((resPerPage * page) - resPerPage)
					.limit(resPerPage).then(
						Events => {
							if (Events.length > 0) {
								const finalData = {
									totalRecords : totalRecords,
									data : Events
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
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * deleteEventById.
 *
 * @param {string}      eventId
 *
 * @returns {Object}
 */
exports.deleteEventById = [
	auth,
	param("eventID", "eventId must not be empty.")
		.isLength({ min: 1 })
		.trim(),
	sanitizeBody("*").escape(),
	async function (req, res) {
		try {
			console.log(req.params)
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.remove({...req.params}, async function (err) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					} else {
						return apiResponse.successResponse(
							res,
							"Event delete Success."
						);
					}
				});
			}
		} catch (err) {
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	}
];











