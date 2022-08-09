const RecordModel = require("../models/RecordModel");
const AtomModel = require("../models/AtomModel");
const ShipmentModel = require("../models/ShipmentModel");
const InventoryModel = require("../models/InventoryModel");
const ProductModel = require("../models/ProductModel");
const POModel = require("../models/POModel");
const ShippingOrderModel = require("../models/ShippingOrderModel");
const WarehouseModel = require("../models/WarehouseModel");
const OrganisationModel = require("../models/OrganisationModel");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const { startOfMonth, format } = require("date-fns");
const { buildExcelReport, buildPdfReport } = require("../helpers/reports");

async function getDistributedProducts(matchQuery, warehouseId, fieldName) {
  const products = await WarehouseModel.aggregate([
    {
      $match: {
        id: warehouseId,
      },
    },
    {
      $lookup: {
        localField: "warehouseInventory",
        from: "inventories",
        foreignField: "id",
        as: "inventory",
      },
    },
    {
      $unwind: {
        path: "$inventory",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $replaceWith: {
        $mergeObjects: [null, "$inventory"],
      },
    },
    {
      $unwind: {
        path: "$inventoryDetails",
      },
    },
    {
      $group: {
        _id: "items",
        distItems: { $addToSet: "$inventoryDetails.productId" },
      },
    },
  ]);
  if (products.length > 0) {
    if (products[0].distItems.length > 0) {
      matchQuery[`${fieldName}`] = {
        $in: products[0].distItems,
      };
    }
  }
  return matchQuery;
}

exports.getAnalytics = [
  auth,
  async (req, res) => {
    try {
      const { id: warehouseId } = req.user;
      var overview = {};
      var inventory = {};
      var shipment = {};
      var data = {};

      var today = new Date();
      var lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      var lastMonth = new Date();
      lastMonth.setDate(today.getDate() - 30);
      var lastYear = new Date();
      lastYear.setDate(today.getDate() - 365);

      const totalShipmentsSentLastYear = await ShipmentModel.count({
        $and: [
          { "supplier.id": warehouseId },
          { status: { $in: ["SHIPPED", "RECEIVED", "LOST", "DAMAGED"] } },
          {
            shippingDate: {
              $lte: today.toISOString(),
              $gte: lastYear.toISOString(),
            },
          },
        ],
      });
      overview.totalShipmentsSentLastYear = totalShipmentsSentLastYear;

      const totalProductsAddedToInventory = await InventoryModel.count();
      overview.totalProductsAddedToInventory = totalProductsAddedToInventory;

      const totalShipmentsInTransitLastMonth = await ShipmentModel.count({
        $and: [
          { "supplier.id": warehouseId },
          { status: { $in: ["SHIPPED"] } },
          {
            shippingDate: {
              $lte: today.toISOString(),
              $gte: lastMonth.toISOString(),
            },
          },
        ],
      });
      overview.totalShipmentsInTransitLastMonth =
        totalShipmentsInTransitLastMonth;

      const totalShipmentsSentLastWeek = await ShipmentModel.count({
        $and: [
          { "supplier.id": warehouseId },
          { status: { $in: ["SHIPPED", "RECEIVED", "LOST", "DAMAGED"] } },
          {
            shippingDate: {
              $lte: today.toISOString(),
              $gte: lastWeek.toISOString(),
            },
          },
        ],
      });
      overview.totalShipmentsSentLastWeek = totalShipmentsSentLastWeek;

      const totalShipmentsWithDelayInTransit = await ShipmentModel.count({
        $and: [
          { status: { $in: ["SHIPPED"] } },
          { "supplier.id": warehouseId },
          { expectedDeliveryDate: { $lt: new Date().toISOString() } },
        ],
      });
      overview.totalShipmentsWithDelayInTransit =
        totalShipmentsWithDelayInTransit;

      const totalProductsInInventory = await InventoryModel.count();
      inventory.totalProductsInInventory = totalProductsInInventory;

      //  const totalProductsAddedToInventory = await InventoryModel.count();
      //  inventory.totalProductsAddedToInventory = totalProductsAddedToInventory;

      var nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const expiringToday = await AtomModel.count({
        "attributeSet.expDate": {
          $eq: today.toISOString(),
        },
      });
      inventory.expiringToday = expiringToday;

      const expiringThisWeek = await AtomModel.count({
        "attributeSet.expDate": {
          $gte: today.toISOString(),
          $lt: nextWeek.toISOString(),
        },
      });
      inventory.expiringThisWeek = expiringThisWeek;

      var nextMonth = new Date();
      nextMonth.setDate(today.getDate() + 30);

      const expiringThisMonth = await AtomModel.count({
        "attributeSet.expDate": {
          $gte: today.toISOString(),
          $lt: nextMonth.toISOString(),
        },
      });
      inventory.expiringThisMonth = expiringThisMonth;

      var nextYear = new Date();
      nextYear.setDate(today.getDate() + 365);

      const expiringThisYear = await AtomModel.count({
        "attributeSet.expDate": {
          $gte: today.toISOString(),
          $lt: nextYear.toISOString(),
        },
      });
      inventory.expiringThisYear = expiringThisYear;

      inventory.expiredToday = expiringToday;

      const expiredThisWeek = await AtomModel.count({
        "attributeSet.expDate": {
          $lt: today.toISOString(),
          $gte: lastWeek.toISOString(),
        },
      });
      inventory.expiredThisWeek = expiredThisWeek;

      const expiredThisMonth = await AtomModel.count({
        "attributeSet.expDate": {
          $lt: today.toISOString(),
          $gte: lastMonth.toISOString(),
        },
      });
      inventory.expiredThisMonth = expiredThisMonth;

      const expiredThisYear = await AtomModel.count({
        "attributeSet.expDate": {
          $lt: today.toISOString(),
          $gte: lastYear.toISOString(),
        },
      });
      inventory.expiredThisYear = expiredThisYear;

      const inboundShipments = await ShipmentModel.count({
        $and: [
          { "receiver.id": warehouseId },
          { status: { $in: ["SHIPPED"] } },
        ],
      });
      shipment.inboundShipments = inboundShipments;

      const outboundShipments = await ShipmentModel.count({
        $and: [
          { "supplier.id": warehouseId },
          { status: { $in: ["SHIPPED", "RECEIVED"] } },
        ],
      });
      shipment.outboundShipments = outboundShipments;

      const inboundAlerts = await ShipmentModel.count({
        $and: [
          { "receiver.id": warehouseId },
          { status: { $in: ["DAMAGED"] } },
        ],
      });
      shipment.inboundAlerts = inboundAlerts;

      const outboundAlerts = await ShipmentModel.count({
        $and: [
          { "supplier.id": warehouseId },
          { status: { $in: ["DAMAGED"] } },
        ],
      });
      shipment.outboundAlerts = outboundAlerts;

      data.overview = overview;
      data.inventory = inventory;
      data.shipment = shipment;

      const totalShipmentsSent = await ShipmentModel.count({
        $and: [
          { "supplier.id": warehouseId },
          { status: { $in: ["SHIPPED", "RECEIVED", "LOST", "DAMAGED"] } },
          {
            shippingDate: {
              $lte: today.toISOString(),
              $gte: lastYear.toISOString(),
            },
          },
        ],
      });
      data.totalShipmentsSent = totalShipmentsSent;

      // const totalShipmentsSentLastYear = await ShipmentModel.count(
      //   { $and : [
      //     {"supplier.id": warehouseId},
      //     { status: { $in : ["SHIPPED", "RECEIVED", "LOST", "DAMAGED"]} },
      //     { shippingDate :  {
      //         $lte: today.toISOString(),
      //         $gte: lastYear.toISOString()
      //       }
      //     }
      //   ]
      // }
      // );
      // data.totalShipmentsSentLastYear = totalShipmentsSentLastYear;

      // const totalShipmentsSentLastWeek = await ShipmentModel.count(
      //   { $and : [
      //     {"supplier.id": warehouseId},
      //     { status: { $in : ["SHIPPED", "RECEIVED", "LOST", "DAMAGED"]} },
      //     { shippingDate :  {
      //         $lte: today.toISOString(),
      //         $gte: lastWeek.toISOString()
      //       }
      //     }
      //   ]
      // }
      // );
      // data.totalShipmentsSentLastWeek = totalShipmentsSentLastWeek;

      const totalShipmentsReceived = await ShipmentModel.count({
        status: "RECEIVED",
      });

      data.totalShipmentsReceived = totalShipmentsReceived;

      const totalProductsSent = await ShipmentModel.aggregate([
        { $match: { status: "SHIPPED" } },
        {
          $group: {
            _id: "$status",
            total: { $sum: { $size: "$products" } },
          },
        },
      ]);
      data.totalProductsSent = totalProductsSent[0]?.total || 0;

      const totalProductsReceived = await ShipmentModel.aggregate([
        { $match: { status: "RECEIVED" } },
        {
          $group: {
            _id: "$status",
            total: { $sum: { $size: "$products" } },
          },
        },
      ]);
      data.totalProductsReceived = totalProductsReceived[0]?.total || 0;
      const productTypes = await InventoryModel.aggregate([
        { $match: { id: "inv-bh-1" } },
        {
          $group: {
            _id: "$id",
            total: { $sum: { $size: "$inventoryDetails" } },
          },
        },
      ]);
      const numProductTypes = productTypes[0]?.total || 0;
      data.numProductTypes = numProductTypes;
      const totalProductCount = await ProductModel.distinct("type");
      var stockOut = numProductTypes - totalProductCount.length;
      data.stockOut = stockOut;

      const expiredProducts = await AtomModel.count({
        "attributeSet.expDate": {
          $lt: today.toISOString(),
        },
      });
      data.expiredProducts = expiredProducts;

      const numPO = await POModel.count();
      const numSO = await ShippingOrderModel.count();
      var pendingOrders = numPO + numSO;
      data.pendingOrders = pendingOrders;

      const batchExpired = await AtomModel.aggregate([
        {
          $match: {
            "attributeSet.expDate": {
              $lt: today.toISOString(),
            },
          },
        },
        {
          $group: {
            _id: "$status",
            total: { $sum: { $size: "$batchNumbers" } },
          },
        },
      ]);
      data.batchExpired = batchExpired[0]?.total || 0;

      var nearExpirationTime = new Date();
      nearExpirationTime.setDate(today.getDate() + 90);

      const batchNearExpiration = await AtomModel.aggregate([
        {
          $match: {
            "attributeSet.expDate": {
              $gte: today.toISOString(),
              $lt: nearExpirationTime.toISOString(),
            },
          },
        },
        {
          $group: {
            _id: "$status",
            total: { $sum: { $size: "$batchNumbers" } },
          },
        },
      ]);
      data.batchNearExpiration = batchNearExpiration[0]?.total || 0;

      const inventorySupplier = await ShipmentModel.count({
        "supplier.id": warehouseId,
      });
      const orderReceiver = await ShipmentModel.count({
        "receiver.id": warehouseId,
      });
      var inventoryToOrderRatio = 0;
      if (orderReceiver !== 0) {
        inventoryToOrderRatio = inventorySupplier / orderReceiver;
      }
      data.inventoryToOrderRatio = inventoryToOrderRatio;
      var count = 0;
      let org = await OrganisationModel.find({ id: req.user.organisationId });
      totalmilliseconds = org.totalProcessingTime ? org.totalProcessingTime : 0;

      count = await POModel.aggregate([
        {
          $match: {
            poStatus: { $ne: "CREATED" },
            poStatus: { $ne: "ACCEPTED" },
          },
        },
        { $group: { _id: null, myCount: { $sum: 1 } } },
      ]).sort({
        createdAt: -1,
      });
      if (count.myCount > 0)
        totalmilliseconds = totalmilliseconds / count.myCount;

      var seconds = totalmilliseconds / 1000;
      var numdays = Math.floor(seconds / 86400);

      var numhours = Math.floor((seconds % 86400) / 3600);

      var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

      var numseconds = ((seconds % 86400) % 3600) % 60;
      var averageOrderProcessingTime =
        numdays + "days " + numhours + "hrs " + numminutes + "min";

      data.averageOrderProcessingTime = averageOrderProcessingTime;
      return apiResponse.successResponseWithData(res, "Analytics", data);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getOverviewAnalytics = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId, organisationId } = req.user;
      var overview = {};
      var data = {};

      var today = new Date();
      var lastMonth = new Date();
      lastMonth.setDate(today.getDate() - 30);
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      const outboundShipments = await ShipmentModel.count({
        $and: [
          { "supplier.locationId": warehouseId },
          // { status: { $in : [ "SHIPPED", "RECEIVED" ]} }
        ],
      });
      overview.outboundShipments = outboundShipments;

      const inboundShipments = await ShipmentModel.count({
        $and: [
          { "receiver.locationId": warehouseId },
          // { status: { $in : [ "SHIPPED" ]} }
        ],
      });
      overview.inboundShipments = inboundShipments;

      const totalProductCategory = await ProductModel.distinct("type");
      overview.totalProductCategory = totalProductCategory.length;

      const records = await RecordModel.find();
      const shipments = await ShipmentModel.find({
        createdAt: {
          $gte: today.toISOString(),
          $lte: lastMonth.toISOString(),
        },
      });

      var count = 0;
      var sum = 0;
      for (var i = 0; i < records.length; i++) {
        for (var j = 0; j < shipments.length; j++) {
          if (records[i].id === shipments[j].poId) {
            count++;
            var shipmentCreationTime = shipments[j].createdAt;
            var poCreationTime = records[i].createdAt;
            sum = sum + (shipmentCreationTime - poCreationTime);
          }
        }
      }
      var totalmilliseconds = 0;
      if (count !== 0) {
        totalmilliseconds = sum / count;
      }

      var seconds = totalmilliseconds / 1000;
      var numdays = Math.floor(seconds / 86400);

      var numhours = Math.floor((seconds % 86400) / 3600);

      var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

      var numseconds = ((seconds % 86400) % 3600) % 60;
      var averageOrderProcessingTime =
        numdays + "d " + numhours + "h " + numminutes + "m";

      overview.averageOrderProcessingTime = averageOrderProcessingTime;

      // const numPO = await POModel.count();
      // const numSO = await ShippingOrderModel.count();
      // var pendingOrders = numPO + numSO;
      const pendingOrders = await RecordModel.count({
        $and: [
          { "supplier.supplierOrganisation": organisationId },
          { createdAt: { $lte: lastWeek } },
          { poStatus: "CREATED" },
        ],
      });
      overview.pendingOrders = pendingOrders;

      data.overview = overview;

      return apiResponse.successResponseWithData(res, "Analytics", data);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getInventoryAnalytics = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.user;
      var inventory = {};
      var data = {};

      const totalProductCategory = await ProductModel.distinct("type");
      inventory.totalProductCategory = totalProductCategory.length;
      const warehouse = await WarehouseModel.findOne({ id: warehouseId });

      const stockOut = await InventoryModel.find(
        {
          id: warehouse.warehouseInventory,
          "inventoryDetails.quantity": { $lte: 0 },
        },
        "inventoryDetails"
      );

      inventory.stockOut = stockOut.length
        ? stockOut[0].inventoryDetails.filter((i) => i.quantity < 1).length
        : 0;

      var today = new Date();
      var nextMonth = new Date();
      nextMonth.setDate(today.getDate() + 30);

      const batchNearExpiration = await AtomModel.aggregate([
        {
          $match: {
            "attributeSet.expDate": {
              $gte: today.toISOString(),
              $lt: nextMonth.toISOString(),
            },
            currentInventory: warehouse.warehouseInventory,
            batchNumbers: { $ne: "" },
            "attributeSet.mfgDate": { $ne: "" },
          },
        },
        {
          $group: {
            _id: "$batchNumbers",
            total: { $sum: 1 },
          },
        },
      ]);

      const batchExpired = await AtomModel.aggregate([
        {
          $match: {
            "attributeSet.expDate": {
              $lt: today.toISOString(),
            },

            currentInventory: warehouse.warehouseInventory,
            batchNumbers: { $ne: "" },
            "attributeSet.mfgDate": { $ne: "" },
          },
        },
        {
          $group: {
            _id: "$batchNumbers",
            total: { $sum: 1 },
          },
        },
      ]);

      inventory.batchExpired = 0;
      if (batchExpired.length !== 0) {
        let sum = 0;
        for (let row of batchExpired) sum += parseInt(row.total);
        inventory.batchExpired = sum;
      }

      inventory.batchNearExpiration = 0;
      if (batchNearExpiration.length !== 0) {
        let sum = 0;
        for (let row of batchNearExpiration) sum += parseInt(row.total);
        inventory.batchNearExpiration = sum;
      }

      //   var nextMonth = new Date();
      //   nextMonth.setDate(today.getDate() + 30);

      //   const batchExpiringThisMonth = await AtomModel.aggregate(
      //     [ { $match: {
      //       "attributeSet.expDate" :  {
      //         $gte: today.toISOString(),
      //         $lt: nextMonth.toISOString()
      //         }
      //       }
      //     },
      //   {
      //     $group: {
      //       _id: "$status",
      //       total: {$sum: {$size: "$batchNumbers"}}
      //     }
      //   }]
      // );

      //   inventory.batchExpiringThisMonth = 0
      //   if(batchExpiringThisMonth.length !== 0){
      //     inventory.batchExpiringThisMonth = batchExpiringThisMonth[0].total;
      //   }

      //   var nextThreeMonths = new Date();
      //   nextThreeMonths.setDate(today.getDate() + 90 );

      //   const batchExpiringInThreeMonths = await AtomModel.aggregate(
      //     [ { $match: {
      //       "attributeSet.expDate" :  {
      //         $gte: today.toISOString(),
      //         $lt: nextThreeMonths.toISOString()
      //         }
      //       }
      //     },
      //   {
      //     $group: {
      //       _id: "$status",
      //       total: {$sum: {$size: "$batchNumbers"}}
      //     }
      //   }]
      // );
      //   inventory.batchExpiringInThreeMonths = 0
      //   if(batchExpiringInThreeMonths.length !== 0){
      //     inventory.batchExpiringInThreeMonths = batchExpiringInThreeMonths[0].total;
      //   }

      //   var nextSixMonths = new Date();
      //   nextSixMonths.setDate(today.getDate() + 180 );

      //   const batchExpiringInSixMonths = await AtomModel.aggregate(
      //     [ { $match: {
      //       "attributeSet.expDate" :  {
      //         $gte: today.toISOString(),
      //         $lt: nextSixMonths.toISOString()
      //         }
      //       }
      //     },
      //   {
      //     $group: {
      //       _id: "$status",
      //       total: {$sum: {$size: "$batchNumbers"}}
      //     }
      //   }]
      // );
      //   inventory.batchExpiringInSixMonths = 0
      //   if(batchExpiringInSixMonths.length !== 0){
      //     inventory.batchExpiringInSixMonths = batchExpiringInSixMonths[0].total;
      //   }

      //   const batchExpiredToday = await AtomModel.aggregate(
      //     [ { $match: {
      //         "attributeSet.expDate" :  {
      //           $eq: today.toISOString(),
      //           }
      //         }
      //       },
      //     {
      //       $group: {
      //         _id: "$status",
      //         total: {$sum: {$size: "$batchNumbers"}}
      //       }
      //     }]
      //   );
      //   inventory.batchExpiredToday = 0
      //   if(batchExpiredToday.length !== 0){
      //     inventory.batchExpiredToday = batchExpiredToday[0].total;
      //   }

      //   var lastWeek = new Date();
      //   lastWeek.setDate(today.getDate() - 7);

      //   const batchExpiredLastWeek = await AtomModel.aggregate(
      //     [ { $match: {
      //         "attributeSet.expDate" :  {
      //           $lte: today.toISOString(),
      //           $gte: lastWeek.toISOString()
      //           }
      //         }
      //       },
      //     {
      //       $group: {
      //         _id: "$status",
      //         total: {$sum: {$size: "$batchNumbers"}}
      //       }
      //     }]
      //   );
      //   inventory.batchExpiredLastWeek = 0
      //   if(batchExpiredLastWeek.length !== 0){
      //     inventory.batchExpiredLastWeek = batchExpiredLastWeek[0].total;
      //   }

      //   var lastMonth = new Date();
      //   lastMonth.setDate(today.getDate() - 30);

      //   const batchExpiredLastMonth = await AtomModel.aggregate(
      //     [ { $match: {
      //         "attributeSet.expDate" :  {
      //           $lte: today.toISOString(),
      //           $gte: lastMonth.toISOString()
      //           }
      //         }
      //       },
      //     {
      //       $group: {
      //         _id: "$status",
      //         total: {$sum: {$size: "$batchNumbers"}}
      //       }
      //     }]
      //   );
      //   inventory.batchExpiredLastMonth = 0
      //   if(batchExpiredLastMonth.length !== 0){
      //     inventory.batchExpiredLastMonth = batchExpiredLastMonth[0].total;
      //   }

      //   var lastYear = new Date();
      //   lastYear.setDate(today.getDate() -365 );

      //   const batchExpiredLastYear = await AtomModel.aggregate(
      //     [ { $match: {
      //         "attributeSet.expDate" :  {
      //           $lte: today.toISOString(),
      //           $gte: lastYear.toISOString()
      //           }
      //         }
      //       },
      //     {
      //       $group: {
      //         _id: "$status",
      //         total: {$sum: {$size: "$batchNumbers"}}
      //       }
      //     }]
      //   );
      //   inventory.batchExpiredLastYear = 0
      //   if(batchExpiredLastYear.length !== 0){
      //     inventory.batchExpiredLastYear = batchExpiredLastYear[0].total;
      //   }

      data.inventory = inventory;

      return apiResponse.successResponseWithData(res, "Analytics", data);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getShipmentAnalytics = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.user;
      var shipment = {};
      var data = {};

      const inboundShipments = await ShipmentModel.count({
        $and: [
          { "receiver.locationId": warehouseId },
          // { status: { $in : [ "SHIPPED" ]} }
        ],
      });
      shipment.inboundShipments = inboundShipments;

      const outboundShipments = await ShipmentModel.count({
        $and: [{ "supplier.locationId": warehouseId }],
      });
      shipment.outboundShipments = outboundShipments;

      const inboundAlerts = await ShipmentModel.count({
        $and: [
          { "receiver.locationId": warehouseId },
          {
            "shipmentAlerts.alertType": {
              $in: ["IOT", "DELAYED", "DAMAGED", "LOST"],
            },
          },
        ],
      });
      shipment.inboundAlerts = inboundAlerts;

      const outboundAlerts = await ShipmentModel.count({
        $and: [
          { "supplier.locationId": warehouseId },
          {
            "shipmentAlerts.alertType": {
              $in: ["IOT", "DELAYED", "DAMAGED", "LOST"],
            },
          },
        ],
      });
      shipment.outboundAlerts = outboundAlerts;

      data.shipment = shipment;

      return apiResponse.successResponseWithData(res, "Analytics", data);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getOrderAnalytics = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const order = {};
      const data = {};

      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      const inboundPO = await RecordModel.count({
        $and: [{ "supplier.supplierOrganisation": organisationId }],
      });
      order.inboundPO = inboundPO;

      const outboundPO = await RecordModel.count({
        $or: [
          { "customer.customerOrganisation": organisationId },
          { createdBy: req.user.id },
        ],
      });
      order.outboundPO = outboundPO;

      const pendingOrders = await RecordModel.count({
        $and: [
          { "supplier.supplierOrganisation": organisationId },
          { createdAt: { $lte: lastWeek } },
          { poStatus: "CREATED" },
        ],
      });
      order.pendingOrders = pendingOrders;

      const rejectedOrders = await RecordModel.count({
        $and: [
          { "supplier.supplierOrganisation": organisationId },
          { poStatus: "REJECTED" },
        ],
      });
      order.rejectedOrders = rejectedOrders;

      data.order = order;

      return apiResponse.successResponseWithData(res, "Analytics", data);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.bestSellers = [
  auth,
  async (req, res) => {
    try {
      const warehouse = req.query?.warehouseId || req.user.warehouseId;
      const date =
        req.query?.date || format(startOfMonth(new Date()), "yyyy-MM-dd");
      const organisation = await OrganisationModel.findOne({
        id: req.user.organisationId,
      });
      const reportType = req.query?.reportType || null;
      const isDist = organisation.type === "DISTRIBUTORS";
      let matchQuery = {};
      if (!isDist) {
        matchQuery[`manufacturerId`] = req.user.organisationId;
      } else {
        if (
          req.user.warehouseId &&
          req.user.warehouseId !== req.query.warehouseId
        ) {
          matchQuery = await getDistributedProducts(
            matchQuery,
            req.user.warehouseId,
            `_id`
          );
        }
      }

      const bestSellers = await WarehouseModel.aggregate([
        {
          $match: {
            id: warehouse,
          },
        },
        {
          $lookup: {
            localField: "warehouseInventory",
            from: "inventories",
            foreignField: "id",
            as: "inventory",
          },
        },
        {
          $unwind: {
            path: "$inventory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $replaceWith: {
            $mergeObjects: [null, "$inventory"],
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
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
        {
          $lookup: {
            from: "inventory_analytics",
            let: {
              arg1: "$inventoryDetails.productId",
              arg2: date,
              arg3: "$id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$productId", "$$arg1"],
                      },
                      {
                        $eq: ["$inventoryId", "$$arg3"],
                      },
                      {
                        $eq: ["$date", "$$arg2"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "inventory_analytics",
          },
        },
        {
          $unwind: {
            path: "$inventory_analytics",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$inventoryDetails.productId",
            productCategory: {
              $first: "$product.type",
            },
            productName: {
              $first: "$product.name",
            },
            unitofMeasure: {
              $first: "$product.unitofMeasure",
            },
            totalSales: {
              $first: "$inventoryDetails.totalSales",
            },
            manufacturer: {
              $first: "$product.manufacturer",
            },
            manufacturerId: {
              $first: "$product.manufacturerId",
            },
            productQuantity: {
              $sum: "$inventoryDetails.quantity",
            },
            inventoryAnalytics: {
              $first: "$inventory_analytics",
            },
            updatedAt: {
              $first: "$inventoryDetails.updatedAt",
            },
          },
        },
        {
          $match: {
            "inventoryAnalytics.sales": {
              $gt: 0,
            },
          },
        },
        {
          $match: matchQuery,
        },
        {
          $sort: {
            "inventoryAnalytics.sales": -1,
          },
        },
      ]);

      if (reportType) {
        const reportData = await getDataForReport("BESTSELLERS", bestSellers);
        if (reportType === "excel") {
          await buildExcelReport(
            res,
            reportData.header,
            reportData.excelData,
            "BESTSELLERS",
            date
          );
        } else {
          await buildPdfReport(res, reportData.pdfData, "BESTSELLERS", date);
        }
      } else {
        return apiResponse.successResponseWithData(res, "Best Sellers", {
          bestSellers,
          warehouseId: warehouse,
        });
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.bestSellerSummary = [
  auth,
  async function (req, res) {
    try {
      const limit = req.query.limit || 5;
      const warehouse = req.query.warehouseId || req.user.warehouseId;
      const organisation = await OrganisationModel.findOne({
        id: req.user.organisationId,
      });
      const isDist = organisation.type === "DISTRIBUTORS";
      const matchQuery = {};
      if (!isDist) {
        matchQuery[`manufacturerId`] = req.user.organisationId;
      }
      const bestSellers = await WarehouseModel.aggregate([
        {
          $match: {
            id: warehouse,
          },
        },
        {
          $lookup: {
            localField: "warehouseInventory",
            from: "inventories",
            foreignField: "id",
            as: "inventory",
          },
        },
        {
          $unwind: {
            path: "$inventory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $replaceWith: {
            $mergeObjects: [null, "$inventory"],
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
            as: "products",
          },
        },
        {
          $unwind: {
            path: "$products",
          },
        },
        {
          $group: {
            _id: "$inventoryDetails.productId",
            productCategory: {
              $first: "$products.type",
            },
            productName: {
              $first: "$products.name",
            },
            unitofMeasure: {
              $first: "$products.unitofMeasure",
            },
            manufacturer: {
              $first: "$products.manufacturer",
            },
            manufacturerId: {
              $first: "$products.manufacturerId",
            },
            productQuantity: {
              $sum: "$inventoryDetails.quantity",
            },
            totalSales: {
              $sum: "$inventoryDetails.totalSales",
            },
          },
        },
        {
          $match: {
            totalSales: {
              $gt: 0,
            },
          },
        },
        {
          $match: matchQuery,
        },
        {
          $sort: {
            totalSales: -1,
          },
        },
        {
          $limit: limit,
        },
      ]);
      return apiResponse.successResponseWithData(res, "Best Sellers Summary", {
        limit,
        warehouseId: warehouse,
        bestSellers,
      });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.inStockReport = [
  auth,
  async (req, res) => {
    try {
      const warehouse = req.query.warehouseId || req.user.warehouseId;
      const date = req.query.date
        ? format(startOfMonth(new Date(req.query.date)), "yyyy-MM-dd")
        : format(startOfMonth(new Date()), "yyyy-MM-dd");
      const reportType = req.query.reportType || null;
      const organisation = await OrganisationModel.findOne({
        id: req.user.organisationId,
      });
      const isDist = organisation.type === "DISTRIBUTORS";
      let matchQuery1 = {};
      let matchQuery2 = {};
      if (!isDist) {
        matchQuery2[`manufacturerId`] = req.user.organisationId;
      } else {
        if (
          req.user.warehouseId &&
          req.user.warehouseId !== req.query.warehouseId
        ) {
          matchQuery1 = await getDistributedProducts(
            matchQuery1,
            req.user.warehouseId,
            `inventoryDetails.productId`
          );
        }
      }
      const inStockReport = await WarehouseModel.aggregate([
        {
          $match: {
            id: warehouse,
          },
        },
        {
          $lookup: {
            localField: "warehouseInventory",
            from: "inventories",
            foreignField: "id",
            as: "inventory",
          },
        },
        {
          $unwind: {
            path: "$inventory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $replaceWith: {
            $mergeObjects: [null, "$inventory"],
          },
        },
        {
          $unwind: {
            path: "$inventoryDetails",
          },
        },
        {
          $match: matchQuery1,
        },
        {
          $match: {
            "inventoryDetails.quantity": {
              $gt: 0,
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "inventoryDetails.productId",
            foreignField: "id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
        {
          $lookup: {
            from: "inventory_analytics",
            let: {
              arg1: "$inventoryDetails.productId",
              arg2: date,
              arg3: "$id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$productId", "$$arg1"],
                      },
                      {
                        $eq: ["$inventoryId", "$$arg3"],
                      },
                      {
                        $eq: ["$date", "$$arg2"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "inventory_analytics",
          },
        },
        {
          $unwind: {
            path: "$inventory_analytics",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$inventoryDetails.productId",
            productCategory: {
              $first: "$product.type",
            },
            productName: {
              $first: "$product.name",
            },
            unitofMeasure: {
              $first: "$product.unitofMeasure",
            },
            manufacturer: {
              $first: "$product.manufacturer",
            },
            manufacturerId: {
              $first: "$product.manufacturerId",
            },
            productQuantity: {
              $sum: "$inventoryDetails.quantity",
            },
            totalSales: {
              $sum: "$inventoryDetails.totalSales",
            },
            inventoryAnalytics: {
              $first: "$inventory_analytics",
            },
            updatedAt: {
              $first: "$inventoryDetails.updatedAt",
            },
          },
        },
        {
          $match: matchQuery2,
        },
        {
          $sort: {
            productQuantity: -1,
          },
        },
      ]);
      if (reportType) {
        const reportData = await getDataForReport("INSTOCK", inStockReport);
        if (reportType === "excel") {
          await buildExcelReport(
            res,
            reportData.header,
            reportData.excelData,
            "INSTOCK",
            date
          );
        } else {
          await buildPdfReport(res, reportData.pdfData, "INSTOCK", date);
        }
      } else {
        return apiResponse.successResponseWithData(res, "In stock Report", {
          inStockReport,
          warehouseId: warehouse,
        });
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.outOfStockReport = [
  auth,
  async (req, res) => {
    try {
      const warehouse = req.query.warehouseId || req.user.warehouseId;
      const date =
        req.query.date || format(startOfMonth(new Date()), "yyyy-MM-dd");
      const reportType = req.query.reportType || null;
      const organisation = await OrganisationModel.findOne({
        id: req.user.organisationId,
      });
      const isDist = organisation.type === "DISTRIBUTORS";
      let matchQuery = {};
      let matchQuery1 = {};
      let matchQuery2 = {};
      if (!isDist) {
        matchQuery2[`manufacturerId`] = req.user.organisationId;
      } else {
        matchQuery[`totalSales`] = {
          $gt: 0,
        };
        if (
          req.user.warehouseId &&
          req.user.warehouseId !== req.query.warehouseId
        ) {
          matchQuery1 = await getDistributedProducts(
            matchQuery1,
            req.user.warehouseId,
            `inventoryDetails.productId`
          );
        }
      }
      const outOfStockReport = await WarehouseModel.aggregate([
        {
          $match: {
            id: warehouse,
          },
        },
        {
          $lookup: {
            localField: "warehouseInventory",
            from: "inventories",
            foreignField: "id",
            as: "inventory",
          },
        },
        {
          $unwind: {
            path: "$inventory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $replaceWith: {
            $mergeObjects: [null, "$inventory"],
          },
        },
        {
          $unwind: {
            path: "$inventoryDetails",
          },
        },
        {
          $match: matchQuery1,
        },
        {
          $match: {
            "inventoryDetails.quantity": 0,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "inventoryDetails.productId",
            foreignField: "id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
        {
          $lookup: {
            from: "inventory_analytics",
            let: {
              arg1: "$inventoryDetails.productId",
              arg2: date,
              arg3: "$id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$productId", "$$arg1"],
                      },
                      {
                        $eq: ["$inventoryId", "$$arg3"],
                      },
                      {
                        $eq: ["$date", "$$arg2"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "inventory_analytics",
          },
        },
        {
          $unwind: {
            path: "$inventory_analytics",
          },
        },
        {
          $group: {
            _id: "$inventoryDetails.productId",
            productCategory: {
              $first: "$product.type",
            },
            productName: {
              $first: "$product.name",
            },
            unitofMeasure: {
              $first: "$product.unitofMeasure",
            },
            manufacturer: {
              $first: "$product.manufacturer",
            },
            manufacturerId: {
              $first: "$product.manufacturerId",
            },
            productQuantity: {
              $sum: "$inventoryDetails.quantity",
            },
            totalSales: {
              $sum: "$inventoryDetails.totalSales",
            },
            inventoryAnalytics: {
              $first: "$inventory_analytics",
            },
            updatedAt: {
              $first: "$inventoryDetails.updatedAt",
            },
          },
        },
        {
          $match: matchQuery,
        },
        {
          $match: matchQuery2,
        },
        {
          $sort: {
            "inventoryAnalytics.outOfStockDays": -1,
          },
        },
      ]);
      if (reportType) {
        const reportData = await getDataForReport(
          "OUTOFSTOCK",
          outOfStockReport
        );
        if (reportType === "excel") {
          await buildExcelReport(
            res,
            reportData.header,
            reportData.excelData,
            "OU",
            date
          );
        } else {
          await buildPdfReport(res, reportData.pdfData, "OU", date);
        }
      } else {
        return apiResponse.successResponseWithData(res, "Out of stock Report", {
          outOfStockReport,
          warehouseId: warehouse,
        });
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

async function getDataForReport(reportType, data) {
  const rowsPDF = [];
  const rowsExcel = [];
  const head = [
    { text: "Product ID", bold: true, field: "_id" },
    { text: "Product Category", bold: true, field: "productCategory" },
    { text: "Product Name", bold: true, field: "productName" },
    { text: "Manufacturer", bold: true, field: "manufacturer" },
  ];
  if (reportType === "INSTOCK") {
    head.push({
      text: "Opening Balance",
      bold: true,
      field: "openingBalance",
    });
    head.push({
      text: "Current Inventory Balance",
      bold: true,
      field: "productQuantity",
    });
    head.push({ text: "Total Sales", bold: true, field: "totalSales" });
  } else if (reportType === "OUTOFSTOCK") {
    head.push({
      text: "Product out of Stock",
      bold: true,
      field: "outOfStockDays",
    });
  } else if (reportType === "BESTSELLERS") {
    head.push({
      text: "No. of Units Sold",
      bold: true,
      field: "sales",
    });
  }
  rowsPDF.push(head);
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    const row = [
      data[i]._id || "N/A",
      data[i].productCategory || "N/A",
      data[i].productName || "N/A",
      data[i].manufacturer || "N/A",
    ];
    const rowObj = {
      _id: data[i]._id || "N/A",
      productCategory: data[i].productCategory || "N/A",
      productName: data[i].productName || "N/A",
      manufacturer: data[i].manufacturer || "N/A",
    };

    if (reportType === "INSTOCK") {
      row.push(data[i].inventoryAnalytics?.openingBalance || 0);
      row.push(data[i].productQuantity || 0);
      row.push(data[i].totalSales || 0);

      rowObj["openingBalance"] =
        data[i].inventoryAnalytics?.openingBalance || 0;
      rowObj["productQuantity"] = data[i].productQuantity || 0;
      rowObj["totalSales"] = data[i].inventoryAnalytics?.totalSales || 0;
    } else if (reportType === "OUTOFSTOCK") {
      row.push(data[i].inventoryAnalytics?.outOfStockDays || "N/A");

      rowObj["outOfStockDays"] =
        data[i].inventoryAnalytics?.outOfStockDays || "N/A";
    } else if (reportType === "BESTSELLERS") {
      row.push(data[i].inventoryAnalytics?.sales || "N/A");

      rowObj["sales"] = data[i].inventoryAnalytics?.sales || "N/A";
    }
    rowsPDF.push(row);
    rowsExcel.push(rowObj);
  }
  return {
    header: head,
    pdfData: rowsPDF,
    excelData: rowsExcel,
  };
}
