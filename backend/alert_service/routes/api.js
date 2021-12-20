const express = require("express");
const alertQueryRouter = require("./alert");
const app = express();

app.use("/alert", alertQueryRouter);

module.exports = app;
