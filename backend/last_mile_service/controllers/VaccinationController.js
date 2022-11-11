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
				const warehouse = await WarehouseModel.findOne({ id: warehouseId });
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
				gender: gender,
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
			const { productId, batchNumber, doses } = req.body;

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
				numberOfDoses: 0,
			});
			await vaccineVial.save();

			// Reduce inventory in InventoryModel and AtomModel
			const warehouse = await WarehouseModel.findOne({ id: warehouseId });
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
					gender: doses[i].gender,
				});
				await dose.save();

				// Increment number of doses in VaccineVial model
				await VaccineVialModel.findOneAndUpdate(
					{ id: vaccineVialId },
					{ $inc: { numberOfDoses: 1 } },
				);
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

const buildWarehouseQuery = async (user, city) => {
	try {
		const userDetails = await EmployeeModel.findOne({ id: user.id });

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

		if (userDetails && userDetails.role !== "GoverningBody") {
			queryExprs.push({ id: { $in: warehouseIds } });
		}
		if (city) {
			queryExprs.push({ $eq: ["warehouseAddress.city", city] });
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
			queryExprs.push({ $gte: ["$age", minAge] });
		}
		if (maxAge) {
			queryExprs.push({ $lte: ["$age", maxAge] });
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

exports.getAllVaccinationDetails = [
	auth,
	async (req, res) => {
		try {
			const { gender, city, manufacturerName, minAge, maxAge } = req.body;
			const user = req.user;

			const warehouseQuery = await buildWarehouseQuery(user, city);
			const doseQuery = await buildDoseQuery(gender, minAge, maxAge);
			let manufacturerQuery = {};
			if (manufacturerName) {
				manufacturerQuery = { $expr: { $eq: [("product.manufacturer", manufacturerName)] } };
			}

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
							{ $match: manufacturerQuery },
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

			const vaccinationDetails = [];
			for (let i = 0; i < warehouses.length; ++i) {
				const vaccineVials = warehouses[i].vaccinations;
				for (let j = 0; j < vaccineVials.length; ++j) {
					const doses = vaccineVials[j].doses;
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
			if (userDetails.role !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const analytics = await VaccineVialModel.find(query);

			let totalVaccinations = 0;
			let todaysVaccinations = 0;
			let now = new Date();
			let today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

			for (let i = 0; i < analytics.length; ++i) {
				let createdAt = new Date(analytics[i].createdAt);
				let filterDate = new Date(
					Date.UTC(createdAt.getUTCFullYear(), createdAt.getUTCMonth(), createdAt.getUTCDate()),
				);

				totalVaccinations += analytics[i].numberOfDoses;

				if (today === filterDate) {
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
