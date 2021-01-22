const express = require("express");
const OrganizationModel = require("../models/OrganizationModel");
const ProductsRouter = require("./productNames")
const OrganizationRouter = require("./OrganizationRouter")

const app = express();

app.use("/products",ProductsRouter);
app.use("/organization",OrganizationRouter)

module.exports = app;
