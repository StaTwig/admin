var express = require("express");
var authRouter = require("./auth");
var app = express();
var cors = require('cors')
app.use(cors())
app.use("/auth/", authRouter);

module.exports = app;
