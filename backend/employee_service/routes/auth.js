var express = require("express");
const AuthController = require("../controllers/AuthController");
var multer = require("multer");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./uploads");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

var router = express.Router();

router.post("/check", AuthController.checkEmail);
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
router.get("/getAllRegisteredUsers", AuthController.getAllRegisteredUsers);
router.get("/getAllUsersByOrganisation/:organisationId", AuthController.getAllUsersByOrganisation);
router.get("/getAllUsersByWarehouse/:warehouseId", AuthController.getAllUsersByWarehouse);
router.post("/uploadImage",upload.single('photo'),AuthController.uploadImage);
router.get("/fetchImage",AuthController.fetchImage);

module.exports = router;
