var express = require("express");
const NotificationController = require("../controllers/NotificationController");

var router = express.Router();

router.get("/getNotifications", NotificationController.getNotifications);
router.post("/deleteNotification", NotificationController.deleteNotification);

module.exports = router;
