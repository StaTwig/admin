const express = require("express");
const multer = require('multer');
const ShipmentOrderController = require("../controllers/ShipmentOrderController");

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

router.post("/createShipmentOrder", ShipmentOrderController.createShipmentOrder);
router.get("/fetchUserShipmentmentOrders", ShipmentOrderController.fetchUserShipmentOrders);

module.exports = router;

