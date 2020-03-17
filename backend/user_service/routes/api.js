var express = require("express");
var authRouter = require("./auth");
var inventoryQueryRouter = require("./inventory")
var shippingQueryRouter = require("./shipping")
var app = express();

app.use("/auth/", authRouter);
app.use("/inventory",inventoryQueryRouter);
app.use("/shipping",shippingQueryRouter);

module.exports = app;
