var express = require("express");
var transactionQueryRouter = require("./transaction")
var app = express();

app.use("/transaction",transactionQueryRouter);

module.exports = app;
