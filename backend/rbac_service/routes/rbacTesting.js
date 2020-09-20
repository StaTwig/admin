const express = require("express");
const RbacController = require("../controllers/RbacController");

const router = express.Router();

router.get("/getPermissions", RbacController.getPermissions);
router.post("/addPermissions", RbacController.addPermissions);

module.exports = router;
