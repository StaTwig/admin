require("dotenv").config();
const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel");
const logEvent = require("../../../utils/event_logger");
const InventoryModel = require("../models/InventoryModel");
const OrganisationModel = require("../models/OrganisationModel");
const ConfigurationModel = require("../models/ConfigurationModel");
const CounterModel = require("../models/CounterModel");
const RbacModel = require("../models/RbacModel");
const { body, validationResult } = require("express-validator");
const { getLatLongByCity } = require("../helpers/getLatLong");
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const auth = require("../middlewares/jwt");
const axios = require("axios");
const cuid = require("cuid");
const { OAuth2Client } = require("google-auth-library");
const hf_blockchain_url = process.env.HF_BLOCKCHAIN_URL;
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]\d{11,12}$/;
const blockchain_service_url = process.env.URL;
const { uploadFile, getFileStream, getSignedUrl } = require("../helpers/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const utils = require("ethereumjs-util");
const moveFile = require("move-file");
const XLSX = require("xlsx");
const { constants } = require("../helpers/constants");
const RequestApproved = require("../components/RequestApproved");
const RejectedApproval = require("../components/RejectedApproval");
const AddUserEmail = require("../components/AddUser");
const moment = require("moment");

// const phoneRgex = /^\d{10}$/;

async function createWarehouse(warehouseExists, wareId, payload, employeeId) {
  if (warehouseExists) {
    await EmployeeModel.findOneAndUpdate(
      { id: wareId },
      { $push: { warehouseId: wareId } }
    );
  }

  const invCounter = await CounterModel.findOneAndUpdate(
    { "counters.name": "inventoryId" },
    {
      $inc: {
        "counters.$.value": 1,
      },
    },
    { new: true }
  );
  const inventoryId =
    invCounter.counters[7].format + invCounter.counters[7].value;
  const inventoryResult = new InventoryModel({ id: inventoryId });
  await inventoryResult.save();
  const {
    organisationId,
    postalAddress,
    title,
    region,
    country,
    warehouseAddress,
    supervisors,
    employees,
  } = payload;
  const warehouseCounter = await CounterModel.findOneAndUpdate(
    { "counters.name": "warehouseId" },
    {
      $inc: {
        "counters.$.value": 1,
      },
    },
    {
      new: true,
    }
  );
  const warehouseId =
    warehouseCounter.counters[3].format + warehouseCounter.counters[3].value;

  const loc = await getLatLongByCity(
    warehouseAddress.city + "," + warehouseAddress.country
  );
  const warehouse = new WarehouseModel({
    id: warehouseId,
    organisationId,
    postalAddress,
    title,
    region: {
      regionName: region,
    },
    country: {
      countryId: "001",
      countryName: country,
    },
    location: loc,
    bottleCapacity: 0,
    sqft: 0,
    supervisors,
    employees,
    warehouseAddress,
    warehouseInventory: inventoryResult.id,
    status: "NOTVERIFIED",
  });
  await warehouse.save();

  const addr = `${warehouseAddress?.firstLine}, ${warehouseAddress?.city}, ${warehouseAddress?.state}, ${warehouseAddress?.zipCode}`;
  const skipOrgRegistration = false;
  await OrganisationModel.findOneAndUpdate(
    {
      id: organisationId,
    },
    {
      $set: {
        ...(skipOrgRegistration
          ? {
              postalAddress: addr,
              country: warehouseAddress.country,
              region: warehouseAddress.region,
              status: "NOTVERIFIED",
            }
          : {}),
      },
      $push: {
        warehouses: warehouseId,
      },
    }
  );

  await EmployeeModel.findOneAndUpdate(
    {
      id: employeeId,
    },
    {
      $push: {
        warehouseId: warehouseId,
      },
    }
  );
}
function getUserCondition(query, orgId) {
  let matchCondition = {};
  matchCondition.organisationId = orgId;
  matchCondition.accountStatus = { $ne: "NOTAPPROVED" };
  if (query.role && query.role != "") {
    matchCondition.role = query.role;
  }
  if (query.status && query.status != "") {
    matchCondition.accountStatus = query.status;
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

async function createOrg({
  req,
  firstName,
  lastName,
  emailId,
  phoneNumber,
  organisationName,
  type,
  address,
}) {
  let organisationExists = await OrganisationModel.findOne({
    name: new RegExp("^" + organisationName + "$", "i"),
  });

  if (organisationExists) {
    return "Organisation name exists!";
  }

  const country = address?.country ? address?.country : "Costa Rica";
  const region = address?.region ? address?.region : "Americas";
  const addr =
    address?.line1 +
    ", " +
    address?.city +
    ", " +
    address?.state +
    ", " +
    address?.pincode;
  const empCounter = await CounterModel.findOneAndUpdate(
    {
      "counters.name": "employeeId",
    },
    {
      $inc: {
        "counters.$.value": 1,
      },
    },
    { new: true }
  );
  const employeeId =
    empCounter.counters[4].format + empCounter.counters[4].value;

  const warehouseCounter = await CounterModel.findOneAndUpdate(
    { "counters.name": "warehouseId" },
    {
      $inc: {
        "counters.$.value": 1,
      },
    },
    { new: true }
  );
  const warehouseId =
    warehouseCounter.counters[3].format + warehouseCounter.counters[3].value;

  const orgCounter = await CounterModel.findOneAndUpdate(
    { "counters.name": "orgId" },
    {
      $inc: {
        "counters.$.value": 1,
      },
    },
    { new: true }
  );
  const organisationId =
    orgCounter.counters[2].format + orgCounter.counters[2].value;

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
	parentOrgId: req.user.organisationId 
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
    }
  );
  const inventoryId =
    invCounter.counters[7].format + invCounter.counters[7].value;
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
    role: "admin",
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
async function verifyAuth(nonce, signature) {
	try {
		nonce = "\x19Ethereum Signed Message:\n" + nonce.length + nonce;
		nonce = utils.keccak(Buffer.from(nonce, "utf-8"));
		// console.log('nonce is '+ nonce)
		const { v, r, s } = utils.fromRpcSig(signature);
		const pubKey = utils.ecrecover(utils.toBuffer(nonce), v, r, s);
		const addrBuf = utils.pubToAddress(pubKey);
		const signingAddress = utils.bufferToHex(addrBuf);
		return signingAddress;
	} catch (err) {
		console.log(err);
		return null;
	}
}

const googleClient = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
});

/**
 * Uniques email check
 *
 * @param {string}     email
 *
 * @returns {Object}
 */
