var express = require("express");
var router = express.Router();
const {
    getOrganizationsByType,
    updateOrganizationsByType, 
    addNewOrgType,
    addNewOrgTypeInstance,
    getWarehouseByType,
    updateWareHouseByType,
    addNewWarehouseTypeInstance,
    addNewWarehouseType,
    getOrgTypes,
    getWarehouseTypes

      } = require("../controllers/OrganisationTypeController");


router.get("/", function (req, res) {
    res.json({ status: "OK" });
  });
  
router.get("/getOrganizationsByType", getOrganizationsByType);
router.put("/updateOrganizationsByType", updateOrganizationsByType);
router.post("/addNewOrgType", addNewOrgType);
router.post("/addNewOrgTypeInstance", addNewOrgTypeInstance);
router.get("/getWarehouseByType", getWarehouseByType);
router.post("/updateWareHouseByType", updateWareHouseByType);
router.post("/addNewWarehouseTypeInstance", addNewWarehouseTypeInstance);
router.post("/addNewWarehouseType", addNewWarehouseType);

router.get("/getOrgTypes", getOrgTypes)
router.get("/getWarehouseTypes" , getWarehouseTypes)

module.exports = router;