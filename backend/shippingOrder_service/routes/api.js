var express = require("express");
var shippingQueryRouter = require("./shipping")
var app = express();

app.use("/shipping",shippingQueryRouter);

module.exports = app;
