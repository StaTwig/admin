const express = require("express");
const { addressesOfOrg, addressesOfOrgWarehouses } = require("../controllers/AddressController");
const router = express.Router();

router.get("/", function(req, res) {
res.json({ status: "OK" });
});

router.get("/api/address/fetchOrganisations", addressesOfOrg) // /fetchOrganisations?orgId=123
router.get("/api/address/fetchWarehouses", addressesOfOrgWarehouses) // /fetchWarehouses?orgId=123

module.exports = router;
