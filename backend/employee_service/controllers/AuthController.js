const EmployeeModel = require('../models/EmployeeModel');
const WarehouseModel = require('../models/WarehouseModel');
const ConsumerModel = require('../models/ConsumerModel');
const InventoryModel = require('../models/InventoryModel');
const OrganisationModel = require('../models/OrganisationModel');
const ConfigurationModel = require('../models/ConfigurationModel');
const CounterModel = require('../models/CounterModel');
const { body, validationResult} = require('express-validator');
const { sanitizeBody } = require('express-validator');
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../helpers/mailer');
const { constants } = require('../helpers/constants');
var base64Img = require('base64-img');
const auth = require('../middlewares/jwt');
const axios = require('axios');
const dotenv = require('dotenv').config();
// const fs = require("fs");
const moveFile = require("move-file");
const blockchain_service_url = process.env.URL;
const stream_name = process.env.INV_STREAM;
const checkToken = require('../middlewares/middleware').checkToken;
const init = require('../logging/init');
const logger = init.getLog();
const EmailContent = require('../components/EmailContent');
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRgex = /^\d{12}$/;

const { uploadFile } = require("../helpers/s3");
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

/**
 * Uniques email check
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.checkEmail = [
  // Validate fields.
  body('firstName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('name must be specified.'),
  body('lastName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('name must be specified.'),
  body('organisationId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Organisation must be specified.'),
  body('emailId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    // .isEmail()
    // .withMessage('Email must be a valid email address.')
    .custom(async value => {
      const emailId = value.toLowerCase().replace(' ', '');
      let user;
      let phone = '';
      if (!emailId.match(phoneRgex) && !emailId.match(emailRegex))
        return Promise.reject('E-mail/Mobile not in valid');

      if (emailId.indexOf('@') > -1)
        user = await EmployeeModel.findOne({ emailId });
      else {
        phone = '+' + emailId;
        user = await EmployeeModel.findOne({ phoneNumber: phone });
      }
      // return EmployeeModel.findOne({ emailId: value.toLowerCase() }).then(user => {
      if (user) {
        logger.log(
          'info',
          '<<<<< UserService < AuthController < register : Entered email is already present in EmployeeModel',
        );
        return Promise.reject('Account already in use');
      }
      // });
    }),
  // Process request after validation and sanitization.
  async (req, res) => {
    try {
      if (
        !req.body.firstName.match('[A-Za-z]') ||
        !req.body.lastName.match('[A-Za-z]')
      ) {
        logger.log(
          'warn',
          '<<<<< UserService < AuthController < register : Name should only consist of letters',
        );
        return apiResponse.ErrorResponse(
          res,
          'Name should only consists of letters',
        );
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        logger.log(
          'error',
          '<<<<< UserService < AuthController < register : Validation error',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      if (!mailer.validateEmail(req.body.emailId)) {
        return apiResponse.ErrorResponse(
          res,
          'Your email id is not eligible to register.',
        );
      } else {
        return apiResponse.successResponseWithData(
          res,
          'Continue',
          [],
        );
      }
    } catch (err) {
      //throw error in json response with status 500.
      logger.log(
        'error',
        '<<<<< UserService < AuthController < register : Error in catch block 2',
      );
      return apiResponse.ErrorResponse(res, err);
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
  // Validate fields.
  body('firstName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('name must be specified.'),
  body('lastName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('name must be specified.'),
  // body('authority')
  //   .isLength({ min: 1 })
  //   .trim()
  //   .withMessage('authority must be specified.'),
  body('organisationId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Organisation must be specified.'),
  body('emailId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    // .isEmail()
    // .withMessage('Email must be a valid email address.')
    .custom(async (value) => {
      const emailId = value.toLowerCase().replace(' ', '');
      let user;
      let phone = '';
      if (!emailId.match(phoneRgex) && !emailId.match(emailRegex))
        return Promise.reject('E-mail/Mobile not in valid');

      if (emailId.indexOf('@') > -1)
        user = await EmployeeModel.findOne({ emailId });
      else {
        phone = '+' + emailId;
        user = await EmployeeModel.findOne({ phoneNumber: phone });
      }

      // return EmployeeModel.findOne({ emailId: value.toLowerCase() }).then(user => {
      if (user) {
        logger.log(
          'info',
          '<<<<< UserService < AuthController < register : Entered email is already present in EmployeeModel',
        );
        return Promise.reject('E-mail/Mobile already in use');
      }
      // });
    }),
  // Process request after validation and sanitization.
  async (req, res) => {
    try {
      if (
        !req.body.firstName.match('[A-Za-z]') ||
        !req.body.lastName.match('[A-Za-z]')
      ) {
        logger.log(
          'warn',
          '<<<<< UserService < AuthController < register : Name should only consist of letters',
        );
        return apiResponse.ErrorResponse(
          res,
          'Name should only consists of letters',
        );
      }
      /*EmployeeModel.collection.dropIndexes(function(){
        EmployeeModel.collection.reIndex(function(finished){
                 console.log("finished re indexing")
               })
             })*/
      //EmployeeModel.createIndexes();
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        logger.log(
          'error',
          '<<<<< UserService < AuthController < register : Validation error',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      if (!mailer.validateEmail(req.body.emailId)) {
        return apiResponse.ErrorResponse(
          res,
          'Your email id is not eligible to register.',
        );
      } else {
        //hash input password
        // generate OTP for confirmation
        logger.log(
          'info',
          '<<<<< UserService < AuthController < register : Generating Hash for Input Password',
        );

        var organisationId = req.body.organisationId;
        var warehouseId = 'NA';

        const incrementCounterEmp = await CounterModel.update({
          'counters.name': "employeeId"
        }, {
          $inc: {
            "counters.$.value": 1
          }
        })

        const empCounter = await CounterModel.findOne({ 'counters.name': "employeeId" }, { "counters.name.$": 1 })
        var employeeId = empCounter.counters[0].format + empCounter.counters[0].value;

        //var employeeId = uniqid('emp-');
        var employeeStatus = 'NOTAPPROVED';
        let addr = '';

        //create organisation if doesn't exists 
        if (req.body.organisationName) {
          const organisationName = req.body.organisationName;
          const organisation = await OrganisationModel.findOne({ name: new RegExp('^'+organisationName+'$', "i") });
          if (organisation) {
            organisationId = organisation.id;
          }
          else {
            // employeeStatus = 'ACTIVE';
            // const centralOrg = await OrganisationModel.findOne({ type: 'CENTRAL_AUTHORITY' });
            // if (centralOrg) {
            //   if (centralOrg.configuration_id) {

            //   }
            // }
            const country = req.body?.address?.country ? req.body.address?.country : 'India';
            const address = req.body?.address ? req.body.address : {};
            addr = address.line1 + ', ' + address.city + ', ' + address.state + ', ' + address.pincode;
            const incrementCounterOrg = await CounterModel.update({
              'counters.name': "orgId"
            }, {
              $inc: {
                "counters.$.value": 1
              }
            })

            const orgCounter = await CounterModel.findOne({ 'counters.name': "orgId" }, { "counters.name.$": 1 })
            organisationId = orgCounter.counters[0].format + orgCounter.counters[0].value;

            //organisationId = uniqid('org-');
            const incrementCounterWarehouse = await CounterModel.update({
              'counters.name': "warehouseId"
            }, {
              $inc: {
                "counters.$.value": 1
              }
            })

            const warehouseCounter = await CounterModel.findOne({ 'counters.name': "warehouseId" }, { "counters.name.$": 1 })
            warehouseId = warehouseCounter.counters[0].format + warehouseCounter.counters[0].value;
            //warehouseId = uniqid('war-');
            const org = new OrganisationModel({
              primaryContactId: employeeId,
              name: organisationName,
              id: organisationId,
              type: req.body?.type ? req.body.type : 'CUSTOMER_SUPPLIER',
              status: 'NOTVERIFIED',
              postalAddress: addr,
              warehouses: [warehouseId],
              warehouseEmployees: [employeeId],
              country: {
                countryId: '001',
                countryName: country
              },
              configuration_id: 'CONF000',
              authority: req.body?.authority
            });
            await org.save();

            const incrementCounterInv = await CounterModel.update({
              'counters.name': "inventoryId"
            }, {
              $inc: {
                "counters.$.value": 1
              }
            })

            const invCounter = await CounterModel.findOne({ 'counters.name': "inventoryId" }, { "counters.name.$": 1 })
            const inventoryId = invCounter.counters[0].format + invCounter.counters[0].value;

            //const inventoryId = uniqid('inv-');
            const inventoryResult = new InventoryModel({ id: inventoryId });
            await inventoryResult.save();

            const warehouse = new WarehouseModel({
              title: 'Office',
              id: warehouseId,
              warehouseInventory: inventoryId,
              organisationId: organisationId,
              // postalAddress: address,
              warehouseAddress: {
                firstLine: address.line1,
                secondLine: "",
                city: address.city,
                state: address.state,
                country: address.country,
                landmark: "",
                zipCode: address.pincode
              },
              country: {
                countryId: '001',
                countryName: country
              }
            });
            await warehouse.save();
          }
        }

        const emailId = req.body.emailId.toLowerCase().replace(' ', '');
        let phone = '';
        if (emailId.indexOf('@') === -1)
          phone = '+' + emailId;
        // Create User object with escaped and trimmed data
        const user = new EmployeeModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailId: phone ? '' : req.body.emailId.toLowerCase(),
          phoneNumber: phone,
          organisationId: organisationId,
          id: employeeId,
          postalAddress: addr,
          accountStatus: employeeStatus,
          warehouseId: warehouseId
        });
        await user.save()
        return apiResponse.successResponse(res, 'User registered Success');
        // Html email body
        /* let html = EmailContent({
           name: req.body.name,
           origin: req.headers.origin,
           otp,
         });
         // Send confirmation email
         mailer
           .send(
             constants.confirmEmails.from,
             req.body.emailId,
             constants.confirmEmails.subject,
             html,
           )
           .then(function() {
             // Save user.
             user.save(function(err) {
               if (err) {
                 logger.log(
                   'info',
                   '<<<<< UserService < AuthController < register : Error while saving User',
                 );
                 return apiResponse.ErrorResponse(res, err);
               }
               let userData = {
                 id: user.id,
                 firstName: user.firstName,
                 lastName: user.lastName,
                 emailId: user.emailId,
                 warehouseId:user.warehouseId,
               };
               logger.log(
                 'info',
                 '<<<<< UserService < AuthController < register : Successfully saving User',
               );
               return apiResponse.successResponseWithData(
                 res,
                 'Registration Success.',
                 userData,
               );
             });
           })
           .catch(err => {
             logger.log(
               'error',
               '<<<<< UserService < AuthController < register : Error in catch block 1',
             );
             return apiResponse.ErrorResponse(res, err);
           });*/
      }
    } catch (err) {
      //throw error in json response with status 500.
      logger.log(
        'error',
        '<<<<< UserService < AuthController < register : Error in catch block 2',
      );
      return apiResponse.ErrorResponse(res, err);
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
  body('emailId')
    .isLength({ min: 10 })
    .trim()
    .withMessage('Email/Mobile must be specified.')
  //   .isEmail()
  // .withMessage('Email must be a valid email address.')
  ,
  sanitizeBody('emailId').escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      /* EmployeeModel.collection.dropIndexes(function(){
         EmployeeModel.collection.reIndex(function(finished){
                  console.log("finished re indexing")
                })
              })*/
      //EmployeeModel.createIndexes();
      if (!errors.isEmpty()) {
        logger.log(
          'info',
          '<<<<< UserService < AuthController < login : Validation Error while login',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        let user;
        let phone = '';
        if (emailId.indexOf('@') > -1)
          user = await EmployeeModel.findOne({ emailId });
        else {
          phone = '+' + emailId;
          user = await EmployeeModel.findOne({ phoneNumber: phone });
        }
        if (user) {
          if (user.accountStatus === 'ACTIVE') {
            logger.log(
              'info',
              '<<<<< UserService < AuthController < login : user is active',
            );
            let otp = utility.randomNumber(4);
            if (process.env.EMAIL_APPSTORE.includes(user.emailId) && user.emailId != '')
              otp = process.env.OTP_APPSTORE;

            await EmployeeModel.updateOne({ id: user.id }, { otp });

            axios.post(process.env.OTP_ENDPOINT, {
              subject: "OTP request for Vaccine Ledger",
              email: user.emailId,
              phone: user.phoneNumber ? user.phoneNumber : '',
              otp: otp.toString(),
              message: "Please Send the OTP",
              source: process.env.SOURCE
            })
              .then((response) => {
                if (response.status === 200) {
                  return apiResponse.successResponseWithData(
                    res,
                    'OTP Sent Success.',
                    { email: user.emailId }
                  );
                }
                else {
                  return apiResponse.ErrorResponse(res, response.statusText);
                }
              }, (error) => {
                console.log(error);
              });

            //   let html = EmailContent({
            //     name: user.firstName,
            //     origin: req.headers.origin,
            //     otp,
            //   });
            // // Send confirmation email
            //   try {
            //     await mailer
            //         .send(
            //             constants.confirmEmails.from,
            //             user.emailId,
            //             constants.confirmEmails.subject,
            //             html,
            //         );
            //     return apiResponse.successResponseWithData(
            //         res,
            //         'OTP Sent Success.'
            //     );
            //   }catch(err) {
            //     return apiResponse.ErrorResponse(res, err);
            //   }

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
            logger.log(
              'warn',
              '<<<<< UserService < AuthController < login : account is not approved.',
            );
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
      logger.log(
        'error',
        '<<<<< UserService < AuthController < login : error in login (catch block)',
      );
      return apiResponse.ErrorResponse(res, 'Email already registered. Check Email for verifying the account');
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
  body('emailId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email/Mobile must be specified.')
  // .isEmail()
  // .withMessage('Email must be a valid email address.'),
  , body('otp')
    .isLength({ min: 1 })
    .trim()
    .withMessage('OTP must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log(
          'error',
          '<<<<< UserService < AuthController < verifyConfirm : validation error',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        const emailId = req.body.emailId.toLowerCase();
        var query = { emailId };
        if (emailId.indexOf('@') === -1) {
          let phone = '+' + emailId;
          query = { phoneNumber: phone };
        }
        const user = await EmployeeModel.findOne(query);

        if (user && user.otp == req.body.otp) {

          var address;

          if (user.walletAddress == null || user.walletAddress == "wallet12345address") {
            const response = await axios.get(
              `${blockchain_service_url}/createUserAddress`,
            );
            address = response.data.items;
            const userData = {
              address,
            };
            logger.log(
              'info',
              '<<<<< UserService < AuthController < verifyConfirm : granting permission to user',
            );
            await axios.post(
              `${blockchain_service_url}/grantPermission`,
              userData,
            );
            await EmployeeModel.update(query, { otp: null, walletAddress: address });
          }
          else {
            address = user.walletAddress
          }

          let userData = {
            id: user.id,
            firstName: user.firstName,
            emailId: user.emailId,
            role: user.role,
            warehouseId: user.warehouseId[0],
            organisationId: user.organisationId,
            walletAddress: address,
	    phoneNumber: user.phoneNumber
          };
          //Prepare JWT token for authentication
          const jwtPayload = userData;
          const jwtData = {
            expiresIn: process.env.JWT_TIMEOUT_DURATION,
            //expiresIn: "12 hours"
          };
          const secret = process.env.JWT_SECRET;
          //Generated JWT token with Payload and secret.
          userData.token = jwt.sign(jwtPayload, secret, jwtData);
          logger.log(
            'info',
            '<<<<< UserService < AuthController < login : user login success',
          );
          return apiResponse.successResponseWithData(res, 'Login Success', userData);
        } else {
          return apiResponse.ErrorResponse(res, `Otp doesn't match`);
        }
      }
    } catch (err) {
	logger.log(
        'error',
        '<<<<< UserService < AuthController < verifyConfirm : Error (catch block)',
      );
      return apiResponse.ErrorResponse(res,err);
    }
  },
];

exports.userInfo = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ id: req.user.id }).then(async user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < userInfo : user exist',
          );
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
            postalAddress
          } = user;
          const org = await OrganisationModel.findOne({ id: organisationId }, 'name configuration_id');
          const warehouse = await EmployeeModel.findOne({ id }, { _id: 0, warehouseId: 1 });
          const warehouseArray = await WarehouseModel.find({ id: { "$in": warehouse.warehouseId } })
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
            configuration_id: org.configuration_id,
            location: postalAddress,
            warehouses: warehouseArray
          };
          logger.log(
            'info',
            '<<<<< UserService < AuthController < userInfo : sending profile',
          );
          return apiResponse.successResponseWithData(
            res,
            'Sent Profile',
            user_data,
          );
        } else {
          logger.log(
            'error',
            '<<<<< UserService < AuthController < userInfo : error while sending user info',
          );
          return apiResponse.ErrorResponse(res);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < userInfo : error (catch block)',
      );
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
        organisation
      } = req.body;
      const organisationId = organisation.split('/')[1];
      const organisationName = organisation.split('/')[0];
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.phoneNumber = phoneNumber;
      employee.organisationId = organisationId;
      employee.warehouseId = warehouseId;
      await employee.save();

      const returnData = { isRefresh: false };
      if (warehouseId !== req.user.warehouseId) {
        let userData = {
          id: employee.id,
          firstName: firstName,
          emailId: employee.emailId,
          role: employee.role,
          warehouseId: warehouseId,
          phoneNumber: user.phoneNumber
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
      return apiResponse.successResponseWithData(res, 'Employee Profile update Success', returnData);
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < updateProfile : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updatePassword = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ email: req.user.email }).then(user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < updatePassword : user exist',
          );
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            var passwordNew = hash;
            if (req.body.password) {
              logger.log(
                'info',
                '<<<<< UserService < AuthController < updatePassword : new password is not null',
              );
              if (req.body.password.length > 2) {
                logger.log(
                  'info',
                  '<<<<< UserService < AuthController < updatePassword : new password has length grater than 2',
                );
                user.password = passwordNew;
              }
            }
            user.save(function (err) {
              if (err) {
                logger.log(
                  'error',
                  '<<<<< UserService < AuthController < updatePassword : error while updating user password',
                );
                return apiResponse.ErrorResponse(res, err);
              } else {
                logger.log(
                  'info',
                  '<<<<< UserService < AuthController < updatePassword : updating password successfully',
                );
                return apiResponse.successResponse(
                  res,
                  user.firstName + ' password Updated',
                );
              }
            });
          });
        }
      });
    } catch (err) {
      logger.log(
        'info',
        '<<<<< UserService < AuthController < updatePassword : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/*exports.uploadImage = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ emailId: req.user.emailId }).then(user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < uploadImage : user exist',
          );
          base64Img.base64('uploads/' + req.file.filename, function (err, data) {
            var base64ImgData = data;
            user.profile_picture = data;
            user.image_location = req.file.filename;
            // Save user.
            user.save(function (err) {
              if (err) {
                logger.log(
                  'error',
                  '<<<<< UserService < AuthController < uploadImage : error while uploading image',
                );
                return apiResponse.ErrorResponse(res, err);
              }
              logger.log(
                'info',
                '<<<<< UserService < AuthController < uploadImage : uploading user image successfully',
              );
              return apiResponse.successResponseWithData(
                res,
                'Updated',
                base64ImgData,
              );
            });
          });
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < uploadImage : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];*/

