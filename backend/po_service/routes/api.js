const express = require("express");
const poQueryRouter = require("./po");
const app = express();

app.use("/po", poQueryRouter);

module.exports = app;
