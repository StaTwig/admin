var express = require("express");
var authRouter = require("./auth");
const {
  getApprovals,
  acceptApproval,
  rejectApproval,
  addUser,
  activateUser,
  deactivateUser,
} = require("../controllers/ApprovalController");
var app = express();
app.use("/auth", authRouter);
app.get("/getApprovals", getApprovals);
app.get("/acceptApproval", acceptApproval); // /approveApproval?id=123
app.get("/rejectApproval", rejectApproval); // /rejectApproval?id=123
app.post("/addUser", addUser);
app.get("/activateUser", activateUser); // /activateUser?id=123
app.get("/deactivateUser", deactivateUser); // /deactivateUser?id=123
app.get("/", (req, res) => res.json({ status: "OK" }));
module.exports = app;
