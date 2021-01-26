const express = require("express");
const OrganisationController = require("../controllers/OrganisationController");
const router = express.Router();

router.get("/getOrganisations", OrganisationController.getOrganisations);
router.get("/warehouses", OrganisationController.getWarehouses);
module.exports = router;
