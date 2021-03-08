var express = require("express");
var authRouter = require("./auth");
var app = express();

app.use("/analytics/", authRouter);

module.exports = app;
