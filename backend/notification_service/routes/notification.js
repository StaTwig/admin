const express = require("express");
const NotificationController = require("../controllers/NotificationController");
const router = express.Router();

router.post("/registerTwillio", NotificationController.createTwilioBinding);
router.post("/sendOTP", NotificationController.sendOtp);
router.post("/sendMessage", NotificationController.sendMessage);
router.post("/pushNotification", NotificationController.pushNotifications);
router.get("/getNotifications", NotificationController.getNotifications);
router.get("/readNotification", NotificationController.readNotification);

module.exports = router;
