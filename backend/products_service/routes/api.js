const express = require("express");

const ProductsRouter = require("./productNames")
const OrganisationRouter = require("./OrganizationRouter")

const app = express();

app.use("/products",ProductsRouter);
app.use("/organisation",OrganisationRouter)

module.exports = app;
