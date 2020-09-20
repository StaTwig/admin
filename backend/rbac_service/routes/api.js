const express = require("express");
const RbacRouter = require("./rbacTesting")
const app = express();

app.use("/rbac", RbacRouter);

module.exports = app;
