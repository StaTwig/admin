const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel");
const ConsumerModel = require("../models/ConsumerModel");
const InventoryModel = require("../models/InventoryModel");
const OrganisationModel = require("../models/OrganisationModel");
const { check, validationResult} = require("express-validator");
const uniqid = require("uniqid");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
var base64Img = require("base64-img");
const auth = require("../middlewares/jwt");
const axios = require("axios");
const dotenv = require("dotenv").config();
const blockchain_service_url = process.env.URL;
const stream_name = process.env.INV_STREAM;

const checkToken = require("../middlewares/middleware").checkToken;
const EmailContent = require("../components/EmailContent");


exports.sendOtp = [
  check('emailId')
    .isLength({ min: 1 })
    .withMessage('Email must be specified.')
    .isEmail(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        const user = await EmployeeModel.findOne({ emailId });
        if(user) {
          if (user.accountStatus === 'ACTIVE') {
            let otp = utility.randomNumber(4);
            await EmployeeModel.updateOne({emailId },{ otp });
             let html = EmailContent({
            name: user.firstName,
            origin: req.headers.origin,
            otp,
          });
          // Send confirmation email
            try {
              await mailer
                  .send(
                      constants.confirmEmails.from,
                      user.emailId,
                      constants.confirmEmails.subject,
                      html,
                  );
              return apiResponse.successResponseWithData(
                  res,
                  'OTP Sent Success.',
                  otp,
              );
            }catch(err) {
              return apiResponse.ErrorResponse(res, err);
            }

           /* let userData = {
              id: user.id,
              firstName: user.firstName,
              emailId: user.emailId,
              role: user.role,
              warehouseId:user.warehouseId,
            };
            //Prepare JWT token for authentication
            const jwtPayload = userData;
            const jwtData = {
              expiresIn: process.env.JWT_TIMEOUT_DURATION,
            };
            const secret = process.env.JWT_SECRET;
            //Generated JWT token with Payload and secret.
            userData.token = jwt.sign(jwtPayload, secret, jwtData);
            logger.log(
                'info',
                '<<<<< UserService < AuthController < login : user login success',
            );*/

          } else {
            return apiResponse.unauthorizedResponse(
                res,
                'Account is not Approved. Please contact admin.',
            );
          }
        } else {
          return apiResponse.ErrorResponse(res, 'User not registered');
        }
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, 'Email already registered. Check Email for verifying the account');
    }
  },
];

exports.verifyOtp = [
  check('emailId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  check('otp')
    .isLength({ min: 1 })
    .trim()
    .withMessage('OTP must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        var query = { emailId };
        const user = await EmployeeModel.findOne(query);
        if (user && user.otp == req.body.otp) {
          if(user.role == "powerUser" || "admin")
          {
          await EmployeeModel.update(query, { otp: null });
          OrganisationModel.findOne({ id: user.organisationId}).select("name").then(OrgName=>{
            let userData = {
              id: user.id,
              firstName: user.firstName,
              emailId: user.emailId,
              role: user.role,
              warehouseId: user.warehouseId,
              organisationId: user.organisationId,
              organisationName:OrgName.name
            };
            //Prepare JWT token for authentication
            const jwtPayload = userData;
            const jwtData = {
              expiresIn: process.env.JWT_TIMEOUT_DURATION,
            };
            const secret = process.env.JWT_SECRET;
            //Generated JWT token with Payload and secret.
            userData.token = jwt.sign(jwtPayload, secret, jwtData);
            return apiResponse.successResponseWithData(res, 'Login Success', userData);
          }).catch(err=>{
            return apiResponse.ErrorResponse(res, err);
          })
        }
        else{
          return apiResponse.ErrorResponse(res, `User dosen't have enough Permission for Admin Model`);
        }
      } else {
          return apiResponse.ErrorResponse(res, `Otp doesn't match`);
        }
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.userInfo = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ emailId: req.user.emailId }).then(
        async (user) => {
          if (user) {
            const {
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
            } = user;
            const org = await OrganisationModel.findOne(
              { id: organisationId },
              "name"
            );
            let user_data = {
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
              location: postalAddress,
            };
            return apiResponse.successResponseWithData(
              res,
              "Sent Profile",
              user_data
            );
          } else {
            return apiResponse.ErrorResponse(res);
          }
        }
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
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
        phoneNumber,
        warehouseId,
        organisation,
      } = req.body;
      const organisationId = organisation.split("/")[1];
      const organisationName = organisation.split("/")[0];
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.phoneNumber = phoneNumber;
      employee.organisationId = organisationId;
      employee.warehouseId = warehouseId;
      await employee.save();
      return apiResponse.successResponseWithData(
        res,
        "Employee Profile update Success"
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.uploadImage = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ emailId: req.user.emailId }).then((user) => {
        if (user) {
          base64Img.base64(
            "uploads/" + req.file.filename,
            function (err, data) {
              var base64ImgData = data;
              user.profile_picture = data;
              user.image_location = req.file.filename;
              // Save user.
              user.save(function (err) {
                if (err) {
                  return apiResponse.ErrorResponse(res, err);
                }
                return apiResponse.successResponseWithData(
                  res,
                  "Updated",
                  base64ImgData
                );
              });
            }
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
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
        res,
        "Users Retrieved Success",
        confirmedUsers
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getOrgUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find({organisationId:req.user.organisationId});
      const confirmedUsers = users.filter((user) => user.walletAddress !== "");
      return apiResponse.successResponseWithData(
        res,
        "Organisation Users Retrieved Success",
        confirmedUsers
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find({organisationId:req.query.orgId});
      const confirmedUsers = users.filter((user) => user.walletAddress !== "");
      return apiResponse.successResponseWithData(
        res,
        "Organisation Users",
        confirmedUsers
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

