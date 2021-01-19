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
const InventoryModel = require('../models/InventoryModel');
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
            result: result,
            permissionRequired: 'viewPO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address, role } = req.user;
              const { skip, limit } = req.query;
              var supplierPOs = await wrapper.findRecordsAndSort(RecordModel,{"supplier.supplierIncharge":address},skip,limit);
              var customerPos = await wrapper.findRecordsAndSort(RecordModel,{"customer.customer_incharge":address},skip,limit);
	      var creatorPos = await wrapper.findRecordsAndSort(RecordModel,{"createdBy":address},skip,limit);

              var poItems,poItemsSupplier,poItemsCustomer,poItemsCreator = [];

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
	      

               poItems = poItemsSupplier.concat(poItemsCustomer,poItemsCreator)
              
		if(role === 'powerUser') {
                /*const allPos = await POModel.find({})
                  .sort({ createdAt: -1 })
                  .skip(parseInt(skip))
                  .limit(parseInt(limit));*/

		 const allPos = await wrapper.findAllRecords(RecordModel,skip,limit);
		 console.log("31",allPos)
                 //const poItemsFiltered = allPos.filter(po => !poItems.find(poItem => poItem.orderID === po.orderID));
                poItems = [...poItems, ...allPos];
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
		console.log("response",response)
                const txnIdPO = response.data.transactionId;
                const POFound = await RecordModel.findOne({ id : orderID });
		console.log("POFound",POFound)
                if (!POFound) {
                  logger.log(
                    'info',
                    '<<<<< ShipmentService < ShipmentController < createPO : PO found in collection',
                  );

                 /* const newPO = {
                    ...data,
                    status: req.user.address  === data.sendpoto.address ? 'Accepted':'Created',
                    orderID,
                    txnIds: [txnIdPO],
                    sender: req.user.address,
                    receiver: req.user.address  === data.sendpoto.address ? data.receiver.address : data.sendpoto.address,
                    txnId: txnIdPO,
                  };*/
		 let date_ob = new Date();
                 let date = ('0' + date_ob.getDate()).slice(-2);
                 let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
                 let year = date_ob.getFullYear();
                 var today = date + '-' + month + '-' + year;
                 var createdDate = { createdDate: today };

		 const newPO = {
			 id : orderID,
			 creationDate : today,
			 createdBy : req.user.address,
			 poStatus : 'Created',
			 potransactionIds: txnIdPO,
			 ...data
                  };
		console.log("newPO",newPO)
                  //await newPO.save();
		 
		//wrapper.insertOneRecord(POModel, newPO, function(error,response){
		//	})

		wrapper.insertOneRecord(RecordModel, newPO, function(error,response){
                        })
                } else {
                  logger.log(
                    'info',
                    '<<<<< ShipmentService < ShipmentController < createPO : updating PO in PO model',
                  );
                  const txnIds = [...POFound.potransactionIds, txnIdPO];
		  wrapper.updateRecord(RecordModel,{ id: orderID }, { potransactionIds: txnIds })
		  //await POModel.updateOne({ orderID }, { txnIds });
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
                    //await newNotification.save();
                     wrapper.insertOneRecord(NotificationModel, newNotification, function(error,response){
		     })
		     return;
                  }
                  const response = await axios.post(
                    `${blockchain_service_url}/publish`,
                    userData,
                  );
                  /*const newPO = {
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
                  };
*/
		 const newPO = {
                        id : orderID,
                        createdBy: req.user.address,
                        poStatus: "Accepted",
			potransactionIds: response.data.transactionId,
			"supplier":
			    {
				    "supplierOrganization": "ORG1",
				    "supplierIncharge": item.sendpoto.address,
			    },
			 products,
			 creationDate : date,
			"customer": {
				    "customer_organization": "ORG2",
				    "customer_incharge": item.receiver.address,
				    "shipping_address": {
				    "shipping_address_id": destination,
				    "shipment_receiver_id": clientId,
			    }
			  },
                    }
		 //await newPO.save();
	          wrapper.insertOneRecord(POModel, newPO, function(error,response){
                      })
 
                  if(index === poDataArray.length-1) {
                    const newNotification = {
                      owner: req.user.address,
                      message: `Your POs from excel is added successfully`,
                    };
                    //await newNotification.save();
		     wrapper.insertOneRecord(NotificationModel, newNotification, function(error,response){
                        })

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

