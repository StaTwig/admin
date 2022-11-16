const EmployeeModel = require("../models/EmployeeModel");
const CounterModel = require("../models/CounterModel");
const auth = require("../middlewares/jwt");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const RequestApproved = require("../components/RequestApproved");
const RejectedApproval = require("../components/RejectedApproval");
const AddUserEmail = require("../components/AddUser");
const apiResponse = require("../helpers/apiResponse");
const fs = require("fs");
const moveFile = require("move-file");
const XLSX = require("xlsx");

const axios = require("axios");
const { getLatLongByCity } = require("../helpers/getLatLong");
const InventoryModel = require("../models/InventoryModel");
const WarehouseModel = require("../models/WarehouseModel");
require("dotenv").config();
const blockchain_service_url = process.env.URL;
const excludeExpireuseruct = (data) => {
	return data.filter((useruct) => {
		if (Date.parse(useruct?.expiryDate) > Date.parse(new Date())) return true;
		return false;
	});
};
exports.getApprovals = [
	auth,
	async (req, res) => {
		try {
			const { organisationId } = req.user;
			const employees = await EmployeeModel.aggregate([
				{
					$match: {
						$and: [{ accountStatus: "NOTAPPROVED" }, { organisationId: organisationId }],
					},
				},
				{
					$lookup: {
						from: "organisations",
						localField: "organisationId",
						foreignField: "id",
						as: "orgDetails",
					},
				},
				{
					$unwind: {
						path: "$orgDetails",
					},
				},
			]);
			return apiResponse.successResponseWithData(
				res,
				"List of Users Not verified / get Approval List",
				employees,
			);
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.acceptApproval = [
	auth,
	async (req, res) => {
		const errorList = new Array();
		try {
			const { organisationName } = req.user;
			const { id, role, warehouseId, phoneNumber } = req.query;
			const employee = await EmployeeModel.findOne({
				$and: [{ accountStatus: "NOTAPPROVED" }, { id: id }],
			});
			if (employee) {
				// const response = await axios.get(`${blockchain_service_url}/createUserAddress`)
				// const walletAddress = response.data.items;
				// const userData = {
				//   walletAddress,
				// };
				// await axios.post(`${blockchain_service_url}/grantPermission`, userData)
				const emp = await EmployeeModel.findOneAndUpdate(
					{ id: id },
					{
						$set: {
							accountStatus: "ACTIVE",
							isConfirmed: true,
							// walletAddress,
							role,
							phoneNumber,
						},
						$push: { warehouseId },
					},
					{ new: true },
				);
				const emailBody = RequestApproved({
					name: emp.firstName,
					organisation: organisationName,
				});
				// Send confirmation email
				await mailer.send(
					constants.appovalEmail.from,
					emp.emailId,
					constants.appovalEmail.subject,
					emailBody,
				);
				return apiResponse.successResponseWithData(res, `User Verified`, emp);
			} else {
				return apiResponse.notFoundResponse(res, "User Not Found");
			}
		} catch (err) {
			console.log(err);
			errorList.push(err);
			return apiResponse.ErrorResponse(res, errorList);
		}
	},
];

exports.rejectApproval = [
	auth,
	async (req, res) => {
		try {
			const { organisationId, organisationName } = req.user;
			const { id } = req.query;
			await EmployeeModel.findOne({
				$and: [{ accountStatus: "NOTAPPROVED" }, { organisationId: organisationId }, { id: id }],
			})
				.then((employees) => {
					if (employees) {
						EmployeeModel.findOneAndUpdate(
							{ id },
							{ $set: { accountStatus: "REJECTED" } },
							{ new: true },
						)
							.exec()
							.then((emp) => {
								console.log("REJECTED");
								let emailBody = RejectedApproval({
									name: emp.firstName,
									organisation: organisationName,
								});
								try {
									mailer.send(
										constants.rejectEmail.from,
										emp.emailId,
										constants.rejectEmail.subject,
										emailBody,
									);
								} catch (err) {
									console.log(err);
								}
								try {
									EmployeeModel.findOneAndDelete({ id }).then(() => console.log("deleted"));
								} catch (err) {
									console.log(err);
									return apiResponse.ErrorResponse(res, err);
								}
								return apiResponse.successResponseWithData(res, "User Rejected", emp);
							})
							.catch((err) => {
								return apiResponse.ErrorResponse(res, err);
							});
					} else {
						return apiResponse.notFoundResponse(res, "User not Found");
					}
				})
				.catch((err) => {
					return apiResponse.ErrorResponse(res, err);
				});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.addUser = [
	auth,
	async (req, res) => {
		try {
			const { organisationId, organisationName } = req.user;
			const warehouseExists = req.body.warehouseExists;
			const firstName = req.body.firstName;
			const lastName = req.body.lastName;
			let email = !req.body.emailId || req.body.emailId == "null" ? null : req.body.emailId;
			let phoneNumber = req.body.phoneNumber ? "+" + req.body.phoneNumber : null;

			const incrementCounterEmployee = await CounterModel.updateOne(
				{
					"counters.name": "employeeId",
				},
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
			);

			const employeeCounter = await CounterModel.findOne(
				{ "counters.name": "employeeId" },
				{ "counters.$": 1 },
			);
			var employeeId = employeeCounter.counters[0].format + employeeCounter.counters[0].value;

			let warehouseId;
			let role;

			if (warehouseExists === "new") {
				const { warehouseTitle, address } = req.body;
				role = "admin";

				const warehouseCounter = await CounterModel.findOneAndUpdate(
					{ "counters.name": "warehouseId" },
					{
						$inc: {
							"counters.$.value": 1,
						},
					},
					{ new: true },
				);
				warehouseId = warehouseCounter.counters[3].format + warehouseCounter.counters[3].value;

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
					title: warehouseTitle,
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
						regionName: address.region,
					},
					country: {
						countryId: "001",
						countryName: address.country,
					},
					status: "ACTIVE",
				});
				await warehouse.save();
			} else {
				(role = req.body.role), (warehouseId = req.body.warehouseId);
			}

			if (email) email = email.toLowerCase().replace(" ", "");
			if (phoneNumber) {
				phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
			}

			const user = new EmployeeModel({
				firstName: firstName,
				lastName: lastName,
				emailId: email,
				phoneNumber: phoneNumber,
				organisationId: organisationId,
				role: role,
				accountStatus: "ACTIVE",
				warehouseId: [warehouseId],
				isConfirmed: true,
				id: employeeId,
			});
			await user.save();
			let emailBody = AddUserEmail({
				name: firstName,
				organisation: organisationName,
			});
			mailer
				.send(constants.addUser.from, req.body.emailId, constants.addUser.subject, emailBody)
				.catch((err) => {
					console.log("Error in mailing user!");
				});
			return apiResponse.successResponse(res, "User Added");
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.updateUserRole = [
	auth,
	async (req, res) => {
		try {
			const { userId, role } = req.query;
			const result = await EmployeeModel.findOneAndUpdate(
				{ id: userId },
				{ $set: { role: role } },
				{ new: true },
			);

			if (result) {
				return apiResponse.successResponse(res, "User role updated successfully!");
			} else {
				throw new Error("Error in updating user role!");
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.activateUser = [
	auth,
	(req, res) => {
		try {
			const { organisationName } = req.user;
			const { id, role } = req.query;
			EmployeeModel.findOne({ id: id })
				.then((employee) => {
					if (employee) {
						if (employee.isConfirmed && employee.accountStatus == "ACTIVE") {
							return apiResponse.successResponseWithData(res, " User is already Active", employee);
						} else {
							EmployeeModel.findOneAndUpdate(
								{ id: id },
								{
									$set: {
										accountStatus: "ACTIVE",
										isConfirmed: true,
										// walletAddress,
										role,
									},
								},
								{ new: true },
							)
								.exec()
								.then((emp) => {
									let emailBody = RequestApproved({
										name: emp.firstName,
										organisation: organisationName,
									});
									// Send confirmation email
									try {
										mailer.send(
											constants.appovalEmail.from,
											emp.emailId,
											constants.appovalEmail.subject,
											emailBody,
										);
									} catch (mailError) {
										console.log(mailError);
									}
									return apiResponse.successResponseWithData(res, `User Activated`, emp);
								});
						}
					} else {
						return apiResponse.notFoundResponse(res, "User Not Found");
					}
				})
				.catch((err) => {
					return apiResponse.ErrorResponse(res, err);
				});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.deactivateUser = [
	auth,
	(req, res) => {
		try {
			const { organisationName } = req.user;
			const { id } = req.query;
			EmployeeModel.findOneAndUpdate({ id }, { $set: { accountStatus: "REJECTED" } }, { new: true })
				.exec()
				.then((emp) => {
					console.log("REJECTED");
					let emailBody = RejectedApproval({
						name: emp.firstName,
						organisationName,
					});
					try {
						mailer.send(
							constants.rejectEmail.from,
							emp.emailId,
							constants.rejectEmail.subject,
							emailBody,
						);
					} catch (err) {
						console.log(err);
					}
					return apiResponse.successResponseWithData(res, "User Rejected", emp);
				})
				.catch((err) => {
					return apiResponse.ErrorResponse(res, err);
				});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.addUsersFromExcel = [
	auth,
	async (req, res) => {
		try {
			try {
				const { organisationId, organisationName } = req.user;
				const dir = `uploads`;
				if (!fs.existsSync(dir)) fs.mkdirSync(dir);
				await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
				const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
				const sheet_name_list = workbook.SheetNames;
				let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
					dateNF: "dd/mm/yyyy;@",
					cellDates: true,
					raw: false,
				});

				console.log(data.entries());

				const formatedData = new Array();
				for (const [index, user] of data.entries()) {
					const firstName = user?.["FIRST NAME"] || user?.["NOMBRE"];
					const phoneNumber = user?.["PHONE"] || user?.["TEL CELULAR"];
					const lastName = user?.["LAST NAME"] || user?.["APELLIDO"];
					const emailId = user?.["EMAIL"] || user?.["EMAIL"];
					const role = user?.["ROLE"] || user?.["UNIDAD DE MEDIDA"];
					const accountStatus = "ACTIVE";
					const warehouseId = user?.["WAREHOUSE"] || user?.["FECHA DE VENCIMIENTO"];
					const { organisationId } = req.user;
					formatedData[index] = {
						firstName: firstName,
						lastName: lastName,
						emailId: emailId,
						phoneNumber: phoneNumber,
						organisationId: organisationId,
						role: role,
						accountStatus: accountStatus,
						warehouseId: warehouseId,
						isConfirmed: true,
						// id: id,
					};
				}

				for (const user of formatedData) {
					const incrementCounterEmployee = await CounterModel.updateOne(
						{
							"counters.name": "employeeId",
						},
						{
							$inc: {
								"counters.$.value": 1,
							},
						},
					);

					const employeeCounter = await CounterModel.findOne(
						{ "counters.name": "employeeId" },
						{ "counters.$": 1 },
					);
					var employeeId = employeeCounter.counters[0].format + employeeCounter.counters[0].value;
					console.log(user);
					const User = new EmployeeModel({ ...user, id: employeeId });
					await User.save();
					let emailBody = AddUserEmail({
						name: user.firstName,
						organisation: organisationName,
					});
					mailer
						.send(constants.addUser.from, user.emailId, constants.addUser.subject, emailBody)
						.catch((err) => {
							console.log("Error in mailing user!", err);
						});
				}
				return apiResponse.successResponseWithData(res, "success", formatedData);
			} catch (err) {
				console.log(err);
				return apiResponse.ErrorResponse(res, err);
			}
		} catch (err) {
			console.log(err);
		}
	},
];
