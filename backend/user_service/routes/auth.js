var express = require("express");
const AuthController = require("../controllers/AuthController");
const Tracker = require("../controllers/TrackController")
var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/resetPassword", AuthController.resetPassword);
router.get("/userInfo", AuthController.userInfo);
//Track & Trace Routes
router.get("/trackStats", Tracker.trackStats);
router.get("/fetchTransactions", Tracker.fetchTransactions);
router.get("/fetchShipmentDetails" , Tracker.fetchShipmentDetails);
router.get("/fetchLocation"  , Tracker.fetchLocation);
router.get("/fetchTemperature" , Tracker.fetchTemperature);
router.get("/fetchGoodsByID" , Tracker.fetchGoodsByID);
router.get("/fetchTracking" , Tracker.fetchTracking)


module.exports = router;