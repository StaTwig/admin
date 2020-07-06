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

const init = require('../logging/init');
const logger = init.getLog();

exports.shipmentStatistics = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< ShipmentService < ShipmentController < shipmentStatistics : token verified successfully, querying data by publisher');
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByPublishers?stream=${stream_name}&address=${address}`,
          );
          const items = response.data.items;
          logger.log('info', '<<<<< ShipmentService < ShipmentController < shipmentStatistics : queried data by publisher');
          res.json({ data: items });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < shipmentStatistics : unverified token');
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < shipmentStatistics : error (catch block)');
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : token verified successfully, querying data by publisher');
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByPublishers?stream=${po_stream_name}&address=${address}`,
          );
          const items = response.data.items;
          res.json({ data: items });
          logger.log('info', '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : queried data by publisher');
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : unverified token');
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : error (catch block)');
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchShipments : ')
          const { key } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
          );
          const items = response.data.items;
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchShipments : ')
          res.json({ data: items });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < fetchShipments : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < fetchShipments : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : ')
          const response = await axios.get(
            `${blockchain_service_url}/queryAllStreamKeys?stream=${po_stream_name}`,
          );
          const items = response.data.items;
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : ')
          res.json({ data: items });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : ')
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryAllPublisherKeys?stream=${po_stream_name}&address=${address}`,
          );
          const items = response.data.items;
          let unique_items = [...new Set(items)];
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : ')
          res.json({ data: unique_items });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : ')
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
        logger.log('error', '<<<<< ShipmentService < ShipmentController < createShipment : ')
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
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
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
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
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
            const newUser = new UserTransactionModel({
              destinationUser: sender_address,
              txnIds: [txnId],
            });
            await newUser.save();
          } else {
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
            const txnIds = [...sender.txnIds, txnId];
            await UserTransactionModel.updateOne(
              { destinationUser: sender_address },
              { txnIds },
            );
          }

          if (!receiver) {
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
            const newUser = new UserTransactionModel({
              destinationUser: receiver_address,
              txnIds: [txnId],
            });
            await newUser.save();
          } else {
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
            const txnIds = [...receiver.txnIds, txnId];
            await UserTransactionModel.updateOne(
              { destinationUser: receiver_address },
              { txnIds },
            );
          }
          //Shipment Collection
          if (!shipmentFound) {
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
            const newShipment = new ShipmentModel({
              shipmentId,
              txnIds: [txnId],
            });
            await newShipment.save();
          } else {
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
            const txnIds = [...shipmentFound.txnIds, txnId];
            await ShipmentModel.updateOne({ shipmentId }, { txnIds });
          }
          //Organisation Collection
          if (!organisationFound) {
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
            const newOrganisation = new OrganisationModel({
              organisationId: userModel.organisation,
              shipmentNumber: [shipmentId],
            });
            await newOrganisation.save();
          } else {
            logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
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
              logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
              await ProductModel.updateOne(productQuery, {
                txnIds: [...productFound.txnIds, txnId],
              });
            } else {
              logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
              const newProduct = new ProductModel({
                serialNumber: product.serialNumber,
                txnIds: [txnId],
              });
              await newProduct.save();
            }
          })

        }else{
          logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
        apiResponse.successResponseWithData(res, 'Success');
      });
    } catch (err) {
      logger.log('info', '<<<<< ShipmentService < ShipmentController < createShipment : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < reviewShipment : ')
          const { shipment_id } = result.data.shipment_id;
          res.json('Shipment Review');
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < reviewShipment : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < reviewShipment : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < verifyShipment : ')
          const { shipment_id } = result.data.shipment_id;
          res.json('Shipment Verify');
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < verifyShipment : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < verifyShipment : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < modifyShipment : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < modifyShipment : ')
          res.status(200).json({ response: postResponse.data.transactionId });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < modifyShipment : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < modifyShipment : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : ')
          const { key } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${po_stream_name}&key=${key}`,
          );
          const items = response.data.items;
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : ')
          res.json({ data: items });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : ')
 	  res.status(200).json({ txid: response.data.transactionId, orderID: orderID});
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : ')
          res.json({ data: items_array });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : ')
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
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : ')
          res.json({ data: items_array });
        } else {
          logger.log('warn', '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getProducts = [
  auth,
  (req, res) => {
    logger.log('info', '<<<<< ShipmentService < ShipmentController < getProducts : ')
    return apiResponse.successResponseWithData(res, 'Products lists', products);
  },
];

exports.getManufacturers = [
  auth,
  (req, res) => {
    logger.log('info', '<<<<< ShipmentService < ShipmentController < getManufacturers : ')
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
      logger.log('info', '<<<<< ShipmentService < ShipmentController < getAllShipmentColl : ')
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < getAllShipmentColl : ')
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
      logger.log('info', '<<<<< ShipmentService < ShipmentController < getAllUserColl : ')
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < getAllUserColl : ')
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
      logger.log('info', '<<<<< ShipmentService < ShipmentController < getAllOrgColl : ')
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < getAllOrgColl : ')
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
      logger.log('info', '<<<<< ShipmentService < ShipmentController < getAllProductColl : ')
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < getAllProductColl : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.trackShipment = [
  auth,
  async (req, res) => {
    try {
      const { shipmentId } = req.query;
      logger.log('info', '<<<<< ShipmentService < ShipmentController < trackShipment : ')
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
        logger.log('info', '<<<<< ShipmentService < ShipmentController < trackShipment : ')
        res.json({ data: items_array });
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < trackShipment : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.trackProduct = [
  auth,
  async (req, res) => {
    try {
      const { serialNumber } = req.query;
      logger.log('info', '<<<<< ShipmentService < ShipmentController < trackProduct : ')
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
        logger.log('info', '<<<<< ShipmentService < ShipmentController < trackProduct : ')
        res.json({ data: items_array });
      });
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < trackProduct : ')
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
        logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchUserShipments : ')
        const destinationUser = await UserTransactionModel.findOne({ destinationUser: user.address });
        let items_array = [];
        let txnIDs = [];
        if(destinationUser) {
          logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchUserShipments : ')
          txnIDs = destinationUser.txnIds
        }

        await utility.asyncForEach(txnIDs, async txnId => {
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByTxHash?stream=${stream_name}&txid=${txnId}`,
          );
          const items = response.data.items;
          items_array.push(JSON.parse(items));
        });
        logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchUserShipments : ')
        res.json({ data: items_array });
      } else {
        logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchUserShipments : ')
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
            logger.log('info', '<<<<< ShipmentService < ShipmentController < fetchUserShipments : ')
            res.json({ data: items_array });
          },
        );
      }
    } catch (err) {
      logger.log('error', '<<<<< ShipmentService < ShipmentController < fetchUserShipments : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
