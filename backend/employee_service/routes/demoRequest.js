const express = require("express");
const DemoRequestController = require("../controllers/DemoRequestController");

const router = express.Router();

router.post("/newDemoRequest", DemoRequestController.newDemoRequest);
router.post("/validateRequest", DemoRequestController.validateRequest);

module.exports = router;
