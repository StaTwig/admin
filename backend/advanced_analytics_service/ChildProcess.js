process.on("message", message => {
    console.log("Message received: ", message);
    // process.exit();
})


const AnalyticsModel = require("./models/AnalyticsModel");
const ProductSKUModel = require("./models/ProductSKUModel");
const ShipmentModel = require("./models/ShipmentModel");
const InventoryModel = require("./models/InventoryModel");
const auth = require("./middlewares/jwt");
const OrganisationModel = require("./models/OrganisationModel");
const WarehouseModel = require("./models/WarehouseModel");
const ProductModel = require("./models/ProductModel");
//helper file to prepare responses.
const apiResponse = require("./helpers/apiResponse");
const moment = require('moment');
const { parse } = require("ipaddr.js");
const { update } = require("./models/ProductSKUModel");

require("dotenv").config();

const BREWERY_ORG = 'BREWERY';
const S1_ORG = 'S1';
const S2_ORG = 'S2';

const redis = require("redis");
const { promisifyAll } = require('bluebird');
promisifyAll(redis);
const client = redis.createClient();

client.on('error', err => {
    console.log('Error ' + err);
});

const DATE_FORMAT = 'YYYY-MM-DD';
var today = new Date()
var lastWeek = new Date()
lastWeek.setDate(today.getDate() - 7)
var lastMonth = new Date()
lastMonth.setDate(today.getDate() - 30)
var lastYear = new Date()
lastYear.setDate(today.getDate() - 365)

var timeFrame = moment().subtract(1, 'months');

async function getReturns(analytics, from, to, warehouseIds, filters) {
	if (!analytics.length) {
		return {
			sales: 0,
			targetSales: 0,
			returns: 0,
			actualReturns: 0
		}
	}
	let b_arr = [];
	const breweries = await OrganisationModel.find({ "type": 'BREWERY', "status": "ACTIVE" }, 'id');
	for (let b of breweries)
		b_arr.push(b.id);

	let quantity = 0;
	const row = analytics[0];
	// const Products = await ProductModel.find({ externalId: row.productId, manufacturer: row.brand });
	// const Products = await ProductModel.find({ id: filters.pid });
	// for (const prod of Products) {
		let params = {
			'receiver.id': { $in: b_arr },
			'products.productID': filters.pid,
			'supplier.locationId': { $in: warehouseIds },
			'status': 'RECEIVED',
			createdAt: {
				$lte: new Date(to),
				$gte: new Date(from),
			},
		}

		const shipments = await ShipmentModel.find(params);
		for (const Shipment of shipments) {
			for (const product of Shipment.products)
				if (product.productID == params['products.productID'])
				quantity += product.productQuantityDelivered;
		}
	// }
	let sales = analytics.map(item => parseInt(item.sales) || 0).reduce((prev, next) => prev + next);
	let targetSales = analytics.map(item => parseInt(item.targetSales) || 0).reduce((prev, next) => prev + next);
	let returns = quantity;
	let actualReturns = 0;
	if (returns && sales) {
		actualReturns = parseFloat(((returns / sales) * 100)).toFixed(2);
	}
	return {
		sales: sales,
		targetSales: targetSales,
		returns: returns,
		actualReturns: actualReturns
	};
}

async function getReturnsByExternalId(externalId, from, to, orgIds) {
	let b_arr = [];
	const breweries = await OrganisationModel.find({ "type": 'BREWERY', "status": "ACTIVE" }, 'id');
	for (let b of breweries)
		b_arr.push(b.id);

	let quantity = 0;
	const Products = await ProductModel.find({ externalId: externalId });
	for (const prod of Products) {
		let params = {
			'receiver.id': { $in: b_arr },
			'products.productID': prod.id,
			'supplier.id': { $in: orgIds },
			'status': 'RECEIVED',
			createdAt: {
				$lte: new Date(to),
				$gte: new Date(from),
			},
		}

		const shipments = await ShipmentModel.find(params);
		for (const Shipment of shipments) {
			for (const product of Shipment.products)
				if (product.productID == params['products.productID'])
				quantity += product.productQuantityDelivered;
		}
	}

	return quantity;
}

async function getOnlyReturns(prod_id, from, to, warehouseIds) {
	let b_arr = [];
	const breweries = await OrganisationModel.find({ "type": 'BREWERY', "status": "ACTIVE" }, 'id');
	for (let b of breweries)
		b_arr.push(b.id);
	
	let quantity = 0;
	let params = {
		'receiver.id': { $in: b_arr },
		'products.productID': prod_id,
		'supplier.locationId': { $in: warehouseIds },
		'status': 'RECEIVED',
		createdAt: {
			$lte: new Date(to),
			$gte: new Date(from),
		},
	}
		
	const shipments = await ShipmentModel.find(params);

	
	for (const Shipment of shipments) {
		for (const product of Shipment.products)
				if (product.productID == params['products.productID'])
				quantity += product.productQuantityDelivered;
	}
	return quantity;
}

