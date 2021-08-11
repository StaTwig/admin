const express = require("express");
const RbacRouter = require("./rbac")
const app = express();

app.use("/rbac", RbacRouter);

module.exports = app;
