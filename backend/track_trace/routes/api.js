var express = require("express");
var router = require("./track");

var app = express();

app.use("/track/", router);

module.exports = app;