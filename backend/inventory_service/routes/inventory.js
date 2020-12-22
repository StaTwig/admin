var express = require("express");
const multer = require('multer');

const InventoryController = require("../controllers/InventoryController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

const upload = multer({ storage: Storage });

var router = express.Router();

router.get("/getTotalCount", InventoryController.getTotalCount);
router.get("/getTotalCountOnHold", InventoryController.getTotalCountOnHold);
router.get("/getExpiringInventory", InventoryController.getExpiringInventory);
router.get("/getInventoryforProduct", InventoryController.getInventoryforProduct);
router.get("/getInventoryDetailsForProduct", InventoryController.getInventoryDetailsForProduct);
router.get("/getAllInventoryDetails", InventoryController.getAllInventoryDetails);
router.get("/getGroupedInventoryDetails", InventoryController.getGroupedInventoryDetails);
router.get("/getInventoryDetailsByBatchNumber", InventoryController.getInventoryDetailsByBatchNumber);
router.get("/getBatchDetailsByBatchNumber",InventoryController.getBatchDetailsByBatchNumber);
router.get("/trackProduct", InventoryController.trackProduct);

router.post("/addNewInventory", InventoryController.addNewInventory);
router.post("/addMultipleInventories", InventoryController.addMultipleInventories);
router.post("/updateInventories", InventoryController.updateInventories);
router.post("/insertInventories", InventoryController.insertInventories);

router.post(
  '/addInventoriesFromExcel',
  upload.single('excel'),
  InventoryController.addInventoriesFromExcel,
);
module.exports = router;
