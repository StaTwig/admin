var express = require("express");
var authRouter = require("./auth");

var app = express();

app.use("/auth/", authRouter);

module.exports = app;