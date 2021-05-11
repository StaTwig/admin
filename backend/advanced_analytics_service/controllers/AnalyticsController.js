/* eslint-disable linebreak-style */
const AnalyticsModel = require("../models/AnalyticsModel");
const ProductSKUModel = require("../models/ProductSKUModel");

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
const moment = require('moment');


const BREWERY_ORG = 'BREWERY';
const S1_ORG = 'S1';
const S2_ORG = 'S2';

const DATE_FORMAT = 'YYYY-MM-DD';


async function calculatePrevReturnRates(filters, analytic) {

	const lastMonthStart = moment().subtract(1, 'months').startOf('month').format(DATE_FORMAT);
	const lastMonthEnd = moment().subtract(1, 'months').endOf('month').format(DATE_FORMAT);
	let prevAnalytic = await AnalyticsModel.findOne({
		uploadDate: {
			$lte: lastMonthEnd,
			$gte: lastMonthStart,
		},
		productName: analytic.productName,
		productId: analytic.productId
	});
	if (prevAnalytic && parseInt(prevAnalytic.sales)) {
		return (parseInt(prevAnalytic.returns) / parseInt(prevAnalytic.sales)) * 100;
	} else {
		return 0;
	}
}

function getFilterConditions(filters) {
	let matchCondition = {};
	if (filters.orgType && filters.orgType !== '') {
		if (filters.orgType === 'BREWERY' || filters.orgType === 'S1' || filters.orgType === 'S2') {
			matchCondition.type = filters.orgType;
		} else if (filters.orgType === 'ALL_VENDORS') {
			matchCondition.$or = [{ type: 'S1' }, { type: 'S2' }];
		}
	}
	if (filters.state && filters.state.length) {
		matchCondition.state = filters.state;
	}
	if (filters.district && filters.district.length) {
		matchCondition.district = filters.district;
	}
	if (filters.organization && filters.organization.length) {
		matchCondition.id = filters.organization;
	}
	return matchCondition;
}

const _getWarehouseIds = async (filters) => {
	const warehouses = await OrganisationModel.aggregate([
		{
			$match: getFilterConditions(filters)
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
	let _filters = {
		orgType: BREWERY_ORG
	};
	const breweryWarehouseIds = await _getWarehouseIds(_filters);
	const breweryStats = await AnalyticsModel.find({ warehouseId: { $in: breweryWarehouseIds } });
	let breweryStock = 0;
	breweryStats.forEach(br => {
		breweryStock = breweryStock + parseInt(br.returns);
	});
	const breweryObj = {
		stock: breweryStock,
		n_warehouses: breweryStats.length
	}

	_filters = {
		orgType: S1_ORG
	}
	const s1WarehouseIds = await _getWarehouseIds(_filters);
	const s1Stats = await AnalyticsModel.find({ warehouseId: { $in: s1WarehouseIds } });
	let s1Stock = 0;
	s1Stats.forEach(s1 => {
		s1Stock = s1Stock + parseInt(s1.returns);
	});
	const s1Obj = {
		stock: s1Stock,
		n_warehouses: s1Stats.length
	}

	_filters = {
		orgType: S2_ORG
	}
	const s2WarehouseIds = await _getWarehouseIds(_filters);
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
 * getOverviewStats.
 *
 * @returns {Object}
 */
exports.getOverviewStats = [
	auth,
	async function (req, res) {
		try {
			const filters = req.query;
			filters.type = (req.query.orgType && req.query.orgType.length) ? req.query.orgType : BREWERY_ORG;
			const resPerPage = 10;
			const overviewStats = await _getOverviewStats();
			let warehouseIds = await _getWarehouseIds(filters);

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
 * getAllBrands.
 *
 * @returns {Object}
 */
exports.getAllBrands = [
	//auth,
	async function (req, res) {
		try {
			const filters = req.query;
			const brandFilters = {};
			if (filters.brand && filters.brand !== '') {
				brandFilters.manufacturer = filters.brand;
			}
			let allBrands = await ProductSKUModel.aggregate([
				{
					$match: brandFilters
				},
				{
					$group: {
						_id: '$manufacturer',
						products: {
							$addToSet: '$$ROOT'
						}
					}
				}
			]);
			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				allBrands
			);
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


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
			const filters = req.query;
			let warehouseIds = await _getWarehouseIds(filters);

			const page = req.query.page || 1;
			const totalRecords = await AnalyticsModel.count({ ...req.params });

			const analyticsFilter = {
				warehouseId: {
					$in: [...warehouseIds, 'WAR1006',
						'WAR10024', 'WAR10019',
						'WAR10018', 'WAR10017',
						'WAR10004', 'WAR10003',
						'WAR10025', 'AP004',
						'warehouse_id 2', 'AP005',
						'war-blpg132lkmwny88i', 'war-blpg1vzwkn4a0cp6',
						'AP003', 'war-2p52232kmrduslk',
						'war-blpg1vzwkn482zyf', 'AP001',
						'orgwar2345', 'AP002',
						'orgwar12345', 'war-2p51gpxkmlpfh97',
						'war-2p51gpxkmlo2x61', 'war-2p52232kmrpfxxh',
						'war-blpg132lkmwxmhxk', 'ware123',
						'war-1234', 'ware234',
						'war-blpg1vzwkn47ka4y', 'war-blpg41ggknah1lj7']
				}
			};
			if (filters.sku && filters.sku !== '') {
				analyticsFilter.productId = filters.sku;
				isSKUMode = true;
			}

			let Analytics = await AnalyticsModel
				.find(analyticsFilter)
				.skip((resPerPage * page) - resPerPage)
				.limit(resPerPage);

			for (let analytic of Analytics) {
				analytic['returnRate'] = (parseInt(analytic.returns) / parseInt(analytic.sales)) * 100;
				analytic['returnRatePrev'] = await calculatePrevReturnRates(filters, analytic);
			}

			const finalData = {
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
			const totalRecords = await AnalyticsModel.count({ ...req.params });

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
