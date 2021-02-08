const express = require("express");
const ShippingOrderController = require("../controllers/ShippingOrderController");

const router = express.Router();

router.post("/createShippingOrder", ShippingOrderController.createShippingOrder);
router.get("/getShippingOrders", ShippingOrderController.getShippingOrders);
router.get("/viewShippingOrder", ShippingOrderController.viewShippingOrder);
router.get("/getShippingOrderIds", ShippingOrderController.getShippingOrderIds);

module.exports = router;

