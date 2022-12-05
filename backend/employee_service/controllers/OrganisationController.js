const OrganisationModel = require("../models/OrganisationModel");
const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel");
const InventoryModel = require("../models/InventoryModel");
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const moment = require("moment");
const CounterModel = require("../models/CounterModel");
const logEvent = require("../../../utils/event_logger/eventLogger");
const { getLatLongByCity } = require("../helpers/getLatLong");
const cuid = require("cuid");
const axios = require("axios");
const hf_blockchain_url = process.env.HF_BLOCKCHAIN_URL || "http://3.110.249.128:8080";
const fs = require("fs");
const moveFile = require("move-file");
const XLSX = require("xlsx");

let EmployeeIdMap = new Map();
async function createOrg({ req, firstName, lastName, emailId, phoneNumber, organisationName, type, address }) {
	let organisationExists = await OrganisationModel.findOne({
		name: new RegExp("^" + organisationName + "$", "i"),
	});

	if (organisationExists) {
		return "Organisation name exists!";
	}

	const country = address?.country ? address?.country : "India";
	const region = address?.region ? address?.region : "Asia";
	const addr =
		address?.line1 + ", " + address?.city + ", " + address?.state + ", " + address?.pincode;
	const empCounter = await CounterModel.findOneAndUpdate(
		{
			"counters.name": "employeeId",
		},
		{
			$inc: {
				"counters.$.value": 1,
			},
		},
		{ new: true },
	);
	const employeeId = empCounter.counters[4].format + empCounter.counters[4].value;

	const warehouseCounter = await CounterModel.findOneAndUpdate(
		{ "counters.name": "warehouseId" },
		{
			$inc: {
				"counters.$.value": 1,
			},
		},
		{ new: true },
	);
	const warehouseId = warehouseCounter.counters[3].format + warehouseCounter.counters[3].value;

	const orgCounter = await CounterModel.findOneAndUpdate(
		{ "counters.name": "orgId" },
		{
			$inc: {
				"counters.$.value": 1,
			},
		},
		{ new: true },
	);
	const organisationId = orgCounter.counters[2].format + orgCounter.counters[2].value;

	const organisation = new OrganisationModel({
		primaryContactId: employeeId,
		name: organisationName,
		id: organisationId,
		type: type,
		status: "ACTIVE",
		isRegistered: true,
		postalAddress: addr,
		warehouses: [warehouseId],
		warehouseEmployees: [employeeId],
		region: region,
		country: country,
		configuration_id: "CONF000",
		authority: req.body?.authority,
	});
	await organisation.save();

	const invCounter = await CounterModel.findOneAndUpdate(
		{ "counters.name": "inventoryId" },
		{
			$inc: {
				"counters.$.value": 1,
			},
		},
		{
			new: true,
		},
	);
	const inventoryId = invCounter.counters[7].format + invCounter.counters[7].value;
	const inventoryResult = new InventoryModel({ id: inventoryId });
	await inventoryResult.save();
	const loc = await getLatLongByCity(address.city + "," + address.country);
	const warehouse = new WarehouseModel({
		title: "Office",
		id: warehouseId,
		warehouseInventory: inventoryId,
		organisationId: organisationId,
		location: loc,
		warehouseAddress: {
			firstLine: address.line1,
			secondLine: "",
			region: address.region,
			city: address.city,
			state: address.state,
			country: address.country,
			landmark: "",
			zipCode: address.pincode,
		},
		region: {
			regionName: region,
		},
		country: {
			countryId: "001",
			countryName: country,
		},
		status: "ACTIVE",
	});
	await warehouse.save();

	if (emailId) emailId = emailId.toLowerCase().replace(" ", "");
	if (phoneNumber) {
		phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
	}

	const user = new EmployeeModel({
		firstName: firstName,
		lastName: lastName,
		emailId: emailId,
		phoneNumber: phoneNumber,
		organisationId: organisationId,
		id: employeeId,
		postalAddress: addr,
		accountStatus: "ACTIVE",
		warehouseId: warehouseId == "NA" ? [] : [warehouseId],
		role: "admin"
	});
	await user.save();

	let bc_data;

	if (emailId != null) {
		bc_data = {
			username: emailId,
			password: "",
			orgName: "org1MSP",
			role: "",
			email: emailId,
		};
	} else if (phoneNumber != null) {
		bc_data = {
			username: phoneNumber,
			password: "",
			orgName: "org1MSP",
			role: "",
			email: phoneNumber,
		};
	}

	await axios.post(`${hf_blockchain_url}/api/v1/register`, bc_data);

	const event_data = {
		eventID: cuid(),
		eventTime: new Date().toISOString(),
		actorWarehouseId: "null",
		transactionId: employeeId,
		eventType: {
			primary: "CREATE",
			description: "USER",
		},
		actor: {
			actorid: employeeId,
			actoruserid: employeeId,
		},
		stackholders: {
			ca: {
				id: "null",
				name: "null",
				address: "null",
			},
			actororg: {
				id: organisationId ? organisationId : "null",
				name: "null",
				address: "null",
			},
			secondorg: {
				id: "null",
				name: "null",
				address: "null",
			},
		},
		payload: {
			data: "CREATED ORG WITH EXCEL",
		},
	};
	await logEvent(event_data);
}

