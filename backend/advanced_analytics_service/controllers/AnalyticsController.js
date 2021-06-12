/* eslint-disable linebreak-style */
const AnalyticsModel = require("../models/AnalyticsModel");
const ProductSKUModel = require("../models/ProductSKUModel");
const ShipmentModel = require("../models/ShipmentModel");
const auth = require("../middlewares/jwt");
const OrganisationModel = require("../models/OrganisationModel");
const WarehouseModel = require("../models/WarehouseModel");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const moment = require('moment');

require("dotenv").config();

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

function getFilterConditionsWarehouse(filters) {
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
		matchCondition["warehouseAddress.firstLine"] = filters.district;
	}
	if (filters.organization && filters.organization.length) {
		matchCondition.id = filters.organization;
	}
	return matchCondition;
}

const _getWarehouseIdsByOrg = async (org) => {
	let matchCondition = {};
	if (org && org.id && org.id !== '') {
		matchCondition.id = org.id;
	}
	const warehouses = await OrganisationModel.aggregate([
		{
			$match: matchCondition
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

const _getWarehouseIdsByOrgType = async (filters) => {
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


const _getWarehouseIds = async (filters) => {
	const warehouses = await WarehouseModel.aggregate([
		{
			$match: getFilterConditionsWarehouse(filters)
		},
		{
			$group: {
				_id: '$id',
				'warehouseIds': {
					$addToSet: "$id"
				}
			}
		}
	]);
	let warehouseIds = [];
	if (warehouses.length > 0) {
		warehouseIds = warehouses.map(a => a._id);
	}
	return warehouseIds;
}

const _getOverviewStats = async () => {
	let _filters = {
		orgType: BREWERY_ORG
	};
	const breweryWarehouseIds = await _getWarehouseIdsByOrgType(_filters);
	const breweryStats = await AnalyticsModel.find({ warehouseId: { $in: breweryWarehouseIds } });
	let breweryStock = 0;
	breweryStats.forEach(br => {
		breweryStock = breweryStock + parseInt(br.returns);
	});
	const breweryObj = {
		stock: breweryStock,
		n_warehouses: breweryWarehouseIds.length
	}
	_filters = {
		orgType: S1_ORG
	}
	const s1WarehouseIds = await _getWarehouseIdsByOrgType(_filters);
	const s1Stats = await AnalyticsModel.find({ warehouseId: { $in: s1WarehouseIds } });
	let s1Stock = 0;
	s1Stats.forEach(s1 => {
		s1Stock = s1Stock + parseInt(s1.returns);
	});
	const s1Obj = {
		stock: s1Stock,
		n_warehouses: s1WarehouseIds.length
	}

	_filters = {
		orgType: S2_ORG
	}
	const s2WarehouseIds = await _getWarehouseIdsByOrgType(_filters);
	const s2Stats = await AnalyticsModel.find({ warehouseId: { $in: s2WarehouseIds } });
	let s2Stock = 0;
	s2Stats.forEach(s2 => {
		s2Stock = s2Stock + parseInt(s2.returns);
	});
	const s2Obj = {
		stock: s2Stock,
		n_warehouses: s2WarehouseIds.length
	}

	return {
		breweryObj,
		s1Obj,
		s2Obj
	}
}

const aggregateSalesStats = (inputArr) => {
	if (!inputArr.length) {
		return {
			sales: 0,
			targetSales: 0,
			returns: 0,
			actualReturns: 0
		}
	}
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

// function dateConversion(filters) {
// 	let conversion = {};
// 	// if (filters.date_filter_type && filters.date_filter_type.length)
// 	{
// 		conversion = {
// 			"$addFields": {
// 				"uploadDate": {
// 					"$dateFromString": {
// 						"dateString": "$uploadDate"
// 					}
// 				}
// 			}
// 		}
// 	}
// 	return conversion;
// }

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
				$gte: new Date(startDate),
				$lte: new Date(endDate)
			};

		} else if (filters.date_filter_type === 'by_monthly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheMonth = moment(startDateOfTheYear).add(filters.month - 1, 'months').format(DATE_FORMAT);
			let endDateOfTheMonth = moment(startDateOfTheMonth).tz("Etc/GMT").add(1, 'months').endOf('month');

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheMonth),
				$lte: new Date(endDateOfTheMonth)
			};

		} else if (filters.date_filter_type === 'by_quarterly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).startOf('quarter').format(DATE_FORMAT);
			// let endDateOfTheQuarter = moment(startDateOfTheYear).tz("Etc/GMT").quarter(filters.quarter).add(1, 'years').endOf('quarter');
			let endDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).tz("Etc/GMT").add(3, 'months').endOf('quarter');

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheQuarter),
				$lte: new Date(endDateOfTheQuarter)
			};

		} else if (filters.date_filter_type === 'by_yearly') {

			const currentDate = moment().format(DATE_FORMAT);
			const currentYear = moment().year();

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let endDateOfTheYear = moment([filters.year]).tz("Etc/GMT").add(1, 'years').endOf('year');

			if (filters.year === currentYear) {
				endDateOfTheYear = currentDate;
			}

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheYear),
				$lte: new Date(endDateOfTheYear)
			};

		}

	}
	return matchCondition;
}

