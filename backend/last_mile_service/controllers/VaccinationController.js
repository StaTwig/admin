require("dotenv").config();
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const AtomModel = require("../models/AtomModel");
const CounterModel = require("../models/CounterModel");
const DoseModel = require("../models/DoseModel");
const EmployeeModel = require("../models/EmployeeModel");
const InventoryModel = require("../models/InventoryModel");
const OrganisationModel = require("../models/OrganisationModel");
const VaccineVialModel = require("../models/VaccineVialModel");
const WarehouseModel = require("../models/WarehouseModel");
const excel = require("node-excel-export");
const PdfPrinter = require("pdfmake");
const { resolve } = require("path");
const fs = require("fs");

const fontDescriptors = {
  Roboto: {
    normal: resolve("./controllers/Roboto-Regular.ttf"),
    bold: resolve("./controllers/Roboto-Medium.ttf"),
    italics: resolve("./controllers/Roboto-Italic.ttf"),
    bolditalics: resolve("./controllers/Roboto-MediumItalic.ttf"),
  },
};
const printer = new PdfPrinter(fontDescriptors);

exports.fetchBatchById = [
	auth,
	async (req, res) => {
		try {
			const userId = req.user.id;
			const batchNumber = req.body.batchNumber;
			const warehouseId = req.body.warehouseId;

			const user = await EmployeeModel.findOne({ id: userId });

			if (!user.warehouseId.includes(warehouseId)) {
				throw new Error("User does not have access to this warehouse!");
			}

			const warehouse = await WarehouseModel.findOne({ id: warehouseId });

			const productDetails = await EmployeeModel.aggregate([
				{ $match: { id: userId } },
				{
					$lookup: {
						from: "atoms",
						let: {
							inventoryId: warehouse.warehouseInventory,
							batchNumber: batchNumber,
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{ $eq: ["$currentInventory", "$$inventoryId"] },
											{ $eq: ["$status", "HEALTHY"] },
											{ $in: ["$$batchNumber", "$batchNumbers"] },
										],
									},
								},
							},
						],
						as: "atom",
					},
				},
				{ $unwind: "$atom" },
				{
					$lookup: {
						from: "products",
						localField: "atom.productId",
						foreignField: "id",
						as: "product",
					},
				},
				{ $unwind: "$product" },
				{ $project: { atom: 1, product: 1 } },
			]);

			if (productDetails) {
				if (productDetails.length) {
					if (!productDetails[0]?.atom?.quantity) {
						throw new Error("Batch exhausted!");
					}
				} else {
					throw new Error("Batch not found!");
				}
			}

			return apiResponse.successResponseWithData(res, "Product Details", productDetails);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.vaccinateIndividual = [
	auth,
	async (req, res) => {
		try {
			const { warehouseId, productId, batchNumber, age, gender } = req.body;
			let vaccineVialId = req.body?.vaccineVialId;
			let vaccineVial;

			const warehouse = await WarehouseModel.findOne({ id: warehouseId });

			const existingInventory = await InventoryModel.findOne(
				{ id: warehouse.warehouseInventory },
				{ _id: 1, id: 1, inventoryDetails: { $elemMatch: { productId: productId } } },
			);

			if(existingInventory?.inventoryDetails?.length) {
				if(existingInventory.inventoryDetails[0].quantity < 1) {
					return apiResponse.ErrorResponse(res, "Inventory exhausted!");
				}
			}

			const existingAtom = await AtomModel.findOne({
				currentInventory: warehouse.warehouseInventory,
				batchNumbers: batchNumber,
				status: "HEALTHY",
			});

			if(!existingAtom?.quantity) {
				return apiResponse.ErrorResponse(res, "Batch Exhausted!");
			}

			// Open a new bottle if first dose
			if (!vaccineVialId) {
				const vaccineVialCounter = await CounterModel.findOneAndUpdate(
					{
						"counters.name": "vaccineVialId",
					},
					{
						$inc: {
							"counters.$.value": 1,
						},
					},
					{
						new: true,
					},
				);

				// Create an id
				vaccineVialId =
					vaccineVialCounter.counters[13].format + vaccineVialCounter.counters[13].value;

				// New vaccine vial
				vaccineVial = new VaccineVialModel({
					id: vaccineVialId,
					warehouseId: warehouseId,
					productId: productId,
					batchNumber: batchNumber,
					numberOfDoses: 0,
				});
				await vaccineVial.save();

				// Reduce inventory in InventoryModel and AtomModel
				const atom = await AtomModel.findOneAndUpdate(
					{
						currentInventory: warehouse.warehouseInventory,
						batchNumbers: batchNumber,
						status: "HEALTHY",
					},
					{
						$inc: { quantity: -1 },
					},
					{ new: true },
				);

				const inventory = await InventoryModel.updateOne(
					{ id: warehouse.warehouseInventory, "inventoryDetails.productId": productId },
					{ $inc: { "inventoryDetails.$.quantity": -1 } },
				);
			} else {
				vaccineVial = await VaccineVialModel.findOne({ id: vaccineVialId });
				if (vaccineVial.numberOfDoses === 10) {
					throw new Error("Vial Exhausted! Only 10 doses per vial!");
				}
			}

			const doseCounter = await CounterModel.findOneAndUpdate(
				{
					"counters.name": "doseId",
				},
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{
					new: true,
				},
			);

			// Create an id
			const doseId = doseCounter.counters[14].format + doseCounter.counters[14].value;

			const dose = new DoseModel({
				id: doseId,
				vaccineVialId: vaccineVialId,
				age: age,
				gender: gender === "GENERAL" ? "OTHERS" : gender,
			});
			await dose.save();

			// Increment number of doses in VaccineVial model
			await VaccineVialModel.findOneAndUpdate(
				{ id: vaccineVialId },
				{ $inc: { numberOfDoses: 1 } },
			);

			return apiResponse.successResponseWithData(res, "Dose added successfully!", {
				vaccineVialId: vaccineVialId,
			});
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.vaccinateMultiple = [
	auth,
	async (req, res) => {
		try {
			const { warehouseId, productId, batchNumber, doses } = req.body;

			const warehouse = await WarehouseModel.findOne({ id: warehouseId });

			const existingInventory = await InventoryModel.findOne(
				{ id: warehouse.warehouseInventory },
				{ _id: 1, id: 1, inventoryDetails: { $elemMatch: { productId: productId } } },
			);

			if(existingInventory?.inventoryDetails?.length) {
				if(existingInventory.inventoryDetails[0].quantity < 1) {
					return apiResponse.ErrorResponse(res, "Inventory exhausted!");
				}
			}

			const existingAtom = await AtomModel.findOne({
				currentInventory: warehouse.warehouseInventory,
				batchNumbers: batchNumber,
				status: "HEALTHY",
			});

			if(!existingAtom?.quantity) {
				return apiResponse.ErrorResponse(res, "Batch Exhausted!");
			}

			if (doses?.length && doses.length > 10) {
				throw new Error("Cannot vaccinate more than 10 people with a single vial!");
			}

			const vaccineVialCounter = await CounterModel.findOneAndUpdate(
				{
					"counters.name": "vaccineVialId",
				},
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{
					new: true,
				},
			);

			// Create an id
			const vaccineVialId =
				vaccineVialCounter.counters[13].format + vaccineVialCounter.counters[13].value;

			// New vaccine vial
			const vaccineVial = new VaccineVialModel({
				id: vaccineVialId,
				warehouseId: warehouseId,
				productId: productId,
				batchNumber: batchNumber,
				numberOfDoses: doses.length,
			});
			await vaccineVial.save();

			// Reduce inventory in InventoryModel and AtomModel
			const atom = await AtomModel.findOneAndUpdate(
				{
					currentInventory: warehouse.warehouseInventory,
					batchNumbers: batchNumber,
					status: "HEALTHY",
				},
				{
					$inc: { quantity: -1 },
				},
				{ new: true },
			);

			const inventory = await InventoryModel.updateOne(
				{ id: warehouse.warehouseInventory, "inventoryDetails.productId": productId },
				{ $inc: { "inventoryDetails.$.quantity": -1 } },
			);

			for (let i = 0; i < doses.length; ++i) {
				const doseCounter = await CounterModel.findOneAndUpdate(
					{
						"counters.name": "doseId",
					},
					{
						$inc: {
							"counters.$.value": 1,
						},
					},
					{
						new: true,
					},
				);

				// Create an id
				const doseId = doseCounter.counters[14].format + doseCounter.counters[14].value;

				const dose = new DoseModel({
					id: doseId,
					vaccineVialId: vaccineVialId,
					age: doses[i].age,
					gender: doses[i].gender === "GENERAL" ? "OTHERS" : doses[i].gender,
				});
				await dose.save();
			}

			return apiResponse.successResponseWithData(res, "Dose added successfully!", {
				vaccineVialId: vaccineVialId,
			});
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVaccinationDetailsByVial = [
	auth,
	async (req, res) => {
		try {
			const vaccineVialId = req.query.vaccineVialId;
			const vaccinationDetails = await VaccineVialModel.aggregate([
				{ $match: { id: vaccineVialId } },
				{
					$lookup: {
						from: "doses",
						localField: "id",
						foreignField: "vaccineVialId",
						as: "doses",
					},
				},
			]);

			if (!vaccinationDetails) {
				return apiResponse.validationErrorWithData(res, "VaccineVialId invalid!", {
					vaccineVialId: vaccineVialId,
				});
			}

			return apiResponse.successResponseWithData(
				res,
				"Fetched doses successfully!",
				vaccinationDetails,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVaccinationDetailsByBatch = [
	auth,
	async (req, res) => {
		try {
			const batchNumber = req.query.batchNumber;
			const vaccinationDetails = await VaccineVialModel.aggregate([
				{ $match: { batchNumber: batchNumber } },
				{
					$lookup: {
						from: "doses",
						localField: "id",
						foreignField: "vaccineVialId",
						as: "doses",
					},
				},
				{
					$lookup: {
						from: "warehouses",
						localField: "warehouseId",
						foreignField: "id",
						as: "warehouse",
					},
				},
				{ $unwind: "$warehouse" },
				{
					$lookup: {
						from: "products",
						localField: "productId",
						foreignField: "id",
						as: "product",
					},
				},
				{ $unwind: "$product" },
			]);

			if (!vaccinationDetails) {
				return apiResponse.validationErrorWithData(res, "VaccineVialId invalid!", {
					vaccineVialId: vaccineVialId,
				});
			}

			return apiResponse.successResponseWithData(
				res,
				"Fetched doses successfully!",
				vaccinationDetails,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

const buildWarehouseQuery = async (user, city, organisationName) => {
	try {
		const userDetails = await EmployeeModel.findOne({ id: user.id });
		const organisation = await OrganisationModel.findOne({
			id: userDetails.organisationId,
		});

		let warehouseIds = userDetails.warehouseId;

		// If user is powerUser show organisation wide details
		if (userDetails.role === "powerUser") {
			let warehouses = await WarehouseModel.find({
				organisationId: userDetails.organisationId,
				status: "ACTIVE",
			});
			warehouseIds = warehouses.map((warehouse) => warehouse.id);
		}

		let warehouseQuery = {};
		let queryExprs = [];

		if (userDetails && organisation.type !== "GoverningBody") {
			queryExprs.push({ id: { $in: warehouseIds } });
		}

		if (organisation.type === "GoverningBody" && organisationName) {
			let organisation = await OrganisationModel.findOne({
				status: "ACTIVE",
				name: organisationName,
			});
			let warehouses = await WarehouseModel.find({
				organisationId: organisation.id,
				status: "ACTIVE",
			});
			warehouseIds = warehouses.map((warehouse) => warehouse.id);
			queryExprs.push({ id: { $in: warehouseIds } });
		}

		if (city) {
			queryExprs.push({ "warehouseAddress.city": city });
		}

		if (queryExprs.length) {
			warehouseQuery = {
				$and: queryExprs,
			};
		}

		return warehouseQuery;
	} catch (err) {
		throw err;
	}
};

const buildDoseQuery = async (gender, minAge, maxAge) => {
	try {
		let doseQuery = {};
		let queryExprs = [{ $eq: ["$vaccineVialId", "$$vaccineVialId"] }];

		// Modify the if once a new Role is added
		if (gender) {
			queryExprs.push({ $eq: ["$gender", gender] });
		}
		if (minAge) {
			queryExprs.push({ $gte: ["$age", parseInt(minAge)] });
		}
		if (maxAge) {
			queryExprs.push({ $lte: ["$age", parseInt(maxAge)] });
		}

		if (queryExprs.length) {
			doseQuery = {
				$expr: {
					$and: queryExprs,
				},
			};
		}

		return doseQuery;
	} catch (err) {
		throw err;
	}
};

const generateVaccinationsList = async (filters) => {
	try {
		const { user, city, organisation, gender, minAge, maxAge } = filters;
		const warehouseQuery = await buildWarehouseQuery(user, city, organisation);
		const doseQuery = await buildDoseQuery(gender, minAge, maxAge);

		const warehouses = await WarehouseModel.aggregate([
			{ $match: warehouseQuery },
			{
				$lookup: {
					from: "vaccinevials",
					let: { warehouseId: "$id" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$warehouseId", "$$warehouseId"] } } },
						{
							$lookup: {
								from: "products",
								localField: "productId",
								foreignField: "id",
								as: "product",
							},
						},
						{ $unwind: "$product" },
						{
							$lookup: {
								from: "doses",
								let: { vaccineVialId: "$id" },
								pipeline: [
									{
										$match: doseQuery,
									},
								],
								as: "doses",
							},
						},
					],
					as: "vaccinations",
				},
			},
		]);
		if (!warehouses) {
			return apiResponse.validationErrorWithData(res, "VaccineVialId invalid!", {
				vaccineVialId: vaccineVialId,
			});
		}

		let totalVaccinations = 0;
		let todaysVaccinations = 0;
		let vialsUtilized = 0;
		let now = new Date();
		now.setHours(0, 0, 0, 0);

		const vaccinationDetails = [];
		for (let i = 0; i < warehouses.length; ++i) {
			const vaccineVials = warehouses[i].vaccinations;
			for (let j = 0; j < vaccineVials.length; ++j) {
				let createdAt = new Date(vaccineVials[j].createdAt);
				createdAt.setHours(0, 0, 0, 0);

				const doses = vaccineVials[j].doses;

				if (doses.length) {
					vialsUtilized++;
					totalVaccinations += doses.length;

					if (now.toDateString() === createdAt.toDateString()) {
						todaysVaccinations += doses.length;
					}
				}
				for (let k = 0; k < doses.length; ++k) {
					const data = {
						batchNumber: vaccineVials[j].batchNumber,
						organisationName: vaccineVials[j]?.product?.manufacturer,
						location: warehouses[i].warehouseAddress.city,
						gender: doses[k].gender,
						age: doses[k].age,
					};
					vaccinationDetails.push(data);
				}
			}
		}

		const result = {
			analytics: {
				todaysVaccinations: todaysVaccinations,
				totalVaccinations: totalVaccinations,
				unitsUtilized: vialsUtilized,
			},
			vaccinationDetails: vaccinationDetails,
		};

		return result;
	} catch (err) {
		throw err;
	}
};

exports.getAllVaccinationDetails = [
	auth,
	async (req, res) => {
		try {
			const { gender, city, organisation, minAge, maxAge } = req.body;
			const user = req.user;

			const filters = {
				user: user,
				gender: gender,
				city: city,
				organisation: organisation,
				minAge: minAge,
				maxAge: maxAge,
			};

			const result = await generateVaccinationsList(filters);

			return apiResponse.successResponseWithData(res, "Fetched doses successfully!", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getAnalytics = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;
			let query = {};
			if (userDetails.role === "powerUser") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const analytics = await VaccineVialModel.find(query);

			let totalVaccinations = 0;
			let todaysVaccinations = 0;
			let now = new Date();
			now.setHours(0, 0, 0, 0);

			for (let i = 0; i < analytics.length; ++i) {
				let createdAt = new Date(analytics[i].createdAt);
				createdAt.setHours(0, 0, 0, 0);

				totalVaccinations += analytics[i].numberOfDoses;

				if (now.toDateString() === createdAt.toDateString()) {
					todaysVaccinations += analytics[i].numberOfDoses;
				}
			}

			let result = {
				unitsUtilized: analytics.length,
				totalVaccinations: totalVaccinations,
				todaysVaccinations: todaysVaccinations,
			};

			return apiResponse.successResponseWithData(res, "Analytics fetched successfully!", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVialsUtilised = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;
			let query = {};
			if (userDetails.role === "powerUser") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const vialsUtilized = await VaccineVialModel.find(query);

			return apiResponse.successResponseWithData(res, "Vaccine Vial Details", vialsUtilized);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVaccinationsList = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;
			let query = {};
			if (userDetails.role === "powerUser") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const vialsUtilized = await VaccineVialModel.find(query);

			const vaccinationsList = [];
			const todaysVaccinationsList = [];

			let now = new Date();
			now.setHours(0, 0, 0, 0);

			for (let i = 0; i < vialsUtilized.length; ++i) {
				let createdAt = new Date(vialsUtilized[i].createdAt);
				createdAt.setHours(0, 0, 0, 0);

				let currDoses = await DoseModel.aggregate([
					{ $match: { vaccineVialId: vialsUtilized[i].id } },
					{ $addFields: { batchNumber: vialsUtilized[i].batchNumber } },
				]);

				vaccinationsList.push(...currDoses);
				if (now.toDateString() === createdAt.toDateString()) {
					todaysVaccinationsList.push(...currDoses);
				}
			}

			const result = {
				vaccinationsList: vaccinationsList,
				todaysVaccinationsList: todaysVaccinationsList,
			};

			return apiResponse.successResponseWithData(res, "Vaccine Vial Details", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

/**
 * Returns list of pharmacies in case of governing body &
 * Returns list of cities the pharmacies are located in
 */
exports.getCitiesAndOrgsForFilters = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;
			let query = {};

			if (userDetails.role === "powerUser") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const vaccinationCenters = await VaccineVialModel.aggregate([
				{ $match: query },
				{ $group: { _id: "$warehouseId" } },
			]);

			warehouseIds = vaccinationCenters.map((warehouse) => warehouse._id);

			const warehouses = await WarehouseModel.aggregate([
				{ $match: { id: { $in: warehouseIds } } },
				{ $group: { _id: "$warehouseAddress.city", orgs: { $addToSet: "$organisationId" } } },
			]);

			const cities = warehouses.map((warehouse) => warehouse._id);

			let orgs;
			if (organisation.type === "GoverningBody") {
				let orgIds = warehouses.map((warehouse) => warehouse.orgs);
				orgIds = orgIds.flat();

				orgs = await OrganisationModel.find({ id: { $in: orgIds } });
				orgs = orgs.map((org) => org.name);
			}

			const result = {
				cities: cities,
				organisations: orgs,
			};

			return apiResponse.successResponseWithData(res, "Cities and orgs for filters", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

function buildExcelReport(req, res, dataForExcel) {
	const styles = {
		headerDark: {
			fill: {
				fgColor: {
					rgb: "FF000000",
				},
			},
			font: {
				color: {
					rgb: "FFFFFFFF",
				},
				sz: 14,
				bold: true,
				underline: true,
			},
		},
		cellGreen: {
			fill: {
				fgColor: {
					rgb: "FF00FF00",
				},
			},
		},
	};

	const specification = {
		batchNumber: {
			displayName: "Batch Number",
			headerStyle: styles.headerDark,
			cellStyle: styles.cellGreen,
			width: 120,
		},
		organisationName: {
			displayName: "Organisation Name",
			headerStyle: styles.headerDark,
			cellStyle: styles.cellGreen,
			width: 220,
		},
		location: {
			displayName: "Location",
			headerStyle: styles.headerDark,
			cellStyle: styles.cellGreen,
			width: 220,
		},
		gender: {
			displayName: "Gender",
			headerStyle: styles.headerDark,
			cellStyle: styles.cellGreen,
			width: 120,
		},
		age: {
			displayName: "Age",
			headerStyle: styles.headerDark,
			cellStyle: styles.cellGreen,
			width: 60,
		},
	};

	const report = excel.buildExport([
		{
			name: "Report Shipment",
			specification: specification,
			data: dataForExcel,
		},
	]);

	res.attachment("report.xlsx");
	return res.send(report);
}

function buildPdfReport(req, res, data, orderType) {
	var rows = [];
	rows.push([
		{ text: "Batch Number", bold: true },
		{ text: "Organisation Name", bold: true },
		{ text: "Location", bold: true },
		{ text: "Gender", bold: true },
		{ text: "Age", bold: true },
	]);
	for (var i = 0; i < data.length; i++) {
		rows.push([
			data[i].batchNumber || "N/A",
			data[i].organisationName || "N/A",
			data[i].location || "N/A",
			data[i].gender || "N/A",
			data[i].age || "N/A",
		]);
	}

	var docDefinition = {
		pageSize: "A4",
		pageOrientation: "portrait",
		pageMargins: [30, 30, 2, 2],
		content: [
			{ text: "Vaccinations List", fontSize: 34, style: "header" },
			{
				table: {
					margin: [1, 1, 1, 1],
					headerRows: 1,
					headerStyle: "header",
					widths: [100, 200, 100, 60, 30],
					body: rows,
				},
			},
		],
		styles: {
			header: {
				bold: true,
				margin: [10, 10, 10, 10],
			},
		},
	};

	var options = { fontLayoutCache: true };
	var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
	var temp123;
	var pdfFile = pdfDoc.pipe((temp123 = fs.createWriteStream("./report.pdf")));
	var path = pdfFile.path;
	pdfDoc.end();
	temp123.on("finish", async function () {
		// do send PDF file
		return res.sendFile(resolve(path));
	});
	return;
}

exports.exportVaccinationList = [
	auth,
	async (req, res) => {
		try {
			const { gender, city, organisation, minAge, maxAge, reportType } = req.body;
			const user = req.user;

			const filters = {
				user: user,
				gender: gender,
				city: city,
				organisation: organisation,
				minAge: minAge,
				maxAge: maxAge,
			};

			const result = await generateVaccinationsList(filters);

			if (reportType === "excel") res = buildExcelReport(req, res, result.vaccinationDetails);
			else res = buildPdfReport(req, res, result.vaccinationDetails);

			// return apiResponse.successResponseWithMultipleData(
			// 	res,
			// 	"Outbound Shipment Records"
			// );
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

/**
 * db.getCollection('employees').aggregate([
        {$match: {emailId: "siddhant4@gmail.in"}},
        {$lookup: {
          from: "warehouses",
          localField: "warehouseId",
          foreignField: "id",
          as: "warehouses"
        }},
        {$lookup: {
            from: "atoms",
            let: {warehouseInventory: "$warehouses.warehouseInventory"},
            pipeline: [
                {$match: 
                    {$expr: 
                        {$and: 
                            [
                                {$in: ["$currentInventory", "$$warehouseInventory"]},
                                {$eq: ["$status", "HEALTHY"]}
                            ]
                        }
                    }
                }
            ],
            as: "atoms"
        }}
      ])
 */