function getOrgCondition(query) {
	let matchCondition = {};
	if (query.orgType && query.orgType != "") {
		matchCondition.type = query.orgType;
	}
	if (query.country && query.country != "") {
		matchCondition["country.countryName"] = query.country;
	}
	if (query.status && query.status != "") {
		matchCondition.status = query.status;
	}
	if (query.region && query.region != "") {
		matchCondition["region.name"] = query.region;
	}
	if (query.creationFilter && query.creationFilter == "true") {
		let now = moment();
		let oneDayAgo = moment().subtract(1, "day");
		let oneMonthAgo = moment().subtract(1, "months");
		let threeMonthsAgo = moment().subtract(3, "months");
		let oneYearAgo = moment().subtract(1, "years");
		let oneWeek = moment().subtract(1, "weeks");
		let sixMonths = moment().subtract(6, "months");
		if (query.dateRange == "today") {
			matchCondition.createdAt = {
				$gte: new Date(oneDayAgo),
				$lte: new Date(now),
			};
		} else if (query.dateRange == "thisMonth") {
			matchCondition.createdAt = {
				$gte: new Date(oneMonthAgo),
				$lte: new Date(now),
			};
		} else if (query.dateRange == "threeMonths") {
			matchCondition.createdAt = {
				$gte: new Date(threeMonthsAgo),
				$lte: new Date(now),
			};
		} else if (query.dateRange == "thisYear") {
			matchCondition.createdAt = {
				$gte: new Date(oneYearAgo),
				$lte: new Date(now),
			};
		} else if (query.dateRange == "thisWeek") {
			matchCondition.createdAt = {
				$gte: new Date(oneWeek),
				$lte: new Date(now),
			};
		} else if (query.dateRange == "sixMonths") {
			matchCondition.createdAt = {
				$gte: new Date(sixMonths),
				$lte: new Date(now),
			};
		}
	}
	return matchCondition;
}

exports.getPendingOrgs = [
	auth,
	async (req, res) => {
		try {
			const pendingOrgs = await OrganisationModel.find({
				status: "NOTVERIFIED",
				isRegistered: true
			});

			return apiResponse.successResponseWithData(req, res, "Organisation list", pendingOrgs);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, err);
		}
	},
];

exports.getOrgs = [
	auth,
	async (req, res) => {
		try {
			console.log(req.query.skip);

			const users = await OrganisationModel.aggregate([
				{
					$match: getOrgCondition(req.query),
				},
				{
					$lookup: {
						from: "employees",
						let: { orgId: "$id" },
						pipeline: [
							{ $match: { $expr: { $eq: ["$$orgId", "$organisationId"] } } },
							{ $count: "total" },
						],
						as: "employeeCount",
					},
				},
				{ $unwind: "$employeeCount" },
				{
					$sort: {
						createdAt: -1,
					},
				},
				{ $skip: parseInt(req.query.skip) || 0 },
				{ $limit: parseInt(req.query.limit) || 10 },
			]);
			for (var c = 0; c < users.length; c++) {
				if (EmployeeIdMap.has(users[c].primaryContactId)) {
					users[c].primaryContactId = EmployeeIdMap.get(users[c].primaryContactId);
				} else {
					try {
						const employeeEmail = await EmployeeModel.findOne({
							id: users[c].primaryContactId,
						}).select("emailId phoneNumber");
						if (employeeEmail.emailId != null) {
							EmployeeIdMap.set(users[c].primaryContactId, employeeEmail.emailId);
							users[c].primaryContactId = employeeEmail.emailId;
						} else {
							EmployeeIdMap.set(users[c].primaryContactId, employeeEmail.phoneNumber);
							users[c].primaryContactId = employeeEmail.phoneNumber;
						}
					} catch (err) {
						console.log(err);
					}
				}
			}
			// console.log("Users", users);
			return apiResponse.successResponseWithData(req, res, "Organisation list", users);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, err);
		}
	},
];

