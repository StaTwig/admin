var express = require("express");
const AuthController = require("../controllers/AuthController");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/sendOtp", AuthController.sendOtp);
router.post("/verifyOtp", AuthController.verifyOtp);
router.get("/userInfo", AuthController.userInfo);
router.get("/getAllUsers", AuthController.getAllUsers);
router.post("/updateProfile", AuthController.updateProfile);
router.post("/updatePassword", AuthController.updatePassword);
router.post("/upload", upload.single("profile"), AuthController.uploadImage);
router.get("/createAddress", AuthController.createUserAddress);
router.post("/assignProductConsumer", AuthController.assignProductConsumer);
router.post("/addWarehouse", AuthController.addWarehouse);
module.exports = router;
