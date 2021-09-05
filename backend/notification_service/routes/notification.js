var express = require("express");
const NotificationController = require("../controllers/NotificationController");

var router = express.Router();

router.get("/getNotifications", NotificationController.getNotifications);
router.post("/deleteNotification", NotificationController.deleteNotification);
router.post("/registerTwillio", NotificationController.createTwilioBinding);
router.post("/registerTwillio", NotificationController.createTwilioBinding);
router.post("/registerTwillio", NotificationController.createTwilioBinding);
router.get("/getAlertNotifications",NotificationController.getAlertNotifications)
router.get("/getTransactionNotifications",NotificationController.getTransactionNotifications)
module.exports = router;
