var express = require("express");
var eventRouter = require("./analytics");

var app = express();

app.use("/event/", eventRouter);

module.exports = app;