exports.getOrgAnalytics = [
	auth,
	async (req, res) => {
		try {
			const analytics = await OrganisationModel.aggregate([
				{
					$facet: {
						total: [
							{ $match: {} },
							{
								$group: {
									_id: null,
									organisations: {
										$addToSet: {
											organisationId: "$id",
											status: "$status",
										},
									},
								},
							},
							{
								$project: {
									count: {
										$cond: {
											if: { $isArray: "$organisations" },
											then: { $size: "$organisations" },
											else: "NA",
										},
									},
								},
							},
						],
						active: [
							{ $match: { status: "ACTIVE" } },
							{
								$group: {
									_id: null,
									organisations: {
										$addToSet: {
											organisationId: "$id",
											status: "$status",
										},
									},
								},
							},
							{
								$project: {
									count: {
										$cond: {
											if: { $isArray: "$organisations" },
											then: { $size: "$organisations" },
											else: "NA",
										},
									},
								},
							},
						],
					},
				},
				{ $unwind: "$total" },
				{ $unwind: "$active" },
			]);
			console.log(analytics);
			const analyticsObject = {
				totalCount: analytics[0].total.count,
				activeCount: analytics[0].active.count,
				inactiveCount: analytics[0].total.count - analytics[0].active.count,
			};
			return apiResponse.successResponseWithData(req, res, "Organisation list", analyticsObject);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, err);
		}
	},
];

exports.updateOrg = [
	auth,
	async (req, res) => {
		try {
			const { id, status, type } = req.body;
			const org = await OrganisationModel.findOneAndUpdate(
				{
					id: id,
				},
				{
					$set: {
						status: status,
						type: type,
					},
				},
				{
					new: true,
				},
			);
			if (status === "REJECTED") {
				try {
					await OrganisationModel.findOneAndDelete({ id: id });
					await EmployeeModel.findOneAndDelete({
						id: org.primaryContactId,
					});
					await WarehouseModel.findOneAndDelete({
						id: org.warehouses[0],
					});
					return apiResponse.successResponseWithData(req, res, "Organisation REJECTED", org);
				} catch (err) {
					console.log(err);
					return apiResponse.ErrorResponse(req, res, err);
				}
			}
			if (status === "ACTIVE") {
				const warehouse = await WarehouseModel.findOneAndUpdate(
					{ id: org.warehouses[0] },
					{ $set: { status: "ACTIVE" } },
					{ new: true },
				);
				console.log(warehouse);
			}
			await EmployeeModel.findOneAndUpdate(
				{ id: org.primaryContactId },
				{
					$set: {
						accountStatus: status,
						role: "powerUser",
					},
				},
			);
			return apiResponse.successResponseWithData(req, res, "Organisation updated", org);
		} catch (err) {
			return apiResponse.ErrorResponse(req, res, err);
		}
	},
];

