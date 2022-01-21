const express = require("express");
const lastMileQueryRouter = require("./lastmile");
const app = express();

app.use("/", lastMileQueryRouter);

module.exports = app;
