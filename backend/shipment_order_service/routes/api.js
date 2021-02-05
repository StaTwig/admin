var express = require("express");
var shipmentQueryRouter = require("./shipment");
var app = express();

app.use("/shipment", shipmentQueryRouter);

module.exports = app;
