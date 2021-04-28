var express = require("express");
var lastMileQueryRouter = require("./lastmile");
var app = express();

app.use("/lastmile", lastMileQueryRouter);

module.exports = app;
