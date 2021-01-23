const { body, validationResult } = require('express-validator');
const fs = require('fs');
const moveFile = require('move-file');
const XLSX = require('xlsx');
const axios = require('axios');

const { sanitizeBody } = require('express-validator');
const UserTransactionModel = require('../models/UserTransactionModel');
const UserModel = require('../models/UserModel');
const POModel = require('../models/POModel');
const ShipmentModel = require('../models/ShipmentModel');
const ProductModel = require('../models/ProductModel');
const InventoryModel = require('../models/InventoryModel');
const OrganisationModel = require('../models/OrganisationModel');
const NotificationModel = require('../models/NotificationModel');
const RecordModel = require('../models/RecordModel');
//this helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const checkPermissions = require('../middlewares/rbac_middleware')
  .checkPermissions;
const dotenv = require('dotenv').config();
const wrapper = require('../models/DBWrapper')

const blockchain_service_url = process.env.URL;
const stream_name = process.env.SHIP_STREAM;
const po_stream_name = process.env.PO_STREAM;
const so_stream_name = process.env.SO_STREAM;

const products = require('../data/products');
const manufacturers = require('../data/manufacturers');

const init = require('../logging/init');
const logger = init.getLog();


exports.createShippingOrder = [
    auth,
    body('data.orderId')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Shipping Order ID must be specified.'),
    body('data.createdBy')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Shipping Order Created By must be specified.'),
    body('data.assignedTo')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Shipping Order Assigned To must be specified.'),
    body('data.updatedOn')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Shipping Order Updated On must be specified.'),
    body('data.updatedBy')
      .isLength({ min: 8 })
      .trim()
      .withMessage('Shipping Order Updated By must be specified.'),
    body('data.status')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Shipping Order Status To must be specified.'),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          logger.log(
            'error',
            '<<<<< ShipmentService < ShipmentController < createShipment : Validation Error',
          );
          // Display sanitized values/errors messages.
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error.',
            errors.array(),
          );
        }
        checkToken(req, res, async result => {
          if (result.success) {
            logger.log(
              'info',
              '<<<<< ShipmentService < ShipmentController < createShipment : token verified successfully, shipment creation started',
            );
            const { address, email } = req.user;
            const permission_request = {
              result: result,
              permissionRequired: 'createShipmentOrder',
            };
            checkPermissions(permission_request, async permissionResult => {
              if (permissionResult.success) {
                const { data } = req.body;
                const poId = data.id;
                const orderID = data.orderID || 'SO' + Math.floor(1000 + Math.random() * 9000);
              //   const { shipmentId, batchNumber, poNumber } = data;
                const userData = {
                  stream: so_stream_name,
                  key: orderID,
                  address: req.query.address || address,
                  data: data,
                };
  
                const response = await axios.post(
                  `${blockchain_service_url}/publish`,
                  userData,
                );
                console.log("so_response", response);
                const txnIdSO = response.data.transactionId;
                const POFound = await RecordModel.findOne({ id: poId });
                if(!POFound){
                  logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                  );
                } else {
                  const SOFound = await RecordModel.findOne({ shippingOrders: { orderId : orderID } });
                  console.log("SOFound", SOFound);
                  
                  if(!SOFound) {
                    logger.log(
                        'info',
                        '<<<<< ShippingService < Controller < createSO : SO not found in collection',
                      );
                    const newSO = {
                        orderId : orderID,
                        createdBy : req.user.address,
                        status : 'Created',
                        sotransactionIds: txnIdSO,
                        ...data
                    };
                    console.log("newSO", newSO)
                    wrapper.insertOneRecord(RecordModel, { shippingOrders: newSO }, function(error,response){
                     })
                  } else {
                      logger.log(
                        'info',
                        '<<<<< ShippingService < Controller < createSO : updating SO in SO model',
                      );
                      const txnIds = [...SOFound.sotransactionIds, txnIdSO];
                      wrapper.updateRecord(RecordModel, { shippingOrders: { orderId: orderID } }, { sotransactionIds: txnIds })        
                  }  
                }
                logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < createSO : published to blockchain',
                );
                res.status(200).json({
                  txid: response.data.transactionId,
                  orderID: orderID,
                });
              } else {
                  res.json('Sorry! User does not have enough Permissions');
              }
            });
          } else {
              logger.log(
                  'warn',
                  '<<<<< ShippingService < Controller < createSO : refuted token',
                  );
                  return apiResponse.ErrorResponse(res, result);
              }
          });
      } catch (err) {
          logger.log(
              'error',
              '<<<<< ShippingService < Controller < createSO : error (catch block)',
              );
              return apiResponse.ErrorResponse(res, err);
          }
      },
  ];

