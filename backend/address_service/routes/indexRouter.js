const express = require("express");
const {
  addressOfOrg,
  addressesOfOrgWarehouses,
  updateAddressOrg,
  updateWarehouseAddress,
  AddWarehouse,
  AddOffice,
} = require("../controllers/AddressController");
const router = express.Router();

router.get("/fetchOrganisation", addressOfOrg); // -->/fetchOrganisations
router.get("/fetchWarehouses", addressesOfOrgWarehouses); // --> /fetchWarehouses
router.post("/updateOrganisation", updateAddressOrg); // --> /updateOrganisation
router.post("/updateWarehouse", updateWarehouseAddress); // --> /updateWarehouse?warehouseId=war-123
router.post("/addWarehouse", AddWarehouse); // --> /addWarehouse
router.post("/addOffice", AddOffice); // --> /addOffice

router.get("/", function (req, res) {
  res.json({ status: "OK" });
});

module.exports = router;