exports.checkEmail = [
	body("firstName").isLength({ min: 1 }).trim().withMessage("firstname_validation_error"),
	body("lastName").isLength({ min: 1 }).trim().withMessage("lastname_validation_error"),
	body("organisationId").isLength({ min: 1 }).trim().withMessage("organization_validation_error"),
	body("emailId")
		.isLength({ min: 1 })
		.trim()
		.withMessage("email_validation_error")
		.custom(async (value) => {
			const emailId = value.toLowerCase().replace(" ", "");
			let user;
			let phone = "";
			if (emailId.indexOf("@") > -1) {
				if (!emailId.match(emailRegex)) return Promise.reject("not_valid_email");
				user = await EmployeeModel.findOne({ emailId: emailId, accountStatus: { $ne: "DELETED" } });
			} else {
				if (!emailId.match(phoneRegex)) return Promise.reject("not_valid_phone");
				phone = "+" + emailId;
				user = await EmployeeModel.findOne({
					phoneNumber: phone,
					accountStatus: { $ne: "DELETED" },
				});
			}
			if (user) {
				return Promise.reject("account_already_exists");
			}
		}),
	async (req, res) => {
		try {
			if (!req.body.firstName.match("[A-Za-z0-9]") || !req.body.lastName.match("[A-Za-z0-9]")) {
				return apiResponse.ErrorResponse(req, res, "not_valid_name");
			}
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(req, res, "validation_error", errors.array());
			}
			if (!mailer.validateEmail(req.body.emailId)) {
				return apiResponse.ErrorResponse(req, res, "not_valid_email");
			} else {
				return apiResponse.successResponse(req, res, "valid_email_success");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

/**
 * User registration.
 *
 * @param {string}      Name
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.register = [
	body("firstName").isLength({ min: 1 }).trim().withMessage("firstname_validation_error"),
	body("lastName").isLength({ min: 1 }).trim().withMessage("lastname_validation_error"),
	body("organisationId").isLength({ min: 1 }).trim().withMessage("organization_validation_error"),
	body("emailId")
		.trim()
		.toLowerCase()
		.custom(async (value) => {
			if (value) {
				const emailId = value.toLowerCase().replace("", "");
				let user;
				if (!emailId.match(emailRegex)) return Promise.reject("not_valid_email");
				if (emailId.indexOf("@") > -1)
					user = await EmployeeModel.findOne({
						emailId: emailId,
						accountStatus: { $ne: "DELETED" },
					});
				if (user) {
					return Promise.reject("account_already_exists");
				}
			}
		}),
	// body("phoneNumber").custom(async (value) => {
	//   if (value) {
	// const emailId = value.toLowerCase().replace("", "");
	// let phone = "";
	// let user;
	// if (!emailId.match(phoneRegex)) return Promise.reject("not_valid_phone");
	// phone = "+" + value;
	// user = await EmployeeModel.findOne({ phoneNumber: phone });
	// if (user) {
	//   return Promise.reject("account_already_exists");
	// }
	//   }
	// }),
	async (req, res) => {
		try {
			if (req.body.emailId == "" && req.body.phoneNumber == "") {
				return apiResponse.ErrorResponse(req, res, "Enter either emailId or phoneNumber");
			} else if (req.body.emailId != "") {
				let emailId = req.body.emailId;
				emailId = emailId.trim();
				emailId = emailId.toLowerCase();
				emailId = emailId.replace("", "");
				let user;
				if (!emailId.match(emailRegex))
					return apiResponse.ErrorResponse(req, res, "not_valid_email");
				if (emailId.indexOf("@") > -1)
					user = await EmployeeModel.findOne({
						emailId: emailId,
						accountStatus: { $ne: "DELETED" },
					});
				if (user) {
					return apiResponse.ErrorResponse(req, res, "account_already_exists");
				}
			} else if (req.body.phoneNumber != "") {
				let phoneNumber = req.body.phoneNumber;
				phoneNumber = phoneNumber.toLowerCase().replace("", "");
				phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
				let user;
				// if (!phoneNumber.match(phoneRegex))
				//   return apiResponse.ErrorResponse(req, res, "not_valid_phone");
				// phone = "+" + phoneNumber;
				user = await EmployeeModel.findOne({
					phoneNumber: phoneNumber,
					accountStatus: { $ne: "DELETED" },
				});
				if (user) {
					return apiResponse.ErrorResponse(req, res, "account_already_exists");
				}
			}
			if (!req.body.firstName.match("[A-Za-z0-9]") || !req.body.lastName.match("[A-Za-z0-9]")) {
				return apiResponse.ErrorResponse(req, res, "name_validation_error");
			}
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(req, res, "validation_error", errors.array());
			}
			// if (!mailer.validateEmail(req.body.emailId)) {
			//   return apiResponse.ErrorResponse(req, res, "not_valid_email");
			// } else {
			let organisationId = req.body.organisationId;
			const skipOrgRegistration = req.body?.skipOrgRegistration
				? req.body?.skipOrgRegistration
				: false;
			let warehouseId = "NA";
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
			const employeeStatus = "NOTAPPROVED";
			let addr = "";
			let organisation;
			//create organization if doesn't exists
			if (req.body.organisationName) {
				const organisationName = req.body.organisationName;
				organisation = await OrganisationModel.findOne({
					name: new RegExp("^" + organisationName + "$", "i"),
				});
				if (organisation && organisation.isRegistered) {
					organisationId = organisation.id;
				} else {
					const country = req.body?.address?.country ? req.body.address?.country : "Costa Rica";
					const region = req.body?.address?.region ? req.body.address?.region : "Americas";
					const address = req.body?.address ? req.body.address : {};
					if (!skipOrgRegistration) {
						addr =
							address?.line1 +
							", " +
							address?.city +
							", " +
							address?.state +
							", " +
							address?.pincode;

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
					}
					let org;
					if (organisation && !organisation.isRegistered) {
						org = await OrganisationModel.findOneAndUpdate(
							{ id: organisation.id },
							{
								$set: {
									primaryContactId: employeeId,
									name: organisationName,
									status: skipOrgRegistration ? "INCOMPLETE" : "NOTVERIFIED",
									isRegistered: true,
									postalAddress: addr,
									warehouses: warehouseId == "NA" ? [] : [warehouseId],
									warehouseEmployees: [employeeId],
									region: region,
									country: country,
									configuration_id: "CONF000",
									authority: req.body?.authority,
								},
							},
						);
					} else {
						const orgCounter = await CounterModel.findOneAndUpdate(
							{ "counters.name": "orgId" },
							{
								$inc: {
									"counters.$.value": 1,
								},
							},
							{ new: true },
						);
						organisationId = orgCounter.counters[2].format + orgCounter.counters[2].value;

						org = new OrganisationModel({
							primaryContactId: employeeId,
							name: organisationName,
							id: organisationId,
							type: req.body?.type ? req.body.type : "CUSTOMER_SUPPLIER",
							status: skipOrgRegistration ? "INCOMPLETE" : "NOTVERIFIED",
							isRegistered: true,
							postalAddress: addr,
							warehouses: warehouseId == "NA" ? [] : [warehouseId],
							warehouseEmployees: [employeeId],
							region: region,
							country: country,
							configuration_id: "CONF000",
							authority: req.body?.authority,
						});
						await org.save();
					}

					if (!skipOrgRegistration) {
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
							status: "NOTVERIFIED",
						});
						await warehouse.save();
					}
				}
			}
			let emailId = null;
			if (req.body?.emailId) emailId = req.body.emailId.toLowerCase().replace(" ", "");

			let phoneNumber = null;
			if (req.body?.phoneNumber) {
				phoneNumber = req.body?.phoneNumber;
				phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
			}

			const user = new EmployeeModel({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				emailId: emailId,
				phoneNumber: phoneNumber,
				organisationId: organisationId,
				id: employeeId,
				postalAddress: addr,
				accountStatus: employeeStatus,
				warehouseId: warehouseId == "NA" ? [] : [warehouseId],
				...(skipOrgRegistration ? { role: "readOnly" } : {}),
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

			if (organisation && organisation.isRegistered && organisation.status !== "INCOMPLETE") {
				return apiResponse.successResponseWithData(req, res, "user_registered_success", null);
			}

			if (skipOrgRegistration) {
				let userData = {
					id: user.id,
					firstName: user.firstName,
					emailId: user.emailId,
					role: user.role,
					warehouseId: [],
					organisationId: user.organisationId,
					phoneNumber: user.phoneNumber,
					partialRegistration: true,
				};
				// Create a one time login JWT
				const jwtPayload = userData;
				const jwtData = {
					expiresIn: process.env.JWT_TIMEOUT_DURATION,
				};
				const secret = process.env.JWT_SECRET;
				//Generated JWT token with Payload and secret.
				// Is RBAC needed for one time login?
				userData.permissions = await RbacModel.findOne({ orgId: "ORG100001", role: user.role });
				userData.token = jwt.sign(jwtPayload, secret, jwtData);

				return apiResponse.successResponseWithData(req, res, "user_registered_success", userData);
			}

			return apiResponse.successResponseWithData(req, res, "user_registered_success", null);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.sendOtp = [
	body("emailId").isLength({ min: 10 }).trim().withMessage("email_phone_validation_error"),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(req, res, "validation_error", errors.array());
			} else {
				const emailId = req.body.emailId.toLowerCase();
				let user;
				let phone = "";
				if (emailId.indexOf("@") > -1)
					user = await EmployeeModel.findOne({
						emailId: emailId,
						accountStatus: { $ne: "DELETED" },
					});
				else {
					phone = emailId.startsWith("+") ? emailId : `+${emailId}`;
					user = await EmployeeModel.findOne({
						phoneNumber: phone,
						accountStatus: { $ne: "DELETED" },
					});
				}
				if (user) {
					if (user.accountStatus === "ACTIVE") {
						let otp = 0;
						if (process.env.ENVIRONMENT === "TEST") {
							otp = process.env.OTP_APPSTORE;
							await EmployeeModel.updateOne({ id: user.id }, { otp });
							if (user.emailId?.indexOf("@") > -1) {
								await axios.post(process.env.OTP_ENDPOINT, {
									email: user.emailId,
									OTP: otp.toString(),
									source: process.env.SOURCE,
								});
							}
						} else {
							if (process.env.EMAIL_APPSTORE.includes(user.emailId) && user.emailId != "") {
								otp = process.env.OTP_APPSTORE;
							} else {
								otp = utility.randomNumber(4);
							}
							await EmployeeModel.updateOne({ id: user.id }, { otp });
							await axios.post(process.env.OTP_ENDPOINT, {
								email: user.emailId,
								mobile: user.phoneNumber ? user.phoneNumber : "",
								OTP: otp.toString(),
								source: process.env.SOURCE,
							});
						}
						return apiResponse.successResponse(req, res, "otp_sent_success");
					} else {
						return apiResponse.unauthorizedResponse(req, res, "account_not_approved");
					}
				} else {
					return apiResponse.notFoundResponse(req, res, "account_not_found");
				}
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

/**
 * Verify Confirm otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */
exports.verifyOtp = [
	body("emailId")
		.isLength({ min: 1 })
		.trim()
		.toLowerCase()
		.withMessage("email_phone_validation_error"),
	body("otp").isLength({ min: 4 }).trim().withMessage("otp_validation_error"),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(req, res, "validation_error", errors.array());
			} else {
				let query = { accountStatus: { $ne: "DELETED" } };
				if (req.body.emailId.indexOf("@") === -1) {
					let phone = req.body.emailId.startsWith("+") ? req.body.emailId : "+" + req.body.emailId;
					query.phoneNumber = phone;
				} else {
					query.emailId = req.body.emailId;
				}
				const user = await EmployeeModel.findOne(query);
				if (user) {
					if (user.otp == req.body.otp) {
						const activeWarehouse = await WarehouseModel.find({
							$and: [
								{ id: { $in: user.warehouseId } },
								{
									$or: [
										{ status: "ACTIVE" },
										{ status: "PENDING" },
										{ status: { $exists: false } },
									],
								},
							],
						});

						const org = await OrganisationModel.findOne({ id: user.organisationId });

						let userData;
						if (activeWarehouse.length > 0) {
							let activeWarehouseId = 0;
							const activeWRs = activeWarehouse.filter((w) => w.status == "ACTIVE");
							if (activeWRs.length > 0) activeWarehouseId = activeWRs[0].id;
							else activeWarehouseId = activeWarehouse[0].id;
							userData = {
								id: user.id,
								firstName: user.firstName,
								emailId: user.emailId,
								role: user.role,
								warehouseId: activeWarehouseId,
								organisationId: user.organisationId,
								phoneNumber: user.phoneNumber,
								org: user.msp,
								userName: user.emailId,
								preferredLanguage: user.preferredLanguage,
								isCustom: user.isCustom,
								type: org.type
							};
						} else {
							userData = {
								id: user.id,
								firstName: user.firstName,
								emailId: user.emailId,
								role: user.role,
								warehouseId: [],
								organisationId: user.organisationId,
								phoneNumber: user.phoneNumber,
								org: user.msp,
								userName: user.emailId,
								preferredLanguage: user.preferredLanguage,
								isCustom: user.isCustom,
								type: org.type
							};
						}
						//Prepare JWT token for authentication
						const jwtPayload = userData;
						const jwtData = {
							expiresIn: process.env.JWT_TIMEOUT_DURATION,
						};
						const secret = process.env.JWT_SECRET;
						//Generated JWT token with Payload and secret.
						userData.permissions = await RbacModel.findOne({ orgId: "ORG100001", role: user.role });
						userData.token = jwt.sign(jwtPayload, secret, jwtData);

						const bc_data = {
							username: req.body.emailId,
							password: "",
							orgName: "org1MSP",
							role: "",
							email: req.body.emailId,
						};
						axios.post(`${hf_blockchain_url}/api/v1/register`, bc_data).catch((err) => {
							console.log(err);
						});
						return apiResponse.successResponseWithData(req, res, "login_success", userData);
					} else {
						return apiResponse.ErrorResponse(req, res, "otp_not_match");
					}
				} else {
					return apiResponse.ErrorResponse(req, res, "account_not_found");
				}
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.verifyAuthentication = [
	body("emailId")
		.isLength({ min: 1 })
		.trim()
		.toLowerCase()
		.withMessage("email_phone_validation_error"),
	// body("otp").isLength({ min: 4 }).trim().withMessage("otp_validation_error"),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(req, res, "validation_error", errors.array());
			} else {
				let query = { accountStatus: { $ne: "DELETED" } };
				if (req.body.emailId.indexOf("@") === -1) {
					let phone = "+" + req.body.emailId;
					query = { ...query, phoneNumber: phone };
				} else {
					query = { ...query, emailId: req.body.emailId };
				}
				const user = await EmployeeModel.findOne(query);
				if (!user) {
					return apiResponse.unauthorizedResponse(
						req,
						res,
						`User with mail id ${req.body.emailId} does not exist, please register and try again`,
					);
				}
				const signingAddress = await verifyAuth(req.body.message, req.body.signature);
				if (signingAddress.toLowerCase() !== req.body.walletId.toLowerCase()) {
					return apiResponse.unauthorizedResponse(
						req,
						res,
						"The wallet id doesn't match signature",
					);
				} else {
					const activeWarehouse = await WarehouseModel.find({
						$and: [
							{ id: { $in: user.warehouseId } },
							{
								$or: [{ status: "ACTIVE" }, { status: "PENDING" }, { status: { $exists: false } }],
							},
						],
					});
					const org = await OrganisationModel.findOne({ id: user.organisationId });
					let userData;
					if (activeWarehouse.length > 0) {
						let activeWarehouseId = 0;
						const activeWRs = activeWarehouse.filter((w) => w.status == "ACTIVE");
						if (activeWRs.length > 0) activeWarehouseId = activeWRs[0].id;
						else activeWarehouseId = activeWarehouse[0].id;
						userData = {
							id: user.id,
							firstName: user.firstName,
							emailId: user.emailId,
							role: user.role,
							warehouseId: activeWarehouseId,
							organisationId: user.organisationId,
							phoneNumber: user.phoneNumber,
							org: user.msp,
							userName: user.emailId,
							preferredLanguage: user.preferredLanguage,
							isCustom: user.isCustom,
							type : org.type
						};
					} else {
						userData = {
							id: user.id,
							firstName: user.firstName,
							emailId: user.emailId,
							role: user.role,
							warehouseId: [],
							organisationId: user.organisationId,
							phoneNumber: user.phoneNumber,
							org: user.msp,
							userName: user.emailId,
							preferredLanguage: user.preferredLanguage,
							isCustom: user.isCustom,
							type : org.type
						};
					}
					//Prepare JWT token for authentication
					const jwtPayload = userData;
					const jwtData = {
						expiresIn: process.env.JWT_TIMEOUT_DURATION,
					};
					const secret = process.env.JWT_SECRET;
					//Generated JWT token with Payload and secret.
					userData.permissions = await RbacModel.findOne({ orgId: "ORG100001", role: user.role });
					userData.token = jwt.sign(jwtPayload, secret, jwtData);

					const bc_data = {
						username: req.body.emailId,
						password: "",
						orgName: "org1MSP",
						role: "",
						email: req.body.emailId,
					};
					axios.post(`${hf_blockchain_url}/api/v1/register`, bc_data).catch((err) => { console.log(err) })
					if (user.accountStatus === "ACTIVE") {
						return apiResponse.successResponseWithData(req, res, "login_success", userData);
					} else {
						return apiResponse.ErrorResponse(req, res, "User not approved");
					}
				}
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

/**
 * Google log in
 *
 * @param {string} token
 *
 * @returns {Object}
 */
exports.googleLogIn = [
	body("tokenId").isLength({ min: 1 }).withMessage("Token required!"),
	async (req, res) => {
		try {
			console.log(req.body);
			const { tokenId } = req.body;

			const googleRes = await googleClient.verifyIdToken({
				idToken: tokenId,
				audience: process.env.GOOGLE_CLIENT_ID,
			});
			const payload = googleRes.getPayload();

			if (!payload || !payload?.email) {
				throw new Error("Failed to verify account with google!");
			}

			let user = await EmployeeModel.findOne({
				emailId: payload?.email,
				accountStatus: { $ne: "DELETED" },
			});

			// User does not exist in our db
			if (!user) {
				return apiResponse.unauthorizedResponse(req, res, "User does not exist!");
			}

			// User not ACTIVE yet
			if (user.accountStatus !== "ACTIVE") {
				return apiResponse.forbiddenResponse(
					req,
					res,
					"Account is not approved. Please contact Admin!",
				);
			}

			// Create and send a token
			const activeWarehouse = await WarehouseModel.find({
				$and: [
					{ id: { $in: user.warehouseId } },
					{
						$or: [{ status: "ACTIVE" }, { status: "PENDING" }, { status: { $exists: false } }],
					},
				],
			});

			let userData;
			if (activeWarehouse.length > 0) {
				let activeWarehouseId = 0;
				const activeWRs = activeWarehouse.filter((w) => w.status == "ACTIVE");
				if (activeWRs.length > 0) activeWarehouseId = activeWRs[0].id;
				else activeWarehouseId = activeWarehouse[0].id;
				userData = {
					id: user.id,
					firstName: user.firstName,
					emailId: user.emailId,
					role: user.role,
					warehouseId: activeWarehouseId,
					organisationId: user.organisationId,
					phoneNumber: user.phoneNumber,
					org: user.msp,
					userName: user.emailId,
					preferredLanguage: user.preferredLanguage,
					isCustom: user.isCustom,
				};
			} else {
				userData = {
					id: user.id,
					firstName: user.firstName,
					emailId: user.emailId,
					role: user.role,
					warehouseId: [],
					organisationId: user.organisationId,
					phoneNumber: user.phoneNumber,
					org: user.msp,
					userName: user.emailId,
					preferredLanguage: user.preferredLanguage,
					isCustom: user.isCustom,
				};
			}
			//Prepare JWT token for authentication
			const jwtPayload = userData;
			const jwtData = {
				expiresIn: process.env.JWT_TIMEOUT_DURATION,
			};
			const secret = process.env.JWT_SECRET;
			//Generated JWT token with Payload and secret.
			userData.permissions = await RbacModel.findOne({ orgId: "ORG100001", role: user.role });
			userData.token = jwt.sign(jwtPayload, secret, jwtData);

			const bc_data = {
				username: payload?.email,
				password: "",
				orgName: "org1MSP",
				role: "",
				email: payload?.email,
			};
			console.log(bc_data);
			await axios.post(`${hf_blockchain_url}/api/v1/register`, bc_data);
			return apiResponse.successResponseWithData(req, res, "login_success", userData);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "Error in authenticating user - " + err.message);
		}
	},
];

exports.userInfo = [
	auth,
	async (req, res) => {
		try {
			const user = await EmployeeModel.findOne({ id: req.user.id });
			if (user) {
				const {
					id,
					firstName,
					lastName,
					emailId,
					phoneNumber,
					walletAddress,
					affiliatedOrganisations,
					organisationId,
					warehouseId,
					accountStatus,
					role,
					photoId,
					postalAddress,
					createdAt,
				} = user;
				const permissions = await RbacModel.findOne({ orgId: "ORG100001", role: role });
				const org = await OrganisationModel.findOne(
					{ id: organisationId },
					"name configuration_id type",
				);
				const warehouse = await EmployeeModel.findOne(
					{ id },
					{ _id: 0, warehouseId: 1, pendingWarehouseId: 1 },
				);
				const warehouseArray = await WarehouseModel.find({
					$or: [
						{ id: { $in: warehouse.warehouseId } },
						{ id: { $in: warehouse.pendingWarehouseId } },
					],
				});
				let user_data;
				if (org) {
					user_data = {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						organisation: `${org.name}/${organisationId}`,
						warehouseId,
						accountStatus,
						role,
						photoId,
						configuration_id: org.configuration_id,
						type: org.type,
						location: postalAddress,
						warehouses: warehouseArray,
						signup_date: createdAt,
						permissions: permissions,
						pendingWarehouseId: warehouse.pendingWarehouseId,
					};
				} else {
					user_data = {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						organisation: `NOT_ASSIGNED`,
						warehouseId,
						accountStatus,
						role,
						photoId,
						configuration_id: null,
						type: null,
						location: postalAddress,
						warehouses: warehouseArray,
						signup_date: createdAt,
						permissions: permissions,
						pendingWarehouseId: warehouse.pendingWarehouseId,
					};
				}
				return apiResponse.successResponseWithData(req, res, "user_info_success", user_data);
			} else {
				return apiResponse.notFoundResponse(req, res, "account_not_found");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.updateProfile = [
	auth,
	async (req, res) => {
		try {
			const employee = await EmployeeModel.findOne({
				emailId: req.user.emailId,
				accountStatus: { $ne: "DELETED" },
			});
			const {
				firstName,
				lastName,
				phoneNumber = null,
				warehouseId,
				organisation,
				preferredLanguage,
			} = req.body;

			const organisationId = organisation.split("/")[1];
			employee.firstName = firstName;
			employee.lastName = lastName;
			employee.organisationId = organisationId;
			employee.warehouseId = warehouseId;
			employee.preferredLanguage = preferredLanguage;
			if (phoneNumber) {
				employee.phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
			} else {
				employee.phoneNumber = phoneNumber;
			}
			await employee.save();

			const returnData = { isRefresh: false };
			if (warehouseId !== req.user.warehouseId) {
				let userData = {
					id: employee.id,
					firstName: firstName,
					emailId: employee.emailId,
					role: employee.role,
					organisationId: employee.organisationId,
					warehouseId: warehouseId,
					phoneNumber: employee.phoneNumber,
				};
				//Prepare JWT token for authentication
				const jwtPayload = userData;
				const jwtData = {
					expiresIn: process.env.JWT_TIMEOUT_DURATION,
				};
				const secret = process.env.JWT_SECRET;
				//Generated JWT token with Payload and secret.
				returnData.isRefresh = true;
				returnData.token = jwt.sign(jwtPayload, secret, jwtData);
			}
			return apiResponse.successResponseWithData(req, res, "user_info_success", returnData);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.deleteProfilePicture = [
	auth,
	async (req, res) => {
		try {
			const employee = await EmployeeModel.findOneAndUpdate(
				{ id: req.user.id },
				{ $set: { photoId: "" } },
				{ new: true },
			);

			if (!employee) {
				throw new Error("Couldn't update profile!");
			}

			let userData = {
				id: employee.id,
				firstName: employee.firstName,
				emailId: employee.emailId,
				role: employee.role,
				organisationId: employee.organisationId,
				warehouseId: employee.warehouseId,
				phoneNumber: employee.phoneNumber,
				photoId: "",
			};

			let returnData = {};
			const jwtPayload = userData;
			const jwtData = {
				expiresIn: process.env.JWT_TIMEOUT_DURATION,
			};
			const secret = process.env.JWT_SECRET;
			//Generated JWT token with Payload and secret.
			returnData.isRefresh = true;
			returnData.token = jwt.sign(jwtPayload, secret, jwtData);

			return apiResponse.successResponseWithData(req, res, "user_info_success", returnData);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(
				req,
				res,
				"Error in deleting profile picture - ",
				err.message,
			);
		}
	},
];

exports.deleteProfile = [
	auth,
	async (req, res) => {
		try {
			await EmployeeModel.updateOne(
				{ id: req.user.id },
				{ $set: { accountStatus: "DELETED" } },
				{ new: true },
			);

			return apiResponse.successResponse(req, res, "User account deleted successfully!");
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, err.message);
		}
	},
];

exports.getAllUsers = [
	auth,
	async (req, res) => {
		try {
			const users = await EmployeeModel.find(
				{ accountStatus: { $ne: "DELETED" } },
				"firstName walletAddress emailId",
			);
			const confirmedUsers = users.filter((user) => user.walletAddress !== "");
			return apiResponse.successResponseWithData(req, res, "all_users_success", confirmedUsers);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getUserWarehouses = [
	auth,
	async (req, res) => {
		try {
			if (!req.user.organisationId) {
				return apiResponse.ErrorResponse(req, res, "organization_validation_error");
			}
			const warehouses = await WarehouseModel.find({
				organisationId: req.user.organisationId,
			});
			return apiResponse.successResponseWithData(req, res, "user_warehouse_success", warehouses);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.pushWarehouse = [
	auth,
	async (req, res) => {
		try {
			const { warehouseId } = req.body;
			await EmployeeModel.updateOne(
				{
					id: req.user.id,
				},
				{
					$push: {
						pendingWarehouseId: warehouseId,
					},
				},
			);
			return apiResponse.successResponse(req, res, "add_warehouse_success");
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.addWarehouse = [
	auth,
	async (req, res) => {
		try {
			let warehouseExists = await WarehouseModel.findOne({ id: req.body.id });
			if (warehouseExists) {
				await EmployeeModel.findOneAndUpdate(
					{ id: req.user.id },
					{ $push: { warehouseId: req.body.id } },
				);
				return apiResponse.successResponseWithData(
					req,
					res,
					"add_warehouse_success",
					warehouseExists,
				);
			}

			const skipOrgRegistration = req.user.partialRegistration;

			const invCounter = await CounterModel.findOneAndUpdate(
				{ "counters.name": "inventoryId" },
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{ new: true },
			);
			const inventoryId = invCounter.counters[7].format + invCounter.counters[7].value;
			const inventoryResult = new InventoryModel({ id: inventoryId });
			await inventoryResult.save();
			const {
				organisationId,
				postalAddress,
				title,
				region,
				country,
				warehouseAddress,
				supervisors,
				employees,
				bottleCapacity,
				sqft,
			} = req.body;
			const warehouseCounter = await CounterModel.findOneAndUpdate(
				{ "counters.name": "warehouseId" },
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{
					new: true,
				},
			);
			const warehouseId = warehouseCounter.counters[3].format + warehouseCounter.counters[3].value;

			const loc = await getLatLongByCity(warehouseAddress.city + "," + warehouseAddress.country);
			const warehouse = new WarehouseModel({
				id: warehouseId,
				organisationId,
				postalAddress,
				title,
				region: {
					regionName: region,
				},
				country: {
					countryId: "001",
					countryName: country,
				},
				location: loc,
				bottleCapacity,
				sqft,
				supervisors,
				employees,
				warehouseAddress,
				warehouseInventory: inventoryResult.id,
				status: "NOTVERIFIED",
			});
			await warehouse.save();

			const addr = `${warehouseAddress?.firstLine}, ${warehouseAddress?.city}, ${warehouseAddress?.state}, ${warehouseAddress?.zipCode}`;

			await OrganisationModel.findOneAndUpdate(
				{
					id: organisationId,
				},
				{
					$set: {
						...(skipOrgRegistration
							? {
									postalAddress: addr,
									country: warehouseAddress.country,
									region: warehouseAddress.region,
									status: "NOTVERIFIED",
							  }
							: {}),
					},
					$push: {
						warehouses: warehouseId,
					},
				},
			);

			await EmployeeModel.findOneAndUpdate(
				{
					id: req.user.id,
				},
				{
					$set: {
						role: "admin",
					},
					$push: {
						pendingWarehouseId: warehouseId,
					},
				},
			);

			const bc_data = {
				Id: warehouseId,
				Participant_id: "",
				CreatedOn: "",
				CreatedBy: "",
				IsDelete: true,
				OrganizationId: organisationId,
				PostalAddress: postalAddress,
				Region: JSON.stringify(region),
				Country: JSON.stringify(country),
				Location: JSON.stringify(loc),
				Supervisors: supervisors,
				Employees: employees,
				WarehouseInventory: inventoryResult.id,
				Name: title,
				Gender: "",
				Age: "",
				Aadhar: "",
				Vaccineid: "",
				Title: title,
				Warehouseaddr: warehouseAddress,
				Status: "NOTVERIFIED",
				Misc1: "",
				Misc2: "",
			};
			const token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
			axios.post(`${hf_blockchain_url}/api/v1/participantapi/Warehouse/create`, bc_data, {
				headers: {
					Authorization: token,
				},
			});
			const event_data = {
				eventID: cuid(),
				eventTime: new Date().toISOString(),
				actorWarehouseId: warehouseId,
				eventType: {
					primary: "CREATE",
					description: "WAREHOUSE",
				},
				actor: {
					actorid: req.user.id ? req.user.id : null,
					actoruserid: req.user.emailId ? req.user.emailId : null,
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
						address: postalAddress ? postalAddress : "null",
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
			return apiResponse.successResponseWithData(req, res, "add_warehouse_success", warehouse);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.updateWarehouseAddress = [
	auth,
	async (req, res) => {
		try {
			const loc = await getLatLongByCity(
				req.body.warehouseAddress.city + "," + req.body.warehouseAddress.country,
			);
			const data = req.body;
			data.location = loc;
			data.status = "PENDING";
			const warehouse = await WarehouseModel.findOneAndUpdate({ id: req.query.warehouseId }, data, {
				new: true,
			});
			const employee = await EmployeeModel.findOneAndUpdate(
				{ id: req.user.id },
				{
					$push: { pendingWarehouseId: warehouse.id },
					$pull: { warehouseId: warehouse.id },
				},
				{ new: true },
			);
			return apiResponse.successResponseWithData(req, res, "update_warehouse_success", warehouse);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.uploadImage = [
	auth,
	async (req, res) => {
		try {
			const { emailId } = req.user;
			const { id, type, action } = req.query;
			const Upload = await uploadFile(req.file);
			await unlinkFile(req.file.path);
			if (action == "KYCUPLOAD") {
				const update = await EmployeeModel.findOneAndUpdate(
					{
						$and: [
							{
								"userDocuments.idNumber": parseInt(id),
							},
							{
								"userDocuments.idType": type,
							},
						],
					},
					{
						$push: {
							"userDocuments.$.imageDetails": `${Upload.key}`,
						},
					},
					{ new: true },
				);
				return apiResponse.successResponseWithData(req, res, "image_upload_success", update);
			} else if (action == "STOREID") {
				const userData = {
					userDocuments: {
						imageDetails: [`${Upload.key}`],
						idType: "STOREID",
					},
				};
				const employee = await EmployeeModel.findOneAndUpdate(
					{
						emailId: emailId,
						accountStatus: { $ne: "DELETED" },
					},
					{
						$push: userData,
					},
					{ new: true },
				);
				return apiResponse.successResponseWithData(req, res, "image_upload_success", employee);
			} else if (action == "KYCNEW") {
				const userData = {
					userDocuments: {
						imageDetails: [`${Upload.key}`],
						idType: type,
						idNumber: parseInt(id),
						approvalStatus: "NOTAPPROVED",
					},
				};
				const employee = await EmployeeModel.findOneAndUpdate(
					{
						emailId: emailId,
						accountStatus: { $ne: "DELETED" },
					},
					{
						$push: userData,
					},
					{ new: true },
				);
				return apiResponse.successResponseWithData(req, res, "image_upload_success", employee);
			} else if (action == "PROFILE") {
				const employeeUpdate = await EmployeeModel.findOneAndUpdate(
					{
						emailId: emailId,
						accountStatus: { $ne: "DELETED" },
					},
					{
						$set: { photoId: Upload.key },
					},
					{ new: true },
				);
				return apiResponse.successResponseWithData(
					req,
					res,
					"image_upload_success",
					employeeUpdate,
				);
			} else {
				return apiResponse.ErrorResponse(req, res, "image_upload_error");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.fetchImage = [
	auth,
	async (req, res) => {
		try {
			const { emailId } = req.user;
			const { type } = req.query;
			const resArray = [];
			const findRecord = await EmployeeModel.findOne({
				$and: [
					{
						emailId: emailId,
						accountStatus: { $ne: "DELETED" },
					},
					{
						"userDocuments.idType": type,
					},
				],
			});
			if (findRecord != null) {
				const imageArray = await EmployeeModel.find(
					{
						$and: [
							{
								emailId: emailId,
								accountStatus: { $ne: "DELETED" },
							},
							{
								"userDocuments.idType": type,
							},
						],
					},
					{
						"userDocuments.imageDetails": 1,
					},
				);
				for (let i = 0; i < imageArray.length; i++) {
					let temp = imageArray[i].userDocuments[0]?.imageDetails;
					const s = "/images/" + temp[temp.length - 1];
					resArray.push(s);
				}
			} else {
				return apiResponse.notFoundResponse(req, res, "image_not_found");
			}
			return apiResponse.successResponseWithData(req, res, "image_success", resArray);
		} catch (err) {
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getAllRegisteredUsers = [
	auth,
	async (req, res) => {
		try {
			const resPerPage = 10; // results per page
			const page = req.query.page || 1; // Page
			const totalRecords = await EmployeeModel.count({});
			/* 
	  Performance Bottleneck 
	  */
			const users = await EmployeeModel.find({ accountStatus: { $ne: "DELETED" } })
				.skip(resPerPage * page - resPerPage)
				.limit(resPerPage);
			const confirmedUsers = users.filter((user) => user.walletAddress !== "");
			if (confirmedUsers.length > 0) {
				let users_data = [];
				for (let i in confirmedUsers) {
					let {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						organisationId,
						warehouseId,
						accountStatus,
						role,
						photoId,
						postalAddress,
					} = confirmedUsers[i];
					const org = await OrganisationModel.findOne({ id: organisationId }, "name");
					const warehouse = await WarehouseModel.findOne({ id: warehouseId });
					users_data[i] = {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						warehouseId,
						accountStatus,
						role,
						photoId,
						location: postalAddress,
					};
					if (org) {
						users_data[i].organization = `${org.name}/${organisationId}`;
					} else users_data[i].organization = null;
					if (warehouse && warehouse.warehouseAddress) {
						(users_data[i].warehouseAddress_country = warehouse.warehouseAddress.country),
							(users_data[i].warehouseAddress_zipcode = warehouse.warehouseAddress.zipCode),
							(users_data[i].warehouseAddress_city = warehouse.warehouseAddress.city),
							(users_data[i].warehouseAddress_firstline = warehouse.warehouseAddress.firstLine);
					} else {
						(users_data[i].warehouseAddress_country = null),
							(users_data[i].warehouseAddress_zipcode = null),
							(users_data[i].warehouseAddress_city = null),
							(users_data[i].warehouseAddress_firstline = null);
					}
				}
				const finalData = {
					totalRecords: totalRecords,
					data: users_data,
				};
				return apiResponse.successResponseWithData(req, res, "all_users_success", finalData);
			} else {
				return apiResponse.notFoundResponse(req, res, "no_user_found");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getAllUsersByWarehouse = [
	auth,
	async (req, res) => {
		try {
			const resPerPage = 10; // results per page
			const page = req.query.page || 1; // Page
			const totalRecords = await EmployeeModel.count({
				warehouseId: req.params.warehouseId,
			});
			const users = await EmployeeModel.find({
				warehouseId: req.params.warehouseId,
				accountStatus: { $ne: "DELETED" },
			})
				.skip(resPerPage * page - resPerPage)
				.limit(resPerPage);
			const confirmedUsers = users.filter((user) => user.walletAddress !== "");
			const warehouse = await WarehouseModel.findOne({
				id: req.params.warehouseId,
			});
			if (confirmedUsers.length > 0) {
				let users_data = [];
				for (let i in confirmedUsers) {
					let {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						organisationId,
						warehouseId,
						accountStatus,
						role,
						photoId,
						postalAddress,
					} = confirmedUsers[i];
					const org = await OrganisationModel.findOne({ id: organisationId }, "name");
					users_data[i] = {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						warehouseId,
						accountStatus,
						role,
						photoId,
						location: postalAddress,
					};
					if (org) {
						users_data[i].organization = `${org.name}/${organisationId}`;
					} else users_data[i].organization = null;
					if (warehouse && warehouse.warehouseAddress) {
						(users_data[i].warehouseAddress_country = warehouse.warehouseAddress.country),
							(users_data[i].warehouseAddress_zipcode = warehouse.warehouseAddress.zipCode),
							(users_data[i].warehouseAddress_city = warehouse.warehouseAddress.city),
							(users_data[i].warehouseAddress_firstline = warehouse.warehouseAddress.firstLine);
					} else {
						(users_data[i].warehouseAddress_country = null),
							(users_data[i].warehouseAddress_zipcode = null),
							(users_data[i].warehouseAddress_city = null),
							(users_data[i].warehouseAddress_firstline = null);
					}
				}
				const finalData = {
					totalRecords: totalRecords,
					data: users_data,
				};
				return apiResponse.successResponseWithData(req, res, "all_users_success", finalData);
			} else {
				return apiResponse.notFoundResponse(req, res, "no_user_found");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getAllUsersByOrganisation = [
	auth,
	async (req, res) => {
		try {
			const resPerPage = 10; // results per page
			const page = req.query.page || 1; // Page
			const totalRecords = await EmployeeModel.count({
				organisationId: req.params.organisationId,
			});
			const users = await EmployeeModel.find({
				organisationId: req.params.organisationId,
				accountStatus: { $ne: "DELETED" },
			})
				.skip(resPerPage * page - resPerPage)
				.limit(resPerPage);
			const confirmedUsers = users.filter((user) => user.walletAddress !== "");
			const org = await OrganisationModel.findOne({ id: req.params.organisationId }, "name");
			if (confirmedUsers.length > 0) {
				let users_data = [];
				for (let i in confirmedUsers) {
					let {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						organisationId,
						warehouseId,
						accountStatus,
						role,
						photoId,
						postalAddress,
					} = confirmedUsers[i];
					const warehouse = await WarehouseModel.findOne({ id: warehouseId });
					users_data[i] = {
						firstName,
						lastName,
						emailId,
						phoneNumber,
						walletAddress,
						affiliatedOrganisations,
						warehouseId,
						accountStatus,
						role,
						photoId,
						location: postalAddress,
					};
					if (org) {
						users_data[i].organization = `${org.name}/${organisationId}`;
					} else users_data[i].organization = null;
					if (warehouse && warehouse.warehouseAddress) {
						(users_data[i].warehouseAddress_country = warehouse.warehouseAddress.country),
							(users_data[i].warehouseAddress_zipcode = warehouse.warehouseAddress.zipCode),
							(users_data[i].warehouseAddress_city = warehouse.warehouseAddress.city),
							(users_data[i].warehouseAddress_firstline = warehouse.warehouseAddress.firstLine);
					} else {
						(users_data[i].warehouseAddress_country = null),
							(users_data[i].warehouseAddress_zipcode = null),
							(users_data[i].warehouseAddress_city = null),
							(users_data[i].warehouseAddress_firstline = null);
					}
				}
				const finalData = {
					totalRecords: totalRecords,
					data: users_data,
				};
				return apiResponse.successResponseWithData(req, res, "all_users_success", finalData);
			} else {
				return apiResponse.notFoundResponse(req, res, "no_user_found");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getOrganizationsByType = [
	async (req, res) => {
		try {
			const organisationId = req.query.id;
			const organizations = await ConfigurationModel.find(
				{ id: organisationId },
				"organisationTypes.id organisationTypes.name",
			);
			return apiResponse.successResponseWithData(
				req,
				res,
				"organization_types_success",
				organizations,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getOrganizationsByTypeForAbInBev = [
	async (req, res) => {
		try {
			const filters = req.query;
			let matchCondition = {};
			let matchWarehouseCondition = {};
			matchCondition.status = "ACTIVE";
			if (filters.status && filters.status !== "") {
				matchCondition.status = filters.status;
			}
			if (filters.state && filters.state !== "") {
				matchWarehouseCondition["warehouseDetails.warehouseAddress.state"] = new RegExp(
					"^" + filters.state + "$",
					"i",
				);
			}
			if (filters.district && filters.district !== "") {
				matchWarehouseCondition["warehouseDetails.warehouseAddress.city"] = new RegExp(
					"^" + filters.district + "$",
					"i",
				);
			}

			if (filters.type === "SUPPLIER") {
				matchCondition.$or = [{ type: "S1" }, { type: "S2" }, { type: "S3" }];
			} else {
				matchCondition.type = filters.type;
			}
			const organizations = await OrganisationModel.aggregate([
				{
					$match: matchCondition,
				},
				{
					$lookup: {
						from: "warehouses",
						localField: "id",
						foreignField: "organisationId",
						as: "warehouseDetails",
					},
				},
				{
					$unwind: "$warehouseDetails",
				},
				{
					$match: matchWarehouseCondition,
				},
				{
					$project: {
						id: 1,
						name: 1,
						type: 1,
					},
				},
			]);
			return apiResponse.successResponseWithData(
				req,
				res,
				"organization_by_type_success",
				organizations,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getwarehouseByType = [
	auth,
	async (req, res) => {
		try {
			const organisationId = req.query.id;
			const organizations = await ConfigurationModel.find(
				{ id: organisationId },
				"warehouseTypes.id warehouseTypes.name",
			);
			return apiResponse.successResponseWithData(
				req,
				res,
				"warehouse_types_success",
				organizations,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getwarehouseinfo = [
	auth,
	async (req, res) => {
		try {
			const warehouseId = req.query.id;
			const warehouseinfo = await WarehouseModel.find({ id: warehouseId });
			return apiResponse.successResponseWithData(req, res, "warehouse_info_success", warehouseinfo);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.getOrganizationsTypewithauth = [
	auth,
	async (req, res) => {
		try {
			const organisationId = req.query.id;
			const organizations = await ConfigurationModel.find(
				{ id: organisationId },
				"organisationTypes.id organisationTypes.name",
			);
			return apiResponse.successResponseWithData(
				req,
				res,
				"organization_types_success",
				organizations,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.emailverify = [
	async (req, res) => {
		try {
			const emailId = req.query.emailId ? req.query.emailId.trim() : "";
			const phoneNumber = req.query.phoneNumber ? req.query.phoneNumber.trim() : "";
			const email = await EmployeeModel.find(
				{
					$or: [
						{ phoneNumber: "+" + phoneNumber, accountStatus: { $ne: "DELETED" } },
						{ emailId: emailId ? emailId : "", accountStatus: { $ne: "DELETED" } },
					],
				},
				"emailId phoneNumber",
			);
			if (email && email.length) {
				return apiResponse.validationErrorWithData(
					req,
					res,
					"Account with the same email or phone already exists!",
					[],
				);
			}
			return apiResponse.successResponseWithData(req, res, "Valid Email/Phone");
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
		}
	},
];

exports.Image = [
	auth,
	async (req, res) => {
		const FileStream = getFileStream(req.params.key);
		FileStream.pipe(req, res);
	},
];

exports.switchLocation = [
	auth,
	async (req, res) => {
		try {
			const employee = await EmployeeModel.findOne({
				emailId: req.user.emailId,
				accountStatus: { $ne: "DELETED" },
			});
			const { warehouseId } = req.body;
			const returnData = { isRefresh: false };
			if (warehouseId !== req.user.warehouseId) {
				let userData = {
					id: employee.id,
					firstName: employee.firstName,
					emailId: employee.emailId,
					role: employee.role,
					organisationId: employee.organisationId,
					warehouseId: warehouseId,
					phoneNumber: employee.phoneNumber,
				};
				//Prepare JWT token for authentication
				const jwtPayload = userData;
				const jwtData = {
					expiresIn: process.env.JWT_TIMEOUT_DURATION,
				};
				const secret = process.env.JWT_SECRET;
				//Generated JWT token with Payload and secret.
				returnData.isRefresh = true;
				returnData.token = jwt.sign(jwtPayload, secret, jwtData);
			}
			return apiResponse.successResponseWithData(req, res, "switch_location_success", returnData);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(req, res, "default_error");
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
					res,
					"Organisation name exists!",
					organisationName,
				);
			}

			const country = req.body?.address?.country ? req.body.address?.country : "Costa Rica";
			const region = req.body?.address?.region ? req.body.address?.region : "Americas";
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

exports.addUsersFromExcel = [
  auth,
  async (req, res) => {
    try {
      try {
        const { organisationName } = req.user;
        const dir = `uploads`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
        const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
        const sheet_name_list = workbook.SheetNames;
        let data = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]],
          { dateNF: "dd/mm/yyyy;@", cellDates: true, raw: false }
        );


        const formatedData = new Array();
        for (const [index, user] of data.entries()) {
			const firstName = user?.["NAME"] || user?.["NOMBRE"];
			const phoneNumber = user?.["PHONE"] || user?.["CEL NUMBER"];
			const lastName = user?.["LAST NAME"] || user?.["APELLIDO"];
			const emailId = user?.["EMAIL"] || user?.["EMAIL"];
			const role = user?.["ROLE"] || user?.["ROL"];
			const city = user?.["CITY"]
			const zip = user?.["POSTAL CODE"];
			const province = user?.["PROVINCE"];
			const warehouseTitle = user?.["NAME OF LOCATION"];
			const district = user?.["DISTRICT"];
			const postalAddress = user?.["ADDRESS"];
			const warehouseAddress = {
				city: city,
				zip: zip,
				province: province,
				warehouseTitle: warehouseTitle,
				district: district,
				postalAddress: postalAddress
		}

          const accountStatus = "ACTIVE";
          const warehouseId =
            user?.["WAREHOUSE"] || user?.["FECHA DE VENCIMIENTO"];
          const { organisationId } = req.user;
			const payload = {
			organisationId: organisationId,
			postalAddress: postalAddress,
			title: warehouseTitle,
			region: {
				regionId : "reg123",
				regionName : "Americas"
			},
			country:{
				countryId : "001",
				countryName : "Costa Rica"
			},
			warehouseAddress: warehouseAddress,
			supervisors: [],
			}
          formatedData[index] = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            phoneNumber: phoneNumber,
            organisationId: organisationId,
            role: role,
            accountStatus: accountStatus,
            warehouseId: warehouseId ? warehouseId : [],
            isConfirmed: true,
			payload: payload
            // id: id,
          };
        }

        for (const user of formatedData) {
          //   const incrementCounterEmployee =
          await CounterModel.updateOne(
            {
              "counters.name": "employeeId",
            },
            {
              $inc: {
                "counters.$.value": 1,
              },
            }
          );

          const employeeCounter = await CounterModel.findOne(
            { "counters.name": "employeeId" },
            { "counters.$": 1 }
          );
          var employeeId =
            employeeCounter.counters[0].format +
            employeeCounter.counters[0].value;
			createWarehouse(user.warehouseId, user.warehouseId, {...user.payload, employees: [employeeId]}, employeeId);

          const User = new EmployeeModel({ ...user, id: employeeId });
          await User.save();
          let emailBody = AddUserEmail({
            name: user.firstName,
            organisation: organisationName,
          });
          mailer
            .send(
              constants.addUser.from,
              user.emailId,
              constants.addUser.subject,
              emailBody
            )
            .catch((err) => {
              console.log("Error in mailing user!", err);
            });
        }
        return apiResponse.successResponseWithData(
          req,
		  res,
          "success",
          formatedData
        );
      } catch (err) {
        console.log(err);
        return apiResponse.ErrorResponse(req, res, err);
      }
    } catch (err) {
      console.log(err);
    }
  },
];

exports.addOrgsFromExcel = [
  auth,
  async (req, res) => {
    try {
      try {
        const dir = `uploads`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
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
          const firstName = user["NAME"];
          const lastName = user["LAST NAME"];
          const emailId = user["EMAIL"];
          const phoneNumber = user["TELEPHONE"];
          const organisationName = user["ORGANIZATION'S NAME"];
          const type = user["ORGANIZATION TYPE"];
          const address = {
            city: user["CITY"],
            country: user["COUNTRY"],
            line1: user["CANTON"],
            pincode: user["POSTAL CODE"],
            region: user["DISTRICT"],
            state: user["PROVINCE"],
          };

          formatedData[index] = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            phoneNumber: phoneNumber,
            organisationName: organisationName,
            type: type,
            address: address,
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
      } catch (err) {
        console.log(err);
        return apiResponse.ErrorResponse(req, res, err);
      }
    } catch (err) {
      console.log(err);
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
              return apiResponse.successResponseWithData(
                res,
                " User is already Active",
                employee
              );
            } else {
              axios
                .get(`${blockchain_service_url}/createUserAddress`)
                .then((response) => {
                  const walletAddress = response.data.items;
                  const userData = {
                    walletAddress,
                  };
                  axios
                    .post(`${blockchain_service_url}/grantPermission`, userData)
                    .then(() => console.log("posted"));
                  EmployeeModel.findOneAndUpdate(
                    { id: id },
                    {
                      $set: {
                        accountStatus: "ACTIVE",
                        isConfirmed: true,
                        walletAddress,
                        role,
                      },
                    },
                    { new: true }
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
                          emailBody
                        );
                      } catch (mailError) {
                        console.log(mailError);
                      }
                      return apiResponse.successResponseWithData(
                        res,
                        `User Activated`,
                        emp
                      );
                    });
                });
            }
          } else {
            return apiResponse.notFoundResponse(req, res, "User Not Found");
          }
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(req, res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.deactivateUser = [
  auth,
  (req, res) => {
    try {
      const { organisationName } = req.user;
      const { id } = req.query;
      EmployeeModel.findOneAndUpdate(
        { id },
        { $set: { accountStatus: "REJECTED" } },
        { new: true }
      )
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
              emailBody
            );
          } catch (err) {
            console.log(err);
          }
          return apiResponse.successResponseWithData(req, res, "User Rejected", emp);
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(req, res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(req, res, err);
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
        { new: true }
      );

      if (result) {
        return apiResponse.successResponse(
          req,
          res,
          "User role updated successfully!"
        );
      } else {
        throw new Error("Error in updating user role!");
      }
    } catch (err) {
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.getAllUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find(
        {},
        "firstName walletAddress emailId"
      );
      const confirmedUsers = users.filter((user) => user.walletAddress !== "");
      return apiResponse.successResponseWithData(
        req,
		res,
        "Users Retrieved Success",
        confirmedUsers
      );
    } catch (err) {
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.getWarehouseUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find({
        warehouseId: req.query.warehouseId,
      });
      return apiResponse.successResponseWithData(
        req,
		res,
        "Users Retrieved Success",
        users
      );
    } catch (err) {
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.getOrgUsers = [
  auth,
  async (req, res) => {
    try {
      console.log(getUserCondition(req.query, req.user.organisationId));
      const users = await EmployeeModel.aggregate([
        {
          $match: getUserCondition(req.query, req.user.organisationId),
        },
        {
          $lookup: {
            from: "organisations",
            localField: "organisationId",
            foreignField: "id",
            as: "orgs",
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            walletAddress: 1,
            accountStatus: 1,
            firstName: 1,
            lastName: 1,
            photoId: 1,
            phoneNumber: 1,
            role: 1,
            emailId: 1,
            postalAddress: 1,
            createdAt: 1,
            location: "$orgs.postalAddress",
            city: "$orgs.city",
            region: "$orgs.region",
            country: "$orgs.country",
          },
        },
        { $skip: parseInt(req.query.skip) || 0 },
        { $limit: parseInt(req.query.limit) || 0 },
      ]);

      return apiResponse.successResponseWithData(
        req,
		res,
        "Organisation Users",
        users
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.getOrgUserAnalytics = [
  auth,
  async (req, res) => {
    try {
      const { orgId } = req.query;
      let matchQuery = orgId ? { organisationId: orgId } : {};
      const analytics = await EmployeeModel.aggregate([
        { $match: matchQuery },
        {
          $facet: {
            total: [
              { $match: {} },
              {
                $group: {
                  _id: null,
                  employees: {
                    $addToSet: {
                      employeeId: "$id",
                    },
                  },
                  userInitials: {
                    $firstN: {
                      input: "$firstName",
                      n: 5,
                    },
                  },
                },
              },
              {
                $project: {
                  count: {
                    $cond: {
                      if: { $isArray: "$employees" },
                      then: { $size: "$employees" },
                      else: "NA",
                    },
                  },
                  userInitials: 1,
                },
              },
            ],
            active: [
              { $match: { accountStatus: "ACTIVE" } },
              {
                $group: {
                  _id: null,
                  employees: {
                    $addToSet: {
                      employeeId: "$id",
                    },
                  },
                },
              },
              {
                $project: {
                  count: {
                    $cond: {
                      if: { $isArray: "$employees" },
                      then: { $size: "$employees" },
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
        userInitials: analytics[0].total.userInitials,
      };
      return apiResponse.successResponseWithData(
        req,
		res,
        "User Analytics",
        analyticsObject
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.getUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find({
        organisationId: req.query.orgId,
      });
      const confirmedUsers = users.filter((user) => user.walletAddress !== "");
      return apiResponse.successResponseWithData(
        req,
		res,
        "Organisation Users",
        confirmedUsers
      );
    } catch (err) {
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.getOrgActiveUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find({
        organisationId: req.user.organisationId,
        accountStatus: "ACTIVE",
      }).select("firstName lastName emailId id");
      return apiResponse.successResponseWithData(
        req,
		res,
        "Organisation active users",
        users
      );
    } catch (err) {
      return apiResponse.ErrorResponse(req, res, err);
    }
  },
];

exports.Image = [
  auth,
  async (req, res) => {
    try {
      const signedUrl = await getSignedUrl(req.params.key);
      return apiResponse.successResponseWithData(req, res, "Image URL", signedUrl);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, err.message);
    }
  },
];

