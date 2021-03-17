const RecordModel = require('../models/RecordModel');
const AtomModel = require('../models/AtomModel');
const ShipmentModel = require('../models/ShipmentModel');
const InventoryModel = require('../models/InventoryModel');
const ProductModel = require('../models/ProductModel');
const POModel = require('../models/POModel');
const ShippingOrderModel = require('../models/ShippingOrderModel');

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

      const {id: warehouseId } = req.user;
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
      data.totalProductsSent = totalProductsSent[0].total;

      const totalProductsReceived = await ShipmentModel.aggregate(
        [{$match: {status: "RECEIVED"}}, 
        {
          $group: {
            _id: "$status", 
            total: {$sum: {$size: "$products"}}
          }
        }]
      );
      data.totalProductsReceived = totalProductsReceived[0].total;

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

      const productTypes = await InventoryModel.aggregate(
        [{$match: {id: 'inv-bh-1'}}, 
        {
          $group: {
            _id: "$id", 
            total: {$sum: {$size: "$inventoryDetails"}}
          }
        }]
      );
      const numProductTypes = productTypes[0].total;
      data.numProductTypes = numProductTypes;
      // console.log("Number of product types in Inventory ", numProductTypes);

      const numOutgoingShipments = await ShipmentModel.count(
        { $and : [
          {"supplier.id": warehouseId},
          { status: { $in : [ "SHIPPED", "RECEIVED" ]} }
        ]
      } );
      data.numOutgoingShipments = numOutgoingShipments;
      // console.log("Number of Outgoing shipments ", numOutgoingShipments);

      const numIncomingShipments = await ShipmentModel.count(
        { $and : [
          {"receiver.id": warehouseId},
          { status: { $in : [ "SHIPPED" ]} }
        ]
      } );
      data.numIncomingShipments = numIncomingShipments;
      // console.log("Number of Incoming shipments ", numIncomingShipments);

      const totalProductCount = await ProductModel.distinct('type');
      // console.log("Total Product Count = ", totalProductCount.length);
      var stockOut =  numProductTypes - totalProductCount.length;
      data.stockOut = stockOut;
      // console.log("Products with zero Inventory (stockOut) ", stockOut);

      const expiredProducts = await AtomModel.count({
        "attributeSet.expDate" :  {
          $lt: today.toISOString(), 
        }
      });
      // console.log("Expired Products ", expiredProducts);
      data.expiredProducts = expiredProducts;

      const numPO = await POModel.count();
      const numSO = await ShippingOrderModel.count();
      var pendingOrders = numPO + numSO;
      // console.log("Pending Orders ", pendingOrders);
      data.pendingOrders = pendingOrders;

      const batchExpired = await AtomModel.aggregate(
        [ { $match: { 
            "attributeSet.expDate" :  {
              $lt: today.toISOString(), 
              }
            }
          }, 
        {
          $group: {
            _id: "$status", 
            total: {$sum: {$size: "$batchNumbers"}}
          }
        }]
      );
      // console.log("Batches Expired ", batchExpired[0].total);
      data.batchExpired = batchExpired[0].total;

      var nearExpirationTime = new Date();
      nearExpirationTime.setDate(today.getDate() + 90)

      const batchNearExpiration = await AtomModel.aggregate(
        [ { $match: { 
          "attributeSet.expDate" :  {
            $gte: today.toISOString(), 
            $lt: nearExpirationTime.toISOString() 
            }
          }
        }, 
      {
        $group: {
          _id: "$status", 
          total: {$sum: {$size: "$batchNumbers"}}
        }
      }]
    );
      // console.log("Batches Near Expiration ", batchNearExpiration[0].total);
      data.batchNearExpiration = batchNearExpiration[0].total;

      const alertsInboundShipments = await ShipmentModel.count(
        { $and : [
          {"receiver.id": warehouseId},
          { status: { $in : [ "DAMAGED" ]} }
        ]
      } );
        // console.log("Number of Alerts Inbound shipments ", alertsInboundShipments);
        data.alertsInboundShipments = alertsInboundShipments;


      const alertsOutboundShipments = await ShipmentModel.count(
        { $and : [
          {"supplier.id": warehouseId},
          { status: { $in : [ "DAMAGED"]} }
        ]
      } );
        // console.log("Number of Alerts Outbound shipments ", alertsOutboundShipments);
        data.alertsOutboundShipments = alertsOutboundShipments;

        const inventorySupplier = await ShipmentModel.count(
          {"supplier.id": warehouseId});
        const orderReceiver = await ShipmentModel.count(
          {"receiver.id": warehouseId});
        var inventoryToOrderRatio = 0;
        if(orderReceiver !== 0){
          inventoryToOrderRatio = inventorySupplier/orderReceiver;
        }
        data.inventoryToOrderRatio = inventoryToOrderRatio;
  
        const records = await RecordModel.find();
        const shipments = await ShipmentModel.find();
  
        var count = 0;
        var sum = 0;
        console.log("Records : ", records.length);
        for(var i=0;  i<records.length; i++){
          for(var j=0; j<shipments.length; j++){
            if(records[i].id === shipments[j].poId){
              count++;
              var shipmentCreationTime = shipments[j].createdAt; 
              var poCreationTime = records[i].createdAt;
              console.log(shipmentCreationTime);
              sum = sum + ( shipmentCreationTime - poCreationTime)
            }
          }
        }
        var totalmilliseconds = 0;
        if(count !== 0){
          totalmilliseconds = sum/count;
        }
  
        var seconds = totalmilliseconds/1000;
        var numdays = Math.floor(seconds / 86400);
  
        var numhours = Math.floor((seconds % 86400) / 3600);
        
        var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
        
        var numseconds = ((seconds % 86400) % 3600) % 60;
        console.log(numdays + "days " + numhours + "hrs " + numminutes + "min " + numseconds + "sec")
        var averageOrderProcessingTime = numdays + "days " + numhours + "hrs " + numminutes + "min"
  
        data.averageOrderProcessingTime = averageOrderProcessingTime

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

