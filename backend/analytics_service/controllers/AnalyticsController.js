const RecordModel = require('../models/RecordModel');
const AtomModel = require('../models/AtomModel');
const ShipmentModel = require('../models/ShipmentModel');
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
      console.log("Now Date", Date.now());
      const now = Date.now();
      // const one_year = now.getFullYear() + 1;
      // const { warehouseId } = req.user;
      console.log("Here1");

      const totalProductsAdded = await AtomModel.count();
      console.log("Total Products Added", totalProductsAdded);
      console.log("Here2");

      var date = new Date(); 
      date.setDate(date.getDate() + 7); 
      console.log(date);

      const expiringThisWeek = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: date.setDate(date.getDate()), 
          $lt: date.setDate(date.getDate() + 7) 
        }
      });
      console.log("Products Expiring this Week : ", expiringThisWeek);

      const expiringThisMonth = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: date.setDate(date.getDate()), 
          $lt: date.setDate(date.getDate() + 30) 
        }
      });
      console.log("Products Expiring this Month : ", expiringThisMonth);

      const expiringThisYear = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: date.setDate(date.getDate()), 
          $lt: date.setDate(date.getDate() + 365) 
        }
      });
      console.log("Products Expiring this Year : ", expiringThisYear);

      const expiredThisWeek = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: date.setDate(date.getDate()), 
          $lt: date.setDate(date.getDate() - 7) 
        }
      });
      console.log("Products Expired this Week : ", expiredThisWeek);

      const expiredThisMonth = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: date.setDate(date.getDate()), 
          $lt: date.setDate(date.getDate() - 30) 
        }
      });
      console.log("Products Expired this Month : ", expiredThisMonth);

      const expiredThisYear = await AtomModel.count({
        "attributeSet.expDate" :  {
          $gte: date.setDate(date.getDate()), 
          $lt: date.setDate(date.getDate() - 365) 
        }
      });
      console.log("Products Expired this Year : ", expiredThisYear);

      const totalShipmentsSent = await ShipmentModel.count({
        status: "SHIPPED" | "RECEIVED" | "LOST" | "DAMAGED"
      });
      console.log("Total Shipments Sent", totalShipmentsSent);

      const totalShipmentsReceived = await ShipmentModel.count({
        status: "RECEIVED"
      });
      console.log("Total Shipments Received", totalShipmentsReceived);

      const totalProductsSent = await ShipmentModel.find(
        { status: "SHIPPED" },
      );
      console.log("Total Products Sent", totalProductsSent);

      const totalProductsReceived = await ShipmentModel.find(
        { status: "RECEIVED" },
      );
      console.log("Total Products Received", totalProductsReceived);

      const totalShipmentsInTransit = await ShipmentModel.find(
        { status: "RECEIVED" },
      );
      console.log("Total Products Received", totalShipmentsInTransit);

      const totalShipmentsWithDelayInTransit = await ShipmentModel.find(
        { status: "RECEIVED" },
      );
      console.log("Total Products Received", totalShipmentsWithDelayInTransit);

      const totalProductsInInventory = await ShipmentModel.find(
        { status: "RECEIVED" },
      );
      console.log("Total Products Received", totalProductsInInventory);

      const totalProductsAddedToInventory = await ShipmentModel.find(
        { status: "RECEIVED" },
      );
      console.log("Total Products Received", totalProductsAddedToInventory);

    res = "thisYearShipmentSent";
      return apiResponse.successResponseWithData(
        res,
        'Shipping Orders',
        totalProductsAdded,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< AnalyticsService < AnalyticsController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getInventoryAnalytics = [
  auth,
  async (req, res) => {
    try {
      console.log("Now Date", Date.now());
      const { warehouseId } = req.user;
      const thisYearShipmentSent = await ShipmentModel.find({
        created_at: {
          $gte: ISODate("2020-02-11T10:34:27.458+00:00"),
          $lt: ISODate("2021-02-12T10:34:27.458+00:00")
      }
    });
    console.log("This Year Shipment Count : ", Object.keys(thisYearShipmentSent).length);
      return apiResponse.successResponseWithData(
        res,
        'Shipping Orders',
        shippingOrders,
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

