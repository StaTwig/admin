const express = require("express");
const inventoryQueryRouter = require("./inventory");
const app = express();

app.use("/inventory", inventoryQueryRouter);

module.exports = app;
