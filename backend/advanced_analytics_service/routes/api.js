var express = require("express");
var eventRouter = require("./analytics");

var app = express();

app.use("/analytics", eventRouter);

module.exports = app;