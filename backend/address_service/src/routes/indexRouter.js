const express = require("express");
const { addressesOfOrg } = require("../controllers/AddressController");
const router = express.Router();

router.get("/", function(req, res) {
res.json({ status: "OK" });
});

router.get("/api/address/fetchAddresses", addressesOfOrg)

module.exports = router;