async function getReturnsOrg(org, analytics, filters, from, to) {
	if (!analytics.length) {
		console.log("EMPTY ANALYTICS")
		return {
			sales: 0,
			targetSales: 0,
			returns: 0,
			actualReturns: 0
		}
	}
	let b_arr = [];
	const breweries = await OrganisationModel.find({ "type": 'BREWERY', "status": "ACTIVE" }, 'id');
	for (let b of breweries)
		b_arr.push(b.id);

	let quantity = 0;
	if (org.type != 'BREWERY') {
		// for (const row of analytics) {
			// const Products = await ProductModel.find({ externalId: row.productId, manufacturer: row.brand });
			// const Products = await ProductModel.find({ id: filters.pid });
			// for (const prod of Products) {
				let params = {
					'receiver.id': { $in: b_arr },
					'supplier.id': org.id,
					'products.productID': filters.pid,
					'status': 'RECEIVED',
					createdAt: {
						$lte: today,
						$gte: new Date(timeFrame),
					},
				}

				const shipments = await ShipmentModel.find(params);
				for (const Shipment of shipments) {
					for (const product of Shipment.products)
						if (product.productID == params['products.productID']) 
							quantity += product.productQuantityDelivered;
				}
			// }
		// }
	}
	else {
		const shipments = await ShipmentModel.find({
			'receiver.id': org.id,
			'status': 'RECEIVED',
			createdAt: {
				$lte: today,
				$gte: new Date(timeFrame),
			}
		});
		for (const Shipment of shipments) {
			for (const product of Shipment.products)
				quantity += product.productQuantityDelivered;
		}
	}
	let sales = analytics.map(item => parseInt(item.sales) || 0).reduce((prev, next) => prev + next);
	let targetSales = analytics.map(item => parseInt(item.targetSales) || 0).reduce((prev, next) => prev + next);
	// let returns = analytics.map(item => parseInt(item.returns) || 0).reduce((prev, next) => prev + next);
	let returns = quantity;
	let actualReturns = 0;
	if (returns && sales) {
		actualReturns = parseFloat(((returns / sales) * 100)).toFixed(2);
	}
	return {
		sales: sales,
		targetSales: targetSales,
		returns: returns,
		actualReturns: actualReturns
	};

}

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


async function calculatePrevReturnRatesNew(filters, analytic) {

	const lastMonthStart = moment().subtract(1, 'months').startOf('month').format(DATE_FORMAT);
	const lastMonthEnd = moment().subtract(1, 'months').endOf('month').format(DATE_FORMAT);
	let prevAnalytic = await AnalyticsModel.findOne({
		uploadDate: {
			$lte: lastMonthEnd,
			$gte: lastMonthStart,
		},
		brand: analytic._id.manufacturer,
		productId: analytic._id.id
	});
	if (prevAnalytic && parseInt(prevAnalytic.sales)) {
		return (parseInt(prevAnalytic.returns) / parseInt(prevAnalytic.sales)) * 100;
	} else {
		return 0;
	}
}

function getFilterConditions(filters) {
	let matchCondition = { status: 'ACTIVE' };
	if (filters.orgType && filters.orgType !== '') {
		if (filters.orgType === 'BREWERY' || filters.orgType === 'S1' || filters.orgType === 'S2' || filters.orgType === 'S3') {
			matchCondition.type = filters.orgType;
		} else if (filters.orgType === 'ALL_VENDORS') {
			matchCondition.$or = [{ type: 'S1' }, { type: 'S2' }, { type: 'S3' }];
		}
	}
	// if (filters.state && filters.state.length) {
	// 	matchCondition.state = filters.state;
	// }
	// if (filters.district && filters.district.length) {
	// 	matchCondition.district = filters.district;
	// }
	if (filters.organization && filters.organization.length) {
		matchCondition.id = filters.organization;
	}

	return matchCondition;
}

function getFilterConditionsWarehouse(filters) {
	let matchCondition = {};
	if (filters.orgType && filters.orgType !== '' && filters.warehouseIds) {
			matchCondition.id = { $in: [...filters.warehouseIds] };
	}
	if (filters.state && filters.state.length) {
		matchCondition.state = filters.state;
	}
	if (filters.district && filters.district.length) {
		matchCondition["warehouseAddress.city"] = filters.district;
	}
	if (filters.organization && filters.organization.length) {
		matchCondition.id = filters.organization;
	}
	return matchCondition;
}

