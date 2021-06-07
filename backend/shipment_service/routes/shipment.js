const express = require("express");
const multer = require("multer");
const ShipmentController = require("../controllers/ShipmentController");
var upload = multer({ dest: "uploads/" });
// const Storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, "/home/ubuntu/shipmentimages");
//   },
//   filename(req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage: Storage });

const router = express.Router();

router.post("/createShipment", ShipmentController.createShipment); // /createShipment => POST data of Shipment
router.post("/receiveShipment", ShipmentController.receiveShipment); // /receiveShipment => Shipment ID
router.get("/fetchShipments", ShipmentController.fetchShipments); // /fetchShipments => Takes warehouseId from req.user header
router.get("/fetchAllWarehouseShipments",ShipmentController.fetchAllWarehouseShipments) // fetchAllWarehouseShipments => fetch shipments from all warehouses
router.get("/viewShipment", ShipmentController.viewShipment); // /viewShipment?ShipmentId=SH7TUC_VZIKD

router.get("/viewPoShipments", ShipmentController.fetch_po_Shipments); // /viewPoShipments?poId=po1234565
router.get("/fetchAllShipments", ShipmentController.fetchAllShipments); // /fetchAllShipments ==> Gives all shipments in the ledger
router.post("/updateShipmentStatus", ShipmentController.updateStatus); // /updateShipmentStatus?id=123
router.get("/getProductsByInventory", ShipmentController.getProductsByInventory);

router.post("/UpdateTrackingStatus", ShipmentController.updateTrackingStatus); // /updateTrackingStatus
router.get("/chainOfCustody", ShipmentController.chainOfCustody);
router.get("/trackJourney", ShipmentController.trackJourney);

router.post("/uploadImage", upload.single('photo'), ShipmentController.uploadImage);
router.get("/fetchImage", ShipmentController.fetchImage);
router.get("/fetchShipmentIds", ShipmentController.fetchShipmentIds);

router.get("/abinbev/fetchShipments", ShipmentController.fetchShipmentsForAbInBev);

router.get("/fetchInboundShipments", ShipmentController.fetchInboundShipments); // /fetchInboundShipments => Takes warehouseId from req.user header and filter based on the query params {date,to,from,status}
router.get("/fetchOutboundShipments", ShipmentController.fetchOutboundShipments); // /fetchInboundShipments => Takes warehouseId from req.user header and filter based on the query params {date,to,from,status}
router.get("/fetchSupplierAndReceiverList", ShipmentController.fetchSupplierAndReceiverList);
module.exports = router;
