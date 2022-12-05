const express = require("express");
const OrganisationController = require("../controllers/OrganisationController");
const router = express.Router();

router.get("/getOrganisations", OrganisationController.getOrganisations);
router.get("/getOrganisationsAtSignup", OrganisationController.getOrganisationsAtSignup);
router.get("/getUnregisteredOrganisations", OrganisationController.getUnregisteredOrganisations);
router.get("/warehouses", OrganisationController.getWarehouses);
router.get("/allWarehouses", OrganisationController.getAllWarehouses);
router.post("/saveOrganisations", OrganisationController.saveNewOrg);
router.post("/addWarehouseForTpl", OrganisationController.saveNewWarehouse);
router.post("/addNewOrgNWarehouse", OrganisationController.addNewOrgNWarehouse);
module.exports = router;
