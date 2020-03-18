var express = require("express");
var trackQueryRouter = require("./track.js")
var app = express();


app.use("/track", trackQueryRouter);

module.exports = app;
