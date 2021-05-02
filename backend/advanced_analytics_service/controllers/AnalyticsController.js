/* eslint-disable linebreak-style */
const ExcelModal = require("../models/ExcelModel");
const AnalyticsModel = require("../models/AnalyticsModel");
const OrganisationModel = require("../models/OrganisationModel");
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

const BREWERY_ORG = 'BREWERY';
const S1_ORG = 'S1';
const S2_ORG = 'S2';


const _getWarehouseIds = async (orgType) => {
	const warehouses = await OrganisationModel.aggregate([
		{
			$match: {
				'type': orgType
			}
		},
		{
			$unwind: {
				path: "$warehouses"
			}
		},
		{
			$group: {
				_id: '$warehouseIds',
				'warehouseIds': {
					$addToSet: "$warehouses"
				}
			}
		}
	]);
	let warehouseIds = [];
	if (warehouses && warehouses[0] && warehouses[0].warehouseIds) {
		warehouseIds = warehouses[0].warehouseIds;
	}
	return warehouseIds;
}

const _getOverviewStats = async () => {
	const breweryWarehouseIds = await _getWarehouseIds(BREWERY_ORG);
	const breweryStats = await AnalyticsModel.find({ warehouseId: { $in: breweryWarehouseIds } });
	let breweryStock = 0;
	breweryStats.forEach(br => {
		breweryStock = breweryStock + parseInt(br.returns);
	});
	const breweryObj = {
		stock: breweryStock,
		n_warehouses: breweryStats.length
	}

	const s1WarehouseIds = await _getWarehouseIds(S1_ORG);
	const s1Stats = await AnalyticsModel.find({ warehouseId: { $in: s1WarehouseIds } });
	let s1Stock = 0;
	s1Stats.forEach(s1 => {
		s1Stock = s1Stock + parseInt(s1.returns);
	});
	const s1Obj = {
		stock: s1Stock,
		n_warehouses: s1Stats.length
	}

	const s2WarehouseIds = await _getWarehouseIds(S2_ORG);
	const s2Stats = await AnalyticsModel.find({ warehouseId: { $in: s2WarehouseIds } });
	let s2Stock = 0;
	s2Stats.forEach(s2 => {
		s2Stock = s2Stock + parseInt(s2.returns);
	});
	const s2Obj = {
		stock: s2Stock,
		n_warehouses: s2Stats.length
	}

	return {
		breweryObj,
		s1Obj,
		s2Obj
	}
}

/**
 * getAllStats.
 *
 * @returns {Object}
 */
exports.getAllStats = [
	//auth,
	async function (req, res) {
		try {
			const _type = (req.query.orgType && req.query.orgType.length) ? req.query.orgType : BREWERY_ORG;
			const resPerPage = 10;
			const overviewStats = await _getOverviewStats();
			let warehouseIds = await _getWarehouseIds(_type);
			const page = req.query.page || 1;
			const totalRecords = await AnalyticsModel.count({ ...req.params });
			const Analytics = await AnalyticsModel
				.find({
					...req.params, warehouseId: { $in: warehouseIds }
				})
				.skip((resPerPage * page) - resPerPage)
				.limit(resPerPage);

			const finalData = {
				overviewStats: overviewStats,
				totalRecords: totalRecords,
				data: Analytics
			}
			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				finalData
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
			const totalRecords = await AnalyticsModel.count({ ...req.params })
			console.log(totalRecords)
			AnalyticsModel.find({ ...req.params }).skip((resPerPage * page) - resPerPage)
				.limit(resPerPage).then(
					Analytics => {
						if (Analytics.length > 0) {
							const finalData = {
								totalRecords: totalRecords,
								data: Analytics
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

