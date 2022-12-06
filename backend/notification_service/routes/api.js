const express = require("express");
const notificationRouter = require("./notification");
const app = express();
app.use("/notification", notificationRouter);
module.exports = app;
