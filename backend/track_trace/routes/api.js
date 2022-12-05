const express = require("express");
const trackQueryRouter = require("./track.js");
const RequestRouter = require("./request.js");
const app = express();

app.use("/track", trackQueryRouter);
app.use("/request", RequestRouter);

module.exports = app;
