const express = require("express");
const authRouter = require("./auth");
const userQueryRouter = require("./userQuery");
const app = express();

app.use("/auth/", authRouter);
app.use("/userQuery/", userQueryRouter);

module.exports = app;
