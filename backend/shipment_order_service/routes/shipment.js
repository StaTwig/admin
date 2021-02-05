const express = require("express");
const multer = require("multer");
const ShipmentController = require("../controllers/ShipmentController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

const upload = multer({ storage: Storage });

const router = express.Router();

router.post("/createShipment", ShipmentController.createShipment);
router.get("/fetchShipments", ShipmentController.fetchShipments); // /fetchShipments?warehouseId=123
router.get("/viewShipment", ShipmentController.Shipment);

router.get("/fetchShipments/:po_id", ShipmentController.fetch_po_Shipments);
router.get("/fetchAllShipments", ShipmentController.fetchAllShipments);
router.post("/updateShipmentStatus", ShipmentController.updateStatus); // /updateShipmentStatus?id=123

module.exports = router;
