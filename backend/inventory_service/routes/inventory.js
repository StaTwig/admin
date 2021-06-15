var express = require("express");
const multer = require('multer');

const InventoryController = require("../controllers/InventoryController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

const upload = multer({ storage: Storage });

var router = express.Router();

router.get("/getTotalCount", InventoryController.getTotalCount);
router.get("/getTotalCountOnHold", InventoryController.getTotalCountOnHold);
router.get("/getExpiringInventory", InventoryController.getExpiringInventory);
router.get("/getInventoryforProduct", InventoryController.getInventoryforProduct);
router.get("/getInventoryDetailsForProduct", InventoryController.getInventoryDetailsForProduct);
router.get("/getAllInventoryDetails", InventoryController.getAllInventoryDetails);
router.get("/getInventoryDetails", InventoryController.getInventoryDetails);
router.get("/getGroupedInventoryDetails", InventoryController.getGroupedInventoryDetails);
router.get("/getInventoryDetailsByBatchNumber", InventoryController.getInventoryDetailsByBatchNumber);
router.get("/getBatchDetailsByBatchNumber", InventoryController.getBatchDetailsByBatchNumber);
router.get("/getProductListCounts", InventoryController.getProductListCounts);
router.get("/getEmployeeDetailsByWarehouseId", InventoryController.getEmployeeDetailsByWarehouseId);
router.get("/getInventory", InventoryController.getInventory);
router.get("/getBatchNearExpiration", InventoryController.getBatchNearExpiration);
router.get("/getBatchExpired", InventoryController.getBatchExpired);
router.get("/getBatchWarehouse", InventoryController.getBatchWarehouse);

router.get("/getInventoryCountsPlatform", InventoryController.getInventoryCountsOfThePlatform);
router.get("/getInventoryCountsByOrganisation", InventoryController.getInventoryCountsByOrganisation);
router.get("/getInventoryCountsByWarehouse", InventoryController.getInventoryCountsByWarehouse);

router.get("/getInventoryProductsByWarehouse", InventoryController.getInventoryProductsByWarehouse);
router.get("/getInventoryProductsByOrganisation", InventoryController.getInventoryProductsByOrganisation);
router.get("/getInventoryProductsByPlatform", InventoryController.getInventoryProductsByPlatform);
router.post(
  '/uploadSalesData',
  upload.single('excel'),
  InventoryController.uploadSalesData,
);

router.get("/getWarehouseDetailsByRegion", InventoryController.getWarehouseDetailsByRegion);
router.get("/getWarehouseDetailsByCountry", InventoryController.getWarehouseDetailsByCountry);
router.get("/getProductDetailsByWarehouseId", InventoryController.getProductDetailsByWarehouseId);

router.get("/getRegions", InventoryController.getRegions);
router.get("/getCountryDetailsByRegion", InventoryController.getCountryDetailsByRegion);
router.get("/trackProduct", InventoryController.trackProduct);
router.post("/addProductsToInventory", InventoryController.addProductsToInventory);
router.post("/updateInventories", InventoryController.updateInventories);
router.post("/insertInventories", InventoryController.insertInventories);

router.get("/getAllStates", InventoryController.getAllStates);
router.get("/getDistrictsByState", InventoryController.getDistrictsByState);
router.get("/getVendorsByDistrict", InventoryController.getVendorsByDistrict);
router.get("/getAllSKUs", InventoryController.getAllSKUs);
router.get("/getOrganizationsByType", InventoryController.getOrganizationsByType);
router.get("/getOrganizationInfoByID", InventoryController.getOrganizationInfoByID);

router.get("/getStatesByCountry", InventoryController.getStatesByCountry);
router.get("/getCitiesByState", InventoryController.getCitiesByState);
router.get("/getWarehousesByCity", InventoryController.getWarehousesByCity);
router.get("/getCountries", InventoryController.getCountries);



router.post(
  '/addInventoriesFromExcel',
  upload.single('excel'),
  InventoryController.addInventoriesFromExcel,
);
module.exports = router;
