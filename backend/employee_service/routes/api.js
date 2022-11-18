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
	updateUserRole,
} = require("../controllers/ApprovalController");
const {
	getPendingOrgs,
	getOrgs,
	getOrgDetails,
	updateOrg,
	getOrgAnalytics,
  addNewOrganisation,
  getWarehouseAndUsersById
} = require("../controllers/OrganisationController");
const { Image } = require("../controllers/AuthController");
const app = express();

app.use("/auth", authRouter);
app.get("/getOrgs", getOrgs);
app.get("/getOrgDetails", getOrgDetails);
app.get("/getPendingOrgs", getPendingOrgs);
app.get("/getOrgAnalytics", getOrgAnalytics);
app.post("/addNewOrganisation", addNewOrganisation);
app.get("/getWarehouseAndUsersById", getWarehouseAndUsersById);
app.get("/getApprovals", getApprovals);
app.get("/acceptApproval", acceptApproval); // /approveApproval?id=123
app.get("/rejectApproval", rejectApproval); // /rejectApproval?id=123
app.post("/addUser", addUser);
app.get("/updateUserRole", updateUserRole);
app.post("/updateOrg", updateOrg);
app.get("/activateUser", activateUser); // /activateUser?id=123
app.get("/deactivateUser", deactivateUser); // /deactivateUser?id=123
app.get("/getImage/:key", Image);

app.get("/images/:key", (req, res) => {
	const FileStream = getFileStream(req.params.key);
	FileStream.pipe(res);
});

app.get("/", (req, res) =>
	res.json({ status: "OK", message: "Employee Service - Admin API is running" }),
);

module.exports = app;
