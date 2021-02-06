const express = require("express");
const SOController = require("../controllers/ShippingOrderController");

const router = express.Router();

router.post("/createShippingOrder", SOController.createShippingOrder);
router.post("/assignShippingOrder", SOController.assignShippingOrder);
router.post("/updateShippingOrder", SOController.updateShippingOrder);
router.post("/changeSOStatus", SOController.changeSOStatus);

module.exports = router;

