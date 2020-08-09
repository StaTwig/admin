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
const product_service_url = process.env.PRODUCT_URL;

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
          logger.log('info', '<<<<< InventoryService < InventoryController < getTotalCount : token verifed successfully')
          res.json('Total inventory count');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getTotalCount : refuted token')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getTotalCount : error (catch block)')
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
          logger.log('info', '<<<<< InventoryService < InventoryController < getTotalCountOnHold : token verified successfully')
          res.json('Total inventory count on Hold');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getTotalCountOnHold : refuted token')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getTotalCountOnHold : error (catch block)')
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
          logger.log('info', '<<<<< InventoryService < InventoryController < getExpiringInventory : token verified successfully')
          res.json('Total inventory count expiring');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getExpiringInventory : refuted token')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getExpiringInventory : error (catch block)')
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
          logger.log('info', '<<<<< InventoryService < InventoryController < getInventoryforProduct : token verified successfullly')
          const { product_id } = result.data.key;
          res.json('Inventory details for product');
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getInventoryforProduct : refuted token')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getInventoryforProduct : error (catch block)')
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
          logger.log('info', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : token verified successfullly, querying data by key')
          const { key } = req.query;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
          );
          const items = response.data.items;
          console.log('items', items);
          logger.log('info', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : queried data by key')
          res.json({ data: items });
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : refuted token')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : error (catch block)')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

var products_array = [];
var dict = {};
exports.getAllInventoryDetails = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : token verified successfullly, querying data by publisher')
          const { address } = req.user;
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByPublishers?stream=${stream_name}&address=${address}`,
          );
          const items = response.data.items;
          var tot_qty = 0;
	
	  await axios.get(`${product_service_url}/getProductNames`, {
          headers: {
            'Authorization': req.headers.authorization
          }
        })
        .then((res) => {
        for (i=0;i<res.data.data.length;i++)
                {
                        var test = res.data.data[i].productName;
                        products_array.push(test)
                }
        })
        .catch((error) => {
	logger.log('error', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : Error in fetching products list')
        })
                products_array.forEach(element => {
                var ele = `${element}`;
        });

          var total_inv = items.length;
          for (i=0;i<items.length;i++){
              var productName = JSON.parse(items[i].data).productName;
              var count = parseInt(JSON.parse(items[i].data).quantity);
              tot_qty = tot_qty + count;
		
	      const index = products_array.indexOf(productName);
                        var name = products_array[index];
                        if(name in dict)
		   	 {
                        	var exis = dict[name];
                        	var new_val = count;
                        	dict[name] = exis + new_val;
                           }	
                        else {
                        	  dict[name] = count;
                      	}
          }
          logger.log('info', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : queried and pushed data')
	  res.json({ data: items , count :{tot_qty:tot_qty,tot_inv:total_inv},dict:dict});
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : refuted token')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : error (catch block)')
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
          logger.log('info', '<<<<< InventoryService < InventoryController < addNewInventory : token verified successfullly, publishing data')
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
          logger.log('info', '<<<<< InventoryService < InventoryController < addNewInventory : publised data to blockchain')
          res.status(200).json({ response: response.data.transactionId });
        } else {
          logger.log('warn', '<<<<< InventoryService < InventoryController < addNewInventory : refuted token')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< InventoryService < InventoryController < addNewInventory : error (catch block)')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
