const express = require("express");
const multer = require('multer');
const ShipmentController = require("../controllers/ShipmentController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

const upload = multer({ storage: Storage });

const router = express.Router();

router.get("/shipmentStatistics", ShipmentController.shipmentStatistics);
router.get("/purchaseOrderStatistics", ShipmentController.purchaseOrderStatistics);
router.get("/fetchPublisherPurchaseOrders", ShipmentController.fetchPublisherPurchaseOrders);
router.get("/fetchShipments", ShipmentController.fetchShipments);
router.post("/createShipment", ShipmentController.createShipment);
router.get("/fetchPurchaseOrder", ShipmentController.fetchPurchaseOrder);
router.get("/fetchAllPurchaseOrders",ShipmentController.fetchAllPurchaseOrders);
router.get("/fetchPublisherLatestShipments",ShipmentController.fetchPublisherLatestShipments);
router.get("/fetchAllLatestShipments",ShipmentController.fetchAllLatestShipments);
router.post("/createPurchaseOrder", ShipmentController.createPurchaseOrder);
router.post("/changePOStatus", ShipmentController.changePOStatus);
router.get("/reviewShipment", ShipmentController.reviewShipment);
router.get("/verifyShipment", ShipmentController.verifyShipment);
router.post("/modifyShipment", ShipmentController.modifyShipment);
router.get("/getManufacturers", ShipmentController.getManufacturers);
router.get("/getProducts", ShipmentController.getProducts);

router.get("/getAllShipmentColl", ShipmentController.getAllShipmentColl);
router.get("/getAllUserColl", ShipmentController.getAllUserColl);
router.get("/getAllOrgColl", ShipmentController.getAllOrgColl);
router.get("/getAllProductColl", ShipmentController.getAllProductColl);

router.get("/trackShipment", ShipmentController.trackShipment);
router.get("/fetchPOdetailsByShipmentID", ShipmentController.getPOdetailsByShipmentID);
router.get("/fetchProductdetailsByshipmentID", ShipmentController.getProductdetailsByshipmentID);
router.get("/fetchUserShipments", ShipmentController.fetchUserShipments);
router.post(
  '/addPOsFromExcel',
  upload.single('excel'),
  ShipmentController.addPOsFromExcel,
);
module.exports = router;

