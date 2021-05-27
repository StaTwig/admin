var express = require("express");
var alertQueryRouter = require("./alert")
var app = express();

app.use("/alert",alertQueryRouter);

module.exports = app;
