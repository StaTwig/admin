const express = require("express");
const multer = require("multer");
const {
  addressOfOrg,
  addressesOfOrgWarehouses,
  updateAddressOrg,
  updateWarehouseAddress,
  AddWarehouse,
  AddOffice,
  addAddressesFromExcel,
  getLocationApprovals,
  modifyLocation,
  getCountries,
  getStatesByCountry,
  getCitiesByState,
  fetchWarehousesByOrgId
} = require("../controllers/AddressController");
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

router.get("/fetchOrganisation", addressOfOrg); // -->/fetchOrganisations
router.get("/fetchWarehouses", addressesOfOrgWarehouses); // --> /fetchWarehouses
router.get("/fetchWarehousesByOrgId", fetchWarehousesByOrgId); // --> /fetchWarehouses
router.post("/updateOrganisation", updateAddressOrg); // --> /updateOrganisation
router.post("/updateWarehouse", updateWarehouseAddress); // --> /updateWarehouse?warehouseId=war-123
router.post("/addWarehouse", AddWarehouse); // --> /addWarehouse
router.post("/addOffice", AddOffice); // --> /addOffice
router.get("/getLocationApprovals", getLocationApprovals);
router.post("/modifyLocation", modifyLocation);
router.get("/getCountries", getCountries);
router.get("/getStatesByCountry", getStatesByCountry);
router.get("/getCitiesByState", getCitiesByState);
router.get("/", function (req, res) {
  res.json({ status: "OK" });
});

router.post(
  "/addAddressesFromExcel",
  upload.single("excel"),
  addAddressesFromExcel
);

module.exports = router;
