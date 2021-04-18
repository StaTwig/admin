var express = require("express");
var analyticsRouter = require("./analytics");

var app = express();

app.use("/analytics", analyticsRouter);

module.exports = app;