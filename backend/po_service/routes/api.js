var express = require("express");
var shippingQueryRouter = require("./po")
var app = express();

app.use("/po",shippingQueryRouter);

module.exports = app;
