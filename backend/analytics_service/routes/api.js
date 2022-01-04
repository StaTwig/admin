const express = require("express");
const authRouter = require("./auth");
const app = express();

app.use("/analytics/", authRouter);

module.exports = app;
