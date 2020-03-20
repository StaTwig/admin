var express = require("express");
var LogRouter = require("./log")
var app = express();

app.use("/log",logRouter);

module.exports = app;
