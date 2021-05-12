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

const aggregateSalesStats = (inputArr) => {
	let sales = inputArr.map(item => parseInt(item.sales) || 0).reduce((prev, next) => prev + next);
	let targetSales = inputArr.map(item => parseInt(item.sales) || 0).reduce((prev, next) => prev + next);
	let returns = inputArr.map(item => parseInt(item.sales) || 0).reduce((prev, next) => prev + next);
	let actualReturns = 0;
	if (returns) {
		actualReturns = (returns / sales) * 100;
	}
	return {
		sales: sales,
		targetSales: targetSales,
		returns: returns,
		actualReturns: actualReturns
	};
}

function getSKUAnalyticsFilterConditions(filters) {

	let matchCondition = {};

	if (filters.sku && filters.sku !== '') {
		matchCondition.productId = filters.sku;
	};


	if (filters.date_filter_type && filters.date_filter_type.length) {

		const DATE_FORMAT = 'YYYY-MM-DD';
		if (filters.date_filter_type === 'by_range') {

			let startDate = filters.start_date ? filters.start_date : new Date();
			let endDate = filters.end_date ? filters.end_date : new Date();
			matchCondition.uploadDate = {
				$gte: new Date(startDate).toISOString(),
				$lte: new Date(endDate).toISOString()
			};

		} else if (filters.date_filter_type === 'by_monthly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheMonth = moment(startDateOfTheYear).add(filters.month, 'months').format(DATE_FORMAT);
			let endDateOfTheMonth = moment(startDateOfTheMonth).endOf('month');
			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheMonth).toISOString(),
				$lte: new Date(endDateOfTheMonth).toISOString()
			};

		} else if (filters.date_filter_type === 'by_quarterly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).startOf('quarter').format(DATE_FORMAT);
			let endDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).endOf('quarter').format(DATE_FORMAT);
			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheQuarter).toISOString(),
				$lte: new Date(endDateOfTheQuarter).toISOString()
			};

		} else if (filters.date_filter_type === 'by_yearly') {

			const currentDate = moment().format(DATE_FORMAT);
			const currentYear = moment().year();

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let endDateOfTheYear = moment([filters.year]).endOf('year')

			if (filters.year === currentYear) {
				endDateOfTheYear = currentDate;
			}

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheYear).toISOString(),
				$lte: new Date(endDateOfTheYear).toISOString()
			};

		}

	}

	return matchCondition;
}

function getAnalyticsFilterConditions(filters, warehouseIds) {

	let matchCondition = {
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
		matchCondition.productId = filters.sku;
	};


	if (filters.date_filter_type && filters.date_filter_type.length) {

		const DATE_FORMAT = 'YYYY-MM-DD';
		if (filters.date_filter_type === 'by_range') {

			let startDate = filters.start_date ? filters.start_date : new Date();
			let endDate = filters.end_date ? filters.end_date : new Date();
			matchCondition.uploadDate = {
				$gte: new Date(startDate).toISOString(),
				$lte: new Date(endDate).toISOString()
			};

		} else if (filters.date_filter_type === 'by_monthly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheMonth = moment(startDateOfTheYear).add(filters.month, 'months').format(DATE_FORMAT);
			let endDateOfTheMonth = moment(startDateOfTheMonth).endOf('month');
			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheMonth).toISOString(),
				$lte: new Date(endDateOfTheMonth).toISOString()
			};

		} else if (filters.date_filter_type === 'by_quarterly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).startOf('quarter').format(DATE_FORMAT);
			let endDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).endOf('quarter').format(DATE_FORMAT);
			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheQuarter).toISOString(),
				$lte: new Date(endDateOfTheQuarter).toISOString()
			};

		} else if (filters.date_filter_type === 'by_yearly') {

			const currentDate = moment().format(DATE_FORMAT);
			const currentYear = moment().year();

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let endDateOfTheYear = moment([filters.year]).endOf('year')

			if (filters.year === currentYear) {
				endDateOfTheYear = currentDate;
			}

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheYear).toISOString(),
				$lte: new Date(endDateOfTheYear).toISOString()
			};

		}

	}

	return matchCondition;
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
 * getStatsByBrand.
 *
 * @returns {Object}
 */
exports.getStatsByBrand = [
	//auth,
	async function (req, res) {
		try {
			// const filters = req.query;
			// const brandFilters = {};

			const filters = req.query;
			let warehouseIds = await _getWarehouseIds(filters);
			let analyticsFilter = getAnalyticsFilterConditions(filters, warehouseIds);
			if (filters.brand && filters.brand !== '') {
				analyticsFilter.manufacturer = filters.brand;
			}

			let Analytics = await AnalyticsModel.aggregate([
				{
					$match: analyticsFilter
				},
				{
					$lookup: {
						from: 'products',
						localField: 'productId',
						foreignField: 'externalId',
						as: 'prodDetails'
					}
				},
				{
					$unwind: {
						path: '$prodDetails'
					}
				},
				{
					$replaceRoot: {
						newRoot: {
							$mergeObjects: ['$prodDetails', '$$ROOT']
						}
					}
				},
				{
					$project: {
						prodDetails: 0
					}
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
			for (let analytic of Analytics) {

				let products = analytic.products;
				for (let product of products) {
					product['returnRate'] = (parseInt(product.returns) / parseInt(product.sales)) * 100;
					product['returnRatePrev'] = await calculatePrevReturnRates(filters, product);
				}
				analytic.products = products;

			}

			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				Analytics
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

			let analyticsFilter = getAnalyticsFilterConditions(filters, warehouseIds);

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



function getSKUGroupByFilters(filters) {
	let matchCondition = [];
	if (filters.group_by && filters.group_by !== '') {
		if (filters.group_by === 'state') {
			matchCondition.push({
				_id: '$state',
				data: {
					$addToSet: "$$ROOT"
				}
			});
		} else if (filters.group_by === 'date') {
			matchCondition.push({
				$match: {
					state: filters.state
				}
			});
			matchCondition.push({
				_id: '$uploadDate',
				data: {
					$addToSet: "$$ROOT"
				}
			});

		} else {
			matchCondition.push({
				$match: {
					state: filters.state
				}
			});
		}
	}
	return matchCondition;
}

/**
 * getStatsBySKU.
 *
 * @returns {Object}
 */
exports.getStatsBySKU = [
	//auth,
	async function (req, res) {
		try {
			const filters = req.query;

			let Analytics = await AnalyticsModel.aggregate([
				{
					$match: getSKUAnalyticsFilterConditions(filters)
				},
				{
					$lookup: {
						from: 'abinbevstaticdata',
						localField: 'depot',
						foreignField: 'depot',
						as: 'depotDetails'
					}
				},
				{
					$unwind: {
						path: '$depotDetails'
					}
				},
				{
					$replaceRoot: {
						newRoot: {
							$mergeObjects: ['$depotDetails', '$$ROOT']
						}
					}
				},
				{
					$project: {
						depotDetails: 0
					}
				},
				...getSKUGroupByFilters(filters)
			]);
			let response = []
			Analytics.forEach(analytic => {
				let temp = aggregateSalesStats(analytic.data);
				temp['groupedBy'] = analytic._id;
				response.push(temp);
			});

			return apiResponse.successResponseWithData(res, "Operation Success", response);

		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
