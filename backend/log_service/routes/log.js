var express = require("express");
const LogController = require("../controllers/LogController");

var router = express.Router();

router.get("/getQueryLog", AlertController.getQueryLog);

module.exports = router;
