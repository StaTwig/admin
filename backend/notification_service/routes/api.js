var express = require("express");
var notificationRouter = require("./notification");
var app = express();

app.use("/notification", notificationRouter);

module.exports = app;
