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
router.get("/purchaseOrderStatistics", POController.purchaseOrderStatistics);
router.get("/fetchPublisherPurchaseOrders", POController.fetchPublisherPurchaseOrders);
router.get("/fetchPurchaseOrderBC", POController.fetchPurchaseOrder);
router.get("/fetchAllPurchaseOrdersBC",POController.fetchAllPurchaseOrdersBC);

router.post(
  '/addPOsFromExcel',
  upload.single('excel'),
  POController.addPOsFromExcel,
);

router.post("/createPurchaseOrder", POController.createPurchaseOrder);
router.post("/changePOStatus", POController.changePOStatus);

module.exports = router;

