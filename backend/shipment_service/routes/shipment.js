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

router.post("/createShipment", ShipmentController.createShipment);
router.get("/fetchShipments/:id", ShipmentController.fetchShipments);
router.get("/shipment/:id", ShipmentController.Shipment); // Individual Shipment by _id

router.get("/fetchShipments/:po_id", ShipmentController.fetch_po_Shipments);
router.get("/fetchAllShipments", ShipmentController.fetchAllShipments);
//router.post("/updateShipmentStatus/:id", ShipmentController.updateStatus);

module.exports = router;

