var express = require("express");
const Tracker = require("../controllers/Tracker");

var router = express.Router();

router.get("/trackStats", Tracker.trackStats);
router.get("/fetchTransactions", Tracker.fetchTransactions);
// router.post("/verify-otp", Tracker.verifyConfirm);
// router.post("/resend-verify-otp", Tracker.resendConfirmOtp);
// router.post("/forgotPassword", Tracker.forgotPassword);
// router.post("/resetPassword", Tracker.resetPassword);
// router.get("/userInfo", Tracker.userInfo);

module.exports = router;