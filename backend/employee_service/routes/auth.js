const express = require("express");
const AuthController = require("../controllers/AuthController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

/**
 * @openapi
 * /auth/sendOtp:
 *  post:
 *    description: Get an otp for a valid email/phone
 *    responses:
 *      200:
 *        description: Returns success on otp sent
 */
router.post("/sendOtp", AuthController.sendOtp);


/**
 * @openapi
 * /auth/verifyOtp:
 *  post:
 *    description: Verify an otp against an email/phone
 *    responses:
 *      200:
 *        description: Returns user token on successful verification
 */
router.post("/verifyOtp", AuthController.verifyOtp);

/**
 * @openapi
 * /auth/userInfo:
 *  get:
 *    description: Get user details
 *    responses:
 *      200:
 *        description: Returns user data
 */
router.get("/userInfo", AuthController.userInfo);

/**
 * @openapi
 * /auth/getAllUsers:
 *  get:
 *    description: Get list of all users
 *    responses:
 *      200:
 *        description: Returns a list of users
 */
router.get("/getAllUsers", AuthController.getAllUsers);

/**
 * @openapi
 * /auth/getOrgUsers:
 *  get:
 *    description: Get users belonging to a particular organisation
 *    responses:
 *      200:
 *        description: Returns list of users belonging to a particular organisation
 */
router.get("/getOrgUsers", AuthController.getOrgUsers);

/**
 * @openapi
 * /auth/getOrgActiveUsers:
 *  get:
 *    description: Get active users belonging to a particular organisation
 *    responses:
 *      200:
 *        description: Returns list of active users belonging to a particular organisation
 */
router.get("/getOrgActiveUsers", AuthController.getOrgActiveUsers);

/**
 * @openapi
 * /auth/getUsers:
 *  get:
 *    description: Get users belonging to a particular organisation
 *    responses:
 *      200:
 *        description: Returns list of users belonging to a particular organisation
 */
router.get("/getUsers", AuthController.getUsers);

/**
 * @openapi
 * /auth/updateProfile:
 *  post:
 *    description: Update details of a particular user
 *    responses:
 *      200:
 *        description: Returns success on update
 */
router.post("/updateProfile", AuthController.updateProfile);

/**
 * @openapi
 * /auth/upload:
 *  post:
 *    description: Upload image
 *    responses:
 *      200:
 *        description: Returns updated user data
 */
router.post("/upload", upload.single("profile"), AuthController.uploadImage);

module.exports = router;
