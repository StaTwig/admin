const express = require("express");
const authRouter = require("./auth");
const userQueryRouter = require("./userQuery");
const demoRequestRouter = require("./demoRequest");
const app = express();

app.use("/auth/", authRouter);
app.use("/userQuery/", userQueryRouter);
app.use("/demoRequest/", demoRequestRouter);

module.exports = app;
