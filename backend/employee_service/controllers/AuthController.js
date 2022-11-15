const EmployeeModel = require("../models/EmployeeModel");
const OrganisationModel = require("../models/OrganisationModel");
const { check, validationResult } = require("express-validator");
require("dotenv").config();
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const JWT = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const auth = require("../middlewares/jwt");
const axios = require("axios");
const { uploadFile, getSignedUrl } = require("../helpers/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const moment = require("moment");
const EmailContent = require("../components/EmailContent");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRgex = /^\d{10}$/;

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

exports.sendOtp = [
  check("emailId")
    .isLength({ min: 7 })
    .withMessage("Email / Number must be specified.")
    .custom(async (value) => {
      const emailId = value.toLowerCase().replace(" ", "");
      let user;
      let phone = "";
      if (
        !emailId.replace("+91", "").match(phoneRgex) &&
        !emailId.match(emailRegex)
      )
        return Promise.reject("E-mail/Mobile not in valid");

      if (emailId.indexOf("@") > -1)
        user = await EmployeeModel.findOne({ emailId });
      else {
        phone = emailId.indexOf("+91") === 0 ? emailId : "+91" + emailId;
        user = await EmployeeModel.findOne({ phoneNumber: phone });
      }
      if (!user) {
        return Promise.reject("Account Doesn’t exit");
      }
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        let user;
        let phone = "";
        if (emailId.indexOf("@") > -1)
          user = await EmployeeModel.findOne({ emailId });
        else {
          phone = emailId.indexOf("+91") === 0 ? emailId : "+91" + emailId;
          user = await EmployeeModel.findOne({ phoneNumber: phone });
        }
        if (user) {
          if (user.accountStatus === "ACTIVE") {
            let otp = utility.randomNumber(4);
            if (user.emailId === process.env.EMAIL_APPSTORE)
              otp = process.env.OTP_APPSTORE;

            await EmployeeModel.updateOne({ id: user.id }, { otp });
            if (emailId.indexOf("@") > -1) {
              let html = EmailContent({
                name: user.firstName,
                origin: req.headers.origin || "admin.abinbev.statledger.io",
                otp,
                email: user.emailId,
              });
              // Send confirmation email
              try {
                await mailer.send(
                  constants.confirmEmails.from,
                  user.emailId,
                  constants.confirmEmails.subject,
                  html
                );
                return apiResponse.successResponseWithData(
                  res,
                  "OTP Sent Success."
                );
              } catch (err) {
                return apiResponse.ErrorResponse(res, err);
              }
            }
            axios
              .post(process.env.OTP_ENDPOINT, {
                subject: "OTP request for Vaccine Ledger",
                email: user.emailId,
                phone: user.phoneNumber ? user.phoneNumber : "",
                otp: otp.toString(),
                message: "Please Send the OTP",
                source: process.env.SOURCE,
              })
              .then(
                (response) => {
                  if (response.status === 200) {
                    return apiResponse.successResponseWithData(
                      res,
                      "OTP Sent Success.",
                      { email: user.emailId }
                    );
                  } else {
                    return apiResponse.ErrorResponse(res, response.statusText);
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
          } else {
            return apiResponse.unauthorizedResponse(
              res,
              "Account is not Approved. Please contact admin."
            );
          }
        } else {
          return apiResponse.ErrorResponse(res, "User not registered");
        }
      }
    } catch (err) {
      return apiResponse.ErrorResponse(
        res,
        "Email already registered. Check Email for verifying the account"
      );
    }
  },
];

exports.verifyOtp = [
  check("emailId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  check("otp")
    .isLength({ min: 1 })
    .trim()
    .withMessage("OTP must be specified."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        var query = { emailId };
        const user = await EmployeeModel.findOne(query);
        if (user && user.otp == req.body.otp) {
          if (user.role == "powerUser" || user.role == "admin") {
            await EmployeeModel.updateOne(query, { otp: null });
            const OrgName = await OrganisationModel.findOne({
              id: user.organisationId,
            }).select("name type");
            let userData = {
              id: user.id,
              firstName: user.firstName,
              emailId: user.emailId,
              role: user.role,
              warehouseId: user.warehouseId,
              organisationId: user.organisationId,
              organisationName: OrgName.name,
              organisationType: OrgName.type,
            };
            //Prepare JWT token for authentication
            const jwtPayload = userData;
            const jwtData = {
              expiresIn: process.env.JWT_TIMEOUT_DURATION,
            };
            const secret = process.env.JWT_SECRET;
            //Generated JWT token with Payload and secret.
            userData.token = JWT.sign(jwtPayload, secret, jwtData);
            return apiResponse.successResponseWithData(
              res,
              "Login Success",
              userData
            );
          } else {
            return apiResponse.ErrorResponse(
              res,
              `User doesn't have enough Permission for Admin Module`
            );
          }
        } else {
          return apiResponse.ErrorResponse(res, `Otp doesn't match`);
        }
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
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
              "name type"
            );
            let user_data = {
              firstName,
              lastName,
              emailId,
              phoneNumber,
              walletAddress,
              affiliatedOrganisations,
              organisation: `${org.name}/${organisationId}`,
              type: `${org.type}`,
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
      const { firstName, lastName, phoneNumber, warehouseId, organisation } =
        req.body;
      const organisationId = organisation.split("/")[1];
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
  async (req, res) => {
    try {
      const result = await uploadFile(req.file);
      console.log(result);
      await unlinkFile(req.file.path);
      console.log("Unlinked");
      const image = await EmployeeModel.findOneAndUpdate(
        { emailId: req.user.emailId },
        { photoId: `/usermanagement/api/auth/images/${result.key}` },
        { new: true }
      );
      return apiResponse.successResponseWithData(res, "Uploaded ", image);
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

exports.getWarehouseUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find(
        {warehouseId: req.query.warehouseId}
      );
      return apiResponse.successResponseWithData(
        res,
        "Users Retrieved Success",
        users
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
            country: "$orgs.country"
          },
        },
        {$skip: parseInt(req.query.skip) || 0},
        {$limit: parseInt(req.query.limit) || 0}
      ]);

      return apiResponse.successResponseWithData(
        res,
        "Organisation Users",
        users
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getOrgUserAnalytics = [
  auth,
  async (req, res) => {
    try{
      const {orgId} = req.query;
      let matchQuery = orgId ? {organisationId: orgId} : {};
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
                  userInitials: 1
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
        inactiveCount:  analytics[0].total.count - analytics[0].active.count,
        userInitials: analytics[0].total.userInitials
      }
      return apiResponse.successResponseWithData(
        res,
        "User Analytics",
        analyticsObject
      );
    }catch(err){
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  }
]

exports.getUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find({
        organisationId: req.query.orgId,
      });
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

exports.getOrgActiveUsers = [
  auth,
  async (req, res) => {
    try {
      const users = await EmployeeModel.find({
        organisationId: req.user.organisationId,
        accountStatus: "ACTIVE",
      }).select("firstName lastName emailId id");
      return apiResponse.successResponseWithData(
        res,
        "Organisation active users",
        users
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.Image = [
  auth,
  async (req, res) => {
    try {
      const signedUrl = await getSignedUrl(req.params.key);
      return apiResponse.successResponseWithData(res, "Image URL", signedUrl);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

