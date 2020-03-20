var express = require("express");
const AlertController = require("../controllers/AlertController");

var router = express.Router();

router.get("/getShipmentReceived", AlertController.getShipmentReceived);

module.exports = router;
