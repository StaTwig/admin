const express = require("express");
const multer = require('multer');
const POController = require("../controllers/POController");

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
router.get("/shipmentStatistics", POController.shipmentStatistics);
router.get("/purchaseOrderStatistics", POController.purchaseOrderStatistics);
router.get("/fetchPublisherPurchaseOrders", POController.fetchPublisherPurchaseOrders);
router.get("/fetchPOs", POController.fetchShipments);
router.post("/createShipment", POController.createShipment);
router.get("/fetchPurchaseOrder", POController.fetchPurchaseOrder);
router.get("/fetchAllPurchaseOrders",POController.fetchAllPurchaseOrders);
router.get("/fetchPublisherLatestShipments",POController.fetchPublisherLatestShipments);
router.get("/fetchAllLatestShipments",POController.fetchAllLatestShipments);
router.post("/createPurchaseOrder", POController.createPurchaseOrder);
router.post("/changePOStatus", POController.changePOStatus);
router.get("/reviewShipment", POController.reviewShipment);
router.get("/verifyShipment", POController.verifyShipment);
router.post("/modifyShipment", POController.modifyShipment);
router.get("/getManufacturers", POController.getManufacturers);
router.get("/getProducts", POController.getProducts);

router.get("/getAllShipmentColl", POController.getAllShipmentColl);
router.get("/getAllUserColl", POController.getAllUserColl);
router.get("/getAllOrgColl", POController.getAllOrgColl);
router.get("/getAllProductColl", POController.getAllProductColl);

router.get("/trackShipment", POController.trackShipment);
router.get("/fetchPOdetailsByShipmentID", POController.getPOdetailsByShipmentID);
router.get("/fetchProductdetailsByshipmentID", POController.getProductdetailsByshipmentID);
router.get("/fetchUserShipments", POController.fetchUserShipments);
router.post(
  '/addPOsFromExcel',
  upload.single('excel'),
  POController.addPOsFromExcel,
);
module.exports = router;

