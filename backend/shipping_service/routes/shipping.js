var express = require("express");
const ShipmentController = require("../controllers/ShipmentController");

var router = express.Router();

router.get("/shipmentStatistics", ShipmentController.shipmentStatistics);
router.get("/purchaseOrderStatistics", ShipmentController.purchaseOrderStatistics);
router.get("/fetchShipments", ShipmentController.fetchShipments);
router.post("/createShipment", ShipmentController.createShipment);
router.get("/fetchPurchaseOrder", ShipmentController.fetchPurchaseOrder);
router.get("/fetchAllPurchaseOrders",ShipmentController.fetchAllPurchaseOrders);
router.get("/fetchPublisherLatestShipments",ShipmentController.fetchPublisherLatestShipments);
router.get("/fetchAllLatestShipments",ShipmentController.fetchAllLatestShipments);
router.post("/createPurchaseOrder", ShipmentController.createPurchaseOrder);
router.get("/reviewShipment", ShipmentController.reviewShipment);
router.get("/verifyShipment", ShipmentController.verifyShipment);
router.post("/modifyShipment", ShipmentController.modifyShipment);
router.get("/getManufacturers", ShipmentController.getManufacturers);
router.get("/getProducts", ShipmentController.getProducts);

module.exports = router;

