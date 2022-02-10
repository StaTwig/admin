require("dotenv").config();
const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel");
const logEvent = require("../../../utils/event_logger");
const ConsumerModel = require("../models/ConsumerModel");
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
const blockchain_service_url = process.env.URL;
const hf_blockchain_url = process.env.HF_BLOCKCHAIN_URL;
const stream_name = process.env.INV_STREAM;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\d{11}$/;

const { uploadFile, getFileStream } = require("../helpers/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

/**
 * Uniques email check
 *
 * @param {string}     email
 *
 * @returns {Object}
 */
exports.checkEmail = [
  body("firstName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("firstname_validation_error"),
  body("lastName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("lastname_validation_error"),
  body("organisationId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("organization_validation_error"),
  body("emailId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("email_validation_error")
    .custom(async (value) => {
      const emailId = value.toLowerCase().replace(" ", "");
      let user;
      let phone = "";
      if (emailId.indexOf("@") > -1) {
        if (!emailId.match(emailRegex))
          return Promise.reject("not_valid_email");
        user = await EmployeeModel.findOne({ emailId });
      } else {
        if (!emailId.match(phoneRegex))
          return Promise.reject("not_valid_phone");
        phone = "+" + emailId;
        user = await EmployeeModel.findOne({ phoneNumber: phone });
      }
      if (user) {
        return Promise.reject("account_already_exists");
      }
    }),
  async (req, res) => {
    try {
      if (
        !req.body.firstName.match("[A-Za-z0-9]") ||
        !req.body.lastName.match("[A-Za-z0-9]")
      ) {
        return apiResponse.ErrorResponse(req, res, "not_valid_name");
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          req,
          res,
          "validation_error",
          errors.array()
        );
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
  body("firstName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("firstname_validation_error"),
  body("lastName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("lastname_validation_error"),
  body("organisationId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("organization_validation_error"),
  // body("emailId")
  // .trim()
  // .toLowerCase()
  // .custom(async (value) => {
  //   if (value) {
  //     const emailId = value.toLowerCase().replace("", "");
  //     let user;
  //     if (!emailId.match(emailRegex))
  //       return Promise.reject("not_valid_email");
  //     if (emailId.indexOf("@") > -1)
  //       user = await EmployeeModel.findOne({ emailId });
  //     if (user) {
  //       return Promise.reject("account_already_exists");
  //     }
  //   }
  //   }),
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
        return apiResponse.ErrorResponse(
          req,
          res,
          "Enter either emailId or phoneNumber"
        );
      } else if (req.body.emailId != "") {
        let emailId = req.body.emailId;
        emailId = emailId.trim();
        emailId = emailId.toLowerCase();
        emailId = emailId.replace("", "");
        let user;
        if (!emailId.match(emailRegex))
          return apiResponse.ErrorResponse(req, res, "not_valid_email");
        if (emailId.indexOf("@") > -1)
          user = await EmployeeModel.findOne({ emailId });
        if (user) {
          return apiResponse.ErrorResponse(req, res, "account_already_exists");
        }
      } else if (req.body.phoneNumber != "") {
        let phoneNumber = req.body.phoneNumber;
        phoneNumber = phoneNumber.toLowerCase().replace("", "");
        let phone = "";
        let user;
        if (!phoneNumber.match(phoneRegex))
          return apiResponse.ErrorResponse(req, res, "not_valid_phone");
        phone = "+" + phoneNumber;
        user = await EmployeeModel.findOne({ phoneNumber: phone });
        if (user) {
          return apiResponse.ErrorResponse(req, res, "account_already_exists");
        }
      }
      if (
        !req.body.firstName.match("[A-Za-z0-9]") ||
        !req.body.lastName.match("[A-Za-z0-9]")
      ) {
        return apiResponse.ErrorResponse(req, res, "name_validation_error");
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          req,
          res,
          "validation_error",
          errors.array()
        );
      }
      // if (!mailer.validateEmail(req.body.emailId)) {
      //   return apiResponse.ErrorResponse(req, res, "not_valid_email");
      // } else {
      let organisationId = req.body.organisationId;
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
        { new: true }
      );
      const employeeId =
        empCounter.counters[4].format + empCounter.counters[4].value;
      const employeeStatus = "NOTAPPROVED";
      let addr = "";
      //create organization if doesn't exists
      if (req.body.organisationName) {
        const organisationName = req.body.organisationName;
        const organisation = await OrganisationModel.findOne({
          name: new RegExp("^" + organisationName + "$", "i"),
        });
        if (organisation) {
          organisationId = organisation.id;
        } else {
          const country = req.body?.address?.country
            ? req.body.address?.country
            : "India";
          const region = req.body?.address?.region
            ? req.body.address?.region
            : "Asia";
          const address = req.body?.address ? req.body.address : {};
          addr =
            address.line1 +
            ", " +
            address.city +
            ", " +
            address.state +
            ", " +
            address.pincode;
          const orgCounter = await CounterModel.findOneAndUpdate(
            { "counters.name": "orgId" },
            {
              $inc: {
                "counters.$.value": 1,
              },
            },
            { new: true }
          );
          organisationId =
            orgCounter.counters[2].format + orgCounter.counters[2].value;
          const warehouseCounter = await CounterModel.findOneAndUpdate(
            { "counters.name": "warehouseId" },
            {
              $inc: {
                "counters.$.value": 1,
              },
            },
            { new: true }
          );
          warehouseId =
            warehouseCounter.counters[3].format +
            warehouseCounter.counters[3].value;
          const org = new OrganisationModel({
            primaryContactId: employeeId,
            name: organisationName,
            id: organisationId,
            type: req.body?.type ? req.body.type : "CUSTOMER_SUPPLIER",
            status: "NOTVERIFIED",
            postalAddress: addr,
            warehouses: [warehouseId],
            warehouseEmployees: [employeeId],
            region: {
              name: region,
            },
            country: {
              countryName: country,
            },
            configuration_id: "CONF000",
            authority: req.body?.authority,
          });
          await org.save();
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
          const loc = await getLatLongByCity(
            address.city + "," + address.country
          );
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
      let emailId = null;
      if (req.body?.emailId)
        emailId = req.body.emailId.toLowerCase().replace(" ", "");

      let phoneNumber = null;
      if (req.body?.phoneNumber) phoneNumber = "+" + req.body?.phoneNumber;

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

      return apiResponse.successResponse(req, res, "user_registered_success");
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
  body("emailId")
    .isLength({ min: 10 })
    .trim()
    .withMessage("email_phone_validation_error"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          req,
          res,
          "validation_error",
          errors.array()
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        let user;
        let phone = "";
        if (emailId.indexOf("@") > -1)
          user = await EmployeeModel.findOne({ emailId });
        else {
          phone = "+" + emailId;
          user = await EmployeeModel.findOne({ phoneNumber: phone });
        }
        if (user) {
          if (user.accountStatus === "ACTIVE") {
            let otp = 0;
            if (process.env.ENVIRONMENT === "TEST") {
              otp = process.env.OTP_APPSTORE;
              await EmployeeModel.updateOne({ id: user.id }, { otp });
              if (user.emailId.indexOf("@") > -1) {
                await axios.post(process.env.OTP_ENDPOINT, {
                  email: user.emailId,
                  OTP: otp.toString(),
                  source: process.env.SOURCE,
                });
              }
            } else {
              if (
                process.env.EMAIL_APPSTORE.includes(user.emailId) &&
                user.emailId != ""
              ) {
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
            return apiResponse.unauthorizedResponse(
              req,
              res,
              "account_not_approved"
            );
          }
        } else {
          return apiResponse.notFoundResponse(req, res, "account_not_found");
        }
      }
    } catch (err) {
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
        return apiResponse.validationErrorWithData(
          req,
          res,
          "validation_error",
          errors.array()
        );
      } else {
        let query = {};
        if (req.body.emailId.indexOf("@") === -1) {
          let phone = "+" + req.body.emailId;
          query = { phoneNumber: phone };
        } else {
          query = { emailId: req.body.emailId };
        }
        const user = await EmployeeModel.findOne(query);
        if (user && user.otp == req.body.otp) {
          let address;
          if (
            user.walletAddress == null ||
            user.walletAddress == "wallet12345address"
          ) {
            const response = await axios.get(
              `${blockchain_service_url}/createUserAddress`
            );
            address = response.data.items;
            // const userData = {
            //   address,
            // };
            /* await axios.post(
              `${blockchain_service_url}/grantPermission`,
              userData
            );*/
            await EmployeeModel.updateOne(query, {
              otp: null,
              walletAddress: address,
            });
          } else {
            address = user.walletAddress;
          }

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

          let userData;
          if (activeWarehouse.length > 0) {
            let activeWarehouseId = 0;
            const activeWRs = activeWarehouse.filter(
              (w) => w.status == "ACTIVE"
            );
            if (activeWRs.length > 0) activeWarehouseId = activeWRs[0].id;
            else activeWarehouseId = activeWarehouse[0].id;
            userData = {
              id: user.id,
              firstName: user.firstName,
              emailId: user.emailId,
              role: user.role,
              warehouseId: activeWarehouseId,
              organisationId: user.organisationId,
              walletAddress: address,
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
              walletAddress: address,
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
          userData.permissions = await RbacModel.findOne({ role: user.role });
          userData.token = jwt.sign(jwtPayload, secret, jwtData);

          const bc_data = {
            username: user.emailId,
            password: "",
            orgName: "org1MSP",
            role: "",
            email: user.emailId,
          };

          await axios.post(`${hf_blockchain_url}/api/v1/register`, bc_data);
          return apiResponse.successResponseWithData(
            req,
            res,
            "login_success",
            userData
          );
        } else {
          return apiResponse.ErrorResponse(req, res, "otp_not_match");
        }
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, "default_error");
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
        const permissions = await RbacModel.findOne({ role });
        const org = await OrganisationModel.findOne(
          { id: organisationId },
          "name configuration_id type"
        );
        const warehouse = await EmployeeModel.findOne(
          { id },
          { _id: 0, warehouseId: 1, pendingWarehouseId: 1 }
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
        return apiResponse.successResponseWithData(
          req,
          res,
          "user_info_success",
          user_data
        );
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
      });
      const {
        firstName,
        lastName,
        phoneNumber = "",
        warehouseId,
        organisation,
        preferredLanguage,
      } = req.body;

      const organisationId = organisation.split("/")[1];
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.phoneNumber = phoneNumber ? "+" + phoneNumber : null;
      employee.organisationId = organisationId;
      employee.warehouseId = warehouseId;
      employee.preferredLanguage = preferredLanguage;
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
      return apiResponse.successResponseWithData(
        req,
        res,
        "user_info_success",
        returnData
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, "default_error");
    }
  },
];

exports.createUserAddress = [
  async (req, res) => {
    try {
      const response = await axios.get(
        `${blockchain_service_url}/createUserAddress`
      );
      const address = response.data.items;
      const userData = {
        address,
      };
      await axios.post(`${blockchain_service_url}/grantPermission`, userData);
      return apiResponse.successResponseWithData(
        req,
        res,
        "user_address_success",
        address
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, "default_error");
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
        "all_users_success",
        confirmedUsers
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, "default_error");
    }
  },
];

exports.assignProductConsumer = [
  async (req, res) => {
    try {
      const user = new ConsumerModel({
        shipmentId: req.body.consumer.shipmentId,
        name: req.body.consumer.name,
        gender: req.body.consumer.gender,
        age: req.body.consumer.age,
        aadhar: req.body.consumer.aadhar,
        vaccineId: req.body.vaccine.serialNumber,
      });

      await user.save();
      let userData = {
        _id: user._id,
        Name: user.name,
        Aadhar: user.aadhar,
        ShipmentId: user.ShipmentId,
      };

      const date_ob = new Date();
      const date = ("0" + date_ob.getDate()).slice(-2);
      const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      const year = date_ob.getFullYear();
      const today = date + "-" + month + "-" + year;

      const userData1 = {
        stream: stream_name,
        key: req.body.vaccine.serialNumber,
        address: "1bCBUXox5GXGAiTxGgNbmhETUaHMJZVLwctveT",
        data: {
          ...req.body,
          ...{ consumedStatus: "Y", consumedDate: today },
        },
      };
      const response = await axios.post(
        `${blockchain_service_url}/publish`,
        userData1
      );
      const txnId = response.data.transactionId;
      const productQuery = { serialNumber: req.body.vaccine.serialNumber };
      const productFound = await InventoryModel.findOne(productQuery);
      if (productFound) {
        await InventoryModel.updateOne(productQuery, {
          transactionIds: [...productFound.transactionIds, txnId],
        });
      }
      return apiResponse.successResponseWithData(
        req,
        res,
        "product_consumer_success",
        userData
      );
    } catch (err) {
      console.log("err");
      return apiResponse.ErrorResponse(req, res, "default_error");
    }
  },
];

exports.getUserWarehouses = [
  auth,
  async (req, res) => {
    try {
      if (!req.user.organisationId) {
        return apiResponse.ErrorResponse(
          req,
          res,
          "organization_validation_error"
        );
      }
      const warehouses = await WarehouseModel.find({
        organisationId: req.user.organisationId,
      });
      return apiResponse.successResponseWithData(
        req,
        res,
        "user_warehouse_success",
        warehouses
      );
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
        }
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
        }
      );
      const warehouseId =
        warehouseCounter.counters[3].format +
        warehouseCounter.counters[3].value;

      const loc = await getLatLongByCity(
        warehouseAddress.city + "," + warehouseAddress.country
      );
      const warehouse = new WarehouseModel({
        id: warehouseId,
        organisationId,
        postalAddress,
        title,
        region,
        country,
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
      await OrganisationModel.findOneAndUpdate(
        {
          id: organisationId,
        },
        {
          $push: {
            warehouses: warehouseId,
          },
        }
      );

      await EmployeeModel.findOneAndUpdate(
        {
          id: req.user.id,
        },
        {
          $push: {
            pendingWarehouseId: warehouseId,
          },
        }
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
      const token =
        req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
      axios.post(
        `${hf_blockchain_url}/api/v1/participantapi/Warehouse/create`,
        bc_data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
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
      return apiResponse.successResponseWithData(
        req,
        res,
        "add_warehouse_success",
        warehouse
      );
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
        req.body.warehouseAddress.city + "," + req.body.warehouseAddress.country
      );
      const data = req.body;
      data.location = loc;
      data.status = "PENDING";
      const warehouse = await WarehouseModel.findOneAndUpdate(
        { id: req.query.warehouseId },
        data,
        { new: true }
      );
      return apiResponse.successResponseWithData(
        req,
        res,
        "update_warehouse_success",
        warehouse
      );
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
          { new: true }
        );
        return apiResponse.successResponseWithData(
          req,
          res,
          "image_upload_success",
          update
        );
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
          },
          {
            $push: userData,
          },
          { new: true }
        );
        return apiResponse.successResponseWithData(
          req,
          res,
          "image_upload_success",
          employee
        );
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
          },
          {
            $push: userData,
          },
          { new: true }
        );
        return apiResponse.successResponseWithData(
          req,
          res,
          "image_upload_success",
          employee
        );
      } else if (action == "PROFILE") {
        const employeeUpdate = await EmployeeModel.findOneAndUpdate(
          {
            emailId: emailId,
          },
          {
            $set: { photoId: `/usermanagement/api/auth/images/${Upload.key}` },
          },
          { new: true }
        );
        return apiResponse.successResponseWithData(
          req,
          res,
          "image_upload_success",
          employeeUpdate
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
          },
          {
            "userDocuments.idType": type,
          },
        ],
      });
      if (findRecord != null) {
        const imageArray = await EmployeeModel.findOne(
          {
            $and: [
              {
                emailId: emailId,
              },
              {
                "userDocuments.idType": type,
              },
            ],
          },
          {
            "userDocuments.$.imageDetails": 1,
          }
        );
        for (let i = 0; i < imageArray.length; i++) {
          const s = "/images/" + imageArray[i];
          resArray.push(s);
        }
      } else {
        return apiResponse.notFoundResponse(req, res, "image_not_found");
      }
      return apiResponse.successResponseWithData(
        req,
        res,
        "image_success",
        resArray
      );
    } catch (err) {
      console.log(err);
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
      const users = await EmployeeModel.find({})
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
          const org = await OrganisationModel.findOne(
            { id: organisationId },
            "name"
          );
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
            (users_data[i].warehouseAddress_country =
              warehouse.warehouseAddress.country),
              (users_data[i].warehouseAddress_zipcode =
                warehouse.warehouseAddress.zipCode),
              (users_data[i].warehouseAddress_city =
                warehouse.warehouseAddress.city),
              (users_data[i].warehouseAddress_firstline =
                warehouse.warehouseAddress.firstLine);
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
        return apiResponse.successResponseWithData(
          req,
          res,
          "all_users_success",
          finalData
        );
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
          const org = await OrganisationModel.findOne(
            { id: organisationId },
            "name"
          );
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
            (users_data[i].warehouseAddress_country =
              warehouse.warehouseAddress.country),
              (users_data[i].warehouseAddress_zipcode =
                warehouse.warehouseAddress.zipCode),
              (users_data[i].warehouseAddress_city =
                warehouse.warehouseAddress.city),
              (users_data[i].warehouseAddress_firstline =
                warehouse.warehouseAddress.firstLine);
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
        return apiResponse.successResponseWithData(
          req,
          res,
          "all_users_success",
          finalData
        );
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
      })
        .skip(resPerPage * page - resPerPage)
        .limit(resPerPage);
      const confirmedUsers = users.filter((user) => user.walletAddress !== "");
      const org = await OrganisationModel.findOne(
        { id: req.params.organisationId },
        "name"
      );
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
            (users_data[i].warehouseAddress_country =
              warehouse.warehouseAddress.country),
              (users_data[i].warehouseAddress_zipcode =
                warehouse.warehouseAddress.zipCode),
              (users_data[i].warehouseAddress_city =
                warehouse.warehouseAddress.city),
              (users_data[i].warehouseAddress_firstline =
                warehouse.warehouseAddress.firstLine);
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
        return apiResponse.successResponseWithData(
          req,
          res,
          "all_users_success",
          finalData
        );
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
        "organisationTypes.id organisationTypes.name"
      );
      return apiResponse.successResponseWithData(
        req,
        res,
        "organization_types_success",
        organizations
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
        matchWarehouseCondition["warehouseDetails.warehouseAddress.state"] =
          new RegExp("^" + filters.state + "$", "i");
      }
      if (filters.district && filters.district !== "") {
        matchWarehouseCondition["warehouseDetails.warehouseAddress.city"] =
          new RegExp("^" + filters.district + "$", "i");
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
        organizations
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
        "warehouseTypes.id warehouseTypes.name"
      );
      return apiResponse.successResponseWithData(
        req,
        res,
        "warehouse_types_success",
        organizations
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
      return apiResponse.successResponseWithData(
        req,
        res,
        "warehouse_info_success",
        warehouseinfo
      );
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
        "organisationTypes.id organisationTypes.name"
      );
      return apiResponse.successResponseWithData(
        req,
        res,
        "organization_types_success",
        organizations
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
      const emailId = req.query.emailId;
      const phoneNumber = req.query.phoneNumber;
      const email = await EmployeeModel.find(
        { $or: [{ phoneNumber: "+" + phoneNumber }, { emailId: emailId ? emailId : '' }] },
        "emailId phoneNumber"
      );
      return apiResponse.successResponseWithData(
        req,
        res,
        "email_verification",
        email
      );
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
    FileStream.pipe(res);
  },
];

exports.switchLocation = [
  auth,
  async (req, res) => {
    try {
      const employee = await EmployeeModel.findOne({
        emailId: req.user.emailId,
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
      return apiResponse.successResponseWithData(
        req,
        res,
        "switch_location_success",
        returnData
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(req, res, "default_error");
    }
  },
];
