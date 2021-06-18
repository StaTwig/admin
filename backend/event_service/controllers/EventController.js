/* eslint-disable linebreak-style */
const EventModal = require("../models/EventModal");
const ProductModel = require('../models/ProductModel');
const ShipmentModel = require('../models/ShipmentModel');

const { body, validationResult, param } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
const auth = require("../middlewares/jwt");
/**
 * getAllEvents.
 *
 * @returns {Object}
 */
exports.getAllEvents = [
	//auth,
	async function (req, res) {
		try {
			const resPerPage = Number(req.query.limit) || 10; 
			const page = Number(req.query.page) || 1; 
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
 * deleteEventById.
 *
 * @param {string}      eventId
 *
 * @returns {Object}
 */
exports.deleteEventById = [
	//auth,
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

exports.getAllEventsWithFilter = [ //inventory with filter(skip, limit, dateFilter, productName, productManufacturer, status)
	auth,
	async (req, res) => {
		try {
			const {
				skip,
				limit
			} = req.query;
			
			console.log("req.user =======> ", req.user);
			// console.log("req.query =======> ", req.query);
			const organisationId  = req.user.organisationId;
			
			let currentDate = new Date();
			let fromDateFilter = 0;
			let LocalField = 'payloadData.data.products.productId';
			let category = req.query.category;
			let productName = req.query.productName ? req.query.productName : undefined;
			let productManufacturer = req.query.productManufacturer ? req.query.productManufacturer : undefined;
			let status = req.query.status ? req.query.status : undefined;
			

			switch (req.query.dateFilter) {
				case "today":
					fromDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
					break;
				case "week":
					fromDateFilter = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
					break;
				case "month":
					fromDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
					break;
				case "threeMonth":
					fromDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
					break;
				case "sixMonth":
					fromDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
					break;
				case "year":
					fromDateFilter = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
					break;
				default:
					fromDateFilter = 0;
			}

			let elementMatchQuery = {};
			console.log(fromDateFilter)
			if (productName) {
				elementMatchQuery[`productDetails.id`] = productName;
			}

			if (productManufacturer) {
				elementMatchQuery[`productDetails.manufacturer`] = productManufacturer;
			}

			if(category){
				elementMatchQuery[`productDetails.type`] = category
			}
			if(status){
				elementMatchQuery[`eventTypePrimary`] = status;
				if(status === 'RECEIVE')
					LocalField = 'payloadData.data.products.productId'
			}
			if(organisationId){
				elementMatchQuery[`actorOrgId`] = organisationId
			}
			if(fromDateFilter){
				elementMatchQuery[`createdAt`] = {
					$gte: fromDateFilter
				}
			}
			

			console.log("elementMatchQuery========>", elementMatchQuery);

			try {
				// let inventoryCount = await EventModal.countDocuments(
				// 	{ 'payloadData.data.products': {
				// 		$exists: true, 
				// 		$ne: [],
				// 		$elemMatch: elementMatchQuery
				// 	},
				// 	'createdAt': {
				// 		$gte: fromDateFilter
				// 	},
				// 	'eventTypePrimary' : (status ? status : { $in: ["ADD", "CREATE"] }),
				// 	"actorOrgId" : organisationId,
				// 	}
				// );
			// 	EventModal.find({ 'payloadData.data.products': {
			// 		$exists: true, 
			// 		$ne: [],
			// 		$elemMatch: elementMatchQuery
			// 	},
			// 	'createdAt': {
			// 		$gte: fromDateFilter
			// 	},
			// 	'eventTypePrimary' : (status ? status : { $in: ["ADD", "CREATE"] }),
			// 	"actorOrgId" : organisationId,
			// 	}).skip(parseInt(skip)).limit(parseInt(limit)).sort({
			// 		createdAt: -1
			// 	}).then(async (eventRecords) => {
			// 		let inventoryRecords = [];
			// 		let eventRecordsRes = eventRecords.map(async function (event) {
			// 			let eventRecords = JSON.parse(JSON.stringify(event))
			// 			eventRecords[`ProductList`] = [];
			// 			let payloadRecord = event.payloadData;
			// 			if (payloadRecord.data.products) {
			// 				let inventoryQuantity = 0;
			// 				let productsRes = payloadRecord.data.products.map(async function (product) {
			// 					let detaildProduct = product;
			// 					detaildProduct[`productDetails`] = {};
			// 					detaildProduct[`shipmentDetails`] = {};
			// 					inventoryQuantity += detaildProduct.quantity ? Number(detaildProduct.quantity): Number(detaildProduct.productQuantity);
			// 					let whereQuery = {};
			// 					if (detaildProduct.productId) {
			// 						whereQuery[`id`] = detaildProduct.productId
			// 					} else if (detaildProduct.productName) {
			// 						whereQuery[`name`] = detaildProduct.productName
			// 					}
			// 					let productDetails = await ProductModel.findOne(whereQuery);
			// 					detaildProduct[`productDetails`] = productDetails;

			// 					if (payloadRecord.data.id) {
			// 						let shipmentDetails = await ShipmentModel.findOne({
			// 							id: payloadRecord.data.id
			// 						});
			// 						detaildProduct[`shipmentDetails`] = shipmentDetails;
			// 					}
			// 					return detaildProduct;
			// 				});
			// 				let productList = await Promise.all(productsRes);
			// 				eventRecords[`ProductList`].push(...productList);
			// 				eventRecords[`inventoryQuantity`] = inventoryQuantity;
			// 				if(productList.length > 0){
			// 					inventoryRecords.push(eventRecords);
			// 				}
			// 			}
			// 		});
			// 		let inventoryResult = await Promise.all(eventRecordsRes);
			// 		return apiResponse.successResponseWithData(
			// 			res,
			// 			"Inventory Records",
			// 			{"inventoryRecords":inventoryRecords, "count":inventoryCount}
			// 		);
			// 	});
			// } catch (err) {
			// 	console.log(err)
			// 	return apiResponse.ErrorResponse(res, err);
			// }

			let inventoryCount = await EventModal.aggregate([
				{ "$unwind": '$payloadData.data.products' },
				{ $lookup: {        
					   from: 'products',
					   localField: 'payloadData.data.products.productId',
					   foreignField: 'id',
					   as: 'productDetails',
					} },
					  { "$unwind": "$productDetails" },
					  { $match: elementMatchQuery},
					  { $group: { _id: null, myCount: { $sum: 1 } } }
					  ]).sort({
				createdAt: -1
			})
			inventoryCount = inventoryCount.length > 0 ? inventoryCount[0].myCount : 0
			console.log(elementMatchQuery)
			EventModal.aggregate([
				{ "$unwind": '$payloadData.data.products' },
				{ $lookup: {        
					   from: 'products',
					   localField: LocalField,
					   foreignField: 'id',
					   as: 'productDetails',
					} },
					  { "$unwind": '$productDetails' },
					  { $match: elementMatchQuery},
					{$sort: {createdAt: -1}}
				]).skip(parseInt(skip)).limit(parseInt(limit))
				.then(async (eventRecords) => {
				let inventoryRecords = [];
				await Promise.all(eventRecords.map(async function (event) {
					let eventRecord = JSON.parse(JSON.stringify(event))
					let payloadRecord = event.payloadData;
					eventRecord[`inventoryQuantity`] = payloadRecord.data.products.quantity || payloadRecord.data.products.productQuantity ;				
					if (payloadRecord.data.products) {
						if (payloadRecord.data.id) {
							let shipmentDetails = await ShipmentModel.findOne({
								id: payloadRecord.data.id
							});
							eventRecord[`shipmentDetails`] = shipmentDetails;
							if(shipmentDetails)
							eventRecord[`shipmentDetails`].id = payloadRecord.data.id;
						}
					}
					eventRecord[`payloadData`] = payloadRecord;
					if((eventRecord['eventTypePrimary']  !== 'ADD') && eventRecord[`shipmentDetails`] === null)
					console.log('deleted entry');
					else
					inventoryRecords.push(eventRecord);
				}))
				return apiResponse.successResponseWithData(
					res,
					"Inventory Records",
					{"inventoryRecords": inventoryRecords, "count":inventoryCount}
				);
			});
		} catch (err) {
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
		} catch (err) {
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.fetchProductDetailsList = [
	auth,
	async (req, res) => {
	  try {
		let responseData = {}
			ProductModel.find({},'id name manufacturer').then (function (productDetails){
			  responseData[`productDetails`] = productDetails;
			  return apiResponse.successResponseWithData(
				res,
				'Product Details for filter dropdown',
				responseData,
			  );
		});
	  } catch (err) {
		console.log(err)
		return apiResponse.ErrorResponse(res, err);
	  }
	},
  ]