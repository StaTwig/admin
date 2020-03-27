const UserModel = require("../models/UserModel");
const {body,validationResult} = require("express-validator");
const {sanitizeBody} = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const {constants} = require("../helpers/constants");
const auth = require("../middlewares/jwt");
const checkToken = require('../middlewares/middleware').checkToken;
const axios = require('axios');
const base_url = 'API GATEWAY FOR BLOCKCHAIN SERVICES';

exports.shipmentStatistics = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
										//API to get all shipping records from shipping stream
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_shipping_stream`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Shipment details")
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];



exports.fetchShipments = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
                                        const {username} = result.data.email;
                                        //API to get shipping records for particular user from shipping stream
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_shipping_stream&key=$username`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Shipment fetched")
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];


exports.createShipment = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
                                        const {data} = result.data;
                                        //API to add new shipment record
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_shipping_stream&key=$username&&data=$data`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Shipment created");
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];


exports.reviewShipment = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
                                        const {shipment_id} = result.data.shipment_id;
                                         //API to get shipment details for the Shipment ID
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_shipping_stream&key=$shipment_id`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Shipment Review");
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];

exports.verifyShipment = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
                                        const {shipment_id} = result.data.shipment_id;
                                        //API to get shipment details for the Shipment ID
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_shipping_stream&key=$shipment_id`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Shipment Verify");
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];


exports.modifyShipment = [
        auth,
        async (req, res) => {
                try {
                        const {authorization} = req.headers;
                        checkToken(req, res, async result => {
                                if (result.success) {
                                        const {data} = result.data;
                                        //API to add new shipment record
                                        //const response = await axios.get(`${url}/apiendpoint?stream=vl_shipping_stream&key=$username&&data=$data`);
                                        //const items = response.data.items;
                                        //res.json(JSON.parse(items));
                                        res.json("Shipment created");
                                } else {
                                        res.status(403).json(result);
                                }
                        });
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }
];

