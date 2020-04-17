var express = require("express");
const LogController = require("../controllers/LogController");

var router = express.Router();

router.get("/getQueryLog", LogController.getQueryLog);

module.exports = router;
