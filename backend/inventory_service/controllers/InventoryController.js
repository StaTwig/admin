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

var total_inv = 0, total_qty = 0,total_ne = 0,total_ne = 0;
var today_inv = 0,week_inv = 0,month_inv = 0,year_inv = 0;
var today_qty = 0,week_qty = 0,month_qty = 0,year_qty = 0;
var today_exp = 0,week_exp = 0,month_exp = 0,year_exp = 0;
var today_ne = 0,week_ne = 0,month_ne = 0,year_ne = 0;

function getDateDiff(dateOne, dateTwo, dateThree, dateFour, quantity) {
    if ((dateOne.charAt(2) == '-' || dateOne.charAt(1) == '-') & (dateTwo.charAt(2) == '-' || dateTwo.charAt(1) == '-')) {
        dateOne = new Date(formatDate(dateOne));
        dateTwo = new Date(formatDate(dateTwo));
        dateThree = new Date(formatDate(dateThree));
        dateFour = new Date(formatDate(dateFour));
    } else {
        dateOne = new Date(dateOne);
        dateTwo = new Date(dateTwo);
        dateThree = new Date(dateThree);
        dateFour = new Date(dateFour);
    }

    let timeDiff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let timeDiff1 = Math.abs(dateThree.getTime() - dateFour.getTime());
    let diffDays1 = Math.ceil(timeDiff1 / (1000 * 3600 * 24));

    if (dateTwo < dateOne) {
        if (diffDays == 0) {
            today_exp++;
        } else if ( diffDays <= 7 ) {
            week_exp++;
        } else if ( diffDays <= 31 ) {
            month_exp++;
        } else if ( diffDays <= 365 ) {
            year_exp++;
        }

    } else if (dateTwo >= dateOne && diffDays < 30) {
        if (diffDays == 0) {
                        today_ne++;
        } else if ( diffDays <= 7 ) {
            week_ne++;
        } else if ( diffDays <= 31 ) {
            month_ne++;
        } else if ( diffDays <= 365 ) {
            year_ne++;
        }

    }

    if (diffDays1 == 0) {
        today_inv++;
        today_qty += quantity;
    } else if (  diffDays1 <= 7 ) {
        week_inv++;
        week_qty += quantity;
    } else if ( diffDays1 <= 31 ) {
        month_inv++;
        month_qty += quantity;
    } else if (  diffDays1 <= 365 ) {
        year_inv++;
        year_qty += quantity;
    }

    return {
        today_inv,
        week_inv,
        month_inv,
        year_inv,
        today_qty,
        week_qty,
        month_qty,
        year_qty,
        today_ne,
        week_ne,
        month_ne,
        year_ne,
        today_exp,
        week_exp,
        month_exp,
        year_exp
    };

}

function formatDate(date) {
    return date.split('-').reverse().join('-');
}

var products_array = [];

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
          var count_array = [];
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
          var dict = {};
          today_exp = 0,week_exp = 0,month_exp = 0,year_exp = 0;
          today_ne = 0,week_ne = 0,month_ne = 0,year_ne = 0;
          today_inv = 0,week_inv = 0,month_inv = 0,year_inv = 0;
          today_qty = 0,week_qty = 0,month_qty = 0,year_qty = 0;
          total_inv = 0, total_qty = 0,total_ne = 0,total_ne = 0;

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

                        let date_ob = new Date();
                        let date = ("0" + date_ob.getDate()).slice(-2);
                        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                        let year = date_ob.getFullYear();
                        var today = month + "-" + year;
                        var today_full = date + "-" + month + "-" + year;
                        var expiry_date = JSON.parse(items[i].data).expiryDate;
                        var myDate = new Date(expiry_date);
                        var m = myDate.getMonth();
                        var y = myDate.getFullYear();
                        var expiry_date1 = (m + "-" + myDate.getFullYear());

                        var created_date = JSON.parse(items[i].data).createdDate;
                        if (created_date == undefined) {
                            created_date = today_full;
                        }
                        var s = getDateDiff(today, expiry_date1, today_full, created_date, count);
                        total_exp = today_exp + week_exp + month_exp + year_exp;
                        total_ne = today_ne + week_ne + month_ne + year_ne;
                        total_inv = today_inv + week_inv + month_inv + year_inv;
                        total_qty = today_qty + week_qty + month_qty + year_qty;
                    }
          logger.log('info', '<<<<< InventoryService < InventoryController < getAllInventoryDetails : queried and pushed data')
          res.json({
                        data: items,
                        dict: dict,
                        counts: {
                            inventoryAdded: {
                                total : total_inv,
                                thisYear: year_inv,
                                thisMonth: month_inv,
                                thisWeek: week_inv,
                                today: today_inv
                            },
                            currentInventory: {
                                total : total_qty,
                                thisYear: year_qty,
                                thisMonth: month_qty,
                                thisWeek: week_qty,
                                today: today_qty
                            },
                            vaccinesNearExpiration: {
                                total : total_ne,
                                thisYear: year_ne,
                                thisMonth: month_ne,
                                thisWeek: week_ne,
                                today: today_ne
                            },
                            vaccinesExpired: {
                                total : total_exp,
                                thisYear: year_exp,
                                thisMonth: month_exp,
                                thisWeek: week_exp,
                                today: today_exp
                            }
                        }
                    });
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
          var { data } = req.body;
          let date_ob = new Date();
          let date = ("0" + date_ob.getDate()).slice(-2);
          let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
          let year = date_ob.getFullYear();
          var today = date + "-" + month + "-" + year;
          var createdDate = {createdDate: today};
          const { address } = req.user;
          const userData = {
            stream: stream_name,
            key: data.serialNumber,
            address: address,
            data: {...data,...createdDate},
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

exports.addMultipleInventories = [
  auth,
  body('inventories')
    .isLength({ min: 1 })
    .withMessage('Inventories  must be specified.'),
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
          const { inventories } = req.body;
          const { address } = req.user;
          let txnIds = [];
          await utility.asyncForEach(inventories, async data => {
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
            txnIds.push((response.data.transactionId));
            logger.log('info', '<<<<< InventoryService < InventoryController < addNewInventory : publised data to blockchain')
          })

          res.status(200).json({ response: txnIds });
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
