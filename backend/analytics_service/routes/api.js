const express = require("express");
const authRouter = require("./analytics");
const app = express();

app.use("/analytics/", authRouter);

module.exports = app;
