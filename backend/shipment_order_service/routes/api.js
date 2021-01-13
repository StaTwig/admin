var express = require("express");
var shipmentOrderQueryRouter = require("./shipmentorder")
var app = express();

app.use("/shipmentorder",shipmentOrderQueryRouter);

module.exports = app;
