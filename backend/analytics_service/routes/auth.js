var express = require("express");
const AnalyticsController = require("../controllers/AnalyticsController");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var router = express.Router();

router.get("/getAnalytics", AnalyticsController.getAnalytics);
// router.get("/getOverviewAnalytics", AnalyticsController.getOverviewAnalytics);
// router.get("/getInventoryAnalytics", AnalyticsController.getInventoryAnalytics);
// router.get("/getShipmentAnalytics", AnalyticsController.getShipmentAnalytics);

module.exports = router;