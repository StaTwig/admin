const express = require("express");
const OrganisationController = require("../controllers/OrganizationController");
const router = express.Router();

router.get("/getOrganizations", OrganisationController.getOrganizations);
router.get("/warehouses", OrganisationController.getWarehouses);
module.exports = router;
