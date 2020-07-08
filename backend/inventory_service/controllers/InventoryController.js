const UserModel = require('../models/UserModel');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const jwt = require('jsonwebtoken');
const { constants } = require('../helpers/constants');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const axios = require('axios');
const dotenv = require('dotenv').config();

const blockchain_service_url = process.env.URL;
const stream_name = process.env.STREAM;

const init = require('../logging/init');
const logger = init.getLog();

exports.getTotalCount = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < getTotalCount : ')
          res.json('Total inventory count');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getTotalCount : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getTotalCount : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getTotalCountOnHold = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < getTotalCountOnHold : ')
          res.json('Total inventory count on Hold');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getTotalCountOnHold : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getTotalCountOnHold : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getExpiringInventory = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < getExpiringInventory : ')
          res.json('Total inventory count expiring');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getExpiringInventory : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getExpiringInventory : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getInventoryforProduct = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < getInventoryforProduct : ')
          const { product_id } = result.data.key;
          res.json('Inventory details for product');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getInventoryforProduct : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getInventoryforProduct : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getInventoryDetailsForProduct = [
  auth,
  (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : ')
          const { key } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
          );
          const items = response.data.items;
          console.log('items', items);
          logger.log('info', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : ')
          res.json({ data: items });
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getAllInventoryDetails = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : ')
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByPublishers?stream=${stream_name}&address=${address}`,
          );
          const items = response.data.items;
	  var count_array = [];
          var tot_qty = 0;
          var bOPV_count = 0;
          var MMR_count = 0;
          var PVC_count = 0;
          var BCG_count = 0;
          var RV_count = 0;
          var HepB_count = 0;

          var total_inv = items.length;
          for (i=0;i<items.length;i++)
                {
                        var productName = JSON.parse(items[i].data).productName;
                        var count = parseInt(JSON.parse(items[i].data).quantity);
                        tot_qty = tot_qty + count;
                        if (productName == "bOPV")
                                bOPV_count = bOPV_count + count;
                        else if (productName == "MMR")
                                MMR_count = MMR_count + count;
                        else if (productName == "PVC")
                                PVC_count = PVC_count + count;
                        else if (productName == "BCG")
                                BCG_count = BCG_count + count;
                        else if (productName == "RV")
                                RV_count = RV_count + count;
                        else if (productName == "HepB")
                                HepB_count = HepB_count + count;
                }
          count_array.push({tot_qty:tot_qty},{tot_inv:total_inv},{bOPV:bOPV_count},{MMR:MMR_count},{PVC:PVC_count},{BCG:BCG_count},{RV:RV_count},{HepB:HepB_count})
          logger.log('info', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : ')
          res.json({ data: items , count :{tot_qty:tot_qty,tot_inv:total_inv,bOPV:bOPV_count,MMR:MMR_count,PVC:PVC_count,BCG:BCG_count,RV:RV_count,HepB:HepB_count}});
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addNewInventory = [
  auth,
  body('data.productName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Product Name must be specified.'),
  body('data.manufacturerName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Manafacturer must be specified.'),
  body('data.quantity')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Quantity must be specified.'),
  body('data.manufacturingDate')
    .isLength({ min: 4 })
    .trim()
    .withMessage('Manafacturing Date must be specified.'),
  body('data.expiryDate')
    .isLength({ min: 4 })
    .trim()
    .withMessage('Expiry Date must be specified.'),
  body('data.storageConditionmin')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Storage Conditionmin must be specified.'),
    body('data.storageConditionmax')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Storage Conditionmax must be specified.'),

  body('data.batchNumber')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Batch Number must be specified.'),
  body('data.serialNumber')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Serial Number must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log('error', '<<<<< InventoryService < InventoryController < addNewInventory : Validation Error')
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      } 
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < addNewInventory : ')
          const { data } = req.body;
          const { address } = req.user;
          const userData = {
            stream: stream_name,
            key: data.serialNumber,
            address: address,
            data: data,
          };
          const response = await axios.post(
            `${blockchain_service_url}/publish`,
            userData,
          );
          logger.log('info', '<<<<< InventoryService < InventoryController < addNewInventory : ')
          res.status(200).json({ response: response.data.transactionId });
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < addNewInventory : ')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < addNewInventory : ')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
