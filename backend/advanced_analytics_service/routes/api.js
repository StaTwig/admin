var express = require("express");
var eventRouter = require("./analytics");

var app = express();

app.use("/anayltics", eventRouter);

module.exports = app;