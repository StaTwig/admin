const express = require("express");
const {
  addressesOfOrg,
  addressesOfOrgWarehouses,updateAddressOrg,updateWarehouseAddress,AddWarehouse,AddOffice
} = require("../controllers/AddressController");
const router = express.Router();

router.get("/", function (req, res) {
  res.json({ status: "OK" });
});
router.get("/fetchOrganisations", addressesOfOrg); // -->/fetchOrganisations
router.get("/fetchWarehouses", addressesOfOrgWarehouses); // --> /fetchWarehouses
router.post("/updateOrganisation",updateAddressOrg) // --> /updateOrganisation
router.post("/updateWarehouse" , updateWarehouseAddress) // --> /updateWarehouse?warehouseId=war-123
router.post("/addWarehouse" ,AddWarehouse ) // --> /addWarehouse
router.post("/addOffice" ,AddOffice) // --> /addOffice
module.exports = router;