exports.createUserAddress = [
  async (req, res) => {
    try {
      logger.log(
        'info',
        '<<<<< UserService < AuthController < createUserAddress : creating user address',
      );
      const response = await axios.get(
        `${blockchain_service_url}/createUserAddress`,
      );
      const address = response.data.items;
      const userData = {
        address,
      };
      const response_grant = await axios.post(
        `${blockchain_service_url}/grantPermission`,
        userData,
      );
      logger.log(
        'info',
        '<<<<< UserService < AuthController < createUserAddress : created user address',
      );
      res.json({ address: address });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < createUserAddress : error(catch block)',
      );
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
        'firstName walletAddress emailId',
      );
      const confirmedUsers = users.filter(user => user.walletAddress !== '');
      logger.log(
        'info',
        '<<<<< UserService < AuthController < getAllUsers : retrieved users successfully',
      );
      return apiResponse.successResponseWithData(
        res,
        'Users Retrieved Success',
        confirmedUsers,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < getAllUsers : error(catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.assignProductConsumer = [
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getAllInventoryDetails : token verified successfullly, querying data by publisher',
          );
          console.log('res', result.data.address);
          var user = new ConsumerModel({
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
          logger.log(
            'info',
            '<<<<< UserService < AuthController < registerConsumer : Successfully saving Consumer',
          );

          let date_ob = new Date();
          let date = ('0' + date_ob.getDate()).slice(-2);
          let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
          let year = date_ob.getFullYear();
          var today = date + '-' + month + '-' + year;

          const userData1 = {
            stream: stream_name,
            key: req.body.vaccine.serialNumber,
            address: '1bCBUXox5GXGAiTxGgNbmhETUaHMJZVLwctveT',
            data: {
              ...req.body,
              ...{ consumedStatus: 'Y', consumedDate: today },
            },
          };
          console.log('userData', userData1);
          const response = await axios.post(
            `${blockchain_service_url}/publish`,
            userData1,
          );
          const txnId = response.data.transactionId;

          const productQuery = { serialNumber: req.body.vaccine.serialNumber };
          const productFound = await InventoryModel.findOne(productQuery);
          if (productFound) {
            logger.log(
              'info',
              '<<<<< ShipmentService < ShipmentController < createShipment : product found status receive',
            );
            await InventoryModel.updateOne(productQuery, {
              transactionIds: [...productFound.transactionIds, txnId],
            });
          }
          return apiResponse.successResponseWithData(
            res,
            'Registration Success.',
            userData,
          );
        }
      });
    } catch (err) {
      console.log('err');
      logger.log(
        'error',
        '<<<<< UserService < AuthController < registerConsumer : Error in catch block',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getUserWarehouses = [
  auth,
  async (req, res) => {
    try {
      const users = await WarehouseModel.find({
        organisationId: req.user.organisationId
      });
      logger.log(
        'info',
        '<<<<< UserService < AuthController < getAllUsers : retrieved users successfully',
      );
      return apiResponse.successResponseWithData(
        res,
        "User warehouses",
        users,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < getAllUsers : error(catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];


exports.addWarehouse = [
  auth,
  async (req, res) => {
    try {
      const incrementCounterInv = await CounterModel.update({
        'counters.name': "inventoryId"
      }, {
        $inc: {
          "counters.$.value": 1
        }
      })

      const invCounter = await CounterModel.findOne({ 'counters.name': "inventoryId" }, { "counters.name.$": 1 })
      const inventoryId = invCounter.counters[0].format + invCounter.counters[0].value;
      const inventoryResult = new InventoryModel({ id: inventoryId });
      await inventoryResult.save();
      const {
        organisationId,
        postalAddress,
        title,
        region,
        country,
        location,
        warehouseAddress,
        supervisors,
        employees,
        bottleCapacity,
        sqft
      } = req.body;
      const incrementCounterWarehouse = await CounterModel.update({
        'counters.name': "warehouseId"
      }, {
        $inc: {
          "counters.$.value": 1
        }
      })

      const warehouseCounter = await CounterModel.findOne({ 'counters.name': "warehouseId" }, { "counters.name.$": 1 })
      const warehouseId = warehouseCounter.counters[0].format + warehouseCounter.counters[0].value;
      const warehouse = new WarehouseModel({
        id: warehouseId,
        organisationId,
        postalAddress,
        title,
        region,
        country,
        location,
        bottleCapacity,
        sqft,
        supervisors,
        employees,
        warehouseAddress,
        warehouseInventory: inventoryResult.id,
        status: 'NOTVERIFIED'
      });
      const s = await warehouse.save();
      /*await OrganisationModel.findOneAndUpdate({
                      id: organisationId
                }, {
                    $push: {
                        warehouses: warehouseId
                    }
                });*/
      await EmployeeModel.findOneAndUpdate({
        id: req.user.id
      }, {
        $push: {
          warehouseId: warehouseId
        }
      });

      return apiResponse.successResponseWithData(
        res,
        'Warehouse added success',
        warehouse,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }


  },
];

exports.updateWarehouseAddress = [
  auth,
  async (req, res) => {
    try {
      await WarehouseModel.findOneAndUpdate(
        { id: req.query.warehouseId },
        req.body,
        { new: true }
      )
        .then((warehouse) => {
          return apiResponse.successResponseWithData(
            res,
            "Warehouse Address Updated",
            warehouse
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.uploadImage = async function (req, res) {
  checkToken(req, res, async (result) => {
    if (result.success) {
      const {
        data
      } = result;
      // var filename;
      const {
        id,
        type,
        imageSide,
        action
      } = req.query;

      //     const incrementCounter = await CounterModel.updateOne({
      //       'counters.name': "employeeImage"
      //     }, {
      //       $inc: {
      //         "counters.$.value": 1
      //       }
      //     })

      //     const poCounter = await CounterModel.find({
      //       "counters.name": "employeeImage"
      //     }, {
      //       "counters.name.$": 1
      //     })
      //     const t = JSON.parse(JSON.stringify(poCounter[0].counters[0]))
      //     try {
      //       if (action == "STOREID")
      //   filename = t.value + "-" + req.file.filename;
      //       else if (action == "PROFILE")
      //   filename = "PROFILE" + "-" +  data.id + ".png"
      // else
      //          filename = id + "-" + type + imageSide + "-" + t.format + t.value + ".png";	

      // let dir = `/home/ubuntu/userimages`;
      //       await moveFile(req.file.path, `${dir}/${filename}`);
      //     } catch (e) {
      //       console.log("Error in image upload", e);
      //       res.status(403).json(e);
      //     }

      try {
        const Upload = await uploadFile(req.file)
        console.log(Upload)
        await unlinkFile(req.file.path)
        if (action == "KYCUPLOAD") {
          const update = await EmployeeModel.findOneAndUpdate({
            $and: [{
              "userDocuments.idNumber": parseInt(id)
            }, {
              "userDocuments.idType": type
            }]
          }, {
            "$push": {
              "userDocuments.$.imageDetails": `${Upload.key}`
            }
          }, { new: true })
          return apiResponse.successResponseWithData(res, "Image Uploaded", update);
        } else if (action == "STOREID") {
          const userData = {
            "userDocuments": {
              "imageDetails": [
                `${Upload.key}`
              ],
              "idType": "STOREID",
            }
          }
          const employee = await EmployeeModel.findOneAndUpdate({
            emailId: data.emailId
          }, {
            $push: userData
          }, { new: true });
          return apiResponse.successResponseWithData(res, "StoreID Image Uploaded", employee)
        } else if (action == "KYCNEW") {
          const userData = {
            "userDocuments": {
              "imageDetails": [
                `${Upload.key}`
              ],
              "idType": type,
              "idNumber": parseInt(id),
              "approvalStatus": "NOTAPPROVED"
            }
          }
          const employee = await EmployeeModel.findOneAndUpdate({
            emailId: data.emailId
          }, {
            $push: userData
          }, { new: true });
          return apiResponse.successResponseWithData(res, "KYC Image Uploaded", employee)
        } else if (action == "PROFILE") {
          const employeeUpdate = await EmployeeModel.findOneAndUpdate({
            emailId: data.emailId
          }, {
            $set: { "photoId": `/usermanagement/api/auth/images/${Upload.key}` }
          }, { new: true });
          return apiResponse.successResponseWithData(res, "Profile Image Uploaded ", employeeUpdate)
        } else {
          return apiResponse.ErrorResponse(res, "Please check the type action you want to perfrom STOREID/KYCNEW/KYCUPLOAD ")
        }
      }
      catch (err) {
        console.log(err);
        return apiResponse.ErrorResponse(res, err);
      }
    } else {
      return apiResponse.ErrorResponse(res, result)
    }
  });
};

exports.fetchImage = async function (req, res) {
  checkToken(req, res, async (result) => {
    if (result.success) {
      const {
        data
      } = result;
      const {
        type
      } = req.query;
      var imageArray = [];
      const findRecord = await EmployeeModel.findOne({
        $and: [{
          "emailId": data.emailId
        }, {
          "userDocuments.idType": type
        }]
      });
      if (findRecord != null) {

        const update = await EmployeeModel.findOne({
          $and: [{
            "emailId": data.emailId
          }, {
            "userDocuments.idType": type
          }]
        }, {
          "userDocuments.$.imageDetails": 1
        }).then((result) => {
          imageArray = result.userDocuments[0].imageDetails;
        }).catch((e) => {
          console.log("Err", e)
        })

        var resArray = [];
        for (i = 0; i < imageArray.length; i++) {
          const s = "/images/" + imageArray[i];
          resArray.push(s)
        }
      } else {
        return res.send({
          success: false,
          data: "Matching ID number and type not found.! STOREID/Aadhar/Passport"
        })

      }
      return res.send({
        success: true,
        data: resArray
      })

    } else {
      res.json(result);
    }
  });
};

exports.getAllRegisteredUsers = [
  auth,
  async (req, res) => {
    try {
      const resPerPage = 10; // results per page
      const page = req.query.page || 1; // Page 
      const totalRecords = await EmployeeModel.count({})
      const users = await EmployeeModel.find({}).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);;
      const confirmedUsers = users.filter(user => user.walletAddress !== '');
      if (confirmedUsers.length > 0) {
        logger.log(
          'info',
          `<<<<< EmployeeService < AuthController < No of Employees : ${users.length}`,
        );
        var users_data = [];
        for (var i in confirmedUsers) {
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
            postalAddress
          } = confirmedUsers[i];
          const org = await OrganisationModel.findOne({ id: organisationId }, 'name');
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
            users_data[i].organization = `${org.name}/${organisationId}`
          }
          else users_data[i].organization = null
          if (warehouse && warehouse.warehouseAddress) {
            users_data[i].warehouseAddress_country = warehouse.warehouseAddress.country,
              users_data[i].warehouseAddress_zipcode = warehouse.warehouseAddress.zipCode,
              users_data[i].warehouseAddress_city = warehouse.warehouseAddress.city,
              users_data[i].warehouseAddress_firstline = warehouse.warehouseAddress.firstLine
          }
          else {
            users_data[i].warehouseAddress_country = null,
              users_data[i].warehouseAddress_zipcode = null,
              users_data[i].warehouseAddress_city = null,
              users_data[i].warehouseAddress_firstline = null
          }
        }
        const finalData = {
          totalRecords: totalRecords,
          data: users_data
        }
        logger.log(
          'info',
          '<<<<< UserService < AuthController < userInfo : sending profile',
        );
        return apiResponse.successResponseWithData(
          res,
          'Sent Profile',
          finalData,
        );
      }
      else {
        logger.log(
          'error',
          '<<<<< EmployeeService < AuthController < userInfo : error while sending user info',
        );
        return apiResponse.ErrorResponse(res, "No users found");
      }
    } catch (err) {
      logger.log(
        'error',
        '<<<<< EmployeeService < AuthController < userInfo : error (catch block)',
      );
      console.log(err)
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getAllUsersByWarehouse = [
  auth,
  async (req, res) => {
    try {
      const resPerPage = 10; // results per page
      const page = req.query.page || 1; // Page 
      const totalRecords = await EmployeeModel.count({ warehouseId: req.params.warehouseId })
      const users = await EmployeeModel.find({ warehouseId: req.params.warehouseId }).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);;
      const confirmedUsers = users.filter(user => user.walletAddress !== '');
      const warehouse = await WarehouseModel.findOne({ id: req.params.warehouseId });
      if (confirmedUsers.length > 0) {
        logger.log(
          'info',
          `<<<<< EmployeeService < AuthController < No of Employees : ${users.length}`,
        );
        var users_data = [];
        for (var i in confirmedUsers) {
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
            postalAddress
          } = confirmedUsers[i];
          const org = await OrganisationModel.findOne({ id: organisationId }, 'name');
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
            users_data[i].organization = `${org.name}/${organisationId}`
          }
          else users_data[i].organization = null
          if (warehouse && warehouse.warehouseAddress) {
            users_data[i].warehouseAddress_country = warehouse.warehouseAddress.country,
              users_data[i].warehouseAddress_zipcode = warehouse.warehouseAddress.zipCode,
              users_data[i].warehouseAddress_city = warehouse.warehouseAddress.city,
              users_data[i].warehouseAddress_firstline = warehouse.warehouseAddress.firstLine
          }
          else {
            users_data[i].warehouseAddress_country = null,
              users_data[i].warehouseAddress_zipcode = null,
              users_data[i].warehouseAddress_city = null,
              users_data[i].warehouseAddress_firstline = null
          }
        }
        const finalData = {
          totalRecords: totalRecords,
          data: users_data
        }
        logger.log(
          'info',
          '<<<<< EmployeeService < AuthController < userInfo : sending profile',
        );
        return apiResponse.successResponseWithData(
          res,
          'Sent Profile',
          finalData,
        );
      }
      else {
        logger.log(
          'error',
          '<<<<< EmployeeService < AuthController < userInfo : error while sending user info',
        );
        return apiResponse.ErrorResponse(res, "No users found");
      }
    } catch (err) {
      console.log(err)
      logger.log(
        'error',
        '<<<<< EmployeeService < AuthController < userInfo : error (catch block)',
      );
      console.log(err)
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getAllUsersByOrganisation = [
  auth,
  async (req, res) => {
    try {
      const resPerPage = 10; // results per page
      const page = req.query.page || 1; // Page 
      const totalRecords = await EmployeeModel.count({ organisationId: req.params.organisationId })
      const users = await EmployeeModel.find({ organisationId: req.params.organisationId }).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);;
      const confirmedUsers = users.filter(user => user.walletAddress !== '');
      const org = await OrganisationModel.findOne({ id: req.params.organisationId }, 'name');
      if (confirmedUsers.length > 0) {
        logger.log(
          'info',
          `<<<<< EmployeeService < AuthController < No of Employees : ${users.length}`,
        );
        var users_data = [];
        for (var i in confirmedUsers) {
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
            postalAddress
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
            users_data[i].organization = `${org.name}/${organisationId}`
          }
          else users_data[i].organization = null
          if (warehouse && warehouse.warehouseAddress) {
            users_data[i].warehouseAddress_country = warehouse.warehouseAddress.country,
              users_data[i].warehouseAddress_zipcode = warehouse.warehouseAddress.zipCode,
              users_data[i].warehouseAddress_city = warehouse.warehouseAddress.city,
              users_data[i].warehouseAddress_firstline = warehouse.warehouseAddress.firstLine
          }
          else {
            users_data[i].warehouseAddress_country = null,
              users_data[i].warehouseAddress_zipcode = null,
              users_data[i].warehouseAddress_city = null,
              users_data[i].warehouseAddress_firstline = null
          }
        }
        const finalData = {
          totalRecords: totalRecords,
          data: users_data
        }
        logger.log(
          'info',
          '<<<<< EmployeeService < AuthController < userInfo : sending profile',
        );
        return apiResponse.successResponseWithData(
          res,
          'Sent Profile',
          finalData,
        );
      }
      else {
        logger.log(
          'error',
          '<<<<< EmployeeService < AuthController < userInfo : error while sending user info',
        );
        return apiResponse.ErrorResponse(res, "No users found");
      }
    } catch (err) {
      logger.log(
        'error',
        '<<<<< EmployeeService < AuthController < userInfo : error (catch block)',
      );
      console.log(err)
      return apiResponse.ErrorResponse(res, err);
    }
  },
];


exports.getOrganizationsByType = [
//without auth for new user register 
  async (req, res) => {
    try {
      const organisationId = req.query.id;
      const organisations = await ConfigurationModel.find({ id: organisationId }, 'organisationTypes.id organisationTypes.name')
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        organisations
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getOrganizationsByTypeForAbInBev = [

  async (req, res) => {
    try {
      const filters = req.query;
      let matchCondition = {};
      matchCondition.status = 'ACTIVE';
      if (filters.status && filters.status !== '') {
        matchCondition.status = filters.status;
      }
      if (filters.state && filters.state !== '') {
        matchCondition.state = filters.state;
      }
      if (filters.district && filters.district !== '') {
        matchCondition.district = filters.district;
      }

      if (filters.type === "SUPPLIER") {
        matchCondition.$or = [{ type: "S1" }, { type: "S2" }, { type: "S3" }];
      } else {
        matchCondition.type = filters.type;
      }
      console.log(matchCondition);
      const organisations = await OrganisationModel.aggregate([
        {
          $match: matchCondition,
        },
        {
          $project: {
            id: 1,
            name: 1,
            type: 1
          }
        }
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        organisations
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getwarehouseByType = [
  auth,
  async (req, res) => {
    try {
      const organisationId = req.query.id;
      console.log(organisationId);
      const organisations = await ConfigurationModel.find({ id: organisationId }, 'warehouseTypes.id warehouseTypes.name')
      console.log(organisations)
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        organisations
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getwarehouseinfo = [
  auth,
  async (req, res) => {
    try {
      const warehouseId = req.query.id;
      const warehouseinfo = await WarehouseModel.find({ id: warehouseId })

      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        warehouseinfo
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getOrganizationsTypewithauth = [
   auth, 
  async (req, res) => {
    try {
      const organisationId = req.query.id;
      const organisations = await ConfigurationModel.find({ id: organisationId }, 'organisationTypes.id organisationTypes.name')
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        organisations
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.emailverify=[
  auth,
  async (req,res)=>{
    try{
      const emailId= req.query.emailId;
      console.log(emailId)
      const email= await EmployeeModel.find({emailId},'emailId')
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        email
      );
    } catch(err){
      logger.log(
        'error',
        '<<<<< EmployeeService < AuthController < emailverify : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];