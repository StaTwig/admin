const express = require("express");
const AuthController = require("../controllers/AuthController");
const cuid = require("cuid");
const multer = require("multer");

// const upload = multer({ dest: "uploads/" }); // for single file with same name as uploaded file
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, cuid() + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: Storage });

const router = express.Router();

router.post("/check", AuthController.checkEmail);
router.post("/register", AuthController.register);
router.post("/sendOtp", AuthController.sendOtp);
router.post("/verifyOtp", AuthController.verifyOtp);
router.get("/userInfo", AuthController.userInfo);
router.get("/getAllUsers", AuthController.getAllUsers);
router.post("/updateProfile", AuthController.updateProfile);
router.post("/upload", upload.single("profile"), AuthController.uploadImage);
router.get("/createAddress", AuthController.createUserAddress);
router.post("/assignProductConsumer", AuthController.assignProductConsumer);
router.post("/addWarehouse", AuthController.addWarehouse);
router.post("/pushWarehouse", AuthController.pushWarehouse);
router.post("/updateWarehouse", AuthController.updateWarehouseAddress);
router.post("/switchLocation", AuthController.switchLocation);
router.get("/getAllRegisteredUsers", AuthController.getAllRegisteredUsers);
router.get(
  "/getAllUsersByOrganisation/:organisationId",
  AuthController.getAllUsersByOrganisation
);
router.get(
  "/getAllUsersByWarehouse/:warehouseId",
  AuthController.getAllUsersByWarehouse
);
router.post("/uploadImage", upload.single("photo"), AuthController.uploadImage);
router.get("/fetchImage", AuthController.fetchImage);
router.get("/getUserWarehouses", AuthController.getUserWarehouses);
router.get(
  "/abinbev/getOrganizationsByType",
  AuthController.getOrganizationsByTypeForAbInBev
);
router.get("/getOrganizationsByType", AuthController.getOrganizationsByType);
router.get("/getwarehouseByType", AuthController.getwarehouseByType);
router.get("/getwarehouseinfo", AuthController.getwarehouseinfo);
router.get(
  "/getOrganizationsTypewithauth",
  AuthController.getOrganizationsTypewithauth
);
router.get("/emailverify", AuthController.emailverify);
router.post("/registerTwillio", AuthController.createTwilioBinding);
router.get("/images/:key", AuthController.Image);

module.exports = router;
