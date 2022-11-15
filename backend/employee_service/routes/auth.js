const express = require("express");
const AuthController = require("../controllers/AuthController");
const ApprovalController = require("../controllers/ApprovalController")
const OrganisationController = require("../controllers/OrganisationController")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/sendOtp", AuthController.sendOtp);
router.post("/verifyOtp", AuthController.verifyOtp);
router.get("/userInfo", AuthController.userInfo);
router.get("/getAllUsers", AuthController.getAllUsers);
router.get("/getOrgUsers", AuthController.getOrgUsers);
router.get("/getWarehouseUsers", AuthController.getWarehouseUsers);
router.get("/getOrgUserAnalytics", AuthController.getOrgUserAnalytics);

router.get("/getOrgActiveUsers", AuthController.getOrgActiveUsers);
router.get("/getUsers", AuthController.getUsers);
router.post("/updateProfile", AuthController.updateProfile);
router.post("/upload", upload.single("profile"), AuthController.uploadImage);
router.post(
    "/addUsersFromExcel",
    upload.single("excel"),
    ApprovalController.addUsersFromExcel
  );
  router.post(
    "/addOrgsFromExcel",
    upload.single("excel"),
    OrganisationController.addOrgsFromExcel
  );
module.exports = router;
