const express = require("express");
const shipmentQueryRouter = require("./shipment");
const app = express();

app.use("/shipment", shipmentQueryRouter);

module.exports = app;
