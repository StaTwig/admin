const express = require("express");
const AnalyticsController = require("../controllers/AnalyticsController");
const router = express.Router();

router.get("/bestSellers", AnalyticsController.bestSellers);
router.get(
  "/manufacturerInStockReport",
  AnalyticsController.manufacturerInStockReport
);
router.get(
  "/manufacturerOutStockReport",
  AnalyticsController.manufacturerOutStockReport
);
module.exports = router;