exports.assignShippingOrder = [
    auth,
    async (req, res) => {
      try {
        checkToken(req, res, async result => {
          if (result.success) {
            logger.log(
              'info',
              '<<<<< ShippingService < Controller < assignShippingOrder : token verified successfully',
            );
  
            const permission_request = {
              result: result,
              permissionRequired: 'receiveSO',
            };
            checkPermissions(permission_request, async permissionResult => {
              if (permissionResult.success) {
                try {
                  const { address } = req.user;
                  const { orderID, assignedTo, poId } = req.body;
                  const POFound = await RecordModel.findOne({ id: poId });
                  if(!POFound){
                    logger.log(
                      'info',
                      '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                    );  
                  } else{
                    const so = await RecordModel.findOne({ shippingOrders: { orderId : orderID } });
                    console.log("test", so, so.shippingOrders.createdBy, address)
                    if (so && so.shippingOrders.createdBy === address) {
                      //await POModel.update({ orderID }, { status });
                      wrapper.updateRecord(RecordModel,{ shippingOrders : { orderId : orderID } }, { shippingOrders : { assignedTo : assignedTo } })
                      return apiResponse.successResponseWithData(
                        res,
                        'Assign Shipping Order',
                        'Success',
                      );
                    } else {
                      return apiResponse.ErrorResponse(
                        res,
                        'You are not authorised to assign Shipping Order',
                      );
                    }  
                  }
  
                  logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < assignShippingOrder : Changed Successfully',
                  );
                } catch (e) {
                  return apiResponse.ErrorResponse(res, 'Error from Blockchain');
                }
              } else {
                res.json('Sorry! User does not have enough Permissions');
              }
            });
          } else {
            logger.log(
              'warn',
              '<<<<< ShippingService < Controller < assignShippingOrder : refuted token',
            );
            return apiResponse.ErrorResponse(res, result);
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< ShippingService < Controller < assignShippingOrder  : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];  

  exports.updateShippingOrder = [
    auth,
    async (req, res) => {
      try {
        checkToken(req, res, async result => {
          if (result.success) {
            logger.log(
              'info',
              '<<<<< ShippingService < Controller < updateShippingOrder : token verified successfully',
            );
  
            const permission_request = {
              result: result,
              permissionRequired: 'receiveSO',
            };
            checkPermissions(permission_request, async permissionResult => {
              if (permissionResult.success) {
                try {
                  const { address } = req.user;
                  const { orderID, assignedTo, status, poId } = req.body;
                  const { updatedBy } = req.user;
                  let date_ob = new Date();
                  let date = ('0' + date_ob.getDate()).slice(-2);
                  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
                  let year = date_ob.getFullYear();
                  let time = date_ob.getTime();
                  var timestamp = date + '-' + month + '-' + year + 'T' + time;
                  const { updatedAt } = timestamp;

                  const POFound = await RecordModel.findOne({ id: poId });
                  if(!POFound){
                    logger.log(
                      'info',
                      '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                    );  
                  } else{
                    const so = await RecordModel.findOne({ shippingOrders: { orderId : orderID } });
                    console.log("test", so, so.shippingOrders.createdBy, address)
                    if (so && so.shippingOrders.createdBy === address) {
                      //await POModel.update({ orderID }, { status });
                      wrapper.updateRecord(RecordModel, { shippingOrders : { orderId : orderID } }, 
                          { shippingOrders : { assignedTo : assignedTo } }, 
                          { shippingOrders : { status : status } }, 
                          { shippingOrders : { updatedBy : updatedBy } },
                          { shippingOrders : { updatedAt : updatedAt } })
                      return apiResponse.successResponseWithData(
                        res,
                        'Update Shipping Order',
                        'Success',
                      );
                    } else {
                      return apiResponse.ErrorResponse(
                        res,
                        'You are not authorised to update Shipping Order',
                      );
                    }  
                  }
                  
                  logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < updateShippingOrder : Changed Successfully',
                  );
                } catch (e) {
                  return apiResponse.ErrorResponse(res, 'Error from Blockchain');
                }
              } else {
                res.json('Sorry! User does not have enough Permissions');
              }
            });
          } else {
            logger.log(
              'warn',
              '<<<<< ShippingService < Controller < updateShippingOrder : refuted token',
            );
            return apiResponse.ErrorResponse(res, result);
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< ShippingService < Controller < updateShippingOrder  : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];  

exports.changeSOStatus = [
    auth,
    async (req, res) => {
      try {
        checkToken(req, res, async result => {
          if (result.success) {
            logger.log(
              'info',
              '<<<<< ShippingService < Controller < changeSOStatus : token verified successfully',
            );
  
            const permission_request = {
              result: result,
              permissionRequired: 'receiveSO',
            };
            checkPermissions(permission_request, async permissionResult => {
              if (permissionResult.success) {
                try {
                  const { address } = req.user;
                  const { orderID, status, poId } = req.body;

                  const POFound = await RecordModel.findOne({ id: poId });
                  if(!POFound){
                    logger.log(
                      'info',
                      '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                    );  
                  } else{
                    const so = await RecordModel.findOne({ shippingOrders: { orderId : orderID } });
                    console.log("test", so, so.shippingOrders.createdBy, address)
                    if (so && so.shippingOrders.createdBy === address) {
                      //await POModel.update({ orderID }, { status });
                   wrapper.updateRecord(RecordModel,{ shippingOrders : { orderId : orderID } }, { shippingOrders : { status : status } })
                      return apiResponse.successResponseWithData(
                        res,
                        'SO Status',
                        'Success',
                      );
                    } else {
                      return apiResponse.ErrorResponse(
                        res,
                        'You are not authorised to change the status',
                      );
                    }  
                  }
                  
                  logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < changeSOStatus : Changed Successfully',
                  );
                } catch (e) {
                  return apiResponse.ErrorResponse(res, 'Error from Blockchain');
                }
              } else {
                res.json('Sorry! User does not have enough Permissions');
              }
            });
          } else {
            logger.log(
              'warn',
              '<<<<< ShippingService < Controller < changeSOStatus : refuted token',
            );
            return apiResponse.ErrorResponse(res, result);
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< ShippingService < Controller < changeSOStatus  : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];  

