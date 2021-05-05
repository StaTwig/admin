var express = require("express");
var router = express.Router();
const {
    getOrganizationsByType,
    updateOrganizationsByType, 
      } = require("../controllers/OrganisationTypeController");


router.get("/", function (req, res) {
    res.json({ status: "OK" });
  });
  
router.get("/getOrganizationsByType", getOrganizationsByType);
//router.post("/updateOrganizationsByType", updateOrganizationsByType);


module.exports = router;
