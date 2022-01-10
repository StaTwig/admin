const express = require("express");
const multer = require("multer");

const InventoryController = require("../controllers/InventoryController");
const WarehouseController = require("../controllers/WarehouseController");
const RegionController = require("../controllers/RegionCountryController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

const upload = multer({ storage: Storage });

const router = express.Router();

router.get("/getTotalCount", InventoryController.getTotalCount);
router.get("/getTotalCountOnHold", InventoryController.getTotalCountOnHold);
router.get("/getExpiringInventory", InventoryController.getExpiringInventory);
router.get(
  "/getInventoryforProduct",
  InventoryController.getInventoryforProduct
);
router.get(
  "/getInventoryDetailsForProduct",
  InventoryController.getInventoryDetailsForProduct
);
router.get(
  "/getAllInventoryDetails",
  InventoryController.getAllInventoryDetails
);
router.get("/getInventoryDetails", InventoryController.getInventoryDetails);
router.get(
  "/getGroupedInventoryDetails",
  InventoryController.getGroupedInventoryDetails
);
router.get(
  "/getInventoryDetailsByBatchNumber",
  InventoryController.getInventoryDetailsByBatchNumber
);
router.get(
  "/getBatchDetailsByBatchNumber",
  InventoryController.getBatchDetailsByBatchNumber
);
router.get("/getProductListCounts", InventoryController.getProductListCounts);
router.get(
  "/getEmployeeDetailsByWarehouseId",
  InventoryController.getEmployeeDetailsByWarehouseId
);
router.get("/getInventory", InventoryController.getInventory);
router.get(
  "/getBatchNearExpiration",
  InventoryController.getBatchNearExpiration
);
router.get("/getBatchExpired", InventoryController.getBatchExpired);
router.get("/getBatchWarehouse", InventoryController.getBatchWarehouse);
router.get(
  "/getInventoryCountsPlatform",
  InventoryController.getInventoryCountsOfThePlatform
);
router.get(
  "/getInventoryCountsByOrganisation",
  InventoryController.getInventoryCountsByOrganisation
);
router.get(
  "/getInventoryCountsByWarehouse",
  InventoryController.getInventoryCountsByWarehouse
);
router.get(
  "/getInventoryProductsByWarehouse",
  InventoryController.getInventoryProductsByWarehouse
);
router.get(
  "/getInventoryProductsByOrganisation",
  InventoryController.getInventoryProductsByOrganisation
);
router.get(
  "/getInventoryProductsByPlatform",
  InventoryController.getInventoryProductsByPlatform
);
router.post(
  "/uploadSalesData",
  upload.single("excel"),
  InventoryController.uploadSalesData
);

router.get(
  "/getWarehouseDetailsByRegion",
  WarehouseController.getWarehouseDetailsByRegion
);
router.get(
  "/getWarehouseDetailsByCountry",
  WarehouseController.getWarehouseDetailsByCountry
);
router.get(
  "/getProductDetailsByWarehouseId",
  WarehouseController.getProductDetailsByWarehouseId
);
router.get(
  "/getOrganizationWarehouses",
  WarehouseController.getOrganizationWarehouses
);
router.get("/getWarehousesByCity", WarehouseController.getWarehousesByCity);

router.get("/getRegions", RegionController.getRegions);
router.get("/getAddresses", RegionController.getAddresses);
router.get("/getCountries", RegionController.getCountries);
router.get("/getOrganizations", RegionController.getOrganizations);
router.get(
  "/getCountryDetailsByRegion",
  RegionController.getCountryDetailsByRegion
);
router.get("/getAllStates", RegionController.getAllStates);
router.get("/getStatesByCountry", RegionController.getStatesByCountry);
router.get("/getCitiesByState", RegionController.getCitiesByState);
router.get("/getDistrictsByState", RegionController.getDistrictsByState);
router.get("/getVendorsByDistrict", RegionController.getVendorsByDistrict);
router.get("/getAllSKUs", RegionController.getAllSKUs);
router.get("/getOrganizationsByType", RegionController.getOrganizationsByType);
router.get(
  "/getOrganizationInfoByID",
  RegionController.getOrganizationInfoByID
);

router.post(
  "/addProductsToInventory",
  InventoryController.addProductsToInventory
);
router.post(
  "/deleteProductsFromInventory",
  InventoryController.deleteProductsFromInventory
);
router.post("/updateInventories", InventoryController.updateInventories);
router.post("/insertInventories", InventoryController.insertInventories);
router.get("/trackProduct", InventoryController.trackProduct);
router.get("/searchProduct", InventoryController.searchProduct);
router.get(
  "/getsearchsuggestions",
  InventoryController.autoCompleteSuggestions
);
router.get(
  "/fetchBatchesOfInventory",
  InventoryController.fetchBatchesOfInventory
);

router.post(
  "/addInventoriesFromExcel",
  upload.single("excel"),
  InventoryController.addInventoriesFromExcel
);

module.exports = router;
