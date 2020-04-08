const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
var base64Img = require('base64-img');
const auth = require("../middlewares/jwt");
const axios = require('axios');
const dotenv = require('dotenv').config();
const blockchain_service_url = process.env.URL;

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
	body("name").isLength({ min: 1 }).trim().withMessage("name must be specified.")
		.isAlphanumeric().withMessage("name has non-alphanumeric characters."),
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return UserModel.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	// Sanitize fields.
	sanitizeBody("name").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	// Process request after validation and sanitization.
	async (req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				//hash input password
				bcrypt.hash(req.body.password,10,function(err, hash) {
					// generate OTP for confirmation
					let otp = utility.randomNumber(4);
					// Create User object with escaped and trimmed data
					var user = new UserModel(
						{
							name: req.body.name,
							email: req.body.email,
							password: hash,
							confirmOTP: otp
						}
					);
					// Html email body
					let html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}. Verify Link http://localhost:3000/verify </p>`;
					// Send confirmation email
					mailer.send(
						constants.confirmEmails.from, 
						req.body.email,
						"Confirm Account",
						html
					).then(function(){
						// Save user.
						user.save(function (err) {
							if (err) { return apiResponse.ErrorResponse(res, err); }
							let userData = {
								_id: user._id,
								Name: user.Name,
								email: user.email
							};
							return apiResponse.successResponseWithData(res,"Registration Success.", userData);
						});
					}).catch(err => {
						console.log(err);
						return apiResponse.ErrorResponse(res,err);
					}) ;
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				UserModel.findOne({email : req.body.email}).then(user => {
					if (user) {
						//Compare given password with db's hash.
						bcrypt.compare(req.body.password,user.password,function (err,same) {
							if(same){
								//Check account confirmation.
								if(user.isConfirmed){
									// Check User's account active or not.
									if(user.status) {
										let userData = {
											_id: user._id,
											Name: user.Name,
											email: user.email,
											address: user.address
										};
										//Prepare JWT token for authentication
										const jwtPayload = userData;
										const jwtData = {
											expiresIn: process.env.JWT_TIMEOUT_DURATION,
										};
										const secret = process.env.JWT_SECRET;
										//Generated JWT token with Payload and secret.
										userData.token = jwt.sign(jwtPayload, secret, jwtData);
										return apiResponse.successResponseWithData(res,"Login Success.", userData);
									}else {
										return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
									}
								}else{
									return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
								}
							}else{
								return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
							}
						});
					}else{
						return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * Verify Confirm otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */
exports.verifyConfirm = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("otp").isLength({ min: 1 }).trim().withMessage("OTP must be specified."),
	sanitizeBody("email").escape(),
	sanitizeBody("otp").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then( async user => {
					if (user) {
						//Check already confirm or not.
						if(!user.isConfirmed){
							//Check account confirmation.
							if(user.confirmOTP == req.body.otp){
                const response = await axios.get(`${blockchain_service_url}/createUserAddress`);
                const address = response.data.items;
		const userData = {
                  address
                };
                await axios.post(`${blockchain_service_url}/grantPermission`,userData); //Granting permissons to the user

								//Update user as confirmed
								UserModel.findOneAndUpdate(query, {
									isConfirmed: 1,
									confirmOTP: null,
									address
								}).catch(err => {
									return apiResponse.ErrorResponse(res, err);
								});
								return apiResponse.successResponse(res,"Account confirmed success.");
							}else{
								return apiResponse.unauthorizedResponse(res, "Otp does not match");
							}
						}else{
							return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
						}
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.resendConfirmOtp = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	sanitizeBody("email").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						//Check already confirm or not.
						if(!user.isConfirmed){
							// Generate otp
							let otp = utility.randomNumber(4);
							// Html email body
							let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";
							// Send confirmation email
							mailer.send(
								constants.confirmEmails.from, 
								req.body.email,
								"Confirm Account",
								html
							).then(function(){
								user.isConfirmed = 0;
								user.confirmOTP = otp;
								// Save user.
								user.save(function (err) {
									if (err) { return apiResponse.ErrorResponse(res, err); }
									return apiResponse.successResponse(res,"Confirm otp sent.");
								});
							});
						}else{
							return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
						}
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * User forgotPassword.
 *
 
 * @param {string}      email
   
 
 *
 * @returns {Object}
 */
exports.forgotPassword = [
	//validate fields
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
		//sanitize fields
	sanitizeBody("email").escape(),
	(req, res) => {
		try {
			// Extract the validation errors from a request.
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			 // Display sanitized values/errors messages.
			return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
		}else {

			return UserModel.findOne({email : req.body.email}).then((user) => {
				if (user) {
					let html = "<p>your password is XXXXX.</p>";
				// Send confirmation email
				mailer.send(
					constants.confirmEmails.from, 
					req.body.email,
					"ForgotPassword",
					html
				);
				return res.send("Password has been sent successfully to RegisteredEmail");
				}
			});
				
		}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];


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
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body("newPassword").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	  //sanitize the fields
		 sanitizeBody("password").escape(),
		 sanitizeBody("newPassword").escape(),
	(req, res) => {
		try {
			// Extract the validation errors from a request.
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			 // Display sanitized values/errors messages.
			return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
		}else {

			res.json("password has been reset successfully")
				
		}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];
	
	exports.userInfo = [
		auth,		 
		(req, res) => {
			try {
				console.log(req.user.email);
				UserModel.findOne({email : req.user.email}).then((user) => {
					if (user) {
						console.log(user);
						let user_data = {
							name : user.name,
							email : user.email,
							phone : user.phone,
							address : user.address,
							organization : user.organization,
							status : user.status,
							profile_picture : user.profile_picture,
						}
						return apiResponse.successResponseWithData(res,"Sent Profile",user_data);
					}
					else {
					console.log("Failed")
					return apiResponse.ErrorResponse(res);
					}
				});
					
			
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}
		}];
		
	exports.updateProfile = [
		auth,		 
		(req, res) => {
			try {
		
				UserModel.findOne({email : req.user.email}).then((user) => {
					if (user) {
						console.log(user.name)
						if(req.body.name){
							user.name = req.body.name;
							console.log(user.name)
						}
						if(req.body.organization){
							user.organization = req.body.organization;
						}
						if(req.body.email){
							user.email = req.body.email;
						}
						if(req.body.phone){
							user.phone = req.body.phone;
						}
						user.save(function (err) {
							if (err) { return apiResponse.ErrorResponse(res, err); }
							
						});	
						// if(req.file){		
						// console.log(req.file);
						// base64Img.base64('uploads/'+req.file.filename, function(err, data) {
						// user.profile_picture = data;
						// user.image_location = req.file.filename;
						// 		// Save user.
						// 		user.save(function (err) {
						// 			if (err) { return apiResponse.ErrorResponse(res, err); }
									
						// 		});								
						// 	})
						// }
					}
					console.log("Updated")
					return apiResponse.successResponse(res, user.name + " user Updated");
				});
					
			
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}
		}];
		exports.uploadImage = [
			auth,		 
			(req, res) => {
				try {
			
					UserModel.findOne({email : req.user.email}).then((user) => {
						if (user) {
		
							console.log(req.file);
							base64Img.base64('uploads/'+req.file.filename, function(err, data) {
							user.profile_picture = data;
							user.image_location = req.file.filename;
									// Save user.
									user.save(function (err) {
										if (err) { return apiResponse.ErrorResponse(res, err); }
										
									});								
								})
							}
						
						console.log("Updated")
						return apiResponse.successResponse(res,"Updated");
					});
						
				
				} catch (err) {
					return apiResponse.ErrorResponse(res, err);
				}
			}];
					
	exports.createUserAddress = [
        	async (req, res) => {
                	try {
                                const response = await axios.get(`${blockchain_service_url}/createUserAddress`);
                                const address = response.data.items;
                                        const userData = {
                                                address
                                          };
				const response_grant = await axios.post(`${blockchain_service_url}/grantPermission`,userData);
				res.json({address:address});
                	} catch (err) {
                        	return apiResponse.ErrorResponse(res, err);
                	}
        	}
	];
	