function getAnalyticsFilterConditions(filters, warehouseIds) {

	let matchCondition = {
		warehouseId: {
			$in: [...warehouseIds]
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
				$gte: new Date(startDate),
				$lte: new Date(endDate)
			};

		} else if (filters.date_filter_type === 'by_monthly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheMonth = moment(startDateOfTheYear).add(filters.month - 1, 'months').format(DATE_FORMAT);
			let endDateOfTheMonth = moment(startDateOfTheMonth).tz("Etc/GMT").add(1, 'months').endOf('month');

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheMonth),
				$lte: new Date(endDateOfTheMonth)
			};

		} else if (filters.date_filter_type === 'by_quarterly') {

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let startDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).startOf('quarter').format(DATE_FORMAT);
			// let endDateOfTheQuarter = moment(startDateOfTheYear).tz("Etc/GMT").quarter(filters.quarter).add(1, 'years').endOf('quarter');
			let endDateOfTheQuarter = moment(startDateOfTheYear).quarter(filters.quarter).tz("Etc/GMT").add(3, 'months').endOf('quarter');

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheQuarter),
				$lte: new Date(endDateOfTheQuarter)
			};

		} else if (filters.date_filter_type === 'by_yearly') {

			const currentDate = moment().format(DATE_FORMAT);
			const currentYear = moment().year();

			let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
			let endDateOfTheYear = moment([filters.year]).tz("Etc/GMT").add(1, 'years').endOf('year');

			if (filters.year === currentYear) {
				endDateOfTheYear = currentDate;
			}

			matchCondition.uploadDate = {
				$gte: new Date(startDateOfTheYear),
				$lte: new Date(endDateOfTheYear)
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
	// auth,
	async function (req, res) {
		try {
			const filters = req.query;
			filters.type = (req.query.orgType && req.query.orgType.length) ? req.query.orgType : BREWERY_ORG;
			const resPerPage = 10;
			const overviewStats = await _getOverviewStats();
			let warehouseIds = await _getWarehouseIdsByOrgType(filters);
			const page = req.query.page || 1;
			const totalRecords = await AnalyticsModel.countDocuments({ ...req.params });
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
	auth,
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
	auth,
	async function (req, res) {
		try {
			const filters = req.query;
			let warehouseIds = await _getWarehouseIds(filters);

			let analyticsFilter = getAnalyticsFilterConditions(filters, warehouseIds);
			let brandFilter = {};
			if (filters.brand && filters.brand !== '') {
				brandFilter.manufacturer = filters.brand;
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
					$match: brandFilter
				},
				{
					$group: {
						_id: '$manufacturer',
						sales: { $sum: 1 },
						targetSales: { $sum: 1 },
						products: { $addToSet: '$$ROOT' }
					}
				},
				{ $sort: { "products.productId": 1 } }

			]);

			for (let analytic of Analytics) {

				let products = analytic.products.sort(function (a, b) {
					return a.productId - b.productId;
				});
				let prods = [];
				let arrIds = [];
				let salesSum = 0;
				let targetSum = 0;
				let prevProd = '';

				for (const [index, product] of products.entries()) {
					if (prevProd == '')
						prevProd = product.productId;

					if (prevProd !== product.productId || index === products.length - 1) {
						if (index === products.length - 1) {
							salesSum += parseInt(product.sales);
							targetSum += parseInt(product.targetSales);
						}

						prevProd = product.productId;
						if (arrIds.indexOf(product.productId) === -1) {
							product['returnRate'] = (parseInt(product.returns) / parseInt(product.sales)) * 100;
							product['returnRatePrev'] = await calculatePrevReturnRates(filters, product);
							arrIds.push(product.productId);

							product['sales'] = salesSum;
							product['targetSales'] = targetSum;
							prods.push(product);
							salesSum = 0;
							targetSum = 0;
						}
					}
					salesSum += parseInt(product.sales);
					targetSum += parseInt(product.targetSales);
				}
				analytic.products = prods;
			}

			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				Analytics
			);
		} catch (err) {
			console.log(err);

			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * getSalesStatsByBrand.
 *
 * @returns {Object}
 */
exports.getSalesStatsByBrand = [
	auth,
	async function (req, res) {
		try {
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
				let salesTotal = 0;
				let targetSalesTotal = 0;
				let returnsTotal = 0;
				let returnRateTotal = 0;
				let returnRatePrevTotal = 0;
				let _product = {};
				products.forEach((product) => {
					_product = product;
					salesTotal = salesTotal + (parseInt(product.sales) ? parseInt(product.sales) : 0);
					targetSalesTotal = targetSalesTotal + (parseInt(product.targetSales) ? parseInt(product.targetSales) : 0);
					returnsTotal = returnsTotal + (parseInt(product.returns) ? parseInt(product.returns) : 0);
					returnRateTotal = returnRateTotal + (parseInt(product.returnRate) ? parseInt(product.returnRate) : 0);
					returnRatePrevTotal = returnRatePrevTotal + (parseInt(product.returnRatePrev) ? parseInt(product.returnRatePrev) : 0);
				});
				delete analytic.products;
				analytic.stats = {
					..._product,
					sales: salesTotal,
					targetSalesTotal: targetSalesTotal,
					returns: returnsTotal,
					returnRate: returnRateTotal,
					returnRatePrev: returnRatePrevTotal
				};
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
exports.getStatsByOrg = [
	auth,
	async function (req, res) {
		try {
			const filters = req.query;

			let organizations = await OrganisationModel.aggregate([
				{
					$match: getFilterConditions(filters)
				}
			]);
			for (let organization of organizations) {
				let warehouseIds = await _getWarehouseIdsByOrg(organization);
				let analyticsFilter = getAnalyticsFilterConditions(filters, warehouseIds);
				let Analytics = await AnalyticsModel.aggregate([
					{
						$match: analyticsFilter
					}
				]);
				organization.analytics = aggregateSalesStats(Analytics);

				const lastMonthStart = moment().subtract(1, 'months').startOf('month').format(DATE_FORMAT);
				const lastMonthEnd = moment().subtract(1, 'months').endOf('month').format(DATE_FORMAT);
				let prevMonthmatchCondition = {
					uploadDate: {
						$lte: lastMonthEnd,
						$gte: lastMonthStart,
					},
					warehouseId: {
						$in: [...warehouseIds]
					}
				};

				if (filters.sku && filters.sku !== '') {
					prevMonthmatchCondition.productId = filters.sku;
				};
				let prevMonthAnalytics = await AnalyticsModel.aggregate([
					{
						$match: prevMonthmatchCondition
					}]);
				organization.analyticsPrevMonth = aggregateSalesStats(prevMonthAnalytics);

			}

			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				organizations
			);
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

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

/**
 * getLeadTimes.
 *
 * @returns {Object}
 */
exports.getLeadTimes = [
	auth,
	async function (req, res) {
		try {
			const warehouses = await OrganisationModel.aggregate([
				{
					$match: getFilterConditions(filters)
				},
				{
					$group: {
						_id: 'warehouses',
						warehouses: {
							$addToSet: '$warehouses'
						}
					}
				},
				{
					$unwind: {
						path: '$warehouses'
					}
				},
				{
					$unwind: {
						path: '$warehouses'
					}
				},
				{
					$group: {
						_id: 'warehouses',
						warehouseIds: {
							$addToSet: '$warehouses'
						}
					}
				}
			]);
			let warehouseIds = [];
			if (warehouses[0] && warehouses[0].warehouseIds) {
				warehouseIds = warehouses[0].warehouseIds;
			}
			let shipmentLeadTimes = await ShipmentModel.aggregate([
				{
					$match: {
						"supplier.locationId": { $in: warehouseIds }
					}
				},
				{
					$project: {
						"supplier.id": 1,
						id: 1,
						shippingDate: 1,
						createdAt: 1,
						actualDeliveryDate: {
							$dateFromString: {
								dateString: '$actualDeliveryDate'
							}
						},
						shippingDate: {
							$dateFromString: {
								dateString: '$shippingDate'
							}
						}
					}
				},
				{
					$project: {
						"supplier.id": 1,
						id: 1,
						"leadtime": {
							"$divide": [
								{ "$subtract": ["$actualDeliveryDate", "$shippingDate"] },
								60 * 1000 * 60
							]
						},

					}
				},
				{
					$replaceRoot: {
						newRoot: {
							$mergeObjects: ['$$ROOT', '$supplier']
						}
					}
				},
				{
					$group: {
						_id: "$id",
						avgLeadTime: {
							$avg: "$leadtime"
						}
					}
				},
				{
					$lookup: {
						from: 'organisations',
						localField: '_id',
						foreignField: 'id',
						as: 'orgDetails'
					}
				}
			]);
			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				shipmentLeadTimes
			);
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


async function calculateLeadTimeByOrg(supplierOrg) {
	const warehouses = await OrganisationModel.aggregate([
		{
			$match: {
				id: supplierOrg.id
			}
		},
		{
			$group: {
				_id: 'warehouses',
				warehouses: {
					$addToSet: '$warehouses'
				}
			}
		},
		{
			$unwind: {
				path: '$warehouses'
			}
		},
		{
			$unwind: {
				path: '$warehouses'
			}
		},
		{
			$group: {
				_id: 'warehouses',
				warehouseIds: {
					$addToSet: '$warehouses'
				}
			}
		}
	]);
	let warehouseIds = [];
	if (warehouses[0] && warehouses[0].warehouseIds) {
		warehouseIds = warehouses[0].warehouseIds;
	}
	let shipmentLeadTimes = await ShipmentModel.aggregate([
		{
			$match: {
				"supplier.locationId": { $in: warehouseIds }
			}
		},
		{
			$project: {
				"supplier.id": 1,
				id: 1,
				shippingDate: 1,
				createdAt: 1,
				actualDeliveryDate: {
					$dateFromString: {
						dateString: '$actualDeliveryDate'
					}
				},
				shippingDate: {
					$dateFromString: {
						dateString: '$shippingDate'
					}
				}
			}
		},
		{
			$project: {
				"supplier.id": 1,
				id: 1,
				"leadtime": {
					"$divide": [
						{ "$subtract": ["$actualDeliveryDate", "$shippingDate"] },
						60 * 1000 * 60
					]
				},

			}
		},
		{
			$replaceRoot: {
				newRoot: {
					$mergeObjects: ['$$ROOT', '$supplier']
				}
			}
		},
		{
			$group: {
				_id: "$id",
				avgLeadTime: {
					$avg: "$leadtime"
				}
			}
		},
		{
			$lookup: {
				from: 'organisations',
				localField: '_id',
				foreignField: 'id',
				as: 'orgDetails'
			}
		}
	]);
	return shipmentLeadTimes;
}

async function calculateReturnRateByOrg(supplierOrg) {
	const warehouses = await OrganisationModel.aggregate([
		{
			$match: {
				id: supplierOrg.id
			}
		},
		{
			$group: {
				_id: 'warehouses',
				warehouses: {
					$addToSet: '$warehouses'
				}
			}
		},
		{
			$unwind: {
				path: '$warehouses'
			}
		},
		{
			$unwind: {
				path: '$warehouses'
			}
		},
		{
			$group: {
				_id: 'warehouses',
				warehouseIds: {
					$addToSet: '$warehouses'
				}
			}
		}
	]);
	let warehouseIds = [];
	if (warehouses[0] && warehouses[0].warehouseIds) {
		warehouseIds = warehouses[0].warehouseIds;
	}

	let Analytics = await AnalyticsModel
		.find({
			warehouseId: {
				$in: [...warehouseIds]
			}
		});
	let totalReturns = 0;
	let totalSales = 0;
	let returnRate = 0;
	for (let analytic of Analytics) {
		totalReturns = totalReturns + parseInt(analytic.returns);
		totalSales = totalSales + parseInt(analytic.sales);
	}
	returnRate = totalReturns / totalSales * 100;
	return returnRate;

}

async function calculateStorageCapacityByOrg(supplierOrg) {
	const warehouses = await OrganisationModel.aggregate([
		{
			$match: {
				id: supplierOrg.id
			}
		}]);
	let bottleCapacity = 0;
	let sqft = 0;
	warehouses.forEach(w => {
		bottleCapacity = bottleCapacity + (w.bottleCapacity ? w.bottleCapacity : 0);
		sqft = sqft + (w.sqft ? w.sqft : 0);
	});
	return { bottleCapacity, sqft };
}

/**
 * getSupplierPerformance.
 *
 * @returns {Object}
 */
exports.getSupplierPerformance = [
	auth,
	async function (req, res) {
		try {
			const orgType = req.query.supplierType;
			let matchCondition = {}
			if (!orgType || orgType === 'ALL') {
				matchCondition = { $or: [{ type: 'S1' }, { type: 'S2' }, { type: 'S3' }] };
			} else {
				matchCondition.type = orgType;
			}
			const supplierOrgs = await OrganisationModel.aggregate([
				{
					$match: matchCondition
				}
			]);
			for (const supplier of supplierOrgs) {
				supplier.leadTime = await calculateLeadTimeByOrg(supplier);
				supplier.returnRate = await calculateReturnRateByOrg(supplier);
				supplier.storageCapacity = await calculateStorageCapacityByOrg(supplier);
			}

			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				supplierOrgs
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
	auth,
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
				$group: {
					_id: '$state',
					data: {
						$addToSet: "$$ROOT"
					}
				}
			}
			);
		} else if (filters.group_by === 'date') {
			if (filters.state)
				matchCondition.push({
					$match: {
						state: filters.state
					}
				});
			matchCondition.push(
				{
					$group: {
						_id: '$uploadDate',
						data: {
							$addToSet: "$$ROOT"
						}
					}
				});

		} else if (filters.group_by === 'district') {
			matchCondition.push(
				{
					$group: {
						_id: '$district',
						data: {
							$addToSet: "$$ROOT"
						}
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
	auth,
	async function (req, res) {
		try {
			const filters = req.query;
			const monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			let Analytics = await AnalyticsModel.aggregate([
				// { ...dateConversion(filters) },
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
			let response = [];
			Analytics.forEach(analytic => {
				if (analytic.data) {
					let temp = aggregateSalesStats(analytic.data);
					temp['groupedBy'] = (analytic._id.toString()).includes('GMT') ? monthNames[moment(analytic._id).tz("Etc/GMT").month()] : analytic._id;
					response.push(temp);
				}
			});

			return apiResponse.successResponseWithData(res, "Operation Success", response);

		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * getSalesTotalOfAllBrands by district and month
 * 
 * @returns {Object}
 */

exports.getSalesTotalOfAllBrands = [
	auth,
	async function (req, res) {
		try {
			const filters = req.query;
			let warehouseIds = await _getWarehouseIds(filters);
			let analyticsFilter = getAnalyticsFilterConditions(filters, warehouseIds);
			
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
						sales: { $sum: 1 },
					}
				}
			]);

			return apiResponse.successResponseWithData(
				res,
				"Operation success",
				Analytics
			);

		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err);
		}
	}
]
