const RecordModel = require('../models/RecordModel');
const AtomModel = require('../models/AtomModel');
const ShipmentModel = require('../models/ShipmentModel');
const InventoryModel = require('../models/InventoryModel');

const OrganisationModel = require('../models/OrganisationModel');
const WarehouseModel = require('../models/WarehouseModel');
//this helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
// const checkPermissions = require('../middlewares/rbac_middleware')
  // .checkPermissions;
const wrapper = require('../models/DBWrapper');
const uniqid = require('uniqid');

const init = require('../logging/init');
const logger = init.getLog();

exports.getAnalytics = [
  auth,
  async (req, res) => {
    try {

      var data = {}
      const totalProductsAdded = await AtomModel.count();
      data.totalProductsAdded = totalProductsAdded;

      var today = new Date(); 
      var nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7)

      const expiringThisWeek = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: today.toISOString(),
          $lt: nextWeek.toISOString() 
        }
      });
      data.expiringThisWeek  =expiringThisWeek;


      var nextMonth = new Date();
      nextMonth.setDate(today.getDate() + 30)

      const expiringThisMonth = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: today.toISOString(), 
          $lt: nextMonth.toISOString() 
        }
      });
      data.expiringThisMonth = expiringThisMonth;

      var nextYear = new Date();
      nextYear.setDate(today.getDate() + 365)

      const expiringThisYear = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: today.toISOString(),
          $lt: nextYear.toISOString() 
        }
      });
      data.expiringThisYear = expiringThisYear;

      var lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7)

      const expiredThisWeek = await AtomModel.count({
        "attributeSet.expDate" :  {
          $lt: today.toISOString(), 
          $gte: lastWeek.toISOString() 
        }
      });
      data.expiredThisWeek = expiredThisWeek;

      var lastMonth = new Date();
      lastMonth.setDate(today.getDate() - 30)

      const expiredThisMonth = await AtomModel.count({
        "attributeSet.expDate" :  {
          $lt: today.toISOString(), 
          $gte: lastMonth.toISOString()  
        }
      });
      data.expiredThisMonth = expiredThisMonth;

      var lastYear = new Date();
      lastYear.setDate(today.getDate() -365 )

      const expiredThisYear = await AtomModel.count({
        "attributeSet.expDate" :  {
          $lt: today.toISOString(), 
          $gte: lastYear.toISOString() 
        }
      });
      data.expiredThisYear = expiredThisYear;

      const totalShipmentsSent = await ShipmentModel.count({
        status: { $in : ["SHIPPED", "RECEIVED", "LOST", "DAMAGED"]} 
      });
      data.totalShipmentsSent = totalShipmentsSent;

      const totalShipmentsReceived = await ShipmentModel.count(
        { status: "RECEIVED" });
      
      data.totalShipmentsReceived = totalShipmentsReceived;

      const totalProductsSent = await ShipmentModel.aggregate(
        [{$match: {status: "SHIPPED"}}, 
        {
          $group: {
            _id: "$status", 
            total: {$sum: {$size: "$products"}}
          }
        }]
      );
      data.totalProductsSent = totalProductsSent.total;

      const totalProductsReceived = await ShipmentModel.aggregate(
        [{$match: {status: "RECEIVED"}}, 
        {
          $group: {
            _id: "$status", 
            total: {$sum: {$size: "$products"}}
          }
        }]
      );
      data.totalProductsReceived = totalProductsReceived.total;

      const totalShipmentsInTransit = await ShipmentModel.count(
        { status: "SHIPPED" },
      );
      data.totalShipmentsInTransit = totalShipmentsInTransit;

      const totalShipmentsWithDelayInTransit = await ShipmentModel.count(
       { $and: [
         {status: "SHIPPED"},
         {expectedDeliveryDate: {$lt: new Date().toISOString()}}
        ]
       });
      data.totalShipmentsWithDelayInTransit = totalShipmentsWithDelayInTransit;

      const totalProductsInInventory = await InventoryModel.count();
      data.totalProductsInInventory = totalProductsInInventory;

      const totalProductsAddedToInventory = await InventoryModel.count();
      data.totalProductsAddedToInventory = totalProductsAddedToInventory;

      console.log("Response", data);
      return apiResponse.successResponseWithData(
        res,
        'Analytics',
        data,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< AnalyticsService < AnalyticsController < fetchAllShippingOrders : error (catch block)',
      );
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