const _getWarehouseIdsByOrg = async (org) => {
	let matchCondition = {};
	if (org && org.id && org.id !== '') {
		matchCondition.organisationId = org.id;
	}
	let warehouseIds = [];

	const warehouse = await WarehouseModel.findOne({ organisationId: org.id });

	if (warehouse) {
		const warehouses = await WarehouseModel.aggregate([
			{
				$match: { "warehouseAddress.city": warehouse?.warehouseAddress.city }
			},
			{
				$group: {
					_id: '$id'
				}
			}
		]);
		for (const wh of warehouses)
			warehouseIds.push(wh._id);
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

function getFilterConditionsSkuOrgType(filters) {
	let matchCondition = { status: 'ACTIVE' };
	if (filters.orgType && filters.orgType !== '') {
		if (filters.orgType === 'BREWERY' || filters.orgType === 'S1' || filters.orgType === 'S2'|| filters.orgType === 'S3') {
			matchCondition.type = filters.orgType;
		} else if (filters.orgType === 'ALL_VENDORS') {
			matchCondition.$or = [{ type: 'S1' }, { type: 'S2' }, { type: 'S3' }, { type: 'BREWERY' }];
		}
	}
	return matchCondition;
}

function getFilterConditionsOrgType(filters) {
	let matchCondition = { status: 'ACTIVE' };
	if (filters.orgType && filters.orgType !== '') {
		if (filters.orgType === 'BREWERY' || filters.orgType === 'S1' || filters.orgType === 'S2'|| filters.orgType === 'S3') {
			matchCondition.type = filters.orgType;
		} else if (filters.orgType === 'ALL_VENDORS') {
			matchCondition.$or = [{ type: 'S1' }, { type: 'S2' }, { type: 'S3' }, { type: 'BREWERY' }];
		}
	}
	if (filters.state && filters.state.length) {
		matchCondition.state = filters.state;
	}
	if (filters.district && filters.district.length) {
		matchCondition["warehouseAddress.city"] = filters.district;
	}
	if (filters.organization && filters.organization.length) {
		matchCondition.id = filters.organization;
	}
	return matchCondition;
}

const _getWarehousesByOrgType = async (filters) => {
	const warehouses = await OrganisationModel.aggregate([
		{
			$match: getFilterConditionsSkuOrgType(filters)
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

const _getWarehouseIdByOrgType = async (filters) => {
	if(filters.orgType && filters.orgType !== '')
		filters.warehouseIds = await _getWarehousesByOrgType(filters)
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

function getDistrictConditionsWarehouse(filters) {
	let matchCondition = {};
	if (filters.district && filters.district.length) {
		matchCondition["warehouseAddress.city"] = filters.district;
	}
	if (filters.orgType && filters.orgType !== '' && filters.orgType !== 'ALL_VENDORS' && filters.warehouseIds) {
		matchCondition.id = { $in: [...filters.warehouseIds] };
}
	return matchCondition;
}


const _getWarehouseIdsByDistrict = async (filters) => {
	if(filters.orgType && filters.orgType !== '' && filters.orgType !== 'ALL_VENDORS')
		filters.warehouseIds = await _getWarehousesByOrgType(filters)
	const warehouses = await WarehouseModel.aggregate([
		{
			$match: getDistrictConditionsWarehouse(filters)
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
	let targetSales = inputArr.map(item => parseInt(item.targetSales) || 0).reduce((prev, next) => prev + next);
	let returns = inputArr.map(item => parseInt(item.returns) || 0).reduce((prev, next) => prev + next);
	let actualReturns = 0;
	if (returns && sales) {
		actualReturns = parseFloat(((returns / sales) * 100)).toFixed(2);
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

	// if (filters.district && filters.district !== '') {
	// 	matchCondition.district = filters.district;
	// }

	if (filters.brand && filters.brand !== '') {
		matchCondition.brand = filters.brand;
	}

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
			$in: [...warehouseIds ]
		}
	};

	if (filters.sku && filters.sku !== '') {
		matchCondition.productId = filters.sku;
	};

	if (filters.brand && filters.brand !== '') {
		matchCondition.brand = filters.brand;
	}

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

exports.getStatsByBrand = [
	// auth,
	async function (req, res) {
		try {
			const filters = req.query;
			const filterString = JSON.stringify(filters);
			const data = await client.getAsync(filterString);
			if(data && data!= null) {
				return apiResponse.successResponseWithData(
					res,
					"Cache Hit",
					data
				);
			}
			else {


			}
			// client.get(r,(err, data) => {
			// 	console.log(data);
			// 	if(!err && data != null) {
			// 		return apiResponse.successResponseWithData(res,"HIT Cache",JSON.parse(data))
			// 	}
			// })
			let warehouseIds = await _getWarehouseIds(filters);
			today = new Date()
			let analyticsFilter = getAnalyticsFilterConditions(filters, warehouseIds);
			const date1 = new Date();
			console.log('Filter ==>',date1-today);
			const Products = await AnalyticsModel.aggregate([
				{
					$match: analyticsFilter
				},
				{
					$group: {
						_id: {
							id: '$productId',
							manufacturer: '$brand',
						},
						sales: { $sum: "$sales" },
						targetSales: { $sum: "$targetSales" },
						returns: { $sum: "$returns" },
						product: { "$first": { "productName": "$productName", "manufacturer": '$brand', "productSubName": "$productSubName", "productId": "$productId", "externalId": "$productId" } }
					}
				},
				{ $sort: { "_id.manufacturer": 1 } }
			]);
			const date2 = new Date();
			console.log('Products ==>',date2-date1);
			const MasterProducts = await ProductModel.find({});
			const date3 = new Date();
			console.log('MasterProds ==>',date3-date2);
			let Analytics = [];
			let arr = {};
			let prevBrand = '';
			
			let lastMonthStart = moment().subtract(1, 'months').tz("Etc/GMT").startOf('month');
			let lastMonthEnd = moment().subtract(1, 'months').tz("Etc/GMT").endOf('month');
			if (analyticsFilter?.uploadDate)
				lastMonthStart = moment(analyticsFilter.uploadDate['$gte']).tz("Etc/GMT").subtract(1, 'months').startOf('month');
			if (analyticsFilter?.uploadDate)
				lastMonthEnd = moment(analyticsFilter.uploadDate['$lte']).tz("Etc/GMT").subtract(1, 'months').endOf('month');
				const date4 = new Date();
				console.log('Moment Time ==>',date4-date3);
			warehouseIds = await _getWarehouseIdByOrgType(filters);
			const date5 = new Date();
			console.log('warehouses ==>',date5-date4);
			for (const [index, product] of Products.entries()) {
				if (prevBrand != product._id.manufacturer) {
					if (!!Object.keys(arr).length) {
						Analytics.push(arr);
					}
					arr = {
						_id: product._id.manufacturer,
						sales: product.sales,
						targetSales: parseInt(product.targetSales),
						returns: product.returns,
						products: []
					};
					prevBrand = product._id.manufacturer;
				}
				let prods = MasterProducts.filter(prod => (prod.externalId == product._id.id && prod.manufacturer == product._id.manufacturer));
				if (prods.length) {
					for (const [i, prod] of prods.entries()) {
						let p = prod.toObject();
						p['sales'] = product.sales;
						p['targetSales'] = parseInt(product.targetSales);
						p['productId'] = product._id.id;
						let to = today;
						let from = moment().startOf('month');
						if (analyticsFilter?.uploadDate)
							to = analyticsFilter.uploadDate['$lte'];
						if (analyticsFilter?.uploadDate)
							from = analyticsFilter.uploadDate['$gte'];
						p['returns'] = await getOnlyReturns(prod.id, from, to, warehouseIds);
						p['returnRate'] = parseFloat(((parseInt(p['returns']) / parseInt(product.sales)) * 100)).toFixed(2);
						// p['returnRatePrev'] = await calculatePrevReturnRatesNew(filters, product);
						const date6 = new Date();
						console.log('loop Cummulative ==>',date6-date5);
						let prevAnalytic = await AnalyticsModel.aggregate([
							{
								$match: {
									uploadDate: {
										$lte: new Date(lastMonthEnd),
										$gte: new Date(lastMonthStart),
									},
									brand: product._id.manufacturer,
									productId: product._id.id
								}
							},
							{
								$group: {
									_id: {
										id: '$productId',
										manufacturer: '$brand',
									},
									sales: { $sum: "$sales" },
								}
							}
						]);
						let prevSales = 0;
						p['returnRatePrev'] = 0;
						if (prevAnalytic.length) {
							prevSales = prevAnalytic[0].sales;
							let returnRatePrev = await getOnlyReturns(prod.id, lastMonthStart, lastMonthEnd, warehouseIds);
							p['returnRatePrev'] = parseFloat(((parseInt(returnRatePrev) / parseInt(prevSales)) * 100)).toFixed(2);
						}
						product.product = p;
					}
				}
				arr.products.push(product.product);
				if (index == Products.length - 1)
					Analytics.push(arr);
			}
			const date7 = new Date();
			console.log('endTotal',date7-date);
			client.set(filterString, JSON.stringify(Analytics), function (err, value) {
				if (err) {
					console.log(err);
				} else {
					console.log('set', value);
				}
			}
			);
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
