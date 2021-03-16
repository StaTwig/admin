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

router.post("/createShipment", ShipmentController.createShipment); // /createShipment => POST data of Shipment
router.post("/receiveShipment", ShipmentController.receiveShipment); // /receiveShipment => Shipment ID
router.get("/fetchShipments", ShipmentController.fetchShipments); // /fetchShipments => Takes warehouseId from req.user header 
router.get("/viewShipment", ShipmentController.Shipment); // /viewShipment?ShipmentId=SH7TUC_VZIKD

router.get("/viewPoShipments", ShipmentController.fetch_po_Shipments); // /viewPoShipments?poId=po1234565
router.get("/fetchAllShipments", ShipmentController.fetchAllShipments); // /fetchAllShipments ==> Gives all shipments in the ledger
router.get("/fetchShipmentsByQRCode", ShipmentController.fetchShipmentsByQRCode); //Give all shipment details mapped to the QR label code
router.post("/updateShipmentStatus", ShipmentController.updateStatus); // /updateShipmentStatus?id=123

module.exports = router;
