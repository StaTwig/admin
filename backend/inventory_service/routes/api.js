var express = require("express");
var inventoryQueryRouter = require("./inventory")
var app = express();

app.use("/inventory",inventoryQueryRouter);

module.exports = app;
