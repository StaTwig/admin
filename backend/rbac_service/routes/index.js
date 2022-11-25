const express = require("express");
const RbacController = require("../controllers/RbacController");
const router = express.Router();

router.get("/", function(req, res) {
    res.status(200).json({status:"OK",message: "RBAC Service"});
});
router.get("/getPermissions", RbacController.getPermissions);
router.get("/getRoles", RbacController.getRoles);
router.get("/rbacCache", RbacController.rbacCache);
router.post("/updatePermissions", RbacController.updatePermissions);
router.get("/getRolesForTPL/:orgId", RbacController.getRolesForTPL);

module.exports = router;
