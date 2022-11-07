const express = require("express");
const app = express();
const vaccinationRouter = require("./vaccination");
const lastMileQueryRouter = require("./lastmile");

app.use("/", lastMileQueryRouter);
app.use("/vaccination/", vaccinationRouter);

module.exports = app;