exports.addNewOrganisation = [
	auth,
	async (req, res) => {
		try {
			let { firstName, lastName, emailId, phoneNumber, organisationName, type, address } = req.body;

			let organisationExists = await OrganisationModel.findOne({
				name: new RegExp("^" + organisationName + "$", "i"),
			});

			if (organisationExists) {
				return apiResponse.validationErrorWithData(
					req,
					res,
					"Organisation name exists!",
					organisationName,
				);
			}

			const country = req.body?.address?.country ? req.body.address?.country : "India";
			const region = req.body?.address?.region ? req.body.address?.region : "Asia";
			const addr =
				address?.line1 + ", " + address?.city + ", " + address?.state + ", " + address?.pincode;

			const empCounter = await CounterModel.findOneAndUpdate(
				{
					"counters.name": "employeeId",
				},
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{ new: true },
			);
			const employeeId = empCounter.counters[4].format + empCounter.counters[4].value;

			const warehouseCounter = await CounterModel.findOneAndUpdate(
				{ "counters.name": "warehouseId" },
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{ new: true },
			);
			const warehouseId = warehouseCounter.counters[3].format + warehouseCounter.counters[3].value;

			const orgCounter = await CounterModel.findOneAndUpdate(
				{ "counters.name": "orgId" },
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{ new: true },
			);
			const organisationId = orgCounter.counters[2].format + orgCounter.counters[2].value;

			const organisation = new OrganisationModel({
				primaryContactId: employeeId,
				name: organisationName,
				id: organisationId,
				type: type,
				status: "ACTIVE",
				isRegistered: true,
				postalAddress: addr,
				warehouses: [warehouseId],
				warehouseEmployees: [employeeId],
				region: region,
				country: country,
				configuration_id: "CONF000",
				authority: req.body?.authority,
			});
			await organisation.save();

			const invCounter = await CounterModel.findOneAndUpdate(
				{ "counters.name": "inventoryId" },
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{
					new: true,
				},
			);
			const inventoryId = invCounter.counters[7].format + invCounter.counters[7].value;
			const inventoryResult = new InventoryModel({ id: inventoryId });
			await inventoryResult.save();
			const loc = await getLatLongByCity(address.city + "," + address.country);
			const warehouse = new WarehouseModel({
				title: "Office",
				id: warehouseId,
				warehouseInventory: inventoryId,
				organisationId: organisationId,
				location: loc,
				warehouseAddress: {
					firstLine: address.line1,
					secondLine: "",
					region: address.region,
					city: address.city,
					state: address.state,
					country: address.country,
					landmark: "",
					zipCode: address.pincode,
				},
				region: {
					regionName: region,
				},
				country: {
					countryId: "001",
					countryName: country,
				},
				status: "ACTIVE",
			});
			await warehouse.save();

			if (emailId) emailId = req.body.emailId.toLowerCase().replace(" ", "");
			if (phoneNumber) {
				phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
			}

			const user = new EmployeeModel({
				firstName: firstName,
				lastName: lastName,
				emailId: emailId,
				phoneNumber: phoneNumber,
				organisationId: organisationId,
				id: employeeId,
				postalAddress: addr,
				accountStatus: "ACTIVE",
				warehouseId: warehouseId == "NA" ? [] : [warehouseId],
				role: "admin"
			});
			await user.save();

			let bc_data;

			if (emailId != null) {
				bc_data = {
					username: emailId,
					password: "",
					orgName: "org1MSP",
					role: "",
					email: emailId,
				};
			} else if (phoneNumber != null) {
				bc_data = {
					username: phoneNumber,
					password: "",
					orgName: "org1MSP",
					role: "",
					email: phoneNumber,
				};
			}

			await axios.post(`${hf_blockchain_url}/api/v1/register`, bc_data);

			const event_data = {
				eventID: cuid(),
				eventTime: new Date().toISOString(),
				actorWarehouseId: "null",
				transactionId: employeeId,
				eventType: {
					primary: "CREATE",
					description: "USER",
				},
				actor: {
					actorid: employeeId,
					actoruserid: employeeId,
				},
				stackholders: {
					ca: {
						id: "null",
						name: "null",
						address: "null",
					},
					actororg: {
						id: req.body.organisationId ? req.body.organisationId : "null",
						name: "null",
						address: "null",
					},
					secondorg: {
						id: "null",
						name: "null",
						address: "null",
					},
				},
				payload: {
					data: req.body,
				},
			};
			await logEvent(event_data);

			return apiResponse.successResponseWithData(
				req,
				res,
				"Organisation added successfully!",
				organisation,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, err);
		}
	},
];

exports.addOrgsFromExcel = [
	auth,
	async (req, res) => {
		try {

			try {
				const dir = `uploads`;
				if (!fs.existsSync(dir))
					fs.mkdirSync(dir);
				await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
				const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
				const sheet_name_list = workbook.SheetNames;
				let data = XLSX.utils.sheet_to_json(
					workbook.Sheets[sheet_name_list[0]],
					{ dateNF: "dd/mm/yyyy;@", cellDates: true, raw: false }
				);

				console.log(data.entries());
				const formatedData = new Array();
				for (const [index, user] of data.entries()) {
					const firstName = user["FIRST NAME"]
					const lastName = user["LAST NAME"]
					const emailId = user["EMAIL"]
					const phoneNumber = user["PHONE"]
					const organisationName = user["ORG NAME"]
					const type = user["ORG TYPE"]
					const address = {
						city: user["CITY"],
						country: user["COUNTRY"],
						line1: user["ADDRESS LINE"],
						pincode: user["PINCODE"],
						region: user["REGION"],
						state: user["STATE"]
					}


					formatedData[index] = {
						firstName: firstName,
						lastName: lastName,
						emailId: emailId,
						phoneNumber: phoneNumber,
						organisationName: organisationName,
						type: type,
						address: address
					};
				}
				const promises = [];
				for (const org of formatedData) {
					promises.push(createOrg({ req, res, ...org }));
				}
				await Promise.all(promises);
				return apiResponse.successResponseWithData(
					req,
					res,
					"success",
					formatedData
				);
			}
			catch (err) {
				console.log(err);
				return apiResponse.ErrorResponse(req, res, err);
			}
		} catch (err) {
			console.log(err);
		}
	},
];