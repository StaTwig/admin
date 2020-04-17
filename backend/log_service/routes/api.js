var express = require("express");
var LogRouter = require("./log")
var app = express();

app.use("/log",LogRouter);

module.exports = app;
