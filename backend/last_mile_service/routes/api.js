var express = require("express");
var lastMileQueryRouter = require("./lastmile");
var app = express();

app.use("/", lastMileQueryRouter);

module.exports = app;
