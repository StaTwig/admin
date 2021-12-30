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
const app = express();

app.use("/auth", authRouter);
app.get("/getOrgs", getOrgs);
app.get("/getApprovals", getApprovals);
app.get("/acceptApproval", acceptApproval); // /approveApproval?id=123
app.get("/rejectApproval", rejectApproval); // /rejectApproval?id=123
app.post("/addUser", addUser);
app.post("/updateOrg", updateOrg);
app.get("/activateUser", activateUser); // /activateUser?id=123
app.get("/deactivateUser", deactivateUser); // /deactivateUser?id=123

app.get("/images/:key", (req, res) => {
  const FileStream = getFileStream(req.params.key);
  FileStream.pipe(res);
});

app.get("/", (req, res) =>
  res.json({ status: "OK", message: "Employee Service - Admin API is running" })
);

module.exports = app;
