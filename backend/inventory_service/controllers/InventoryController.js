const UserModel = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");
const auth = require("../middlewares/jwt");
const checkToken = require('../middlewares/middleware').checkToken;
const axios = require('axios');
const dotenv = require('dotenv').config();

const blockchain_service_url = process.env.URL;

exports.getTotalCount = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
										//API to get all shipping records from shipping stream
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_inventory_stream`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Total inventory count")
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];

exports.getTotalCountOnHold = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
										//API to get all shipping records from shipping stream
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_inventory_stream`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Total inventory count on Hold")
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];

exports.getExpiringInventory = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
										//API to get all shipping records from shipping stream
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_inventory_stream`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Total inventory count expiring")
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];

exports.getInventoryforProduct = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
									    const {product_id} = result.data.key;
										//API to get all shipping records from shipping stream
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_inventory_stream&key=$product_id`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Inventory details for product")
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];

exports.getInventoryDetailsForProduct = [
        auth,
        (req, res) => {
                try {
			const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
					const {stream, key} = req.query;
                                        const response = await axios.get(`${blockchain_service_url}/queryDataByKey?stream=${stream}&key=${key}`);
                                        const items = response.data.items;
					console.log("items",items)
                                        res.json({data:items});
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];

exports.getAllInventoryDetails = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
										//API to get all inventory records from inventory stream
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_inventory_stream`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Inventory details")
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];

exports.addNewInventory = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
					const { key, data,stream,address } = req.body;
					const userData = {
    						stream: stream,
					        key: key,
						address: address,
					        data: data,
					  };
                                        const response = await axios.post(`${blockchain_service_url}/publish`,userData);
                                        res.json({response: response.data.transactionId});
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];
