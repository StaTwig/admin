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
const auth = require("../middlewares/jwt");
/**
 * getAllEvents.
 *
 * @returns {Object}
 */
exports.getAllEvents = [
	//auth,
	function (req, res) {
		try {
			EventModal.find({ id : req.params.id }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").then(
				Events => {
					if (Events.length > 0) {
						return apiResponse.successResponseWithData(
							res,
							"Operation success",
							Events
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
	// auth,
	param("eventID", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	function (req, res) {
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
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").then(
					Events => {
						if (Events.length > 0) {
							return apiResponse.successResponseWithData(
								res,
								"Operation success",
								Events
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
	// auth,
	param("actorId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").then(
					Events => {
						if (Events.length > 0) {
							return apiResponse.successResponseWithData(
								res,
								"Operation success",
								Events
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
	// auth,
	param("caId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").then(
					Events => {
						if (Events.length > 0) {
							return apiResponse.successResponseWithData(
								res,
								"Operation success",
								Events
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
	// auth,
	param("actorOrgId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").then(
					Events => {
						if (Events.length > 0) {
							return apiResponse.successResponseWithData(
								res,
								"Operation success",
								Events
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
	// auth,
	param("secondaryOrgId", "eventId must not be empty.")
		.isLength({ min: 3 })
		.trim(),
	sanitizeBody("*").escape(),
	function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.find({ ...req.params }, "_id eventID eventTime eventTypePrimary	eventTypeDesc actorId actorUserId caId caName caAddress actorOrgId actorOrgName actorOrgAddress secondaryOrgId secondaryOrgName secondaryOrgAddress	payloadData").then(
					Events => {
						if (Events.length > 0) {
							return apiResponse.successResponseWithData(
								res,
								"Operation success",
								Events
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
	body("eventId", "eventId must not be empty.")
		.isLength({ min: 1 })
		.trim(),
	sanitizeBody("*").escape(),
	function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				EventModal.findByIdAndRemove(req.params['eventId'], function(err) {
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
			return apiResponse.ErrorResponse(res, err);
		}
	}
];











