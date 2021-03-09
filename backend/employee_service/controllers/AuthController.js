const EmployeeModel = require('../models/EmployeeModel');
const WarehouseModel = require('../models/WarehouseModel');
const ConsumerModel = require('../models/ConsumerModel');
const InventoryModel = require('../models/InventoryModel');
const OrganisationModel = require('../models/OrganisationModel');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const uniqid = require('uniqid');

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
const blockchain_service_url = process.env.URL;
const stream_name = process.env.INV_STREAM;

const checkToken = require('../middlewares/middleware').checkToken;
const init = require('../logging/init');
const logger = init.getLog();
const EmailContent = require('../components/EmailContent');
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
  body('organisationId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Organisation must be specified.'),
  body('emailId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .custom(value => {
      return EmployeeModel.findOne({ emailId: value.toLowerCase() }).then(user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < register : Entered email is already present in EmployeeModel',
          );
          return Promise.reject('E-mail already in use');
        }
      });
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
          var employeeId = uniqid('emp-');
          var employeeStatus = 'NOTAPPROVED';
            
          //create organisation if doesn't exists 
          if (req.body.organisationName) {
            const organisationName = req.body.organisationName;
            const organisation = await OrganisationModel.findOne({ name: organisationName });
            if (organisation) {
              organisationId = organisation.id;
            }
            else {
              employeeStatus = 'ACTIVE';
              organisationId = uniqid('org-');
              const org = new OrganisationModel({
                primaryContactId: employeeId,
                name: organisationName,
                id: organisationId,
              });
              await org.save();
            }
          }

          // Create User object with escaped and trimmed data
          const user = new EmployeeModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            organisationId: organisationId,
            id: employeeId,
            accountStatus: employeeStatus
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
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
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
        const user = await EmployeeModel.findOne({ emailId });
        if(user) {
          if (user.accountStatus === 'ACTIVE') {
            logger.log(
                'info',
                '<<<<< UserService < AuthController < login : user is active',
            );
            let otp = utility.randomNumber(4);
            await EmployeeModel.update({emailId }, { otp });
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
                  'OTP Sent Success.'
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
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('otp')
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
        const user = await EmployeeModel.findOne(query);
        if (user && user.otp == req.body.otp) {
          await EmployeeModel.update(query, { otp: null });
          let userData = {
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
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.userInfo = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ emailId: req.user.emailId }).then(async user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < userInfo : user exist',
          );
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
            postalAddress
          } = user;
          const org = await OrganisationModel.findOne({ id: organisationId }, 'name' );
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
            location: postalAddress
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
      return apiResponse.successResponseWithData(res, 'Employee Profile update Success');
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
          bcrypt.hash(req.body.password, 10, function(err, hash) {
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
            user.save(function(err) {
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

exports.uploadImage = [
  auth,
  (req, res) => {
    try {
      EmployeeModel.findOne({ emailId: req.user.emailId }).then(user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < uploadImage : user exist',
          );
          base64Img.base64('uploads/' + req.file.filename, function(err, data) {
            var base64ImgData = data;
            user.profile_picture = data;
            user.image_location = req.file.filename;
            // Save user.
            user.save(function(err) {
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
];

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

exports.addWarehouse = [
  auth,
  async (req, res) => {
  try {
    const inventoryId = uniqid('inv-');
    const inventoryResult = new InventoryModel({ id: inventoryId });
    await inventoryResult.save();
    const {
      organisationId,
      postalAddress,
      region,
      country,
      location,
      supervisors,
      employees,
    } = req.body;
    const warehouseId = uniqid('war-');
    const warehouse = new WarehouseModel({
      id: warehouseId,
      organisationId,
      postalAddress,
      region,
      country,
      location,
      supervisors,
      employees,
      warehouseInventory: inventoryResult.id,
    });
    await warehouse.save();
    return apiResponse.successResponseWithData(
      res,
      'Warehouse added success',
      warehouse,
    );
  }catch(err) {
    return apiResponse.ErrorResponse(res, err);
  }


  },
];
