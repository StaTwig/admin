const express = require("express");
const AnalyticsController = require("../controllers/AnalyticsController");
const router = express.Router();

router.get("/getAnalytics", AnalyticsController.getAnalytics);
router.get("/getOverviewAnalytics", AnalyticsController.getOverviewAnalytics);
router.get("/getInventoryAnalytics", AnalyticsController.getInventoryAnalytics);
router.get("/getShipmentAnalytics", AnalyticsController.getShipmentAnalytics);
router.get("/getOrderAnalytics", AnalyticsController.getOrderAnalytics);

module.exports = router;
