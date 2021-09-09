var express = require("express");
const NotificationController = require("../controllers/NotificationController");

var router = express.Router();


router.post("/registerTwillio", NotificationController.createTwilioBinding);
router.post("/sendOTP", NotificationController.sendOtp);
router.post("/sendMessage", NotificationController.sendMessage);
router.post("/pushNotification", NotificationController.pushNotifications);
router.get("/getAlertNotifications",NotificationController.getAlertNotifications)
router.get("/getTransactionNotifications",NotificationController.getTransactionNotifications)
module.exports = router;
