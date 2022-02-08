const RecordModel = require("../models/RecordModel");
const AtomModel = require("../models/AtomModel");
const ShipmentModel = require("../models/ShipmentModel");
const InventoryModel = require("../models/InventoryModel");
const ProductModel = require("../models/ProductModel");
const POModel = require("../models/POModel");
const ShippingOrderModel = require("../models/ShippingOrderModel");
const WarehouseModel = require("../models/WarehouseModel");
//this helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");

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
            $and: [
              {
                "attributeSet.expDate": {
                  $gte: today.toISOString(),
                  $lt: nextMonth.toISOString(),
                },
              },
              {
                $expr: { $in: [warehouse.warehouseInventory, "$inventoryIds"] },
              },
              { batchNumbers: { $ne: "" } },
              { "attributeSet.mfgDate": { $ne: "" } },
              { "attributeSet.expDate": { $ne: "" } },
            ],
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
            $and: [
              {
                "attributeSet.expDate": {
                  $lt: today.toISOString(),
                },
              },
              {
                $expr: { $in: [warehouse.warehouseInventory, "$inventoryIds"] },
              },
              { batchNumbers: { $ne: "" } },
              { "attributeSet.mfgDate": { $ne: "" } },
              { "attributeSet.expDate": { $ne: "" } },
            ],
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
