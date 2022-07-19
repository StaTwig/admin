const express = require("express");
const analyticsRouter = require("./analytics");
const networkRouter = require("./network");
const app = express();

app.use("/analytics/", analyticsRouter);
app.use("/network/", networkRouter);

module.exports = app;
