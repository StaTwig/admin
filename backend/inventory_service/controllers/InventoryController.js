const { body, validationResult } = require("express-validator");
const moveFile = require("move-file");
require("../utils/date");
const XLSX = require("xlsx");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const { warehouseDistrictMapping } = require("../helpers/constants");
const auth = require("../middlewares/jwt");
const InventoryModel = require("../models/InventoryModel");
const RecordModel = require('../models/RecordModel');
const WarehouseModel = require("../models/WarehouseModel");
const ShipmentModel = require("../models/ShipmentModel");
const EmployeeModel = require("../models/EmployeeModel");
const AtomModel = require("../models/AtomModel");
const ProductModel = require("../models/ProductModel");
const NotificationModel = require("../models/NotificationModel");
const logEvent = require("../../../utils/event_logger");
const checkPermissions = require("../middlewares/rbac_middleware").checkPermissions;
const axios = require("axios");

const fs = require("fs");
const uniqid = require("uniqid");
// const path = require('path');
const blockchain_service_url = process.env.URL;
const product_service_url = process.env.PRODUCT_URL;

const stream_name = process.env.STREAM;

const init = require('../logging/init');
const OrganisationModel = require('../models/OrganisationModel');
const AnalyticsModel = require('../models/AnalyticsModel');
const logger = init.getLog();
const CENTRAL_AUTHORITY_ID = null;
const CENTRAL_AUTHORITY_NAME = null;
const CENTRAL_AUTHORITY_ADDRESS = null;

