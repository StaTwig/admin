const express = require("express");
const authRouter = require("./auth");
const { getFileStream } = require("../helpers/s3");
const {
  getApprovals,
  acceptApproval,
  rejectApproval,
  addUser,
  activateUser,
  deactivateUser,
} = require("../controllers/ApprovalController");
const { getOrgs, updateOrg } = require("../controllers/OrganisationController");
const { Image } = require("../controllers/AuthController");
const app = express();

app.use("/auth", authRouter);

/**
 * @openapi
 * /getOrgs:
 *  get:
 *    description: Get list of organisations
 *    responses:
 *      200:
 *        description: Returns an array of organisations for a given admin
 */
app.get("/getOrgs", getOrgs);

/**
 * @openapi
 * /getApprovals:
 *  get:
 *    description: Get list of users pending approval
 *    responses:
 *      200:
 *        description: Returns an array of employees pending approval
 */
app.get("/getApprovals", getApprovals);

/**
 * @openapi
 * /acceptApproval:
 *  get:
 *    description: Accept user and grant access to the platform
 *    responses:
 *      200:
 *        description: Accept user and grant access to the platform
 */
app.get("/acceptApproval", acceptApproval); // /approveApproval?id=123

/**
 * @openapi
 * /rejectApproval:
 *  get:
 *    description: Reject the user
 *    responses:
 *      200:
 *        description: Reject the user
 */
app.get("/rejectApproval", rejectApproval); // /rejectApproval?id=123

/**
 * @openapi
 * /addUser:
 *  post:
 *    description: Add a new user directly to the platform
 *    responses:
 *      200:
 *        description: Add a new user directly to the platform
 */
app.post("/addUser", addUser);

/**
 * @openapi
 * /updateOrg:
 *  post:
 *    description: Update Organisation details
 *    responses:
 *      200:
 *        description: Update Organisation details
 */
app.post("/updateOrg", updateOrg);

/**
 * @openapi
 * /activateUser:
 *  get:
 *    description: Grant user access to the system
 *    responses:
 *      200:
 *        description: Grant user access to the system
 */
app.get("/activateUser", activateUser); // /activateUser?id=123

/**
 * @openapi
 * /deactivateUser:
 *  get:
 *    description: Revoke user access to the system
 *    responses:
 *      200:
 *        description: Revoke user access to the system
 */
app.get("/deactivateUser", deactivateUser); // /deactivateUser?id=123

/**
 * @openapi
 * /getImage/:key:
 *  get:
 *    description: Get url for an image with :key
 *    responses:
 *      200:
 *        description: Get url for an iamge with :key
 */
app.get("/getImage/:key", Image);

app.get("/images/:key", (req, res) => {
  const FileStream = getFileStream(req.params.key);
  FileStream.pipe(res);
});

app.get("/", (req, res) =>
  res.json({ status: "OK", message: "Employee Service - Admin API is running" })
);

module.exports = app;
