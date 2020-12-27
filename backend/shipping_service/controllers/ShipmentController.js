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
//this helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const checkPermissions = require('../middlewares/rbac_middleware')
  .checkPermissions;
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < shipmentStatistics : token verified successfully, querying data by publisher',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'viewShipment',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address } = req.user;
              const response = await axios.get(
                `${blockchain_service_url}/queryDataByPublishers?stream=${stream_name}&address=${address}`,
              );
              const items = response.data.items;
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < shipmentStatistics : queried data by publisher',
              );
              res.json({ data: items });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < shipmentStatistics : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < shipmentStatistics : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : token verified successfully, querying data by publisher',
          );
          const permission_request = {
            result: result,
            permissionRequired: 'viewPO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address, role } = req.user;
              const { skip, limit } = req.query;
              const senderPOs = await POModel.find({ sender: address })
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));
              const receiverPos = await POModel.find({ receiver: address })
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));
              let poItems,poItemsSender,poItemsReceiver = [];
              poItemsSender = senderPOs.map(po => {
                const status = po.status === 'Created' ? 'Sent' : po.status;
                const item = {...po._doc, status };
                return item;
              });

              /* await utility.asyncForEach(senderPOs, async po => {
                 const response = await axios.get(
                   `${blockchain_service_url}/queryDataByKey?stream=${po_stream_name}&key=${
                     po.orderID
                     }`,
                 );
                 const items = response.data.items;
                 if (items.length > 0) {
                   const item = items[items.length - 1];
                   item['status'] = po.status === 'Created' ? 'Sent' : po.status;
                   poItems.push(item);
                 }
               });*/
              poItemsReceiver = receiverPos.map(po => {
                const status = po.status === 'Created' ? 'Received' : po.status;
                const item = {...po._doc, status };
                return item;
              });

                 poItems = poItemsSender.concat(poItemsReceiver)
              /* await utility.asyncForEach(receiverPos, async po => {
                 const response = await axios.get(
                   `${blockchain_service_url}/queryDataByKey?stream=${po_stream_name}&key=${
                     po.orderID
                     }`,
                 );
                 const items = response.data.items;
                 if (items.length > 0) {
                   const item = items[items.length - 1];
                   item['status'] =
                     po.status === 'Created' ? 'Received' : po.status;
                   poItems.push(item);
                 }
               });*/
              if(role === 'powerUser') {
                const allPos = await POModel.find({})
                  .sort({ createdAt: -1 })
                  .skip(parseInt(skip))
                  .limit(parseInt(limit));
                const poItemsFiltered = allPos.filter(po => !poItems.find(poItem => poItem.orderID === po.orderID));
                poItems = [...poItems, ...poItemsFiltered];
              }
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : queried data by publisher',
              );
              res.json({ data: poItems });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchShipments : token verified successfully, querying data by key',
          );
          const permission_request = {
            result: result,
            permissionRequired: 'receiveShipment',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { key } = req.query;
              const response = await axios.get(
                `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
              );
              const items = response.data.items;
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < fetchShipments : quried by key',
              );
              res.json({ data: items });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < fetchShipments : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < fetchShipments : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : token verified successfully, querying all stream keys',
          );
          const permission_request = {
            result: result,
            permissionRequired: 'receivePO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const response = await axios.get(
                `${blockchain_service_url}/queryAllStreamKeys?stream=${po_stream_name}`,
              );
              const items = response.data.items;
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : queried all stream keys',
              );
              res.json({ data: items });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < fetchAllPurchaseOrders : error(catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : token verified successfully, querying all publisher keys',
          );
          const permission_request = {
            result: result,
            permissionRequired: 'viewPO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address } = req.user;
              const acceptedPOs = await POModel.find({
                receiver: address,
                status: 'Accepted',
              });

              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : queried all publisher keys',
              );
              const poIds = acceptedPOs.map(po => po.orderID);
              apiResponse.successResponseWithData(
                res,
                'Purchase Orders',
                poIds,
              );
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < fetchPublisherPurchaseOrders : error (catch block)',
      );
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
              const { shipmentId, batchNumber, poNumber } = data;
              const userData = {
                stream: stream_name,
                key: shipmentId,
                address: req.query.address || address,
                data: data,
              };

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
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : assigning sender address',
                );
                const newUser = new UserTransactionModel({
                  destinationUser: sender_address,
                  shipmentIds: [shipmentId],
                });
                await newUser.save();
              } else {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : shipment with sender found',
                );
                //const txnIds = [...sender.shipmentIds, shipmentId];
                const shipmentFound = sender.shipmentIds.find(
                  shpId => shpId === shipmentId,
                );
                if (!shipmentFound) {
                  logger.log(
                    'info',
                    '<<<<< ShipmentService < ShipmentController < createShipment : updating shipment for sender in model',
                  );
                  const shipmentIds = [...sender.shipmentIds, shipmentId];
                  await UserTransactionModel.updateOne(
                    { destinationUser: sender_address },
                    { shipmentIds },
                  );
                }
              }

              if (!receiver) {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : assigning receiver address',
                );
                const newUser = new UserTransactionModel({
                  destinationUser: receiver_address,
                  shipmentIds: [shipmentId],
                });
                await newUser.save();
              } else {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : shipment with receiver found',
                );
                //const txnIds = [...receiver.txnIds, txnId];
                const shipmentFound = receiver.shipmentIds.find(
                  shpId => shpId === shipmentId,
                );
                if (!shipmentFound) {
                  logger.log(
                    'info',
                    '<<<<< ShipmentService < ShipmentController < createShipment : updating shipment for receiver in model',
                  );
                  const shipmentIds = [...receiver.shipmentIds, shipmentId];
                  await UserTransactionModel.updateOne(
                    { destinationUser: receiver_address },
                    { shipmentIds },
                  );
                }
              }
              //Shipment Collection
              if (!shipmentFound) {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : shipment found in collection',
                );
                const estimatedDeliveryDateArray = data.estimateDeliveryDate.split(
                  '/',
                );
                const estimatedDeliveryDate = new Date(
                  estimatedDeliveryDateArray[2],
                  parseInt(estimatedDeliveryDateArray[1]) - 1,
                  estimatedDeliveryDateArray[0],
                );
                const newShipment = new ShipmentModel({
                  shipmentId,
                  poNumber,
                  batchNumber,
                  txnIds: [txnId],
                  receiver: receiver_address,
                  sender: address,
                  status: data.status,
                  estimatedDeliveryDate: estimatedDeliveryDate.toISOString(),
                });
                await newShipment.save();
              } else {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : updating shipment in shipment model',
                );
                const txnIds = [...shipmentFound.txnIds, txnId];
                await ShipmentModel.updateOne(
                  { shipmentId },
                  { txnIds, status: data.status },
                );
              }
              //Organisation Collection
              if (!organisationFound) {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : assigning organisation',
                );
                const newOrganisation = new OrganisationModel({
                  organisationId: userModel.organisation,
                  shipmentNumber: [shipmentId],
                });
                await newOrganisation.save();
              } else {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createShipment : organisation already present',
                );
                const shipmentNumbers = [
                  ...organisationFound.shipmentNumbers,
                  data.shipmentId,
                ];

                await OrganisationModel.updateOne(
                  { organisationId: userModel.organisation },
                  { shipmentNumbers },
                );
              }

              //PurchaseOrder collection
              // const orderID = "PO45163183";
              const POFound = await POModel.findOne({ orderID: data.poNumber });
              if (!POFound) {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createPO : PO not found in collection',
                );
              } else {
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createPO : updating ShipmentId in PO model',
                );
                let shipmentIds = [...POFound.shipmentIds, shipmentId];
                shipmentIds = [...new Set(shipmentIds)]
                await POModel.updateOne({ orderID: data.poNumber }, {shipmentIds});
              }
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < createShipment : user not authenticated',
          );
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
        apiResponse.successResponseWithData(res, 'Success');
      });
    } catch (err) {
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < createShipment : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < reviewShipment : token verified successfully',
          );
          const permission_request = {
            result: result,
            permissionRequired: 'scanShipment',
          };
          checkPermissions(permission_request, permissionResult => {
            if (permissionResult.success) {
              const { shipment_id } = result.data.shipment_id;
              res.json('Shipment Review');
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < reviewShipment : could not verify token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < reviewShipment : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < verifyShipment : token verified successfully',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'completeShipment',
          };
          checkPermissions(permission_request, permissionResult => {
            if (permissionResult.success) {
              const { shipment_id } = result.data.shipment_id;
              res.json('Shipment Verify');
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < verifyShipment : could not verify token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < verifyShipment : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < modifyShipment : token verified successfully, querying data by key',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'scanShipment',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
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
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : queried data by key',
              );
              res
                .status(200)
                .json({ response: postResponse.data.transactionId });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : token verified successfully, querying data by key',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'viewPO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { key } = req.query;
              const response = await axios.get(
                `${blockchain_service_url}/queryDataByKey?stream=${po_stream_name}&key=${key}`,
              );
              const items = response.data.items;
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : queried data by key',
              );
              return apiResponse.successResponseWithData(
                res,
                'Purchase Order Info',
                items,
              );
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < fetchPurchaseOrder : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.changePOStatus = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< POStatus < ShipmentController < changePOStatus : token verified successfully',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'receivePO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const { address } = req.user;
                const { orderID, status } = req.body;
                const po = await POModel.findOne({ orderID });
                if (po && po.receiver === address) {
                  await POModel.update({ orderID }, { status });
                  return apiResponse.successResponseWithData(
                    res,
                    'PO Status',
                    'Success',
                  );
                } else {
                  return apiResponse.ErrorResponse(
                    res,
                    'You are not authorised to change the status',
                  );
                }

                logger.log(
                  'info',
                  '<<<<< POStatus < ShipmentController < changePOStatus : Changed Successfully',
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
            '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : refuted token',
          );
          return apiResponse.ErrorResponse(res, result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : token verified successfully, publishing to blockchain',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'createPO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const { address } = req.user;
                const { data } = req.body;
                const orderID = data.orderID || 'PO' + Math.floor(1000 + Math.random() * 9000);

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

                const txnIdPO = response.data.transactionId;
                const POFound = await POModel.findOne({ orderID });

                if (!POFound) {
                  logger.log(
                    'info',
                    '<<<<< ShipmentService < ShipmentController < createPO : PO found in collection',
                  );

                  const newPO = new POModel({
                    ...data,
                    status: req.user.address  === data.sendpoto.address ? 'Accepted':'Created',
                    orderID,
                    txnIds: [txnIdPO],
                    sender: req.user.address,
                    receiver: req.user.address  === data.sendpoto.address ? data.receiver.address : data.sendpoto.address,
                    txnId: txnIdPO,
                  });
                      
                  await newPO.save();
                } else {
                  logger.log(
                    'info',
                    '<<<<< ShipmentService < ShipmentController < createPO : updating PO in PO model',
                  );
                  const txnIds = [...POFound.txnIds, txnIdPO];
                  await POModel.updateOne({ orderID }, { txnIds });
                }

                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : published to blockchain',
                );
                res.status(200).json({
                  txid: response.data.transactionId,
                  orderID: orderID,
                });
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
            '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : refuted token',
          );
          return apiResponse.ErrorResponse(res, result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : token verified successfully, querying all publisher keys',
          );
          //const { address } = req.query;

          const permission_request = {
            result: result,
            permissionRequired: 'viewShipment',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
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
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : queried data by key',
              );
              res.json({ data: items_array });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < fetchPublisherLatestShipments : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : token verified successfully, querying all stream keys',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'viewShipment',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
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
              logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : queried all stream keys',
              );
              res.json({ data: items_array });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < fetchAllLatestShipments : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getProducts = [
  auth,
  (req, res) => {
    logger.log(
      'info',
      '<<<<< ShipmentService < ShipmentController < getProducts : getting products',
    );
    return apiResponse.successResponseWithData(res, 'Products lists', products);
  },
];

exports.getManufacturers = [
  auth,
  (req, res) => {
    logger.log(
      'info',
      '<<<<< ShipmentService < ShipmentController < getManufacturers : getting manufacturers',
    );
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
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < getAllShipmentColl : getting all shipment collection',
      );
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < getAllShipmentColl : rror (catch block)',
      );
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
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < getAllUserColl : getting all user collection',
      );
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < getAllUserColl : error (catch block)',
      );
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
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < getAllOrgColl : getting all organisation collection',
      );
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < getAllOrgColl : error (catch block)',
      );
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
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < getAllProductColl : getting all product collection',
      );
      return apiResponse.successResponseWithData(res, users);
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < getAllProductColl : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.trackShipment = [
  auth,
  async (req, res) => {
    try {
      const { shipmentId } = req.query;
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < trackShipment : tracking shipment, querying data by transaction hash',
      );
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
        logger.log(
          'info',
          '<<<<< ShipmentService < ShipmentController < trackShipment : tracked shipment, queried data by transaction hash',
        );
        res.json({ data: items_array });
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < trackShipment : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchUserShipments = [
  auth,
  async (req, res) => {
    try {
      const { user } = req;
      const { skip, limit } = req.query;
      const userObject = await UserModel.findOne({ address: user.address });
      let totalSent = 0;
      let thisYearSent = 0;
      let thisMonthSent = 0;
      let thisWeekSent = 0;
      let todaySent = 0;
      let totalReceived = 0;
      let thisYearReceived = 0;
      let thisMonthReceived = 0;
      let thisWeekReceived = 0;
      let todayReceived = 0;
      let totalTransit = 0;
      let thisYearTransit = 0;
      let thisMonthTransit = 0;
      let thisWeekTransit = 0;
      let todayTransit = 0;
      let totalDelayed = 0;
      let thisYearDelayed = 0;
      let thisMonthDelayed = 0;
      let thisWeekDelayed = 0;
      let todayDelayed = 0;
      let items_array = [];
      if (userObject.role !== 'Warehouse' && userObject.role !== 'powerUser') {
        logger.log(
          'info',
          '<<<<< ShipmentService < ShipmentController < fetchUserShipments : fetching user shipments',
        );
        const destinationUser = await UserTransactionModel.findOne({
          destinationUser: user.address,
        });

        let shipmentIds = [];
        if (destinationUser) {
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchUserShipments : destination user shipments',
          );
          shipmentIds = destinationUser.shipmentIds
            .reverse()
            .filter(
              (shipmentId, index) =>
                index >= parseInt(skip) &&
                index < parseInt(limit) + parseInt(skip),
            );
        }
        await utility.asyncForEach(shipmentIds, async shipmentId => {
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${shipmentId}`,
          );
          let txnId = '';
          const items = response.data.items.map(item => {
            txnId = item.txid;
            return item.data;
          });
          const itemsObject = JSON.parse(items);
          itemsObject.txnId = txnId;
          items_array.push(itemsObject);
        });
        logger.log(
          'info',
          '<<<<< ShipmentService < ShipmentController < fetchUserShipments : pushed total, transit, shipped and received',
        );
      } else {
        logger.log(
          'info',
          '<<<<< ShipmentService < ShipmentController < fetchUserShipments : finding user shipment in Organisation Model',
        );
        OrganisationModel.findOne({
          organisationId: userObject.organisation,
        }).then(async user => {
          if (user) {
            logger.log(
              'info',
              '<<<<< ShipmentService < ShipmentController < fetchUserShipments : user found',
            );
            let shipIDs = user.shipmentNumbers;
            let unique_shipIDs = [...new Set(shipIDs)];
            await utility.asyncForEach(unique_shipIDs, async shipId => {
              const response = await axios.get(
                `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${shipId}`,
              );
              let txnId = '';
              const items = response.data.items.map(item => {
                txnId = item.txid;
                return item.data;
              });
              const itemsObject = JSON.parse(items);
              itemsObject.txnId = txnId;
              items_array.push(itemsObject);
            });
          }

          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < fetchUserShipments : pushed total, transit, shipped and received',
          );
        });
      }

      const thisYear = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1),
      );
      const thisMonth = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      );
      const thisWeek = new Date(new Date().setDate(new Date().getDate() - 7));
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      totalSent = await ShipmentModel.find({
        sender: user.address,
        status: 'Shipped',
      }).count();
      thisYearSent = await ShipmentModel.find({
        sender: user.address,
        status: 'Shipped',
        createdAt: { $gte: thisYear.toISOString() },
      }).count();
      thisMonthSent = await ShipmentModel.find({
        sender: user.address,
        status: 'Shipped',
        createdAt: { $gte: thisMonth.toISOString() },
      }).count();
      thisWeekSent = await ShipmentModel.find({
        sender: user.address,
        status: 'Shipped',
        createdAt: { $gte: thisWeek.toISOString() },
      }).count();
      todaySent = await ShipmentModel.find({
        sender: user.address,
        status: 'Shipped',
        createdAt: { $gte: today.toISOString() },
      }).count();
      totalReceived = await ShipmentModel.find({
        sender: user.address,
        status: 'Received',
      }).count();
      thisYearReceived = await ShipmentModel.find({
        sender: user.address,
        status: 'Received',
        createdAt: { $gte: thisYear.toISOString() },
      }).count();
      thisMonthReceived = await ShipmentModel.find({
        sender: user.address,
        status: 'Received',
        createdAt: { $gte: thisMonth.toISOString() },
      }).count();
      thisWeekReceived = await ShipmentModel.find({
        sender: user.address,
        status: 'Received',
        createdAt: { $gte: thisWeek.toISOString() },
      }).count();
      todayReceived = await ShipmentModel.find({
        sender: user.address,
        status: 'Received',
        createdAt: { $gte: today.toISOString() },
      }).count();
      totalTransit = await ShipmentModel.find({
        sender: user.address,
        status: 'In Transit',
      }).count();
      thisYearTransit = await ShipmentModel.find({
        sender: user.address,
        status: 'In Transit',
        createdAt: { $gte: thisYear.toISOString() },
      }).count();
      thisMonthTransit = await ShipmentModel.find({
        sender: user.address,
        status: 'In Transit',
        createdAt: { $gte: thisMonth.toISOString() },
      }).count();
      thisWeekTransit = await ShipmentModel.find({
        sender: user.address,
        status: 'In Transit',
        createdAt: { $gte: thisWeek.toISOString() },
      }).count();
      todayTransit = await ShipmentModel.find({
        sender: user.address,
        status: 'In Transit',
        createdAt: { $gte: today.toISOString() },
      }).count();
      res.json({
        data: items_array,
        counts: {
          totalShipments: {
            total: totalSent,
            thisYear: thisYearSent,
            thisMonth: thisMonthSent,
            thisWeek: thisWeekSent,
            today: todaySent,
          },
          totalShipmentsSent: {
            total: totalSent,
            thisYear: thisYearSent,
            thisMonth: thisMonthSent,
            thisWeek: thisWeekSent,
            today: todaySent,
          },
          totalShipmentsReceived: {
            total: totalReceived,
            thisYear: thisYearReceived,
            thisMonth: thisMonthReceived,
            thisWeek: thisWeekReceived,
            today: todayReceived,
          },
          currentShipments: {
            total: totalTransit,
            thisYear: thisYearTransit,
            thisMonth: thisMonthTransit,
            thisWeek: thisWeekTransit,
            today: todayTransit,
          },
          shipmentsDelayed: {
            total: totalDelayed,
            thisYear: thisYearDelayed,
            thisMonth: thisMonthDelayed,
            thisWeek: thisWeekDelayed,
            today: todayDelayed,
          },
        },
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < fetchUserShipments : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

const QRCode = require('qrcode');

exports.generateQRCode = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          const { address } = req.user;
          const { data } = req.body;
          const { filename } = req.query;
          const json_data = JSON.stringify(req.body);
          QRCode.toFile(
            filename + '.png',
            "'" + json_data + "'",
            {
              color: {
                dark: '#00F', // Blue dots
                light: '#0000', // Transparent background
              },
            },
            function(err) {
              if (err) throw err;
            },
          );
          res.status(200).json({ message: 'success' });
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < GenerateQRCode',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < GenerateQRCode : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addPOsFromExcel = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          const permission_request = {
            result: result,
            permissionRequired: 'createPO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const dir = `uploads`;
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir);
                }
                await moveFile(
                  req.file.path,
                  `${dir}/${req.file.originalname}`,
                );
                const workbook = XLSX.readFile(
                  `${dir}/${req.file.originalname}`,
                );
                const sheet_name_list = workbook.SheetNames;
                const data = XLSX.utils.sheet_to_json(
                  workbook.Sheets[sheet_name_list[1]],
                  { dateNF: 'dd/mm/yyyy;@', cellDates: true, raw: false },
                );

                let poDataArray = [];
                await utility.asyncForEach(data, async item => {
                  const receiverDetails = await UserModel.findOne({
                    name: item['Country Name'],
                  });
                  const senderDetails = await UserModel.findOne({
                    name: item['Vendor Name'],
                  });
                  let productName = item['Material Description'].split(',')[0];
                  productName = productName.includes('BCG')
                    ? 'BCG'
                    : productName;
                  const productManufacturer = `${productName}-${
                    item['Vendor Name']
                    }`;
                  if (receiverDetails && senderDetails) {
                    const poData = {
                      client: item['Vendor Name'],
                      orderID: `PO${item['UNICEf PO Number']}`,
                      clientId: item['Vendor'],
                      date: item['Document Date'],
                      destination: item['Country Name'],
                      products: [
                        { [productManufacturer]: item['Order Quantity'] },
                      ],
                      receiver: {
                        address: receiverDetails.address,
                        name: receiverDetails.name,
                        email: receiverDetails.email,
                      },
                      sendpoto: {
                        address: senderDetails.address,
                        name: senderDetails.name,
                        email: senderDetails.email,
                      },
                      ipCode: item['IP Code'],
                      ipName: item['IP Name'],
                      incoterms: item['Incoterms'],
                      incoterms2: item['Incoterms (Part 2)'],
                      material: item['Material'],
                      matrialDescription: item['Material Description'],
                      quantity: item['Order Quantity'],
                      unit: item['Order Unit'],
                      poItem: item['PO Item#'],
                      plant: item['Plant'],
                      vendor: item['Vendor'],
                      vendorName: item['Vendor Name'],
                      reference: item['Your Reference'],
                    };
                    poDataArray.push(poData);
                  }
                });
                logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : published to blockchain',
                );
                console.log(poDataArray);
                let duplciatePOFound = false;
                utility.asyncForEach(poDataArray, async (item, index) => {
                  if(duplciatePOFound) return;
                  const { address } = req.user;
                  const {
                    client,
                    clientId,
                    date,
                    destination,
                    incoterms,
                    incoterms2,
                    ipCode,
                    ipName,
                    material,
                    materialDescription,
                    orderID,
                    plant,
                    poItem,
                    products,
                    quantity,
                    reference,
                    unit,
                    vendor,
                    vendorName,
                  } = item;
                  const userData = {
                    stream: po_stream_name,
                    key: item.orderID,
                    address,
                    data: item,

                  };
                  duplicatePO = await POModel.findOne({ orderID });

                  if(duplicatePO) {
                    const newNotification = new NotificationModel({
                      owner: req.user.address,
                      message: `Your POs from excel is failed to add due to duplicate PO ID ${orderID}`,
                    });
                    await newNotification.save();
                    return;
                  }
                  const response = await axios.post(
                    `${blockchain_service_url}/publish`,
                    userData,
                  );
                  const newPO = new POModel({
                    orderID,
                    sender: item.sendpoto.address,
                    receiver: item.receiver.address,
                    client,
                    clientId,
                    date,
                    destination,
                    incoterms,
                    incoterms2,
                    ipCode,
                    ipName,
                    material,
                    materialDescription,
                    plant,
                    poItem,
                    products,
                    quantity,
                    reference,
                    unit,
                    vendor,
                    vendorName,
                    txnId: response.data.transactionId,
                    status: 'Accepted'
                  });
                  await newPO.save();
                  if(index === poDataArray.length-1) {
                    const newNotification = new NotificationModel({
                      owner: req.user.address,
                      message: `Your POs from excel is added successfully`,
                    });
                    await newNotification.save();
                  }
                });
                return apiResponse.successResponseWithData(
                  res,
                  'Upload Result',
                );
              } catch (e) {
                return apiResponse.ErrorResponse(res, 'Error from Blockchain');

              }
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
      });
    } catch (e) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getPOdetailsByShipmentID = [
  auth,
  async (req, res) => {
    try {
      const { shipmentId } = req.query;
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < trackShipment : tracking shipment, querying data by transaction hash',
      );
      ShipmentModel.findOne({ shipmentId: shipmentId }).then(async user => {
          let txnIds = user.txnIds
          let txnId = txnIds[txnIds.length-1]
        let poNumber = user.poNumber;
        POModel.findOne({ orderID: poNumber }).then(async user => {
          let poDetails = user;
          res.json({poDetails: poDetails,txnIds: txnIds,txnId: txnId});
        })
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < trackShipment : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getProductdetailsByshipmentID = [
  auth,
  async (req, res) => {
    try {
      const { shipmentId } = req.query;
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < trackShipment : tracking shipment, querying data by transaction hash',
      );
      const products = await InventoryModel.aggregate([
        { $match: { shipmentId: shipmentId } },
        {
          $group: {
                    _id : {productName:"$productName",batchNumber:"$batchNumber"},
                    serialNumberFirst:{$first:"$serialNumber"},serialNumberLast:{$last:"$serialNumber"},serialNumbers:{$addToSet:"$serialNumber"},manufacturingDate:{$max:"$manufacturingDate"},expiryDate:{$max:"$expiryDate"},
            productName: { $first: '$productName' },
            quantity: { $sum: '$quantity' },
          },
        },
      ]);
            res.json({productDetails: products});
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < trackShipment : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
