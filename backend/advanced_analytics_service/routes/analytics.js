var express = require("express");
const AnalyticsController = require("../controllers/AnalyticsController");

var router = express.Router();


// getAllBrands [ { brandId } ]
// getProductsById [ { sku , returnRate, productName, productDesc } ]
// getInventoryBySku/:sku/:state [ { state, totalBottlePool } ]
// getInventoryByBrand/:brand/:state/:skull:

router.get("/getAllStats", AnalyticsController.getAllStats);
router.get("/getStatsBySKU/:productId", AnalyticsController.getAllStats);
router.get("/getStatsByBrewery/:warehouseId", AnalyticsController.getAllStats);
//Implemented till here, below needs to be done
router.get("/getSales/:state/:tenure", AnalyticsController.getAllStats);
router.get("/getReturnedRate/:state/:tenure", AnalyticsController.getAllStats);
router.get("/getTarget/:state/:tenure", AnalyticsController.getAllStats);
router.get("/getInventoryBySku/:sku/:state", AnalyticsController.getAllStats);
router.get("/getInventoryByBrand/:brand/:state/", AnalyticsController.getAllStats);

/*
/getProductsById --> Get Product details --> Product Service

/getAllBrands [ { brandId } ] --> Product to brand mapping : TODO
*/


module.exports = router;