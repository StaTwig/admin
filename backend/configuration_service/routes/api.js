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
    addNewWarehouseType
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

module.exports = router;
