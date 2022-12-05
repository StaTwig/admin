const express = require("express");
const multer = require("multer");
const POController = require("../controllers/POController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./uploads");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

const upload = multer({ storage: Storage });

const router = express.Router();
router.get("/fetchPurchaseOrders", POController.fetchPurchaseOrders);
router.get(
  "/fetchPublisherPurchaseOrders",
  POController.fetchPublisherPurchaseOrders
);
router.get("/fetchPurchaseOrderBC", POController.fetchPurchaseOrderBC);
router.get("/fetchAllPurchaseOrdersBC", POController.fetchAllPurchaseOrdersBC);

router.post(
  "/addPOsFromExcel",
  upload.single("excel"),
  POController.addPOsFromExcel
);

router.post("/createPurchaseOrder", POController.createPurchaseOrder);
router.post("/changePOStatus", POController.changePOStatus);
router.post("/success", POController.success);
router.post("/createOrder", POController.createOrder);
router.get("/getOrderIds", POController.getOrderIds);
router.get("/getOpenOrderIds", POController.getOpenOrderIds);

router.get(
  "/fetchInboundPurchaseOrders",
  POController.fetchInboundPurchaseOrders
); // /fetchInboundPurchaseOrders => Takes organisationId from req.user header and filter based on the query params {date,productName,from}
router.get(
  "/fetchOutboundPurchaseOrders",
  POController.fetchOutboundPurchaseOrders
); // /fetchOutboundPurchaseOrders => Takes organisationId from req.user header and filter based on the query params (to, orderId, productName, deliveryLocation, date)
router.get(
  "/fetchProductIdsCustomerLocationsOrganisations",
  POController.fetchProductIdsCustomerLocationsOrganisations
);
router.get(
  "/exportInboundPurchaseOrders",
  POController.exportInboundPurchaseOrders
); // /fetchInboundPurchaseOrders => Takes organisationId from req.user header and filter based on the query params {date,productName,from}
router.get(
  "/exportOutboundPurchaseOrders",
  POController.exportOutboundPurchaseOrders
); // /fetchOutboundPurchaseOrders => Takes organisationId from req.user header and filter based on the query params (to, orderId, productName, deliveryLocation, date)

module.exports = router;
