const UserTransactionModel = require('../models/UserTransactionModel');
const UserModel = require('../models/UserModel');
const ShipmentModel = require('../models/ShipmentModel');
const ProductModel = require('../models/ProductModel');
const OrganisationModel = require('../models/OrganisationModel');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
//this helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../helpers/mailer');
const { constants } = require('../helpers/constants');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const axios = require('axios');
const dotenv = require('dotenv').config();

const blockchain_service_url = process.env.URL;
const stream_name = process.env.SHIP_STREAM;
const po_stream_name = process.env.PO_STREAM;

const products = require('../data/products');
const manufacturers = require('../data/manufacturers');

exports.shipmentStatistics = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByPublishers?stream=${stream_name}&address=${address}`,
          );
          const items = response.data.items;
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

exports.purchaseOrderStatistics = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByPublishers?stream=${po_stream_name}&address=${address}`,
          );
          const items = response.data.items;
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
      checkToken(req, res, async result => {
        if (result.success) {
          const { key } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
          );
          const items = response.data.items;
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
      checkToken(req, res, async result => {
        if (result.success) {
          const response = await axios.get(
            `${blockchain_service_url}/queryAllStreamKeys?stream=${po_stream_name}`,
          );
          const items = response.data.items;
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

exports.fetchPublisherPurchaseOrders = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryAllPublisherKeys?stream=${po_stream_name}&address=${address}`,
          );
          const items = response.data.items;
          let unique_items = [...new Set(items)];
          res.json({ data: unique_items });
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
  body('data.shipmentId')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Shipment ID must be specified.'),
  body('data.client')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Client must be specified.'),
  body('data.supplier')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Supplier must be specified.'),
  body('data.supplierLocation')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Supplier Location must be specified.'),
  body('data.shipmentDate')
    .isLength({ min: 8 })
    .trim()
    .withMessage('Shipment Date must be specified.'),
  body('data.deliveryTo')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Delivery To must be specified.'),
  body('data.deliveryLocation')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Delivery Location must be specified.'),
  body('data.estimateDeliveryDate')
    .isLength({ min: 8 })
    .trim()
    .withMessage('Estimated Delivery Date must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      checkToken(req, res, async result => {
        if (result.success) {
          const { address, email } = req.user;

          const { data } = req.body;
          const { shipmentId } = data;
          const userData = {
            stream: stream_name,
            key: shipmentId,
            address: req.query.address ? req.query.address : address,
            data: data,
          };
          const emptyShipmentNumber = data.products.find(product => product.serialNumber === '');
          const emptyBatchNumber = data.products.find(product => product.batchNumber === '');
          if(emptyShipmentNumber || emptyBatchNumber) {
            return apiResponse.ErrorResponse(res, 'Serial/Batch Number cannot be empty');
          }
          const response = await axios.post(
            `${blockchain_service_url}/publish`,
            userData,
          );
          const txnId = response.data.transactionId;
          const userModel = await UserModel.findOne({ address });
          const sender_address = address;
          const receiver_address = data.receiver;
          const sender = await UserTransactionModel.findOne({
            destinationUser: sender_address,
          });
          const receiver = await UserTransactionModel.findOne({
            destinationUser: receiver_address,
          });
          const shipmentFound = await ShipmentModel.findOne({ shipmentId });
          const organisationFound = await OrganisationModel.findOne({
            organisationId: userModel.organisation,
          });
          //User Transaction Collection
          if (!sender) {
            const newUser = new UserTransactionModel({
              destinationUser: sender_address,
              txnIds: [txnId],
            });
            await newUser.save();
          } else {
            const txnIds = [...sender.txnIds, txnId];
            await UserTransactionModel.updateOne(
              { destinationUser: sender_address },
              { txnIds },
            );
          }

          if (!receiver) {
            const newUser = new UserTransactionModel({
              destinationUser: receiver_address,
              txnIds: [txnId],
            });
            await newUser.save();
          } else {
            const txnIds = [...receiver.txnIds, txnId];
            await UserTransactionModel.updateOne(
              { destinationUser: receiver_address },
              { txnIds },
            );
          }
          //Shipment Collection
          if (!shipmentFound) {
            const newShipment = new ShipmentModel({
              shipmentId,
              txnIds: [txnId],
            });
            await newShipment.save();
          } else {
            const txnIds = [...shipmentFound.txnIds, txnId];
            await ShipmentModel.updateOne({ shipmentId }, { txnIds });
          }
          //Organisation Collection
          if (!organisationFound) {
            const newOrganisation = new OrganisationModel({
              organisationId: userModel.organisation,
              shipmentNumber: [shipmentId],
            });
            await newOrganisation.save();
          } else {
            const shipmentNumbers = [
              ...organisationFound.shipmentNumbers,
              data.shipmentId,
            ];

            await OrganisationModel.updateOne(
              { organisationId: userModel.organisation },
              { shipmentNumbers },
            );
          }
          //Products Collection
          await utility.asyncForEach(data.products, async product => {
            const productQuery = { serialNumber: product.serialNumber };
            const productFound = await ProductModel.findOne(productQuery);
            if (productFound) {
              await ProductModel.updateOne(productQuery, {
                txnIds: [...productFound.txnIds, txnId],
              });
            } else {
              const newProduct = new ProductModel({
                serialNumber: product.serialNumber,
                txnIds: [txnId],
              });
              await newProduct.save();
            }
          })

        }else{
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
        apiResponse.successResponseWithData(res, 'Success');
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
      checkToken(req, res, async result => {
        if (result.success) {
          const { shipment_id } = result.data.shipment_id;
          res.json('Shipment Review');
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
      checkToken(req, res, async result => {
        if (result.success) {
          const { shipment_id } = result.data.shipment_id;
          res.json('Shipment Verify');
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
      checkToken(req, res, async result => {
        if (result.success) {
          const { data } = result.data;
          const { key, status } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
          );

          const item = response.data.items[response.data.items.length - 1];
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
            userData,
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
 	  const orderID  = "PO" + Math.floor(1000 + Math.random() * 9000);
          const userData = {
            stream: po_stream_name,
            key: orderID,
            address: address,
            data: data,
          };
          const response = await axios.post(
            `${blockchain_service_url}/publish`,
            userData,
          );
 	  res.status(200).json({ txid: response.data.transactionId, orderID: orderID});
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
      checkToken(req, res, async result => {
        if (result.success) {
          //const { address } = req.query;
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryAllPublisherKeys?stream=${stream_name}&address=${address}`,
          );
          var keys = response.data.items;
          const unique_keys = [...new Set(keys)];
          var items_array = new Array();
          for (var i = 0; i < unique_keys.length; i++) {
            var key = unique_keys[i];

            const response = await axios.get(
              `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
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
      checkToken(req, res, async result => {
        if (result.success) {
          const response = await axios.get(
            `${blockchain_service_url}/queryAllStreamKeys?stream=${stream_name}`,
          );
          var keys = response.data.items;
          const unique_keys = [...new Set(keys)];
          var items_array = new Array();
          for (var i = 0; i < unique_keys.length; i++) {
            var key = unique_keys[i];

            const response = await axios.get(
              `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
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

exports.getProducts = [
  auth,
  (req, res) => {
    return apiResponse.successResponseWithData(res, 'Products lists', products);
  },
];
exports.getManufacturers = [
  auth,
  (req, res) => {
    return apiResponse.successResponseWithData(
      res,
      'Manufacturers lists',
      manufacturers,
    );
  },
];

exports.getAllShipmentColl = [
  auth,
  async (req, res) => {
    try {
      const { model } = req.query;
      const users = await ShipmentModel.find({});
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getAllUserColl = [
  auth,
  async (req, res) => {
    try {
      const { model } = req.query;
      const users = await UserTransactionModel.find({});
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getAllOrgColl = [
  auth,
  async (req, res) => {
    try {
      const { model } = req.query;
      const users = await OrganisationModel.find({});
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getAllProductColl = [
  auth,
  async (req, res) => {
    try {
      const { model } = req.query;
      const users = await ProductModel.find({});
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.trackShipment = [
  auth,
  async (req, res) => {
    try {
      const { shipmentId } = req.query;
      ShipmentModel.findOne({ shipmentId: shipmentId }).then(async user => {
        let txnIDs = user.txnIds;
        let items_array = [];
        await utility.asyncForEach(txnIDs, async txnId => {
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByTxHash?stream=${stream_name}&txid=${txnId}`,
          );
          const items = response.data.items;
          items_array.push(items);
        });
        res.json({ data: items_array });
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.trackProduct = [
  auth,
  async (req, res) => {
    try {
      const { serialNumber } = req.query;
      ProductModel.findOne({ serialNumber: serialNumber }).then(async user => {
        let txnIDs = user.txnIds;
        let items_array = [];
        await utility.asyncForEach(txnIDs, async txnId => {
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByTxHash?stream=${stream_name}&txid=${txnId}`,
          );
          const items = response.data.items;
          items_array.push(items);
        });
        res.json({ data: items_array });
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchUserShipments = [
  auth,
  async (req, res) => {
    try {
      const { user } = req;
      const userObject = await UserModel.findOne({address: user.address});
      if (userObject.role !== 'Warehouse') {
        const destinationUser = await UserTransactionModel.findOne({ destinationUser: user.address });
        let items_array = [];
        let txnIDs = [];
        if(destinationUser) {
          txnIDs = destinationUser.txnIds
        }

        await utility.asyncForEach(txnIDs, async txnId => {
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByTxHash?stream=${stream_name}&txid=${txnId}`,
          );
          const items = response.data.items;
          items_array.push(JSON.parse(items));
        });
        res.json({ data: items_array });
      } else {
        OrganisationModel.findOne({ organisationId: userObject.organisation }).then(
          async user => {
            let items_array = [];
            if(user) {
              let shipIDs = user.shipmentNumbers;
              let unique_shipIDs = [...new Set(shipIDs)];
              await utility.asyncForEach(unique_shipIDs, async shipId => {
                const response = await axios.get(
                  `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${shipId}`,
                );
                const items = response.data.items;
                items_array.push(JSON.parse(items));
              });
            }
            res.json({ data: items_array });
          },
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
