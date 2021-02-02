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
const uniqid = require('uniqid');

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
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            const poId = req.body.poId;
            const shippingOrder = req.body.shippingOrder;
            shippingOrder.shippingOrderId = uniqid('so-')
            const POFound = await RecordModel.findOne({id: poId});
            existingShippingOrders = POFound.shippingOrders;
            totalShippingOrders = existingShippingOrders.length;
            console.log("Purchase Order Id", totalShippingOrders);
            // console.log("shippingOrder", shippingOrder);

            if(!POFound){
              logger.log(
                'info',
                '<<<<< ShippingService < Controller < createShippingOrder : PO not found in collection',
              );
              return res.status(404).json({error: `${po} PO Not Found`})  
            } else{
              console.log("shippingOrder", shippingOrder);
              await RecordModel.updateOne({id:poId}, {$push: { shippingOrders:shippingOrder} }).then((result)=>{
                return res.status(200).json({ 
                  response: "Success - Shipping Order created", 
                  shippingOrder: result 
                });
               }).catch((err)=>{
                 return res.status(500).json({error:`${err} Error Occured `})
               }) 
            }
          } else {
            logger.log(
              'warn',
              '<<<<< ShippingService < ShippingController < createShippingOrder : refuted token',
            );
            res.status(403).json("Auth Failed");
          }
       }
        )} catch (err) {
        logger.log(
          'error',
          '<<<<< ShipmentService < Controller < modifyShipment : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
        }    
    }
  ];

  exports.fetchAllShippingOrders = [
    auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            const { poId } = req.body;
            console.log("POId: ", poId);
            const POFound = await RecordModel.findOne({id: poId});
            console.log("POFound", POFound);
            existingShippingOrders = POFound.shippingOrders;
            totalShippingOrders = existingShippingOrders.length;
            console.log("Purchase Order Id", totalShippingOrders);
            // console.log("shippingOrder", shippingOrder);

            if(!POFound){
              logger.log(
                'info',
                '<<<<< ShippingService < Controller < createShippingOrder : PO not found in collection',
              );
              return res.status(404).json({error: `${po} PO Not Found`})  
            } else{
              console.log("Existing Shipping Orders", existingShippingOrders);
                return res.status(200).json({ 
                  response: existingShippingOrders, 
                }).catch((err)=>{
                 return res.status(500).json({error:`${err} Error Occured `})
               }) 
            }
          } else {
            logger.log(
              'warn',
              '<<<<< ShippingService < ShippingController < createShippingOrder : refuted token',
            );
            res.status(403).json("Auth Failed");
          }
       }
        )} catch (err) {
        logger.log(
          'error',
          '<<<<< ShipmentService < Controller < modifyShipment : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
        }    
    }
  ];

  exports.viewShippingOrder = [
    auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            const poId = req.body.poId;
            const soId = req.body.soId;
            const POFound = await RecordModel.findOne({id: poId});
            var SOFound;            
            existingShippingOrders = POFound.shippingOrders;
            for(var i=0; i< existingShippingOrders.length; i++){
              if(soId === existingShippingOrders[i].shippingOrderId){
                SOFound = existingShippingOrders[i];
                break;
              }
            }

            totalShippingOrders = existingShippingOrders.length;
            console.log("Purchase Order Id", totalShippingOrders);
            // console.log("shippingOrder", shippingOrder);

            if(!POFound){
              logger.log(
                'info',
                '<<<<< ShippingService < Controller < viewShippingOrder : PO not found in collection',
              );
              return res.status(404).json({error: `${po} PO Not Found`})  
            } else{
              if(!SOFound){
                logger.log(
                  'info',
                  '<<<<< ShippingService < Controller < viewShippingOrder : SO not found in collection',
                );
                return res.status(404).json({error: `${po} SO Not Found`})    
              }else{
                console.log("Requested Shipping Orders", SOFound);
                return res.status(200).json({ 
                  response: SOFound, 
                }).catch((err)=>{
                 return res.status(500).json({error:`${err} Error Occured `})
               }) 
              }
            }
          } else {
            logger.log(
              'warn',
              '<<<<< ShippingService < ShippingController < viewShippingOrder : refuted token',
            );
            res.status(403).json("Auth Failed");
          }
       }
        )} catch (err) {
        logger.log(
          'error',
          '<<<<< ShipmentService < Controller < modifyShipment : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
        }    
    }
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

