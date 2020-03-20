var express = require("express");
var AlertQueryRouter = require("./alert")
var app = express();

app.use("/alert",alertQueryRouter);

module.exports = app;
