var express = require("express");
const AuthController = require("../controllers/AuthController");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/resetPassword", AuthController.resetPassword);
router.get("/userInfo", AuthController.userInfo);
router.get("/getAllUsers", AuthController.getAllUsers);
// router.get("/image", AuthController.fetchImage);
router.post("/updateProfile", AuthController.updateProfile);
router.post("/updatePassword", AuthController.updatePassword);
router.post("/upload", upload.single("profile"), AuthController.uploadImage);
router.get("/createAddress", AuthController.createUserAddress);

module.exports = router;
