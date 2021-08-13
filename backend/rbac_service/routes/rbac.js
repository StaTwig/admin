const express = require("express");
const RbacController = require("../controllers/RbacController");

const router = express.Router();

router.get("/getPermissions", RbacController.getPermissions);
router.get("/getRoles", RbacController.getRoles);
router.post("/addPermissions", RbacController.addPermissions);
router.post("/updatePermissions", RbacController.updatePermissions);

module.exports = router;
