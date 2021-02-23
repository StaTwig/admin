var express = require("express");
var authRouter = require("./auth");
const {getApprovals , acceptApproval , rejectApproval}  = require("../controllers/ApprovalController") 
var app = express();
app.use("/auth", authRouter);
app.get("/getApprovals", getApprovals);
app.get("/accpetApproval", acceptApproval); // /approveApproval?id=123
app.get("/rejecApproval", rejectApproval); // /rejectApproval?id=123
app.get("/" , (req,res)=> res.json({ status: "OK"}))
module.exports = app;
