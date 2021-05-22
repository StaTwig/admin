var express = require("express");
var router = express.Router();
const {
    getOrganizationsByType,
    updateOrganizationsByType, 
    addneworgtype,
    addneworgtypeinstance,
    getwarehouseByType,
    updatewareHouseByType,
    addnewwarehousetypeinstance,
    addnewwarehousetype

      } = require("../controllers/OrganisationTypeController");


router.get("/", function (req, res) {
    res.json({ status: "OK" });
  });
  
router.get("/getOrganizationsByType", getOrganizationsByType);
router.put("/updateOrganizationsByType", updateOrganizationsByType);
router.post("/addneworgtype", addneworgtype);
router.post("/addneworgtypeinstance", addneworgtypeinstance);

router.get("/getwarehouseByType", getwarehouseByType);
router.post("/updatewareHouseByType", updatewareHouseByType);
router.post("/addnewwarehousetypeinstance", addnewwarehousetypeinstance);
router.post("/addnewwarehousetype", addnewwarehousetype);



module.exports = router;
