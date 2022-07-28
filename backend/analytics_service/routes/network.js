const express = require("express");
const AnalyticsController = require("../controllers/AnalyticsController");
const router = express.Router();

router.get("/bestSellers", AnalyticsController.bestSellers);
router.get("/bestSellerSummary", AnalyticsController.bestSellerSummary);
router.get("/inStockReport", AnalyticsController.inStockReport);
router.get("/outOfStockReport", AnalyticsController.outOfStockReport);
module.exports = router;
