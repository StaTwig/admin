const UserModel = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const auth = require("../middlewares/jwt");
const checkToken = require("../middlewares/middleware").checkToken;
const axios = require("axios");
const dotenv = require("dotenv").config();

const blockchain_service_url = process.env.URL;
const stream_name = process.env.SHIP_STREAM;
const po_stream_name = process.env.PO_STREAM;

exports.shipmentStatistics = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
	  const { address } = req.user;
          /* const { jwt_address } = req.user;
	  const { user_address } = req.query;
	  var address = "";
	  if ( user_address ) {
			address = user_address;
	  }
		else {
			address = jwt_address;
	  }*/
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByPublishers?stream=${stream_name}&address=${address}`
          );
          const items = response.data.items;
          console.log("items", items);
          res.json({ data: items });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchShipments = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { key } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`
          );
          const items = response.data.items;
          console.log("items", items);
          res.json({ data: items });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchAllPurchaseOrders = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const response = await axios.get(
            `${blockchain_service_url}/queryAllStreamKeys?stream=${po_stream_name}`
          );
          const items = response.data.items;
          console.log("items", items);
          res.json({ data: items });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.createShipment = [
  auth,
  body("data.shipmentId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Shipment ID must be specified."),
  body("data.client")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Client must be specified."),
  body("data.supplier")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Supplier must be specified."),
  body("data.supplierLocation")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Supplier Location must be specified."),
  body("data.shipmentDate")
    .isLength({ min: 8 })
    .trim()
    .withMessage("Shipment Date must be specified."),
  body("data.deliveryTo")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Delivery To must be specified."),
  body("data.deliveryLocation")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Delivery Location must be specified."),
  body("data.estimateDeliveryDate")
    .isLength({ min: 8 })
    .trim()
    .withMessage("Estimated Delivery Date must be specified."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { address } = req.user;
          const { data } = req.body;
          const userData = {
            stream: stream_name,
            key: data.shipmentId,
            //address: address,
            address: req.query.address ? req.query.address : address,
            data: data,
          };
          const response = await axios.post(
            `${blockchain_service_url}/publish`,
            userData
          );
          res.status(200).json({ response: response.data.transactionId });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.reviewShipment = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { shipment_id } = result.data.shipment_id;
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
  },
];

exports.verifyShipment = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { shipment_id } = result.data.shipment_id;
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
  },
];

exports.modifyShipment = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { data } = result.data;
          const { key, status } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`
          );

          const item = response.data.items[response.data.items.length - 1];
          console.log(item.data);
          const shipment = JSON.parse(item.data);
          shipment.status = status;

          const { address } = req.user;
          const userData = {
            stream: stream_name,
            key: shipment.shipmentId,
            address: address,
            data: shipment,
          };
          const postResponse = await axios.post(
            `${blockchain_service_url}/publish`,
            userData
          );
          res.status(200).json({ response: postResponse.data.transactionId });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchPurchaseOrder = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          const { key } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${po_stream_name}&key=${key}`,
          );
          const items = response.data.items;
          console.log('items', items);
          res.json({ data: items });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.createPurchaseOrder = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          const { address } = req.user;
          const { data } = req.body;
          const userData = {
            stream: po_stream_name,
            key: data.orderID,
            address: address,
            data: data,
          };
          const response = await axios.post(
            `${blockchain_service_url}/publish`,
            userData,
          );
          res.status(200).json({ response: response.data.transactionId });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchPublisherLatestShipments = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
	  //const { address } = req.query;
	 const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryAllPublisherKeys?stream=${stream_name}&address=${address}`
          );
        var keys = response.data.items;
        const unique_keys = [ ...new Set(keys)]  
        var items_array = new Array();
	for (var i = 0; i < unique_keys.length; i++) {
         var key = unique_keys[i];
         
	  const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`
          );
          const items = response.data.items;
          items_array.push(items);
	 }
          res.json({ data: items_array });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchAllLatestShipments = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const response = await axios.get(
            `${blockchain_service_url}/queryAllStreamKeys?stream=${stream_name}`
          );
        var keys = response.data.items;
        const unique_keys = [ ...new Set(keys)]
		console.log("keys",keys)
		console.log("unique",unique_keys)
        var items_array = new Array();
        for (var i = 0; i < unique_keys.length; i++) {
         var key = unique_keys[i];

          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`
          );
          const items = response.data.items;
          items_array.push(items);
         }
          res.json({ data: items_array });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
