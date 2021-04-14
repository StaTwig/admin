const { body, validationResult } = require('express-validator');
const moveFile = require('move-file');
require('../utils/date');
const XLSX = require('xlsx');
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const auth = require('../middlewares/jwt');
const InventoryModel = require('../models/InventoryModel');
const WarehouseModel = require('../models/WarehouseModel');
const RegionModel = require('../models/RegionModel');
const EmployeeModel = require('../models/EmployeeModel');
const AtomModel = require('../models/AtomModel');
const ProductModel = require('../models/ProductModel');
const NotificationModel = require('../models/NotificationModel');

const checkToken = require('../middlewares/middleware').checkToken;
const checkPermissions = require('../middlewares/rbac_middleware')
  .checkPermissions;
const axios = require('axios');

const fs = require('fs');
const uniqid = require('uniqid');
const blockchain_service_url = process.env.URL;
const product_service_url = process.env.PRODUCT_URL;

const stream_name = process.env.STREAM;

const init = require('../logging/init');
const OrganisationModel = require('../models/OrganisationModel');
const logger = init.getLog();

exports.getTotalCount = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getTotalCount : token verifed successfully',
          );

          permission_request = {
            emailId: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, permissionResult => {
            if (permissionResult.success) {
              res.json('Total inventory count');
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getTotalCount : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getTotalCount : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getTotalCountOnHold : token verified successfully',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, permissionResult => {
            if (permissionResult.success) {
              res.json('Total inventory count on Hold');
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getTotalCountOnHold : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getTotalCountOnHold : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getExpiringInventory : token verified successfully',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, permissionResult => {
            if (permissionResult.success) {
              res.json('Total inventory count expiring');
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getExpiringInventory : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getExpiringInventory : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getInventoryforProduct : token verified successfullly',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, permissionResult => {
            if (permissionResult.success) {
              const { product_id } = result.data.key;
              res.json('Inventory details for product');
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getInventoryforProduct : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryforProduct : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : token verified successfullly, querying data by key',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { key } = req.query;
              const response = await axios.get(
                `${blockchain_service_url}/queryDataByKey?stream=${stream_name}&key=${key}`,
              );
              const items = response.data.items;
              logger.log('items', items);
              logger.log(
                'info',
                '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : queried data by key',
              );
              res.json({ data: items });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryDetailsForProduct : error (catch block)',
      );
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
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getAllInventoryDetails : token verified successfullly, querying data by publisher',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address } = req.user;
              const { skip, limit } = req.query;

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
                },
              );

              const products_array = productNamesResponse.data.data.map(
                product => product.productName,
              );

              logger.log(
                'info',
                '<<<<< InventoryService < InventoryController < getAllInventoryDetails : queried and pushed data',
              );
              const nextYear = new Date(
                new Date().setFullYear(new Date().getFullYear() + 1),
              );
              nextYear.setMonth(0);
              nextYear.setUTCHours(0, 0, 0, 0);
              nextYear.setDate(1);
              const thisYear = new Date(
                new Date().setFullYear(new Date().getFullYear()),
              );
              thisYear.setMonth(0);
              thisYear.setDate(1);
              thisYear.setUTCHours(0, 0, 0, 0);
              const nextMonth = new Date(
                new Date().setMonth(new Date().getMonth() + 1),
              );
              nextMonth.setUTCHours(0, 0, 0, 0);
              const thisMonth = new Date(
                new Date().setMonth(new Date().getMonth()),
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
                new Date().setDate(new Date().getDate() + 1),
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
                    _id: '$productName',
                    productName: { $first: '$productName' },
                    quantity: { $sum: '$quantity' },
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
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getAllInventoryDetails : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getAllInventoryDetails : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateInventories = [
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
      } = data;
      const serialNumbers = serialNumberRange.split('-');
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
      apiResponse.successResponseWithData(res, 'Updated Success');
    } catch (e) {
      apiResponse.ErrorResponse(res, e);
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
      const serialNumbers = serialNumberRange.split('-');
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
      logger.log('info', 'Inserting inventories data in chunks');
      async function recursiveFun() {
        skip = chunkSize * count;
        count++;
        limit = chunkSize * count;
        logger.log('info', `skip ${skip}`);

        logger.log('info', `limit ${limit}`);
        const chunkedData = inventories.slice(skip, limit);
        try {
          await InventoryModel.insertMany(chunkedData);
          if (limit < inventories.length) {
            recursiveFun();
          } else {
            logger.log(
              'info',
              `Insertion of inventories from mobile is completed. Time Taken to insert ${inventories.length
              } in seconds - `,
              (new Date() - start) / 1000,
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
      apiResponse.successResponseWithData(res, 'Inserted Success');
    } catch (e) {
      apiResponse.ErrorResponse(res, e);
    }
  },
];
exports.addProductsToInventory = [
  auth,
  body('products')
    .isLength({ min: 1 })
    .withMessage('Products  must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.log(
          'error',
          '<<<<< InventoryService < InventoryController < addMultipleInventories : Validation Error',
        );
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }

      permission_request = {
        role: req.user.role,
        permissionRequired: 'addInventory',
      };
      checkPermissions(permission_request, async permissionResult => {
        if (permissionResult.success) {
          const { products } = req.body;
          const { id } = req.user;
          const employee = await EmployeeModel.findOne({ id });
          const warehouseId = employee.warehouseId;
          const warehouse = await WarehouseModel.findOne({ id: warehouseId });
          if (!warehouse) {
            return apiResponse.ErrorResponse(
              res,
              'Employee not assigned to any organisation',
            );
          }
          let serialNumbersRange = true;
          let alpha = [...Array(26)].map((_, y) => String.fromCharCode(y + 65)).join('');
          for (let i = 0; i < products.length; i++) {
            if (products[i].serialNumbersRange.split('-').length < 2) {
              let snoref = Date.now();
              let rApha = '';
              for (let i = 0; i < 4; i++)
                rApha += alpha.charAt(Math.floor(Math.random() * alpha.length));

              products[i].serialNumbersRange =
                "DSL" + rApha + (parseInt(snoref) - parseInt(products[i].quantity - 1)) +
                "-DSL" + rApha + snoref;
              // serialNumbersRange = false;
              // break;
            }
          }
          if (!serialNumbersRange) {
            return apiResponse.ErrorResponse(
              res,
              `Product doesn't conatin valid serial numbers range`,
            );
          }
          const inventory = await InventoryModel.findOne({
            id: warehouse.warehouseInventory,
          });
          if (!inventory) return apiResponse.ErrorResponse(res, 'Cannot find inventory to this employee warehouse');
          let atoms = [];
          products.forEach(product => {
            const serialNumbers = product.serialNumbersRange.split('-');
            const serialNumbersFrom = parseInt(serialNumbers[0].split(/(\d+)/)[1]);
            const serialNumbersTo = parseInt(serialNumbers[1].split(/(\d+)/)[1]);
            const serialNumberText = serialNumbers[1].split(/(\d+)/)[0];
            for (let i = serialNumbersFrom; i <= serialNumbersTo; i++) {
              const atom = `${serialNumberText + uniqid.time()}${i}`

              atoms.push(atom);
            }
          })
          const dupSerialFound = await AtomModel.findOne({ id: { $in: atoms } });
          if (dupSerialFound) return apiResponse.ErrorResponse(res, 'Duplicate Serial Numbers found');


          //This code handles the insertion of duplicate products and aggregates the counts
          await utility.asyncForEach(products, async product => {
            const inventoryId = warehouse.warehouseInventory;
            const checkProduct = await InventoryModel.find({ "$and": [{ "id": inventoryId }, { "inventoryDetails.productId": product.productId }] })
            if (checkProduct != "") {
              const exist_quantity = await InventoryModel.find({ "id": inventoryId }, { "inventoryDetails": { "$elemMatch": { "productId": product.productId } } })
              const new_quantity = exist_quantity[0].inventoryDetails[0].quantity + product.quantity;

              const update = await InventoryModel.updateOne({ "id": inventoryId, "inventoryDetails.productId": product.productId },
                { "$set": { "inventoryDetails.$.quantity": new_quantity } }
              )

            }
            else {
              inventory.inventoryDetails.push({
                productId: product.productId,
                quantity: product.quantity,
              });
            }



            const serialNumbers = product.serialNumbersRange.split('-');
            const serialNumbersFrom = parseInt(serialNumbers[0].split(/(\d+)/)[1]);
            const serialNumbersTo = parseInt(serialNumbers[1].split(/(\d+)/)[1]);

            const serialNumberText = serialNumbers[1].split(/(\d+)/)[0];
            let atoms = [];

            for (let i = serialNumbersFrom; i <= serialNumbersTo; i++) {
              const atom = {
                id: `${serialNumberText + uniqid.time()}${i}`,
                label: {
                  labelId: '',
                  labelType: '',
                },
                productId: product.productId,
                inventoryIds: [inventory.id],
                lastInventoryId: '',
                lastShipmentId: '',
                poIds: [],
                shipmentIds: [],
                txIds: [],
                batchNumbers: [product.batchNumber],
                atomStatus: 'Healthy',
                attributeSet: {
                  mfgDate: product.mfgDate,
                  expDate: product.expDate,
                },
                eolInfo: {
                  eolId: 'IDN29402-23423-23423',
                  eolDate: '2021-03-31T18:30:00.000Z',
                  eolBy: id,
                  eolUserInfo: '',
                }
              };
              atoms.push(atom);
            }
            try {
              await AtomModel.insertMany(atoms);
              await inventory.save();
            } catch (err) {
              console.log('err', err);
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

          return apiResponse.successResponseWithData(res, 'Added products to the inventories')
        } else {
          res.json('Sorry! User does not have enough Permissions');
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < addMultipleInventories : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addInventoriesFromExcel = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          permission_request = {
            result: result,
            permissionRequired: 'addInventory',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const dir = `uploads`;
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
              }
              await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
              const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
              const sheet_name_list = workbook.SheetNames;
              const data = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheet_name_list[0]],
                { dateNF: 'dd/mm/yyyy;@', cellDates: true, raw: false },
              );
              const { address } = req.user;
              let start = new Date();
              let count = 0;
              const chunkSize = 50;
              let limit = chunkSize;
              let skip = 0;

              logger.log('info', 'Inserting excel data in chunks');
              async function recursiveFun() {
                skip = chunkSize * count;
                count++;
                limit = chunkSize * count;
                logger.log('info', `skip ${skip}`);

                logger.log('info', `limit ${limit}`);
                const chunkedData = data.slice(skip, limit);
                let chunkUrls = [];
                const serialNumbers = chunkedData.map(inventory => {
                  return { serialNumber: inventory.serialNumber.trim() };
                });
                const inventoriesFound = await InventoryModel.findOne({
                  $or: serialNumbers,
                });
                if (inventoriesFound) {
                  console.log('Duplicate Inventory Found');
                  const newNotification = new NotificationModel({
                    owner: address,
                    message: `Your inventories from excel is failed to add on ${new Date().toLocaleString()} due to Duplicate Inventory found ${inventoriesFound.serialNumber
                      }`,
                  });
                  await newNotification.save();
                  return;
                }
                chunkedData.forEach(inventory => {
                  inventory.serialNumber = inventory.serialNumber.trim();
                  const userData = {
                    stream: stream_name,
                    key: inventory.serialNumber.trim(),
                    address: address,
                    data: inventory,
                  };
                  const postRequest = axios.post(
                    `${blockchain_service_url}/publishExcelData`,
                    userData,
                  );
                  chunkUrls.push(postRequest);
                });
                axios
                  .all(chunkUrls)
                  .then(
                    axios.spread(async (...responses) => {
                      const inventoryData = responses.map(
                        response => response.data,
                      );
                      logger.log(
                        'info',
                        `Inventory Data length' ${inventoryData.length}`,
                      );
                      logger.log(
                        'info',
                        `Transaction Id,
                        ${inventoryData[0].transactionId}`,
                      );
                      InventoryModel.insertMany(inventoryData, (err, res) => {
                        if (err) {
                          logger.log('error', err.errmsg);
                        } else
                          logger.log(
                            'info',
                            'Number of documents inserted into mongo: ' +
                            res.length,
                          );
                      });

                      if (limit < data.length) {
                        recursiveFun();
                      } else {
                        logger.log(
                          'info',
                          `Insertion of excel sheet data is completed. Time Taken to insert ${data.length
                          } in seconds - `,
                          (new Date() - start) / 1000,
                        );
                        const newNotification = new NotificationModel({
                          owner: address,
                          message: `Your inventories from excel is added successfully on ${new Date().toLocaleString()}`,
                        });
                        await newNotification.save();
                      }
                    }),
                  )
                  .catch(errors => {
                    logger.log(errors);
                  });
              }
              recursiveFun();
              return apiResponse.successResponseWithData(res, 'Success', data);
            } else {
              return apiResponse.ErrorResponse(
                res,
                'Sorry! User does not have enough Permissions',
              );
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

exports.trackProduct = [
  auth,
  async (req, res) => {
    try {
      const { serialNumber } = req.query;
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < trackProduct : tracking product, querying by transaction hash',
      );
      InventoryModel.findOne({ serialNumber: serialNumber }).then(
        async user => {
          let txnIDs = user.transactionIds;
          let items_array = [];
          await utility.asyncForEach(txnIDs, async txnId => {
            const response = await axios.get(
              `${blockchain_service_url}/queryDataByRawTxHash?txid=${txnId}`,
            );
            const items = response.data.items;
            items_array.push(items);
          });
          logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < trackProduct : tracked product, queried data by transaction hash',
          );
          res.json({ data: items_array });
        },
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < trackProduct : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];


exports.getInventoryDetails = [
  auth,
  async (req, res) => {
    try {
      var selectedWarehouseId = '';
      if (req.body.warehouseId !== null) {
        selectedWarehouseId = req.body.warehouseId;
      }
      const employee = await EmployeeModel.findOne({ id: req.user.id });

      var warehouse;
      if (selectedWarehouseId == '' || selectedWarehouseId == null) {
        warehouse = await WarehouseModel.findOne({ id: employee.warehouseId })
      } else {
        warehouse = await WarehouseModel.findOne({ id: selectedWarehouseId })
      }
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
        return apiResponse.ErrorResponse(res, 'Cannot find warehouse for this employee')
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }

  }
]
exports.getGroupedInventoryDetails = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getGroupedInventoryDetails : token verified successfullly, querying data by publisher',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address } = req.user;
              const { skip, limit } = req.query;

              const inventoryResult = await InventoryModel.aggregate([
                { $match: { owner: address } },
                {
                  $group: {
                    _id: { batchNumber: '$batchNumber' },
                    batchNumber: { $first: '$batchNumber' },
                    quantity: { $sum: '$quantity' },
                    manufacturingDate: { $first: '$manufacturingDate' },
                    expiryDate: { $first: '$expiryDate' },
                    owner: { $first: '$owner' },
                    productName: { $first: '$productName' },
                    manufacturerName: { $first: '$manufacturerName' },
                    createdAt: { $first: '$createdAt' },
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
                },
              );

              const products_array = productNamesResponse.data.data.map(
                product => product.productName,
              );

              logger.log(
                'info',
                '<<<<< InventoryService < InventoryController < getAllInventoryDetails : queried and pushed data',
              );
              const nextYear = new Date(
                new Date().setFullYear(new Date().getFullYear() + 1),
              );
              nextYear.setMonth(0);
              nextYear.setUTCHours(0, 0, 0, 0);
              nextYear.setDate(1);
              const thisYear = new Date(
                new Date().setFullYear(new Date().getFullYear()),
              );
              thisYear.setMonth(0);
              thisYear.setDate(1);
              thisYear.setUTCHours(0, 0, 0, 0);
              const nextMonth = new Date(
                new Date().setMonth(new Date().getMonth() + 1),
              );
              nextMonth.setUTCHours(0, 0, 0, 0);
              const thisMonth = new Date(
                new Date().setMonth(new Date().getMonth()),
              );
              thisMonth.setUTCDate(1);
              thisMonth.setUTCHours(0, 0, 0, 0);
              const thisWeek = Date.monday();
              const nextWeek = Date.next().monday();
              const tomorrow = new Date(
                new Date().setDate(new Date().getDate() + 1),
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
                    _id: '$productName',
                    productName: { $first: '$productName' },
                    quantity: { $sum: '$quantity' },
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
              apiResponse.ErrorResponse(res, `Sorry! User doens't have permissions`);
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getGroupedInventoryDetails : refused token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getGroupedInventoryDetails : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getInventoryDetailsByBatchNumber = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getInventoryDetailsByBatchNumber : token verified successfullly, querying data by publisher',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address } = req.user;
              const { batchNumber, skip, limit } = req.query;

              const inventoryResult = await InventoryModel.find({
                owner: address,
                batchNumber: batchNumber,
              })
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));

              res.json({
                data: inventoryResult,
              });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getInventoryDetailsByBatchNumber : refuted token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryDetailsByBatchNumber : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getBatchDetailsByBatchNumber = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< InventoryService < InventoryController < getBatchDetailsByBatchNumber : token verified successfullly, querying data by publisher',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewInventory',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const { address } = req.user;
              const { skip, limit, batchNumber } = req.query;

              const inventoryResult = await InventoryModel.aggregate([
                { $match: { owner: address, batchNumber: batchNumber } },
                {
                  $group: {
                    _id: { batchNumber: '$batchNumber' },
                    batchNumber: { $first: '$batchNumber' },
                    quantity: { $sum: '$quantity' },
                    manufacturingDate: { $first: '$manufacturingDate' },
                    expiryDate: { $first: '$expiryDate' },
                    owner: { $first: '$owner' },
                    productName: { $first: '$productName' },
                    manufacturerName: { $first: '$manufacturerName' },
                    createdAt: { $first: '$createdAt' },
                  },
                },
              ])
                .sort({ createdAt: -1 })
                .skip(parseInt(skip))
                .limit(parseInt(limit));

              res.json({
                data: inventoryResult,
              });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< InventoryService < InventoryController < getBatchDetailsByBatchNumber : refused token',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getBatchDetailsByBatchNumber : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getProductListCounts = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.user;
      const InventoryId = await WarehouseModel.find({ "id": warehouseId })
      const val = InventoryId[0].warehouseInventory
      const productList = await InventoryModel.find({ "id": val });
      const list = JSON.parse(JSON.stringify(productList[0].inventoryDetails))
      var productArray = [];
      for (j = 0; j < list.length; j++) {
        var productId = list[j].productId;
        const product = await ProductModel.find({ "id": productId })
        var product1 = { productName: product[0].name, productId: product[0].id, quantity: list[j].quantity };
        productArray.push(product1)
      }
      return apiResponse.successResponseWithData(
        res,
        productArray
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];


exports.getProductDetailsByWarehouseId = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.query;
      const warehouseDetails = await WarehouseModel.findOne({ "id": warehouseId })
      const val = warehouseDetails.warehouseInventory
      const productList = await InventoryModel.find({ "id": val });
      const list = JSON.parse(JSON.stringify(productList[0].inventoryDetails))
      var productArray = [];
      for (j = 0; j < list.length; j++) {
        var productId = list[j].productId;
        const product = await ProductModel.find({ "id": productId })
        var product1 = { productName: product[0].name, productId: product[0].id, manufacturer: product[0].manufacturer, quantity: list[j].quantity };
        productArray.push(product1)
      }
      var warehouse = {
        "warehouseCountryId": warehouseDetails.country.id, "warehouseCountryName": warehouseDetails.country.name, "warehouseId": warehouseDetails.id,
        "warehouseName": warehouseDetails.title, "warehouseAddress": warehouseDetails.postalAddress, "warehouseLocation": warehouseDetails.location
      }

      return apiResponse.successResponseWithData(
        res, "Fetch success",
        {
          warehouse,
          productArray
        }
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];


exports.getEmployeeDetailsByWarehouseId = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.query;
      const warehouseDetails = await WarehouseModel.find({ "id": warehouseId })
      const employees = warehouseDetails[0].supervisors
      return apiResponse.successResponseWithData(
        res, "Fetch success",
        employees
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getCountryDetailsByRegion = [
  auth,
  async (req, res) => {
    try {
      const { region } = req.query;
      const regionDetails = await RegionModel.find({ "name": region })
      console.log(regionDetails[0].country)
      // var countryArray = [];
      /*for (j=0;j<regionDetails.length;j++)
                   {
                        var countryName = countryDetails[j].country;
                        countryArray.push(countryName)
                   } */

      return apiResponse.successResponseWithData(
        res, "Fetch success",
        { "countries": regionDetails[0].country }
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getRegions = [
  auth,
  async (req, res) => {
    try {
      const regions = await RegionModel.find({});
      return apiResponse.successResponseWithData(
        res,
        'Regions',
        regions,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getWarehouseDetailsByRegion = [
  auth,
  async (req, res) => {
    try {
      const { region } = req.query;
      const warehouseDetails = await WarehouseModel.find({ "region.name": region })

      var warehouseArray = [];
      for (j = 0; j < warehouseDetails.length; j++) {
        var warehouseId = warehouseDetails[j];
        warehouseArray.push(warehouseId)
      }

      return apiResponse.successResponseWithData(
        res, "Fetch success",
        warehouseArray
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getWarehouseDetailsByCountry = [
  auth,
  async (req, res) => {
    try {
      const { country } = req.query;
      const warehouseDetails = await WarehouseModel.find({ "country.name": country })

      var warehouseArray = [];
      for (j = 0; j < warehouseDetails.length; j++) {
        var warehouseId = warehouseDetails[j];
        warehouseArray.push(warehouseId)
      }

      return apiResponse.successResponseWithData(
        res, "Fetch success",
        warehouseArray
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getInventory = [
  auth,
  async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const { warehouseId } = req.user;
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
        ]).sort({ createdAt: -1 })
          .skip(parseInt(skip))
          .limit(parseInt(limit));
        return apiResponse.successResponseWithData(res, 'Inventory Details', inventory);
      } else {
        return apiResponse.ErrorResponse(res, 'Cannot find warehouse for this employee')
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

// return the list of the organisations with the list of warehouses with their respective inventory counts
exports.getInventoryCountsOfThePlatform = [
  auth,
  async (req, res) => {
    try {
      const platformInventoryCount = await InventoryModel.aggregate([{ $unwind: "$inventoryDetails" }, {
        $group: {
          _id: null,
          "platformInventory": {
            $sum: "$inventoryDetails.quantity"
          }
        }
      }]);
      return apiResponse.successResponseWithData(
        res,
        platformInventoryCount
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryCountsOfThePlatform : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

// return the list of warehouses with the inventory count of the specific organisation
exports.getInventoryCountsByOrganisation = [
  auth,
  async (req, res) => {
    try {
      const organisationId = req.query.organisationId;
      const orgDocument = await OrganisationModel.findOne({ id: organisationId });
      let orgInventoryCount = 0;
      if (orgDocument.warehouses && orgDocument.warehouses.length) {
        await utility.asyncForEach(orgDocument.warehouses, async warehouse => {
          let warehouseInventoryCount = await WarehouseModel.aggregate([
            {
              $match: {
                'id': warehouse
              }
            },
            {

              $lookup: {
                from: 'inventories',
                localField: 'warehouseInventory',
                foreignField: 'id',
                as: 'inventory'
              }
            },
            {
              $unwind: {
                path: '$inventory',
              }
            },
            {
              $project: {
                id: 1,
                title: 1,
                inventoryDetails: '$inventory.inventoryDetails',
              }
            },
            {
              $unwind: {
                path: '$inventoryDetails',
              }
            },
            {
              $group: {
                _id: null,
                warehouseInventory: {
                  $sum: "$inventoryDetails.quantity"
                }
              }
            }
          ]);
          if (warehouseInventoryCount && warehouseInventoryCount[0] && warehouseInventoryCount[0].warehouseInventory) {
            orgInventoryCount = orgInventoryCount + warehouseInventoryCount[0].warehouseInventory;
          }
        });
      }
      return apiResponse.successResponseWithData(
        res,
        { orgInventoryCount: orgInventoryCount }
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryCountsByOrganisation : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
//  return the total inventory of the specific warehouse
exports.getInventoryCountsByWarehouse = [
  auth,
  async (req, res) => {
    try {
      const warehouseId = req.query.warehouseId;
      const warehouseInventoryCount = await WarehouseModel.aggregate([
        {
          $match: {
            'id': warehouseId
          }
        }, {
          $lookup: {
            from: 'inventories',
            localField: 'warehouseInventory',
            foreignField: 'id',
            as: 'inventory'
          }
        }, {
          $unwind: {
            path: '$inventory',
          }
        }, {
          $project: {
            id: 1,
            title: 1,
            inventoryDetails: '$inventory.inventoryDetails',
          }
        }, {
          $unwind: {
            path: '$inventoryDetails',
          }
        }, {
          $group: {
            _id: null,
            warehouseInventory: {
              $sum: "$inventoryDetails.quantity"
            }
          }
        }
      ]);
      return apiResponse.successResponseWithData(
        res,
        warehouseInventoryCount
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryCountsByWarehouse : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },

];

async function getInventoryProductsByWarehouseID(warehouseId) {
  const inventoryProductsByWarehouse = await WarehouseModel.aggregate([
    {
      $match: {
        'id': warehouseId
      }
    },
    {
      $lookup: {
        from: 'inventories',
        localField: 'warehouseInventory',
        foreignField: 'id',
        as: 'inventory'
      }
    },
    {
      $unwind: {
        path: '$inventory',
      }
    },
    {
      $project: {
        id: 1,
        title: 1,
        inventoryDetails: '$inventory.inventoryDetails',
      }
    },
    {
      $unwind: {
        path: '$inventoryDetails',
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'inventoryDetails.productId',
        foreignField: 'id',
        as: 'productDetails'
      }
    },
    {
      $unwind: {
        path: '$productDetails'
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ['$productDetails', '$inventoryDetails', '$$ROOT']
        }
      }
    },
    {
      $project: {
        inventoryDetails: 0,
        productDetails: 0
      }
    },
    {
      $group: {
        _id: '$id',
        products: {
          $addToSet: "$$ROOT"
        }
      }
    }
  ]);
  return inventoryProductsByWarehouse;
};

// Total quantity as per the products for the warhouse
exports.getInventoryProductsByWarehouse = [
  auth,
  async (req, res) => {
    try {
      const warehouseId = req.query.warehouseId;
      const warehouseInventoryPerProduct = await getInventoryProductsByWarehouseID(warehouseId);
      return apiResponse.successResponseWithData(
        res,
        warehouseInventoryPerProduct
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryProductsByWarehouse : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

// total quantiy as per the products for the organisation
exports.getInventoryProductsByOrganisation = [
  auth,
  async (req, res) => {
    try {
      const organisationId = req.query.organisationId;
      const orgDocument = await OrganisationModel.findOne({ id: organisationId });
      let orgInventoryPerProduct = [];
      if (orgDocument.warehouses && orgDocument.warehouses.length) {
        await utility.asyncForEach(orgDocument.warehouses, async warehouse => {
          const _orgInventoryPerProduct = await getInventoryProductsByWarehouseID(warehouse);
          if (_orgInventoryPerProduct && _orgInventoryPerProduct.length) {
            orgInventoryPerProduct.push(_orgInventoryPerProduct[0]);
          }
        });
      }
      return apiResponse.successResponseWithData(
        res,
        orgInventoryPerProduct
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryProductsByWarehouse : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

// total quantity as per the products for the ecosystem
exports.getInventoryProductsByPlatform = [
  auth,
  async (req, res) => {
    try {
      const allProductsInPlatform = await InventoryModel.aggregate([
        {
          $unwind: {
            path: '$inventoryDetails'
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ['$productDetails', '$inventoryDetails', '$$ROOT']
            }
          }
        },
        {
          $project: {
            inventoryDetails: 0
          }
        },
        {
          $group: {
            _id: '$productId',
            quantity: {
              $sum: '$quantity'
            }
          }
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'id',
            as: 'productDetails'
          }
        },
        {
          $unwind: {
            path: '$productDetails'
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ['$productDetails', '$$ROOT']
            }
          }
        },
        {
          $project: {
            productDetails: 0
          }
        }
      ]);

      return apiResponse.successResponseWithData(
        res,
        allProductsInPlatform
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< InventoryService < InventoryController < getInventoryProductsByWarehouse : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
]