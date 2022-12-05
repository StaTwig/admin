const express = require("express");
const eventRouter = require("./events");

const app = express();

app.use("/event/", eventRouter);

module.exports = app;
