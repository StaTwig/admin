var express = require("express");
const AuthController = require("../controllers/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/resetPassword", AuthController.resetPassword);
router.get("/userInfo", AuthController.userInfo);

module.exports = router;