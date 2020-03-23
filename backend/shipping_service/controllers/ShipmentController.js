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
const auth = require("../middlewares/jwt");
	exports.shipmentStatistics = [
		auth,				 
		(req, res) => {
			try {
		
				res.json("532")
					
			
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}
		}];
		
		
		exports.fetchShipments = [
			auth,				 
			(req, res) => {
				try {
			
					res.json("Rendering the shipmentData")
						
				
				} catch (err) {
					return apiResponse.ErrorResponse(res, err);
				}
			}];
			
	
			exports.createShipment = [
				 auth,
				(req, res) => {
					try {
				
						res.json("Shipment Created")
							
					
					} catch (err) {
						return apiResponse.ErrorResponse(res, err);
					}
				}];
				

				exports.reviewShipment = [
					auth,
					(req, res) => {
						try {
					
							res.json("shipmentReviewed")
								
						
						} catch (err) {
							return apiResponse.ErrorResponse(res, err);
						}
					}];
					
					exports.verifyShipment = [
						auth,
						(req, res) => {
							try {
						
								res.json("shipmentVerified")
									
							
							} catch (err) {
								return apiResponse.ErrorResponse(res, err);
							}
						}];
						

						exports.modifyShipment = [
							auth,
							(req, res) => {
								try {
							
									res.json("shipmentModified")
										
								
								} catch (err) {
									return apiResponse.ErrorResponse(res, err);
								}
							}];
							