exports.getTotalCount = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
      permission_request = {
        role: role,
        permissionRequired: "viewInventory",
      };
      checkPermissions(permission_request, (permissionResult) => {
        if (permissionResult.success) {
          return apiResponse.successResponse(res,"Total inventory count");
        } else {
          return apiResponse.forbiddenResponse(res,"User does not authorized to view this resource.");
        }
      });
      }catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getTotalCountOnHold = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
      permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, (permissionResult) => {
            if (permissionResult.success) {
              return apiResponse.successResponse(res,"Total inventory count on Hold");
            } else {
              return apiResponse.forbiddenResponse(res,"User does not authorized to view this resource.");
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getExpiringInventory = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
          permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, (permissionResult) => {
            if (permissionResult.success) {
              return apiResponse.successResponse(res,"Total inventory count expiring");
            } else {
              return apiResponse.forbiddenResponse(res,"User does not authorized to view this resource.");
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getInventoryforProduct = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
          permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, (permissionResult) => {
            if (permissionResult.success) {
              return apiResponse.successResponse(res,"Inventory details for product");
            } else {
              return apiResponse.forbiddenResponse(res,"User does not authorized to view this resource.");
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getInventoryDetailsForProduct = [
  auth,
  (req, res) => {
    try {
      const {role} = req.user;
      const { key } = req.query;
          permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const response = await axios.get(
                `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`
              );
              const items = response.data.items;
              return apiResponse.successResponseWithData(res,"getInventoryDetailsForProduct", items);
            } else {
              return apiResponse.forbiddenResponse(res,"User does not authorized to view this resource.");
            }
            })
      }catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getAllInventoryDetails = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
      const { address } = req.user;
      const { skip, limit } = req.query;
          permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              /* InventoryModel.collection.dropIndexes(function(){
                InventoryModel.collection.reIndex(function(finished){
                  console.log("finished re indexing")
                })
              })*/
              // InventoryModel.createIndexes();
              const inventoryResult = await InventoryModel.find({
                owner: address,
              })
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));
              /*
               let chunkUrls = [];
              inventoryResult.forEach(inventory => {
                const chunkUrl = axios.get(
                  `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${
                    inventory.serialNumber
                  }`,
                );
                chunkUrls.push(chunkUrl);
              });*/
              // const responses = await axios.all(chunkUrls);
              //const items = responses.map(response => response.data.items[0]);
              const productNamesResponse = await axios.get(
                `${product_service_url}/getProductNames`,
                {
                  headers: {
                    Authorization: req.headers.authorization,
                  },
                }
              );

              const products_array = productNamesResponse.data.data.map(
                (product) => product.productName
              );

              const nextYear = new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              );
              nextYear.setMonth(0);
              nextYear.setUTCHours(0, 0, 0, 0);
              nextYear.setDate(1);
              const thisYear = new Date(
                new Date().setFullYear(new Date().getFullYear())
              );
              thisYear.setMonth(0);
              thisYear.setDate(1);
              thisYear.setUTCHours(0, 0, 0, 0);
              const nextMonth = new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              );
              nextMonth.setUTCHours(0, 0, 0, 0);
              const thisMonth = new Date(
                new Date().setMonth(new Date().getMonth())
              );
              thisMonth.setUTCDate(1);
              thisMonth.setUTCHours(0, 0, 0, 0);
              /* const nextWeek = new Date(
                new Date().setDate(new Date().getDate() + 7),
              );
              nextWeek.setUTCHours(0, 0, 0, 0);*/
              /* const thisWeek = new Date(
                new Date().setDate(new Date().getDate()),
              );*/
              const thisWeek = Date.monday();
              const nextWeek = Date.next().monday();
              const tomorrow = new Date(
                new Date().setDate(new Date().getDate() + 1)
              );
              tomorrow.setUTCHours(0, 0, 0, 0);
              const today = new Date();
              today.setUTCHours(0, 0, 0, 0);

              total_inv = await InventoryModel.find({
                owner: address,
              }).countDocuments();
              const thisYearAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: thisYear.toISOString(),
                  $lte: nextYear.toISOString(),
                },
              }).countDocuments();
              const thisMonthAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: thisMonth.toISOString(),
                  $lte: nextMonth.toISOString(),
                },
              }).countDocuments();
              const thisWeekAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: thisWeek.toISOString(),
                  $lte: nextWeek.toISOString(),
                },
              }).countDocuments();
              const todayAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: today.toISOString(),
                  $lt: tomorrow.toISOString(),
                },
              }).countDocuments();
              const thisYearExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisYear.toISOString(),
                  $lt: nextYear.toISOString(),
                },
              }).countDocuments();
              const thisMonthExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisMonth.toISOString(),
                  $lt: nextMonth.toISOString(),
                },
              }).countDocuments();
              const thisWeekExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisWeek.toISOString(),
                  $lt: nextWeek.toISOString(),
                },
              }).countDocuments();
              const todayExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: today.toISOString(),
                  $lt: tomorrow.toISOString(),
                },
              }).countDocuments();
              const totalExpired = await InventoryModel.find({
                owner: address,
                expiryDate: { $lte: today.toISOString() },
              }).countDocuments();
              const thisMonthExpired = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisMonth.toISOString(),
                  $lte: today.toISOString(),
                },
              }).countDocuments();
              const thisYearExpired = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisYear.toISOString(),
                  $lte: today.toISOString(),
                },
              }).countDocuments();
              const thisWeekExpired = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisWeek.toISOString(),
                  $lte: today.toISOString(),
                },
              }).countDocuments();

              const products = await InventoryModel.aggregate([
                { $match: { owner: address } },
                {
                  $group: {
                    _id: "$productName",
                    productName: { $first: "$productName" },
                    quantity: { $sum: "$quantity" },
                  },
                },
              ]);
              const dict = {};

              for (let j = 0; j < products.length; j++) {
                const productName = products[j].productName;
                const count = products[j].quantity;

                const index = products_array.indexOf(productName);
                const name = products_array[index];
                if (name in dict) {
                  const exis = dict[name];
                  const new_val = count;
                  dict[name] = exis + new_val;
                } else {
                  dict[name] = count;
                }
              }

              res.json({
                data: inventoryResult,
                dict,
                counts: {
                  inventoryAdded: {
                    total: total_inv,
                    thisYear: thisYearAdded,
                    thisMonth: thisMonthAdded,
                    thisWeek: thisWeekAdded,
                    today: todayAdded,
                  },
                  currentInventory: {
                    total: total_inv,
                    thisYear: thisYearAdded,
                    thisMonth: thisMonthAdded,
                    thisWeek: thisWeekAdded,
                    today: todayAdded,
                  },
                  vaccinesNearExpiration: {
                    total: thisYearExpire,
                    thisYear: thisYearExpire,
                    thisMonth: thisMonthExpire,
                    thisWeek: thisWeekExpire,
                    today: todayExpire,
                  },
                  vaccinesExpired: {
                    total: totalExpired,
                    thisYear: thisYearExpired,
                    thisMonth: thisMonthExpired,
                    thisWeek: thisWeekExpired,
                    today: todayExpire,
                  },
                },
              });
            } else {
              return apiResponse.forbiddenResponse(res, 'User Does not have enough permissions')
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.updateInventories = [
  auth,
  async (req, res) => {
    try {
      const { address } = req.user;
      const { data } = req.body;
      const { serialNumberRange, manufacturingDate, expiryDate, productName } =
        data;
      const serialNumbers = serialNumberRange.split("-");
      const serialNumbersFrom = parseInt(serialNumbers[0].split(/(\d+)/)[1]);
      const serialNumbersTo = parseInt(serialNumbers[1].split(/(\d+)/)[1]);

      const serialNumberText = serialNumbers[1].split(/(\d+)/)[0];
      let inventories = [];
      for (let i = serialNumbersFrom; i <= serialNumbersTo; i++) {
        const inventory = {
          transactionIds: [],
          serialNumber: `${serialNumberText}${i}`,
          manufacturingDate,
          expiryDate,
          productName,
          quantity: 1,
          owner: address,
        };
        inventories.push(inventory);
      }
      let bulkArr = [];
      /* const inventoryMongoResult = await InventoryModel.insertMany(
        inventories,
      );*/
      for (const i of inventories) {
        bulkArr.push({
          updateOne: {
            filter: { serialNumber: i.serialNumber },
            update: { owner: address },
          },
        });
      }

      await InventoryModel.bulkWrite(bulkArr);
      //   event_data = {
      //     "eventID": "ev0000"+  Math.random().toString(36).slice(2),
      //     "eventTime": new Date().toISOString(),
      //     "eventType": {
      //         "primary": "CREATE",
      //         "description": "SHIPMENT ALERTS"
      //     },
      //     "actor": {
      //         "actorid": "userid1",
      //         "actoruserid": "ashwini@statwig.com"
      //     },
      //     "stackholders": {
      //         "ca": {
      //             "id": "org001",
      //             "name": "Statwig Pvt. Ltd.",
      //             "address": "ca_address_object"
      //         },
      //         "actororg": {
      //             "id": "org002",
      //             "name": "Appollo Hospitals Jublihills",
      //             "address": "actororg_address_object"
      //         },
      //         "secondorg": {
      //             "id": "org003",
      //             "name": "Med Plus Gachibowli",
      //             "address": "secondorg_address_object"
      //         }
      //     },
      //     "payload": {
      //         "data": {
      //             "abc": 123
      //         }
      //     }
      // }
      // async function compute(event_data) {
      //     result = await logEvent(event_data)
      //     return result
      // }

      // compute(event_data).then((response) => console.log(response))
      apiResponse.successResponseWithData(res, "Updated Success");
    } catch (e) {
      apiResponse.ErrorResponse(res, e.message);
    }
  },
];
exports.insertInventories = [
  auth,
  async (req, res) => {
    try {
      const { address } = req.user;
      const { data } = req.body;
      const {
        serialNumberRange,
        manufacturingDate,
        expiryDate,
        productName,
        poNumber,
        shipmentId,
        manufacturerName,
        batchNumber,
      } = data;
      const serialNumbers = serialNumberRange.split("-");
      const serialNumbersFrom = parseInt(serialNumbers[0].split(/(\d+)/)[1]);
      const serialNumbersTo = parseInt(serialNumbers[1].split(/(\d+)/)[1]);

      const serialNumberText = serialNumbers[1].split(/(\d+)/)[0];
      let inventories = [];
      for (let i = serialNumbersFrom; i <= serialNumbersTo; i++) {
        const inventory = {
          transactionIds: [],
          serialNumber: `${serialNumberText}${i}`,
          manufacturingDate,
          expiryDate,
          productName,
          quantity: 1,
          poNumber,
          shipmentId,
          manufacturerName,
          batchNumber,
          owner: address,
        };
        inventories.push(inventory);
      }
      const chunkSize = 50;
      let limit = chunkSize;
      let skip = 0;
      let count = 0;
      const start = new Date();
      logger.log("info", "Inserting inventories data in chunks");
      async function recursiveFun() {
        skip = chunkSize * count;
        count++;
        limit = chunkSize * count;
        logger.log("info", `skip ${skip}`);

        logger.log("info", `limit ${limit}`);
        const chunkedData = inventories.slice(skip, limit);
        try {
          await InventoryModel.insertMany(chunkedData);
          if (limit < inventories.length) {
            recursiveFun();
          } else {
            logger.log(
              "info",
              `Insertion of inventories from mobile is completed. Time Taken to insert ${inventories.length} in seconds - `,
              (new Date() - start) / 1000
            );
            const newNotification = new NotificationModel({
              owner: address,
              message: `Your inventories are added successfully on ${new Date().toLocaleString()}`,
            });
            await newNotification.save();
          }
        } catch (e) {
          /* const newNotification = new NotificationModel({
            owner: address,
            message: `${e.errmsg} on ${new Date().toLocaleString()}`,
          });
          await newNotification.save();*/
          //If inventories are duplicate then update inventories with new owner
          let bulkArr = [];
          for (const i of inventories) {
            bulkArr.push({
              updateOne: {
                filter: { serialNumber: i.serialNumber },
                update: { owner: address },
              },
            });
          }

          await InventoryModel.bulkWrite(bulkArr);
        }
      }
      recursiveFun();
      //   event_data = {
      //     "eventID": "ev0000"+  Math.random().toString(36).slice(2),
      //     "eventTime": new Date().toISOString(),
      //     "eventType": {
      //         "primary": "CREATE",
      //         "description": "SHIPMENT ALERTS"
      //     },
      //     "actor": {
      //         "actorid": "userid1",
      //         "actoruserid": "ashwini@statwig.com"
      //     },
      //     "stackholders": {
      //         "ca": {
      //             "id": "org001",
      //             "name": "Statwig Pvt. Ltd.",
      //             "address": "ca_address_object"
      //         },
      //         "actororg": {
      //             "id": "org002",
      //             "name": "Appollo Hospitals Jublihills",
      //             "address": "actororg_address_object"
      //         },
      //         "secondorg": {
      //             "id": "org003",
      //             "name": "Med Plus Gachibowli",
      //             "address": "secondorg_address_object"
      //         }
      //     },
      //     "payload": {
      //         "data": {
      //             "abc": 123
      //         }
      //     }
      // }
      // async function compute(event_data) {
      //     result = await logEvent(event_data)
      //     return result
      // }

      // compute(event_data).then((response) => console.log(response))
      apiResponse.successResponseWithData(res, "Inserted Success");
    } catch (e) {
      apiResponse.ErrorResponse(res, e.message);
    }
  },
];

exports.addProductsToInventory = [
  auth,
  body("products")
    .isLength({ min: 1 })
    .withMessage("Products  must be specified."),
  async (req, res) => {
    try {
      const email = req.user.emailId;
      const user_id = req.user.id;
      const empData = await EmployeeModel.findOne({
        emailId: req.user.emailId,
      });
      const orgId = empData.organisationId;
      const orgName = empData.name;
      const orgData = await OrganisationModel.findOne({ id: orgId });
      const address = orgData.postalAddress;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log(
          "error",
          "<<<<< InventoryService < InventoryController < addMultipleInventories : Validation Error"
        );
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }
      let payload = req.body;
      payload.products.forEach(element => {
        var product = ProductModel.findOne({ id: element.productId });
        element.type = product.type
      });
      permission_request = {
        role: req.user.role,
        permissionRequired: "addInventory",
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const { products } = req.body;
          const { id } = req.user;
          const employee = await EmployeeModel.findOne({ id });
          //var warehouseId = req.user.warehouseId;
           if (!req.query.warehouseId)
             warehouseId = req.user.warehouseId;
           else
             warehouseId = req.query.warehouseId;
          console.log(warehouseId)
          const warehouse = await WarehouseModel.findOne({ id: warehouseId });

          if (!warehouse) {
            return apiResponse.ErrorResponse(
              res,
              "Employee not assigned to any organisation"
            );
          }
          //   let serialNumbersRange = true;
          //   let alpha = [...Array(26)].map((_, y) => String.fromCharCode(y + 65)).join('');
          //   for (let i = 0; i < products.length; i++) {
          //     if (products[i].serialNumbersRange.split('-').length < 2) {
          //       let snoref = Date.now();
          //       let rApha = '';
          //       for (let i = 0; i < 4; i++)
          //         rApha += alpha.charAt(Math.floor(Math.random() * alpha.length));

          //      products[i].serialNumbersRange =
          //        "DSL" + rApha + (parseInt(snoref) - parseInt(products[i].quantity - 1)) +
          //        "-DSL" + rApha + snoref;
          //       // serialNumbersRange = false;
          //       // break;
          //     }
          //   }
          //  if(!serialNumbersRange) {
          //    return apiResponse.ErrorResponse(
          //      res,
          //      `Product doesn't conatin valid serial numbers range`,
          //    );
          //  }
          const inventory = await InventoryModel.findOne({
            id: warehouse.warehouseInventory,
          });
          if (!inventory)
            return apiResponse.ErrorResponse(
              res,
              "Cannot find inventory to this employee warehouse"
            );
          let atoms = [];
          products.forEach((product) => {
            const serialNumbers = product.serialNumbersRange?.split("-");
            if (serialNumbers?.length > 1) {
              const serialNumbersFrom = parseInt(
                serialNumbers[0].split(/(\d+)/)[1]
              );
              const serialNumbersTo = parseInt(
                serialNumbers[1].split(/(\d+)/)[1]
              );
              const serialNumberText = serialNumbers[1].split(/(\d+)/)[0];
              for (let i = serialNumbersFrom; i <= serialNumbersTo; i++) {
                const atom = `${serialNumberText}${i}`;
                atoms.push(atom);
              }
            }
          });
          const dupSerialFound = await AtomModel.findOne({
            id: { $in: atoms },
          });
          if (dupSerialFound)
            return apiResponse.ErrorResponse(
              res,
              "Duplicate Serial Numbers found"
            );
          await utility.asyncForEach(products, async (product) => {
            const inventoryId = warehouse.warehouseInventory;
            const checkProduct = await InventoryModel.find({
              $and: [
                { id: inventoryId },
                { "inventoryDetails.productId": product.productId },
              ],
            });
            if (checkProduct != "") {
              const exist_quantity = await InventoryModel.find(
                { id: inventoryId },
                {
                  inventoryDetails: {
                    $elemMatch: { productId: product.productId },
                  },
                }
              );
              const new_quantity =
                exist_quantity[0].inventoryDetails[0].quantity +
                product.quantity;

              const update = await InventoryModel.updateOne(
                {
                  id: inventoryId,
                  "inventoryDetails.productId": product.productId,
                },
                { $set: { "inventoryDetails.$.quantity": new_quantity } }
              );
            } else {
              inventory.inventoryDetails.push({
                productId: product.productId,
                quantity: product.quantity,
              });
            }

            const serialNumbers = product.serialNumbersRange?.split("-");
            let atomsArray = [];
            if (serialNumbers?.length > 1) {
              const serialNumbersFrom = parseInt(
                serialNumbers[0].split(/(\d+)/)[1]
              );
              const serialNumbersTo = parseInt(
                serialNumbers[1].split(/(\d+)/)[1]
              );

              const serialNumberText = serialNumbers[1].split(/(\d+)/)[0];
              //let atoms = [];
              for (let i = serialNumbersFrom; i <= serialNumbersTo; i++) {
                const atom = {
                  // id: `${serialNumberText + uniqid.time()}${i}`,
                  id: `${serialNumberText}${i}`,
                  label: {
			  labelId: product.label?product?.label?.labelId:"QR_2D",
                          labelType: product.label?product?.label?.labelType:"3232",
                  },
                  quantity: 1,
                  productId: product.productId,
                  inventoryIds: [inventory.id],
                  lastInventoryId: "",
                  lastShipmentId: "",
                  poIds: [],
                  shipmentIds: [],
                  txIds: [],
                  batchNumbers: [product.batchNumber],
                  atomStatus: "Healthy",
                  attributeSet: {
                    mfgDate: product.mfgDate,
                    expDate: product.expDate,
                  },
                  eolInfo: {
                    eolId: "IDN29402-23423-23423",
                    eolDate: "2021-03-31T18:30:00.000Z",
                    eolBy: id,
                    eolUserInfo: "",
                  },
                };
                atomsArray.push(atom);
              }
            }
            else {
              const atom = {
                id: uniqid('batch-'),
                label: {
                          labelId: product.label?product?.label?.labelId:"QR_2D",
                          labelType: product.label?product?.label?.labelType:"3232",
		},
                quantity: product.quantity,
                productId: product.productId,
                inventoryIds: [inventory.id],
                lastInventoryId: "",
                lastShipmentId: "",
                poIds: [],
                shipmentIds: [],
                txIds: [],
                batchNumbers: [product.batchNumber],
                atomStatus: "Healthy",
                attributeSet: {
                  mfgDate: product.mfgDate,
                  expDate: product.expDate,
                },
                eolInfo: {
                  eolId: "IDN29402-23423-23423",
                  eolDate: "2021-03-31T18:30:00.000Z",
                  eolBy: id,
                  eolUserInfo: "",
                },
              };
              atomsArray.push(atom);
            }

            try {
              if (atomsArray.length > 0) await AtomModel.insertMany(atomsArray);
              await inventory.save();
            } catch (err) {
              console.log("err", err.message);
            }
            /*AtomModel.insertMany(atoms).then(async (res, err) =>  {
             if(err) {
              // return apiResponse.ErrorResponse(res, 'Duplicate SerialNumber');
               console.log('Duplicate SerialNumber');
             }else {
               await inventory.save();
             }
           });*/
          });
          var datee = new Date();
          datee = datee.toISOString();
          var evid = Math.random().toString(36).slice(2);
          let event_data = {
            eventID: null,
            eventTime: null,
            eventType: {
              primary: "CREATE",
              description: "SHIPMENT_CREATION",
            },
            actor: {
              actorid: null,
              actoruserid: null,
            },
            stackholders: {
              ca: {
                id: "null",
                name: "null",
                address: "null",
              },
              actororg: {
                id: req.user.organisationId || "null",
                name: "null",
                address: "null",
              },
              secondorg: {
                id: "null",
                name: "null",
                address: "null",
              },
            },
            payload: {
              data: {
                abc: 123,
              },
            },
          };
          event_data.eventID = "ev0000" + evid;
          event_data.eventTime = datee;
          event_data.eventType.primary = "ADD";
          event_data.eventType.description = "INVENTORY";
          event_data.actor.actorid = user_id || "null";
          event_data.actor.actoruserid = email || "null";
          event_data.stackholders.actororg.id = orgId || "null";
          event_data.stackholders.actororg.name = orgName || "null";
          event_data.stackholders.actororg.address = address || "null";
	  event_data.actorWarehouseId = req.user.warehouseId || "null";
          event_data.stackholders.ca.id = CENTRAL_AUTHORITY_ID || "null";
          event_data.stackholders.ca.name = CENTRAL_AUTHORITY_NAME || "null";
          event_data.stackholders.ca.address = CENTRAL_AUTHORITY_ADDRESS || "null";
          event_data.payload.data = payload;
          console.log(event_data);
          async function compute(event_data) {
            result = await logEvent(event_data);
            return result;
          }
          compute(event_data).then((response) => {
            console.log(response);
          });
          return apiResponse.successResponseWithData(
            res,
            "Added products to the inventories"
          );
        } else {
          res.json("Sorry! User does not have enough Permissions");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< InventoryService < InventoryController < addMultipleInventories : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.addInventoriesFromExcel = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
          permission_request = {
            role: role,
            permissionRequired: "addInventory",
          };
          const email = req.user.emailId;
          const user_id = req.user.id;
          const empData = await EmployeeModel.findOne({
            emailId: req.user.emailId,
          });
          const orgId = empData.organisationId;
          const orgName = empData.name;
          const orgData = await OrganisationModel.findOne({ id: orgId });
          const address = orgData.postalAddress;
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const dir = `uploads`;
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
              }
              await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
              const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
              const sheet_name_list = workbook.SheetNames;
              let data = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheet_name_list[0]],
                { dateNF: "dd/mm/yyyy;@", cellDates: true, raw: false }
              );
              const { address } = req.user;
              let start = new Date();
              let count = 0;
              const chunkSize = 50;
              let limit = chunkSize;
              let skip = 0;

              async function recursiveFun() {
                skip = chunkSize * count;
                count++;
                limit = chunkSize * count;
                const chunkedData = data.slice(skip, limit);
                let chunkUrls = [];
                const serialNumbers = chunkedData.map((inventory) => {
                  return { id: inventory.serialNumber.trim() };
                });
                const inventoriesFound = await AtomModel.findOne({
                  $or: serialNumbers,
                });
                if (inventoriesFound) {
                  const newNotification = new NotificationModel({
                    owner: address,
                    message: `Your inventories from excel is failed to add on ${new Date().toLocaleString()} due to Duplicate Inventory found ${inventoriesFound.serialNumber
                      }`,
                  });
                  await newNotification.save();
                  return apiResponse.ErrorResponse(
                    res,
                    "Duplicate Inventory Found"
                  );
                }
                chunkedData.forEach((inventory) => {
                  inventory.serialNumber = inventory.serialNumber.trim();
                  const userData = {
                    stream: stream_name,
                    key: inventory.serialNumber.trim(),
                    address: address,
                    data: inventory,
                  };
                  const postRequest = axios.post(
                    `${blockchain_service_url}/publishExcelData`,
                    userData
                  );
                  chunkUrls.push(postRequest);
                });
                axios
                  .all(chunkUrls)
                  .then(
                    axios.spread(async (...responses) => {
                      const inventoryData = responses.map(
                        (response) => response.data
                      );
                      // console.log(inventoryData);

                      // InventoryModel.insertMany(inventoryData, (err, res) => {
                      //   if (err) {
                      //     logger.log("error", err.errmsg);
                      //   } else
                      //     logger.log(
                      //       'info',
                      //       'Number of documents inserted into mongo: ' +
                      //       res.length,
                      //     );
                      // });

                      if (limit < data.length) {
                        recursiveFun();
                      } else {
                        // const newNotification = new NotificationModel({
                        //   owner: address,
                        //   message: `Your inventories from excel is added successfully on ${new Date().toLocaleString()}`,
                        // });
                        // await newNotification.save();
                      }
                    })
                  )
                  .catch((errors) => {
                    logger.log(errors);
                  });
              }
              recursiveFun();
              for (const [index, prod] of data.entries()) {
                let product = await ProductModel.findOne({
                  name: prod.productName,
                });
                if (product) {
                  data[index].productId = product.id;
                  data[index].type = product.type;
                }
                else {
                  console.log(product)
                }
              }

              var datee = new Date();
              datee = datee.toISOString();
              var evid = Math.random().toString(36).slice(2);
              let event_data = {
                eventID: null,
                eventTime: null,
                eventType: {
                  primary: "CREATE",
                  description: "SHIPMENT_CREATION",
                },
                actor: {
                  actorid: null,
                  actoruserid: null,
                },
                stackholders: {
                  ca: {
                    id: "null",
                    name: "null",
                    address: "null",
                  },
                  actororg: {
                    id: "null",
                    name: "null",
                    address: "null",
                  },
                  secondorg: {
                    id: "null",
                    name: "null",
                    address: "null",
                  },
                },
                payload: {
                  data: {
                    abc: 123,
                  },
                },
              };
              event_data.eventID = "ev0000" + evid;
              event_data.eventTime = datee;
              event_data.eventType.primary = "ADD";
              event_data.eventType.description = "INVENTORY";
              event_data.actor.actorid = user_id || "null";
              event_data.actor.actoruserid = email || "null";
              event_data.stackholders.actororg.id = orgId || req.user.organisationId || "null";
              event_data.stackholders.actororg.name = orgName || "null";
              event_data.stackholders.actororg.address = address || "null";
	      event_data.actorWarehouseId = req.user.warehouseId || "null";
              event_data.stackholders.ca.id = CENTRAL_AUTHORITY_ID || "null";
              event_data.stackholders.ca.name = CENTRAL_AUTHORITY_NAME || "null";
              event_data.stackholders.ca.address = CENTRAL_AUTHORITY_ADDRESS || "null";
              event_data.payload.data.products = [...data];
              console.log(event_data);
              async function compute(event_data) {
                result = await logEvent(event_data);
                return result;
              }
              compute(event_data).then((response) => {
                console.log(response);
              });
              return apiResponse.successResponseWithData(res, "Success", data);
            } else {
              return apiResponse.ErrorResponse(
                res,
                "Sorry! User does not have enough Permissions"
              );
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.trackProduct = [
  auth,
  async (req, res) => {
    try {
      const { serialNumber } = req.query;
      logger.log(
        "info",
        "<<<<< ShipmentService < ShipmentController < trackProduct : tracking product, querying by transaction hash"
      );
      InventoryModel.findOne({ serialNumber: serialNumber }).then(
        async (user) => {
          let txnIDs = user.transactionIds;
          let items_array = [];
          await utility.asyncForEach(txnIDs, async (txnId) => {
            const response = await axios.get(
              `${blockchain_service_url}/queryDataByRawTxHash?txid=${txnId}`
            );
            const items = response.data.items;
            items_array.push(items);
          });
          logger.log(
            "info",
            "<<<<< ShipmentService < ShipmentController < trackProduct : tracked product, queried data by transaction hash"
          );
          res.json({ data: items_array });
        }
      );
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < trackProduct : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getInventoryDetails = [
  auth,
  async (req, res) => {
    try {
      const employee = await EmployeeModel.findOne({ id: req.user.id });
      var warehouseId = "";
      if (!req.query.warehouseId)
        warehouseId = employee.warehouseId[0];
      else
        warehouseId = req.query.warehouseId;
      const warehouse = await WarehouseModel.findOne({ id: warehouseId })

      if (warehouse) {
        const inventory = await InventoryModel.findOne({ id: warehouse.warehouseInventory });
        let inventoryDetails = []
        await utility.asyncForEach(inventory.inventoryDetails, async inventoryDetail => {
          const product = await ProductModel.findOne({ id: inventoryDetail.productId });
          const inventoryDetailClone = { ...inventoryDetail };
          inventoryDetailClone['productName'] = product.name;
          inventoryDetailClone['manufacturer'] = product.manufacturer;
          inventoryDetails.push(inventoryDetailClone);
        })
        return apiResponse.successResponseWithData(res, 'Inventory Details', inventoryDetails);
      } else {
        return apiResponse.ErrorResponse(
          res,
          "Cannot find warehouse for this employee"
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
exports.getGroupedInventoryDetails = [
  auth,
  async (req, res) => {
    try {
      const {role, address} = req.user;
      const { skip, limit } = req.query;
          permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const inventoryResult = await InventoryModel.aggregate([
                { $match: { owner: address } },
                {
                  $group: {
                    _id: { batchNumber: "$batchNumber" },
                    batchNumber: { $first: "$batchNumber" },
                    quantity: { $sum: "$quantity" },
                    manufacturingDate: { $first: "$manufacturingDate" },
                    expiryDate: { $first: "$expiryDate" },
                    owner: { $first: "$owner" },
                    productName: { $first: "$productName" },
                    manufacturerName: { $first: "$manufacturerName" },
                    createdAt: { $first: "$createdAt" },
                  },
                },
              ])
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));

              const productNamesResponse = await axios.get(
                `${product_service_url}/getProductNames`,
                {
                  headers: {
                    Authorization: req.headers.authorization,
                  },
                }
              );

              const products_array = productNamesResponse.data.data.map(
                (product) => product.productName
              );

              const nextYear = new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              );
              nextYear.setMonth(0);
              nextYear.setUTCHours(0, 0, 0, 0);
              nextYear.setDate(1);
              const thisYear = new Date(
                new Date().setFullYear(new Date().getFullYear())
              );
              thisYear.setMonth(0);
              thisYear.setDate(1);
              thisYear.setUTCHours(0, 0, 0, 0);
              const nextMonth = new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              );
              nextMonth.setUTCHours(0, 0, 0, 0);
              const thisMonth = new Date(
                new Date().setMonth(new Date().getMonth())
              );
              thisMonth.setUTCDate(1);
              thisMonth.setUTCHours(0, 0, 0, 0);
              const thisWeek = Date.monday();
              const nextWeek = Date.next().monday();
              const tomorrow = new Date(
                new Date().setDate(new Date().getDate() + 1)
              );
              tomorrow.setUTCHours(0, 0, 0, 0);
              const today = new Date();
              today.setUTCHours(0, 0, 0, 0);

              total_inv = await InventoryModel.find({
                owner: address,
              }).countDocuments();
              const thisYearAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: thisYear.toISOString(),
                  $lte: nextYear.toISOString(),
                },
              }).countDocuments();
              const thisMonthAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: thisMonth.toISOString(),
                  $lte: nextMonth.toISOString(),
                },
              }).countDocuments();
              const thisWeekAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: thisWeek.toISOString(),
                  $lte: nextWeek.toISOString(),
                },
              }).countDocuments();
              const todayAdded = await InventoryModel.find({
                owner: address,
                createdAt: {
                  $gte: today.toISOString(),
                  $lt: tomorrow.toISOString(),
                },
              }).countDocuments();
              const thisYearExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisYear.toISOString(),
                  $lt: nextYear.toISOString(),
                },
              }).countDocuments();
              const thisMonthExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisMonth.toISOString(),
                  $lt: nextMonth.toISOString(),
                },
              }).countDocuments();
              const thisWeekExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisWeek.toISOString(),
                  $lt: nextWeek.toISOString(),
                },
              }).countDocuments();
              const todayExpire = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: today.toISOString(),
                  $lt: tomorrow.toISOString(),
                },
              }).countDocuments();
              const totalExpired = await InventoryModel.find({
                owner: address,
                expiryDate: { $lte: today.toISOString() },
              }).countDocuments();
              const thisMonthExpired = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisMonth.toISOString(),
                  $lte: today.toISOString(),
                },
              }).countDocuments();
              const thisYearExpired = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisYear.toISOString(),
                  $lte: today.toISOString(),
                },
              }).countDocuments();
              const thisWeekExpired = await InventoryModel.find({
                owner: address,
                expiryDate: {
                  $gte: thisWeek.toISOString(),
                  $lte: today.toISOString(),
                },
              }).countDocuments();

              const products = await InventoryModel.aggregate([
                { $match: { owner: address } },
                {
                  $group: {
                    _id: "$productName",
                    productName: { $first: "$productName" },
                    quantity: { $sum: "$quantity" },
                  },
                },
              ]);
              const dict = {};

              for (let j = 0; j < products.length; j++) {
                const productName = products[j].productName;
                const count = products[j].quantity;

                const index = products_array.indexOf(productName);
                const name = products_array[index];
                if (name in dict) {
                  const exis = dict[name];
                  const new_val = count;
                  dict[name] = exis + new_val;
                } else {
                  dict[name] = count;
                }
              }

              res.json({
                data: inventoryResult,
                dict,
                counts: {
                  inventoryAdded: {
                    total: total_inv,
                    thisYear: thisYearAdded,
                    thisMonth: thisMonthAdded,
                    thisWeek: thisWeekAdded,
                    today: todayAdded,
                  },
                  currentInventory: {
                    total: total_inv,
                    thisYear: thisYearAdded,
                    thisMonth: thisMonthAdded,
                    thisWeek: thisWeekAdded,
                    today: todayAdded,
                  },
                  vaccinesNearExpiration: {
                    total: thisYearExpire,
                    thisYear: thisYearExpire,
                    thisMonth: thisMonthExpire,
                    thisWeek: thisWeekExpire,
                    today: todayExpire,
                  },
                  vaccinesExpired: {
                    total: totalExpired,
                    thisYear: thisYearExpired,
                    thisMonth: thisMonthExpired,
                    thisWeek: thisWeekExpired,
                    today: todayExpire,
                  },
                },
              });
            } else {
              return apiResponse.forbiddenResponse(
                res,
                `Sorry! User doens't have permissions`
              );
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getInventoryDetailsByBatchNumber = [
  auth,
  async (req, res) => {
    try {
      const {role, address} = req.user;
      const { batchNumber, skip, limit } = req.query;
          permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {  
            const inventoryResult = await InventoryModel.find({
                owner: address,
                batchNumber: batchNumber,
              })
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));
              return apiResponse.successResponseWithData(res, inventoryResult);
            } else {
              return apiResponse.forbiddenResponse(res, permissionResult.message);
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getBatchDetailsByBatchNumber = [
  auth,
  async (req, res) => {
    try {
      const {role, address} = req.user;
      const { skip, limit, batchNumber } = req.query;
          permission_request = {
            role: role,
            permissionRequired: "viewInventory",
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const inventoryResult = await InventoryModel.aggregate([
                { $match: { owner: address, batchNumber: batchNumber } },
                {
                  $group: {
                    _id: { batchNumber: "$batchNumber" },
                    batchNumber: { $first: "$batchNumber" },
                    quantity: { $sum: "$quantity" },
                    manufacturingDate: { $first: "$manufacturingDate" },
                    expiryDate: { $first: "$expiryDate" },
                    owner: { $first: "$owner" },
                    productName: { $first: "$productName" },
                    manufacturerName: { $first: "$manufacturerName" },
                    createdAt: { $first: "$createdAt" },
                  },
                },
              ])
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));
              return apiResponse.successResponseWithData(res, inventoryResult);
            } else {
              return apiResponse.forbiddenResponse(res,"Sorry! User does not have enough Permissions");
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getProductListCounts = [
  auth,
  async (req, res) => {
    try {
      
      const { warehouseId } = req.user;
      // const warehouseId  = req.query.id;
      const InventoryId = await WarehouseModel.find({ id: warehouseId });
      const val = InventoryId[0].warehouseInventory;
      const productList = await InventoryModel.find({ id: val });
      const list = JSON.parse(JSON.stringify(productList[0].inventoryDetails));
      var productArray = [];
      for (j = 0; j < list.length; j++) {
        var productId = list[j].productId;  
        const product = await ProductModel.find({ id: productId });
        if(product && product[0] && product[0].id && product && product[0] && product[0].name )
        {
        
          var product1 = {
            productCategory:product && product[0] && product[0].type,
            productName: product && product[0] && product[0].name,
            productId: product && product[0] && product[0].id,
            quantity: list && list[0] && list[j].quantity || 0,
            manufacturer:product && product[0] && product[0].manufacturer,
            unitofMeasure: product && product[0] && product[0].unitofMeasure,         
          };
         
          
        }   
        

        productArray.push(product1);
      }

      productArray.sort(function(a,b){
          if(a.quantity>b.quantity){
            return -1;
          }
          else{
            return 1;
          }
        })
     
      return apiResponse.successResponseWithData(res, productArray);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getEmployeeDetailsByWarehouseId = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.query;
      const warehouseDetails = await WarehouseModel.find({ id: warehouseId });
      const employees = warehouseDetails[0].supervisors;
      return apiResponse.successResponseWithData(
        res,
        "Fetch success",
        employees
      );
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];


exports.getInventory = [
  auth,
  async (req, res) => {
    try {

      const { skip, limit } = req.query;
      var warehouseId = "";

      if (!req.query.warehouseId)
        warehouseId = req.user.warehouseId;
      else
        warehouseId = req.query.warehouseId;

      const warehouse = await WarehouseModel.findOne({ id: warehouseId })
      if (warehouse) {
        const inventory = await InventoryModel.aggregate([
          { $match: { id: warehouse.warehouseInventory } },
          { $unwind: "$inventoryDetails" },
          {
            $lookup: {
              from: "products",
              localField: "inventoryDetails.productId",
              foreignField: "id",
              as: "products",
            },
          },
          { $unwind: "$products" },
        ])
          .sort({ createdAt: -1 })
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        return apiResponse.successResponseWithData(
          res,
          "Inventory Details",
          inventory
        );
      } else {
        return apiResponse.ErrorResponse(
          res,
          "Cannot find warehouse for this employee"
        );
      }
    } catch (err) {
      console.log(err);

      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

// return the list of the organisations with the list of warehouses with their respective inventory counts
exports.getInventoryCountsOfThePlatform = [
  auth,
  async (req, res) => {
    try {
      const platformInventoryCount = await InventoryModel.aggregate([
        { $unwind: "$inventoryDetails" },
        {
          $group: {
            _id: null,
            platformInventory: {
              $sum: "$inventoryDetails.quantity",
            },
          },
        },
      ]);
      return apiResponse.successResponseWithData(res, platformInventoryCount);
    } catch (err) {
      logger.log(
        "error",
        "<<<<< InventoryService < InventoryController < getInventoryCountsOfThePlatform : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

// return the list of warehouses with the inventory count of the specific organisation
exports.getInventoryCountsByOrganisation = [
  auth,
  async (req, res) => {
    try {
      const organisationId = req.query.organisationId;
      const orgDocument = await OrganisationModel.findOne({
        id: organisationId,
      });
      let orgInventoryCount = 0;
      if (orgDocument.warehouses && orgDocument.warehouses.length) {
        await utility.asyncForEach(
          orgDocument.warehouses,
          async (warehouse) => {
            let warehouseInventoryCount = await WarehouseModel.aggregate([
              {
                $match: {
                  id: warehouse,
                },
              },
              {
                $lookup: {
                  from: "inventories",
                  localField: "warehouseInventory",
                  foreignField: "id",
                  as: "inventory",
                },
              },
              {
                $unwind: {
                  path: "$inventory",
                },
              },
              {
                $project: {
                  id: 1,
                  title: 1,
                  inventoryDetails: "$inventory.inventoryDetails",
                },
              },
              {
                $unwind: {
                  path: "$inventoryDetails",
                },
              },
              {
                $group: {
                  _id: null,
                  warehouseInventory: {
                    $sum: "$inventoryDetails.quantity",
                  },
                },
              },
            ]);
            if (
              warehouseInventoryCount &&
              warehouseInventoryCount[0] &&
              warehouseInventoryCount[0].warehouseInventory
            ) {
              orgInventoryCount =
                orgInventoryCount +
                warehouseInventoryCount[0].warehouseInventory;
            }
          }
        );
      }
      return apiResponse.successResponseWithData(res, {
        orgInventoryCount: orgInventoryCount,
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< InventoryService < InventoryController < getInventoryCountsByOrganisation : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
//  return the total inventory of the specific warehouse
exports.getInventoryCountsByWarehouse = [
  auth,
  async (req, res) => {
    try {
      let response = {};
      let warehouseId = req.query.warehouseId;
      const warehouseInventoryCount = await WarehouseModel.aggregate([
        {
          $match: {
            id: warehouseId,
          },
        },
        {
          $lookup: {
            from: "inventories",
            localField: "warehouseInventory",
            foreignField: "id",
            as: "inventory",
          },
        },
        {
          $unwind: {
            path: "$inventory",
          },
        },
        {
          $project: {
            id: 1,
            title: 1,
            inventoryDetails: "$inventory.inventoryDetails",
          },
        },
        {
          $unwind: {
            path: "$inventoryDetails",
          },
        },
        {
          $group: {
            _id: null,
            count: {
              $sum: "$inventoryDetails.quantity",
            },
          },
        },
      ]);
      const warehouseSentCount = await ShipmentModel.aggregate([
        {
          $match: {
            $and: [
              { status: "RECEIVED" },
              { "supplier.locationId": warehouseId },
            ],
          },
        },
        {
          $unwind: "$products",
        },

        {
          $group: {
            _id: "abc",
            count: {
              $sum: "$products.productQuantity",
            },
          },
        },
      ]);
      const warehouseReceivedCount = await ShipmentModel.aggregate([
        {
          $match: {
            $and: [
              { status: "RECEIVED" },
              { "receiver.locationId": warehouseId },
            ],
          },
        },
        {
          $unwind: "$products",
        },

        {
          $group: {
            _id: "abc",
            count: {
              $sum: "$products.productQuantity",
            },
          },
        },
      ]);
      const warehouseTransitCount1 = await ShipmentModel.aggregate([
        {
          $match: {
            $and: [
              { status: "CREATED" },
              { "supplier.locationId": warehouseId },
            ],
          },
        },
        {
          $unwind: "$products",
        },

        {
          $group: {
            _id: "abc",
            count: {
              $sum: "$products.productQuantity",
            },
          },
        },
      ]);
      const warehouseTransitCount2 = await ShipmentModel.aggregate([
        {
          $match: {
            $and: [
              { status: "CREATED" },
              { "receiver.locationId": warehouseId },
            ],
          },
        },
        {
          $unwind: "$products",
        },

        {
          $group: {
            _id: "abc",
            count: {
              $sum: "$products.productQuantity",
            },
          },
        },
      ]);
      response = {
        total: warehouseInventoryCount.length
          ? warehouseInventoryCount[0].count
          : 0,
        received: warehouseReceivedCount.length
          ? warehouseReceivedCount[0].count
          : 0,
        sent: warehouseSentCount.length ? warehouseSentCount[0].count : 0,
        transit:
          (warehouseTransitCount1.length
            ? warehouseTransitCount1[0].count
            : 0) +
          (warehouseTransitCount2.length ? warehouseTransitCount2[0].count : 0),
      };
      return apiResponse.successResponseWithData(res, "counts are:", response);
    } catch (err) {
      logger.log(
        "error",
        "<<<<< InventoryService < InventoryController < getInventoryCountsByWarehouse : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

async function getInventoryProductsByWarehouseID(warehouseId) {
  const inventoryProductsByWarehouse = await WarehouseModel.aggregate([
    {
      $match: {
        id: warehouseId,
      },
    },
    {
      $lookup: {
        from: "inventories",
        localField: "warehouseInventory",
        foreignField: "id",
        as: "inventory",
      },
    },
    {
      $unwind: {
        path: "$inventory",
      },
    },
    {
      $project: {
        id: 1,
        title: 1,
        inventoryDetails: "$inventory.inventoryDetails",
      },
    },
    {
      $unwind: {
        path: "$inventoryDetails",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "inventoryDetails.productId",
        foreignField: "id",
        as: "productDetails",
      },
    },
    {
      $unwind: {
        path: "$productDetails",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$productDetails", "$inventoryDetails", "$$ROOT"],
        },
      },
    },
    {
      $project: {
        inventoryDetails: 0,
        productDetails: 0,
      },
    },
    {
      $group: {
        _id: "$id",
        products: {
          $addToSet: "$$ROOT",
        },
      },
    },
  ]);
  return inventoryProductsByWarehouse;
}

// Total quantity as per the products for the warhouse
exports.getInventoryProductsByWarehouse = [
  auth,
  async (req, res) => {
    try {
      const warehouseId = req.query.warehouseId;
      const warehouseInventoryPerProduct =
        await getInventoryProductsByWarehouseID(warehouseId);
      return apiResponse.successResponseWithData(
        res,
        warehouseInventoryPerProduct
      );
    } catch (err) {
      logger.log(
        "error",
        "<<<<< InventoryService < InventoryController < getInventoryProductsByWarehouse : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

// total quantiy as per the products for the organisation
exports.getInventoryProductsByOrganisation = [
  auth,
  async (req, res) => {
    try {
      const organisationId = req.query.organisationId;
      const orgDocument = await OrganisationModel.findOne({
        id: organisationId,
      });
      let orgInventoryPerProduct = [];
      if (orgDocument.warehouses && orgDocument.warehouses.length) {
        await utility.asyncForEach(
          orgDocument.warehouses,
          async (warehouse) => {
            const _orgInventoryPerProduct =
              await getInventoryProductsByWarehouseID(warehouse);
            if (_orgInventoryPerProduct && _orgInventoryPerProduct.length) {
              orgInventoryPerProduct.push(_orgInventoryPerProduct[0]);
            }
          }
        );
      }
      return apiResponse.successResponseWithData(res, orgInventoryPerProduct);
    } catch (err) {
      logger.log(
        "error",
        "<<<<< InventoryService < InventoryController < getInventoryProductsByWarehouse : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

async function getFilterConditions(filters) {
  let matchCondition = {};
  if (filters.invDetails && filters.invDetails.length)
    matchCondition.$or = [{ type: "S1" }, { type: "S2" }, { type: "S3" }];
  
  if (filters.orgType && filters.orgType !== "") {
    if (
      filters.orgType === "BREWERY" ||
      filters.orgType === "S1" ||
      filters.orgType === "S2" ||
      filters.orgType === "S3"
    ) {
      matchCondition.type = filters.orgType;
    } else if (filters.orgType === "ALL_VENDORS") {
      matchCondition.$or = [{ type: "S1" }, { type: "S2" }, { type: "S3" }];
    }
  }
  if (filters.district && filters.district.length && !filters.organization) {
    let matchWarehouseCondition = {};
    matchCondition.status = 'ACTIVE';
    if (filters.status && filters.status !== '') {
      matchCondition.status = filters.status;
    }
    if (filters.state && filters.state !== '') {
      matchWarehouseCondition["warehouseDetails.warehouseAddress.state"] = new RegExp('^'+filters.state+'$', "i");
    }
    if (filters.district && filters.district !== '') {
      matchWarehouseCondition["warehouseDetails.warehouseAddress.city"] = new RegExp('^'+filters.district+'$', "i");
    }

    if (filters.orgType === "ALL_VENDORS") {
      matchCondition.$or = [{ type: "S1" }, { type: "S2" }, { type: "S3" }];
    } else {
      matchCondition.orgType = filters.orgType;
    }
    console.log(matchCondition, matchWarehouseCondition);
    const organisations = await OrganisationModel.aggregate([
      {
        $match: matchCondition,
      },
      {
        $lookup: {
          from: 'warehouses',
          localField: 'id',
          foreignField: 'organisationId',
          as: 'warehouseDetails'
        }
      }, {
        $unwind: '$warehouseDetails'
      },
      {
        $match: matchWarehouseCondition
       },
      {
        $project: {
          id: 1,
          name: 1,
          type: 1
        }
      }
    ]);
      
      let orgs = [];
      console.log(organisations)
      for(let org in organisations){
        orgs.push(organisations[org]['id'])
      }
      matchCondition.id = { $in : [...orgs] }
  }
  if (filters.organization && filters.organization.length) {
    matchCondition.id = filters.organization;
  }
  return matchCondition;
}

// total quantity as per the products for the ecosystem
exports.getInventoryProductsByPlatform = [
  auth,
  async (req, res) => {
    try {
      const filters = req.query;
      const skuFilter = {};
      if (filters.invDetails && filters.invDetails.length) {
        skuFilter["productDetails.id"] = filters.invDetails;
      }
      if (filters.sku && filters.sku.length) {
        skuFilter["productDetails.externalId"] = filters.sku;
      }
      const fl = await getFilterConditions(filters);
      
      const platformInventory = await OrganisationModel.aggregate([
              {
                $match: fl,
              },
							{
								$unwind: "$warehouses"
							},
              {
								$lookup: {
									from: 'warehouses',
									localField: 'warehouses',
									foreignField: 'id',
									as: 'warehouse'
								}
              },
              {
								$unwind: "$warehouse"
							},
							{
								$lookup: {
									from: 'inventories',
									localField: 'warehouse.warehouseInventory',
									foreignField: 'id',
									as: 'inventories'
								}
							},
							{
								$unwind: "$inventories"
							},
							{
								$unwind: "$inventories.inventoryDetails"
              },
              {
                $lookup: {
                  from: "products",
                  localField: "inventories.inventoryDetails.productId",
                  foreignField: "id",
                  as: "productDetails",
                },
              },
              {
                $unwind: {
                  path: "$productDetails",
                },
              },
              {
                $match: skuFilter,
              },
							{
								$group: {
									_id: filters.invDetails ? {id: '$id', pid: '$inventories.inventoryDetails.productId'} : '$inventories.inventoryDetails.productId',
                  quantity: { $sum: "$inventories.inventoryDetails.quantity" },
                  org: { "$first": {'name': "$name", 'type': "$type", 'externalId': "$productDetails.externalId", 'product_name': "$productDetails.name", 'shortName': "$productDetails.shortName", 'manufacturer': "$productDetails.manufacturer", 'state': "$warehouse.warehouseAddress.state", 'district': "$warehouse.warehouseAddress.city"} }
								}
              },
      ]);
      
      // const platformInventory = await OrganisationModel.aggregate([
      //   {
      //     $match: getFilterConditions(filters),
      //   },
      //   {
      //     $unwind: {
      //       path: "$warehouses",
      //     },
      //   },
      //   {
      //     $project: {
      //       warehouses: 1,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "warehouses",
      //       localField: "warehouses",
      //       foreignField: "id",
      //       as: "warehouseinv",
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$warehouseinv",
      //     },
      //   },
      //   {
      //     $replaceRoot: {
      //       newRoot: {
      //         $mergeObjects: ["$warehouseinv", "$$ROOT"],
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       id: 1,
      //       title: 1,
      //       warehouseInventory: 1,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "inventories",
      //       localField: "warehouseInventory",
      //       foreignField: "id",
      //       as: "inv",
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$inv",
      //     },
      //   },
      //   {
      //     $replaceRoot: {
      //       newRoot: {
      //         $mergeObjects: ["$inv", "$$ROOT"],
      //       },
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$inventoryDetails",
      //     },
      //   },
      //   {
      //     $replaceRoot: {
      //       newRoot: {
      //         $mergeObjects: ["$inventoryDetails", "$$ROOT"],
      //       },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$productId",
      //       quantity: {
      //         $sum: "$quantity",
      //       },
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "products",
      //       localField: "_id",
      //       foreignField: "id",
      //       as: "productDetails",
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$productDetails",
      //     },
      //   },
      //   {
      //     $replaceRoot: {
      //       newRoot: {
      //         $mergeObjects: ["$productDetails", "$$ROOT"],
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       productDetails: 0,
      //     },
      //   },
      //   {
      //     $match: skuFilter,
      //   },
      // ]);
      return apiResponse.successResponseWithData(res, platformInventory);
    } catch (err) {
      logger.log(
        "error",
        "<<<<< InventoryService < InventoryController < getInventoryProductsByWarehouse : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

function _spreadHeaders(inputObj) {
  let prevHeaderVal = "";
  let keys = Object.keys(inputObj);
  keys.forEach((key) => {
    if (key.startsWith("__") || key.startsWith("t")) {
      return;
    }
    if (inputObj[key].length) {
      prevHeaderVal = inputObj[key];
    } else {
      inputObj[key] = prevHeaderVal;
    }
  });
  return inputObj;
}

function getBrand(brand) {
  const ko = ['Knock Out High Punch', 'IP CINNAMON'];
  const rc = ['RC_STRONG', 'RC_Q', 'RC_P'];
  const hy = ['HAYWARDS 5000'];
  const fo = ['FOSTERS STRONG', "FOSTER'S"];
  const bud = ['Budweiser'];
  const budm = ['BUDMAGNUMSTRONG'];
  const becks = ['BECKS', 'BE Xtra Strong'];
  
  let returnBrand = brand;
  if (ko.includes(brand))
    returnBrand = "KO";
  else if (rc.includes(brand))
    returnBrand = "Royal Challenger";
  else if (hy.includes(brand))
    returnBrand = "Haywards 5000";
  else if (fo.includes(brand))
    returnBrand = "Fosters";
  else if (bud.includes(brand))
    returnBrand = "Budweiser";
  else if (budm.includes(brand))
    returnBrand = "Budweiser Magnum";
  else if (becks.includes(brand))
    returnBrand = "Becks";

  return returnBrand;
}

exports.uploadSalesData = [
  auth,
  async (req, res) => {
    try {
      const dir = `uploads`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const { collectedDate, targetPercentage } = req.body;
      await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
      const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
      const sheet_name_list = workbook.SheetNames;

      var range = XLSX.utils.decode_range(workbook.Sheets[sheet_name_list[0]]['!ref']);
      range.s.c = 0;
      range.e.c = 58;
      var new_range = XLSX.utils.encode_range(range);

      const sheetJSON = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { blankrows: false, defval: "", range: new_range });

      let headerRow1 = _spreadHeaders(sheetJSON[0]);
      let headerRow2 = _spreadHeaders(sheetJSON[1]);
      let headerRow3 = _spreadHeaders(sheetJSON[2]);
      let headerRow4 = sheetJSON[3];
      let headerRow5 = sheetJSON[4];
      let parsedRows = [];
      sheetJSON.forEach((row, index) => {
        if (index > 4) {
          let rowKeys = Object.keys(row);
          rowKeys.forEach((rowKey) => {
            let prod = {};
            if (headerRow5[rowKey] && headerRow5[rowKey].length && headerRow5[rowKey] != 'Stock Code') {
              prod['brand'] = getBrand(headerRow2[rowKey]);
              prod['productName'] = headerRow4[rowKey];
              prod['productSubName'] = headerRow3[rowKey];
              prod['productId'] = headerRow5[rowKey];
              prod['depot'] = row['__EMPTY_1'];
              prod['sales'] = (row[rowKey] === parseInt(row[rowKey], 10)) ? parseInt(row[rowKey]) : 0;
              prod['targetSales'] = (row[rowKey] === parseInt(row[rowKey], 10)) ? row[rowKey] * (targetPercentage / 100) : 0;
              prod['uploadDate'] = collectedDate;
              let depot = warehouseDistrictMapping.find(w => w.depot === row['__EMPTY_1']);
              prod['warehouseId'] = (depot && depot.warehouseId) ? depot.warehouseId : '';
            }
            if (Object.keys(prod).length) {
              parsedRows.push(prod);
            }
          });
        }
      });

      let respObj = await AnalyticsModel.insertMany(parsedRows);
      return apiResponse.successResponseWithData(
        res,
        `Uploaded Sales Data successfully. Num Records - ${respObj.length}`
      );

    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];


exports.getBatchNearExpiration = [
  auth,
  async (req, res) => {
    try {
      var warehouseId = "";

      if (!req.query.warehouseId)
        warehouseId = req.user.warehouseId;
      else
        warehouseId = req.query.warehouseId;

      var today = new Date();
      var nextMonth = new Date();
      nextMonth.setDate(today.getDate() + 30)

      const warehouse = await WarehouseModel.findOne({ id: warehouseId })
      if (warehouse) {
        const result = await AtomModel.aggregate([
          {
            $match: {
              $and: [
                {
                  "attributeSet.expDate": {
                    $gte: today.toISOString(),
                    $lt: nextMonth.toISOString()
                  }
                }, { $expr: { $in: [warehouse.warehouseInventory, "$inventoryIds"] } },
                // {batchNumbers: {$ne: ""}},
                {"attributeSet.mfgDate": {$ne: ""}},
                {"attributeSet.expDate": {$ne: ""}}
              ]
            }
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "id",
              as: "products",
            },
          },
          { $unwind: "$products" },
        ]);
        return apiResponse.successResponseWithData(
          res,
          "Near expiring batch Details",
          result
        );
      } else {
        return apiResponse.ErrorResponse(
          res,
          "Cannot find warehouse for this employee"
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getBatchExpired = [
  auth,
  async (req, res) => {
    try {
      var warehouseId = "";

      if (!req.query.warehouseId)
        warehouseId = req.user.warehouseId;
      else
        warehouseId = req.query.warehouseId;

      var today = new Date();

      const warehouse = await WarehouseModel.findOne({ id: warehouseId });
      if (warehouse) {
        const result = await AtomModel.aggregate([
          {
            $match: {
              $and: [
                {
                  "attributeSet.expDate": {
                    $lt: today.toISOString()
                  }
                }, { $expr: { $in: [warehouse.warehouseInventory, "$inventoryIds"] } },
                // {batchNumbers: {$ne: ""}},
                {"attributeSet.mfgDate": {$ne: ""}},
                {"attributeSet.expDate": {$ne: ""}}
              ]
            }
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "id",
              as: "products",
            },
          },
          { $unwind: "$products" },
        ]);
        return apiResponse.successResponseWithData(
          res,
          "Expired Batch Details",
          result
        );
      } else {
        return apiResponse.ErrorResponse(
          res,
          "Cannot find warehouse for this employee"
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getBatchWarehouse = [
  auth,
  async (req, res) => {
    try {
      const inventoryId = req.query.inventory_id;
      const productId = req.query.product_id;

      const result = await AtomModel.aggregate([
        {
          $match: {
            $and: [
              {
                productId: productId
              }, { $expr: { $in: [inventoryId, "$inventoryIds"] } }
            ]
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "id",
            as: "products",
          },
        },
        { $unwind: "$products" },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Warehouse Batch Details",
        result
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.deleteProductsFromInventory = [
    auth,
    async (req, res) => {
        try {

            const inventoryTransfer = async (
                id,
                quantity,
                suppId,
                recvId,
                next
            ) => {
		    console.log("1",id,quantity,suppId,recvId)
                const checkProduct = await InventoryModel.find({
                    $and: [{
                        id: recvId
                    }, {
                        "inventoryDetails.productId": id
                    }],
                });
                if (checkProduct != "") {
                    const recvUpdate = await InventoryModel.update({
                        id: recvId,
                        "inventoryDetails.productId": id,
                    }, {
                        $inc: {
                            "inventoryDetails.$.quantity": quantity,
                        },
                    });
                    const suppUpdateRecvTransit = await InventoryModel.update({
                        id: suppId,
                        "inventoryDetails.productId": id,
                    }, {
                        $inc: {
                            "inventoryDetails.$.quantity": -quantity,
                        },
                    });
                } else if (checkProduct == "") {
                    const s = await InventoryModel.update({
                        id: recvId
                    }, {
                        $addToSet: {
                            inventoryDetails: {
                                productId: id,
                                quantity: quantity
                            }
                        }
                    });
                    const suppUpdateRecvTransit = await InventoryModel.update({
                        id: suppId,
                        "inventoryDetails.productId": id,
                    }, {
                        $inc: {
                            "inventoryDetails.$.quantity": -quantity,
                        },
                    });
                }
                // next("Success")
            };

            const data = req.body;
            const suppWarehouseDetails = await WarehouseModel.findOne({
                id: data.supplier.locationId,
            });
            if (suppWarehouseDetails == null) {
                return apiResponse.ErrorResponse(res, "suppWarehouseDetails not Found");
            }
            var suppInventoryId = suppWarehouseDetails.warehouseInventory;
            const suppInventoryDetails = await InventoryModel.findOne({
                id: suppInventoryId,
            });
            if (suppInventoryDetails == null) {
                return apiResponse.ErrorResponse(res, "suppInventoryDetails not Found");
            }
            const recvWarehouseDetails = await WarehouseModel.findOne({
                id: data.receiver.locationId,
            });
            if (recvWarehouseDetails == null) {
                return apiResponse.ErrorResponse(res, "recvWarehouseDetails not Found");
            }
            var recvInventoryId = recvWarehouseDetails.warehouseInventory;
            const recvInventoryDetails = await InventoryModel.findOne({
                id: recvInventoryId,
            });
            if (recvInventoryDetails == null) {
                return apiResponse.ErrorResponse(res, "recvInventoryDetails not Found");
            }

            const user_id = req.user.id;
            const email = req.user.emailId;
            const empData = await EmployeeModel.findOne({
                emailId: req.user.emailId,
            });
            const orgId = empData.organisationId;
            const orgData = await OrganisationModel.findOne({
                id: orgId
            });
            const orgName = empData.name;
            const address = orgData.postalAddress;
            const supplierOrgData = await OrganisationModel.findOne({
                id: req.body.supplier.id,
            });
            const supplierName = supplierOrgData.name;
            const supplierAddress = supplierOrgData.postalAddress;
            const receiverId = req.body.receiver.id;
            const receiverOrgData = await OrganisationModel.findOne({
                id: req.body.receiver.id,
            });
            const receiverName = receiverOrgData.name;
            const receiverAddress = receiverOrgData.postalAddress;
            let payload = req.body;


            var products = data.products;
            for (count = 0; count < products.length; count++) {
                inventoryTransfer(
                    products[count].productID,
                    products[count].productQuantity,
                    suppInventoryId,
                    recvInventoryId
                );
            }


            var datee = new Date();
            datee = datee.toISOString();
            var evid = Math.random().toString(36).slice(2);
            let event_data = {
                eventID: null,
                eventTime: null,
                eventType: {
                    primary: "CREATE",
                    description: "SHIPMENT_CREATION",
                },
                actor: {
                    actorid: null,
                    actoruserid: null,
                },
                stackholders: {
                    ca: {
                        id: "null",
                        name: "null",
                        address: "null",
                    },
                    actororg: {
                        id: "null",
                        name: "null",
                        address: "null",
                    },
                    secondorg: {
                        id: "null",
                        name: "null",
                        address: "null",
                    },
                },
                payload: {
                    data: {
                        abc: 123,
                    },
                },
            };
            event_data.eventID = "ev0000" + evid;
            event_data.eventTime = datee;
            event_data.eventType.primary = "DELETE";
            event_data.eventType.description = "INVENTORY";
            event_data.actor.actorid = user_id || "null";
            event_data.actor.actoruserid = email || "null";
            event_data.stackholders.actororg.id = orgId || "null";
            event_data.stackholders.actororg.name = orgName || "null";
            event_data.stackholders.actororg.address = address || "null";
	    event_data.actorWarehouseId = req.user.warehouseId || "null";
            event_data.stackholders.ca.id = CENTRAL_AUTHORITY_ID || "null";
            event_data.stackholders.ca.name = CENTRAL_AUTHORITY_NAME || "null";
            event_data.stackholders.ca.address = CENTRAL_AUTHORITY_ADDRESS || "null";
            event_data.stackholders.secondorg.id = receiverId || "null";
            event_data.stackholders.secondorg.name = receiverName || "null";
            event_data.stackholders.secondorg.address = receiverAddress || "null";

            event_data.payload.data = payload;
            async function compute(event_data) {
                result = await logEvent(event_data);
                return result;
            }
            compute(event_data).then((response) => {
            });

            return apiResponse.successResponse(
                res,
                "Operation success"
            );
        } catch (err) {
            return apiResponse.ErrorResponse(res, err.message);
        }
    },
];

exports.searchProduct = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
      permission_request = {
        role: role,
        permissionRequired: "searchByProductName",
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
      const {productName, productType  } = req.query;
      var warehouseId = "";
      if (!req.query.warehouseId)
        warehouseId = req.user.warehouseId;
      else
        warehouseId = req.query.warehouseId;
      const warehouse = await WarehouseModel.findOne({ id: warehouseId })
      if (warehouse) {
        let elementMatchQuery={}
        elementMatchQuery['id']=warehouse.warehouseInventory
        if (productName) {
          elementMatchQuery[`products.name`] = productName;
        }
        if (productType) {
          elementMatchQuery[`products.type`] = productType;
        }
        const inventory = await InventoryModel.aggregate([
          { $unwind: "$inventoryDetails" },
          {
            $lookup: {
              from: "products",
              localField: "inventoryDetails.productId",
              foreignField: "id",
              as: "products",
            },
          },
          { $unwind: "$products" },
          { $match: elementMatchQuery },
        //   { $project:{
        //     products:"",
        //   }
        // }
        ])
          .sort({ createdAt: -1 })
        return apiResponse.successResponseWithData(
          res,
          "Inventory Details",
          inventory
        );
      } else {
        return apiResponse.ErrorResponse(
          res,
          "Cannot find warehouse for this employee"
        );
      }
    }
    else{
      return apiResponse.forbiddenResponse(res, "Access denied");
     }
    })}
        catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];


exports.autoCompleteSuggestions = [
  auth,
  async (req, res) => {
    try {
      const { searchString  } = req.query;
       
        const suggestions = await RecordModel.aggregate([
          {$project: { _id: 0, value: "$id", record_type: "order"}},
          {$unionWith: {coll: "products", pipeline: [ { $project: { _id: 0, value: "$name", record_type: "productName" } } ]}}, 
          {$unionWith: {coll: "shipments", pipeline: [ { $project: { _id: 0, value: "$id", record_type: "shipment" } } ]}}, 
          {$unionWith: {coll: "products", pipeline: [ { $project: { _id: 0, value: "$type", record_type: "productType" } } ]}}, 
          {$unionWith: {coll: "shipments", pipeline: [ { $project: { _id: 0, value: "$airWayBillNo", airWayBillNo: "$airWayBillNo", record_type: "transitNumber" } } ]}}, 

          {$match: {"value": {$regex: searchString ? searchString: ""} }},
          {$limit: 10},
          { $group: { _id: '$value', type: { "$first": "$record_type"}, airWayBillNo: {"$first": "$airWayBillNo"}}},
  ])
          .sort({ createdAt: -1 })
        return apiResponse.successResponseWithData(
          res,
          "Autocorrect Suggestions",
          suggestions
        );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];


exports.fetchBatchesOfInventory = [
  auth,
  async (req, res) => {
    try {
      const { productId } = req.query;
       var warehouseId = req.user.warehouseId;
       let warehouse = await WarehouseModel.findOne({id: warehouseId}) 
       let inventoryId = warehouse.warehouseInventory
        const batches = await AtomModel.find({productId: productId,"batchNumbers": {$nin: ["", "null", null]}, inventoryIds: inventoryId})
          .sort({"attributeSet.expDate": 1})
        return apiResponse.successResponseWithData(
          res,
          "Batches of product",
          batches
        );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];


