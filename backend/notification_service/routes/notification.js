var express = require("express");
const NotificationController = require("../controllers/NotificationController");

var router = express.Router();

router.get("/getNotification", NotificationController.getNotification);

module.exports = router;
