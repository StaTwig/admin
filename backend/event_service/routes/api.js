var express = require("express");
var eventRouter = require("./events");

var app = express();

app.use("/event/", eventRouter);

module.exports = app;