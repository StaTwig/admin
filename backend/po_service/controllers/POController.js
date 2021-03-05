const { body, validationResult } = require('express-validator');
const fs = require('fs');
const moveFile = require('move-file');
const XLSX = require('xlsx');
const axios = require('axios');
const uniqid = require('uniqid');

const POModel = require('../models/POModel');
const ShipmentModel = require('../models/ShipmentModel');
const RecordModel = require('../models/RecordModel');
const OrganisationModel = require('../models/OrganisationModel');
const ProductModel = require('../models/ProductModel');
const WarehouseModel = require('../models/WarehouseModel');
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

const products = require('../data/products');
const manufacturers = require('../data/manufacturers');

const init = require('../logging/init');
const logger = init.getLog();

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
            role: req.user.role,
            permissionRequired: 'viewPO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address, role } = req.user;
              const { skip, limit } = req.query;
              const poTableArray = [];

              var supplierPOs = await wrapper.findRecordsAndSort(RecordModel,{"supplier.supplierIncharge":address},skip,limit);
              var customerPos = await wrapper.findRecordsAndSort(RecordModel,{"customer.customerIncharge":address},skip,limit);
              var creatorPos = await wrapper.findRecordsAndSort(RecordModel,{"createdBy":address},skip,limit);

              var allPos,poItemsSupplier,poItemsCustomer,poItemsCreator = [];

              poItemsSupplier = supplierPOs.map(po => {
                const status = po.status === 'Created' ? 'Sent' : po.status;
                const item = {...po._doc, status };
                return item;
              });

              customerPos = customerPos.map(po => {
                const status = po.status === 'Created' ? 'Received' : po.status;
                const item = {...po._doc, status };
                return item;
              });

              poItemsCreator = creatorPos.map(po => {
                const status = po.status === 'Created' ? 'Received' : po.status;
                const item = {...po._doc, status };
                return item;
              });


              allPos = poItemsSupplier.concat(poItemsCustomer,poItemsCreator)

              if(role === 'powerUser') {
                allPos = await wrapper.findAllRecords(RecordModel,skip,limit);
              }

              for (i=0; i< allPos.length;i++)
              {
                const productArray = [];
                const supplier = await wrapper.findOneRecord(OrganisationModel,{"id":allPos[i].supplier.supplierOrganisation})
                const customer = await wrapper.findOneRecord(OrganisationModel,{"id":allPos[i].customer.customerOrganisation})
                const product = await wrapper.findOneRecord(ProductModel,{"id":allPos[i].products[0].productId})
                const deliveryLocation =  await wrapper.findOneRecord(WarehouseModel,{"id":allPos[i].customer.shippingAddress.shippingAddressId})
                for (j=0;j<allPos[i].products.length;j++)
                {
                  var productId = allPos[i].products[j].productId;
                  const product = await wrapper.findOneRecord(ProductModel,{"id": productId})
                  var product1 = {productID : allPos[i].products[j].productId,productQuantity: allPos[i].products[j].productQuantity,
                    productName:product.name,manufacturer:product.manufacturer }
                  productArray.push(product1)
                }
                poItems = {
                  suppplierOrgID:allPos[i].supplier.supplierOrganisation,
                  supplierOrgName:supplier.name,
                  purchaseOrderID : allPos[i].id,
                  externalId: allPos[i].externalId,
                  customerOrgID:allPos[i].customer.customerOrganisation,
                  customerOrgName: customer.name,
                  customerCountryName: customer.country.name,
                  customerCountryID: customer.country.id,
                  products: productArray,
                  deliveryLocationId: allPos[i].customer.shippingAddress.shippingAddressId,
                  deliveryLocation: deliveryLocation.postalAddress,
                  status: allPos[i].poStatus
                }
                poTableArray.push(poItems)
              }
              logger.log(
                  'info',
                  '<<<<< ShipmentService < ShipmentController < purchaseOrderStatistics : queried data by publisher',
              );
              res.json({ data: poTableArray });
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


exports.fetchAllPurchaseOrdersBC = [
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
              /*const acceptedPOs = await POModel.find({
                receiver: address,
                status: 'Accepted',
              });*/

              const acceptedPOs = await wrapper.findRecordsAndSort(POModel,{receiver: address,status: 'Accepted'});

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

exports.fetchPurchaseOrderBC = [
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
                const po = await RecordModel.findOne({ id : orderID });
                console.log("test",po,po.customer.customer_incharge,address)
                if (po && po.customer.customer_incharge === address) {
                  //await POModel.update({ orderID }, { status });
                  wrapper.updateRecord(RecordModel,{ id : orderID }, { poStatus : status })
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
      //Use this code for reindex
     /*  RecordModel.collection.dropIndexes(function(){
         RecordModel.collection.reIndex(function(finished){
                 console.log("finished re indexing")
               })
             })*/
      const { externalId, creationDate, supplier, customer, products, lastUpdatedOn } = req.body;
      const { createdBy, lastUpdatedBy } = req.user.id;
      const purchaseOrder = new RecordModel({
        id: uniqid('po-'),
        externalId,
        creationDate,
        supplier,
        customer,
        products,
        lastUpdatedOn,
        createdBy,
        lastUpdatedBy
      });
      const result  = await purchaseOrder.save();
      return apiResponse.successResponseWithData(res, 'Created PO Success', result.id);
    } catch (err) {
      logger.log(
          'error',
          '<<<<< ShipmentService < ShipmentController < createPurchaseOrder : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addPOsFromExcel = [
  auth,
  async (req, res) => {
    try {
      const permission_request = {
        role: req.user.role,
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
                workbook.Sheets[sheet_name_list[0]],
                { dateNF: 'dd/mm/yyyy;@', cellDates: true, raw: false },
            );
            const { createdBy, lastUpdatedBy } = req.user.id;
            let poDataArray = [];
            poDataArray = data.map(po => {
              return {
                id: uniqid('po-'),
                externalId: po['External Id'],
                "creationDate": new Date().toISOString(),
                "lastUpdatedOn": new Date().toISOString(),
                "supplier": {
                  "supplierOrganisation": po['Supplier Organisation'],
                  "supplierIncharge": po['Supplier Incharge']
                },
                "customer": {
                  "customerOrganisation": po['Customer Organisation'],
                  "customerIncharge": po['Customer Incharge'],
                  "shippingAddress": {
                    "shippingAddressId": po['Shipping Address Id'],
                    "shipmentReceiverId": po['Shipment Receiver Id']

                  }
                },
                "products": [
                  {
                    "productId": po['Product'],
                    "productQuantity": po['Quantity']
                  }
                ],
                createdBy,
                lastUpdatedBy
              }
            });
            await RecordModel.insertMany(poDataArray);
            return apiResponse.successResponseWithData(
                res,
                'Upload Result',
                poDataArray
            );
          } catch (e) {
            return apiResponse.ErrorResponse(res, 'Error from Blockchain');

          }
        } else {
          res.json('Sorry! User does not have enough Permissions');
        }
      });
    } catch (e) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.success = [
  async (req, res) => {
    try {
      const data = req.body;
      const { phone, payuMoneyId, amount, productinfo } = data;
      // This check is important as sometimes payumoney is sending multiple success responses
      const redirectUrl ='http://localhost:3000/shipments'

      return res.redirect(redirectUrl);
    } catch (err) {
      //throw error in json response with status 500.
    }
  },
];
