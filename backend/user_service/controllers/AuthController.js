const UserModel = require('../models/UserModel');
const { body, validationResult } = require('express-validator');
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
const blockchain_service_url = process.env.URL;

const init = require('../logging/init');
const logger = init.getLog();
const EmailContent = require('../components/EmailContent');
var md5 = require('md5');
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
  body('name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('name must be specified.'),
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .custom(value => {
      return UserModel.findOne({ email: value }).then(user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < register : Entered email is already present in UserModel',
          );
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  body('password')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be 6 characters or greater.'),
  // Sanitize fields.
  sanitizeBody('name').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
  // Process request after validation and sanitization.
  async (req, res) => {
    try {
      var re = /^[a-z0-9 ]+$/i;
      if (!req.body.name.match(re)) {
        logger.log(
          'warn',
          '<<<<< UserService < AuthController < register : Name should only consist of letters',
        );
        errors = {
          data: [
            {
              value: '',
              msg: 'Name should only consist of letters',
              param: 'name',
              location: 'body',
            },
          ],
        };
      }
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
      if(!mailer.validateEmail(req.body.email)) {
        return apiResponse.ErrorResponse(
          res,
          'Your email id is not eligible to register.',
        );
      }
      else {
        //hash input password
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          // generate OTP for confirmation
          logger.log(
            'info',
            '<<<<< UserService < AuthController < register : Generating Hash for Input Password',
          );
          let otp = utility.randomNumber(4);
          // Create User object with escaped and trimmed data
          var user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            confirmOTP: otp,
          });
          // Html email body
          let html = EmailContent({name: req.body.name, origin: req.headers.origin, otp});
          // Send confirmation email
          mailer
            .send(
              constants.confirmEmails.from,
              req.body.email,
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
                  _id: user._id,
                  Name: user.Name,
                  email: user.email,
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
            });
        });
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
exports.login = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('password')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Password must be specified.'),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
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
        UserModel.findOne({ email: req.body.email }).then(user => {
          if (user) {
            //Compare given password with db's hash.
            logger.log(
              'info',
              '<<<<< UserService < AuthController < login : Comparing entered password with existing password',
            );
            bcrypt.compare(req.body.password, user.password, function(
              err,
              same,
            ) {
              if (same) {
                logger.log(
                  'info',
                  '<<<<< UserService < AuthController < login : passwords are matching',
                );
                //Check account confirmation.
                if (user.isConfirmed) {
                  logger.log(
                    'info',
                    '<<<<< UserService < AuthController < login : account confirmation done',
                  );
                  // Check User's account active or not.
                  if (user.status) {
                    logger.log(
                      'info',
                      '<<<<< UserService < AuthController < login : user is active',
                    );
                    let userData = {
                      _id: user._id,
                      Name: user.Name,
                      email: user.email,
                      address: user.address,
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
                    return apiResponse.successResponseWithData(
                      res,
                      'Login Success.',
                      userData,
                    );
                  } else {
                    logger.log(
                      'warn',
                      '<<<<< UserService < AuthController < login : account is not active',
                    );
                    return apiResponse.unauthorizedResponse(
                      res,
                      'Account is not active. Please contact admin.',
                    );
                  }
                } else {
                  logger.log(
                    'warn',
                    '<<<<< UserService < AuthController < login : account is not confirmed',
                  );
                  return apiResponse.unauthorizedResponse(
                    res,
                    'Account is not confirmed. Please confirm your account.',
                  );
                }
              } else {
                logger.log(
                  'warn',
                  '<<<<< UserService < AuthController < login : entered email or passwords is wrong',
                );
                return apiResponse.unauthorizedResponse(
                  res,
                  'Email or Password wrong.',
                );
              }
            });
          } else {
            logger.log(
              'warn',
              '<<<<< UserService < AuthController < login : entered email or passwords is wrong again',
            );
            return apiResponse.unauthorizedResponse(
              res,
              'Email or Password wrong.',
            );
          }
        });
      }
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < login : error in login (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
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
exports.verifyConfirm = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('otp')
    .isLength({ min: 1 })
    .trim()
    .withMessage('OTP must be specified.'),
  sanitizeBody('email').escape(),
  sanitizeBody('otp').escape(),
  (req, res) => {
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
        var query = { email: req.body.email };
        UserModel.findOne(query).then(async user => {
          if (user) {
            logger.log(
              'info',
              '<<<<< UserService < AuthController < verifyConfirm : user exist',
            );
            //Check already confirm or not.
            if (!user.isConfirmed) {
              logger.log(
                'info',
                '<<<<< UserService < AuthController < verifyConfirm : user not confirmed',
              );
              //Check account confirmation.
              if (user.confirmOTP == req.body.otp) {
                const response = await axios.get(
                  `${blockchain_service_url}/createUserAddress`,
                );
                const address = response.data.items;
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
                ); //Granting permissons to the user

                //Update user as confirmed
                UserModel.findOneAndUpdate(query, {
                  isConfirmed: 1,
                  confirmOTP: null,
                  address,
                }).catch(err => {
                  logger.log(
                    'error',
                    '<<<<< UserService < AuthController < verifyConfirm : Error while updating user as confirmed',
                  );
                  return apiResponse.ErrorResponse(res, err);
                });
                logger.log(
                  'info',
                  '<<<<< UserService < AuthController < verifyConfirm : Confirming Account successfully',
                );
                return apiResponse.successResponse(
                  res,
                  'Account confirmed success.',
                );
              } else {
                logger.log(
                  'warn',
                  '<<<<< UserService < AuthController < verifyConfirm : otp does not match',
                );
                return apiResponse.unauthorizedResponse(
                  res,
                  'Otp does not match',
                );
              }
            } else {
              logger.log(
                'warn',
                '<<<<< UserService < AuthController < verifyConfirm : account is already confirmed',
              );
              return apiResponse.unauthorizedResponse(
                res,
                'Account already confirmed.',
              );
            }
          } else {
            logger.log(
              'warn',
              '<<<<< UserService < AuthController < verifyConfirm : specified email not found',
            );
            return apiResponse.unauthorizedResponse(
              res,
              'Specified email not found.',
            );
          }
        });
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

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.resendConfirmOtp = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  sanitizeBody('email').escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log(
          'error',
          '<<<<< UserService < AuthController < resendConfirmOtp : validation error',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        var query = { email: req.body.email };
        UserModel.findOne(query).then(user => {
          if (user) {
            logger.log(
              'info',
              '<<<<< UserService < AuthController < resendConfirmOtp : user exist',
            );
            //Check already confirm or not.
            if (!user.isConfirmed) {
              logger.log(
                'info',
                '<<<<< UserService < AuthController < resendConfirmOtp : user not confirmed, generating OTP',
              );
              // Generate otp
              let otp = utility.randomNumber(4);
              // Html email body
              let html =
                '<p>Please Confirm your Account.</p><p>OTP: ' + otp + '</p>';
              // Send confirmation email
              mailer
                .send(
                  constants.confirmEmails.from,
                  req.body.email,
                  'Confirm Account',
                  html,
                )
                .then(function() {
                  user.isConfirmed = 0;
                  user.confirmOTP = otp;
                  // Save user.
                  user.save(function(err) {
                    if (err) {
                      logger.log(
                        'info',
                        '<<<<< UserService < AuthController < resendConfirmOtp : Error while saving user',
                      );
                      return apiResponse.ErrorResponse(res, err);
                    }
                    logger.log(
                      'info',
                      '<<<<< UserService < AuthController < resendConfirmOtp : otp sent successfully',
                    );
                    return apiResponse.successResponse(
                      res,
                      'Confirm otp sent.',
                    );
                  });
                });
            } else {
              logger.log(
                'warn',
                '<<<<< UserService < AuthController < resendConfirmOtp : account already confirmed',
              );
              return apiResponse.unauthorizedResponse(
                res,
                'Account already confirmed.',
              );
            }
          } else {
            logger.log(
              'warn',
              '<<<<< UserService < AuthController < resendConfirmOtp : specified email not found',
            );
            return apiResponse.unauthorizedResponse(
              res,
              'Specified email not found.',
            );
          }
        });
      }
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < resendConfirmOtp : error(catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * User forgotPassword.
 *
 
 * @param {string}      email
   
 
 *
 * @returns {Object}
 */
exports.forgotPassword = [
  //validate fields
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  //sanitize fields
  sanitizeBody('email').escape(),
  (req, res) => {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log(
          'warn',
          '<<<<< UserService < AuthController < forgotPassword : validation error',
        );
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        return UserModel.findOne({ email: req.body.email }).then(user => {
          if (user) {
            logger.log(
              'info',
              '<<<<< UserService < AuthController < forgotPassword : user exist',
            );
            let newPassword = req.body.email + utility.randomNumber(10);
            //hash input password
            bcrypt.hash(newPassword, 10, function(err, hash) {
              // Html email body
              let html = '<p>your new password is </p>' + newPassword;
              // Send confirmation email
              mailer
                .send(
                  constants.confirmEmails.from,
                  req.body.email,
                  'ForgotPassword',
                  html,
                )
                .then(function() {
                  // Save user.

                  user.password = hash;
                  user.save(function(err) {
                    if (err) {
                      logger.log(
                        'error',
                        '<<<<< UserService < AuthController < forgotPassword : error while saving user',
                      );
                      return apiResponse.ErrorResponse(res, err);
                    } else {
                      logger.log(
                        'info',
                        '<<<<< UserService < AuthController < forgotPassword : password sent successfully to registered email',
                      );
                      return res.send(
                        'Password has been sent successfully to RegisteredEmail',
                      );
                    }
                  });
                })
                .catch(err => {
                  logger.log(
                    'error',
                    '<<<<< UserService < AuthController < forgotPassword : error (catch block 1)',
                  );
                  return apiResponse.ErrorResponse(res, err);
                });
            });
          }
        });
      }
    } catch (err) {
      logger.log(
        'error',
        '<<<<< UserService < AuthController < forgotPassword : error (catch block 2)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * User resetPassword.
 *
 
 * @param {string}      password
   @param {string}      newPassword
 
 *
 * @returns {Object}
 */
exports.resetPassword = [
  //validate fields
  body('password')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be 6 characters or greater.'),
  body('newPassword')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be 6 characters or greater.'),
  //sanitize the fields
  sanitizeBody('password').escape(),
  sanitizeBody('newPassword').escape(),
  (req, res) => {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log(
          'warn',
          '<<<<< UserService < AuthController < resetPassword : validation error',
        );
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } else {
        logger.log(
          'info',
          '<<<<< UserService < AuthController < resetPassword : password reset successfully',
        );
        res.json('password has been reset successfully');
      }
    } catch (err) {
      logger.log(
        'info',
        '<<<<< UserService < AuthController < resetPassword : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.userInfo = [
  auth,
  (req, res) => {
    try {
      UserModel.findOne({ email: req.user.email }).then(user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < userInfo : user exist',
          );
          let user_data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            organisation: user.organisation,
            status: user.status,
            affiliateOrganisation: user.affiliateOrganisation,
            role: user.role,
            profile_picture: user.profile_picture,
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
  (req, res) => {
    try {
      UserModel.findOne({ email: req.user.email }).then(user => {
        if (user) {
          logger.log(
            'info',
            '<<<<< UserService < AuthController < updateProfile : user exist',
          );
          const { name, organisation, affiliateOrganisation, phone } = req.body;
          user.name = name;
          user.organisation = organisation;
          user.affiliateOrganisation = affiliateOrganisation;
          user.phone = phone;
          user.save(function(err) {
            if (err) {
              logger.log(
                'error',
                '<<<<< UserService < AuthController < updateProfile : error while updating user profile',
              );
              return apiResponse.ErrorResponse(res, err);
            } else {
              logger.log(
                'info',
                '<<<<< UserService < AuthController < updateProfile : updating user',
              );
              return apiResponse.successResponse(
                res,
                user.name + ' user Updated',
              );
            }
          });
        }
      });
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
      UserModel.findOne({ email: req.user.email }).then(user => {
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
                  user.name + ' password Updated',
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
      UserModel.findOne({ email: req.user.email }).then(user => {
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
      const users = await UserModel.find({}, 'name address email');
      const confirmedUsers = users.filter(user => user.address !== '');
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
