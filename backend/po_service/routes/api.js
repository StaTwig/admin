var express = require("express");
var poQueryRouter = require("./po")
var app = express();

app.use("/po",poQueryRouter);

module.exports = app;
