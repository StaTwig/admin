var express = require("express");
const InventoryController = require("../controllers/InventoryController");

var router = express.Router();

router.get("/getTotalCount", InventoryController.getTotalCount);
router.get("/getTotalCountOnHold", InventoryController.getTotalCountOnHold);
router.get("/getExpiringInventory", InventoryController.getExpiringInventory);
router.get("/getInventoryforProduct", InventoryController.getInventoryforProduct);
router.get("/getInventoryDetailsForProduct", InventoryController.getInventoryDetailsForProduct);
router.get("/getAllInventoryDetails", InventoryController.getAllInventoryDetails);
router.post("/addNewInventory", InventoryController.addNewInventory);

module.exports = router;
