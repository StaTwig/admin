const express = require("express");
const authRouter = require("./auth");
const userQueryRouter = require("./userQuery");
const demoRequestRouter = require("./demoRequest");
const authController = require("../controllers/AuthController")
const { getPendingOrgs, getOrgs, updateOrg, getOrgAnalytics, addNewOrganisation } = require("../controllers/OrganisationController");
const {
    getApprovals,
    acceptApproval,
    rejectApproval,
    addUser
  } = require("../controllers/ApprovalController");
const app = express();

app.use("/auth/", authRouter);
app.use("/userQuery/", userQueryRouter);
app.use("/demoRequest/", demoRequestRouter);
app.get("/activateUser", authController.activateUser); // /activateUser?id=123
app.get("/deactivateUser", authController.deactivateUser); // /deactivateUser?id=123
app.get("/updateUserRole", authController.updateUserRole);

app.get("/getOrgs", getOrgs);
app.get("/getPendingOrgs", getPendingOrgs);
app.get("/getOrgAnalytics", getOrgAnalytics);
app.post("/addNewOrganisation", addNewOrganisation);
app.get("/getApprovals", authController.getApprovals);
app.get("/acceptApproval", authController.acceptApproval); // /approveApproval?id=123
app.get("/rejectApproval", authController.rejectApproval); // /rejectApproval?id=123
app.post("/addUser", authController.addUser);
app.get("/updateUserRole", authController.updateUserRole);
app.post("/updateOrg", authController.updateOrg);
app.get("/activateUser", authController.activateUser); // /activateUser?id=123
app.get("/deactivateUser", authController.deactivateUser); // /deactivateUser?id=123
app.get("/getImage/:key", authController.Image);
app.get("/getApprovals", getApprovals);
app.get("/acceptApproval", acceptApproval); // /approveApproval?id=123
app.get("/rejectApproval", rejectApproval); // /rejectApproval?id=123
app.post("/addUser", addUser);


module.exports = app;
