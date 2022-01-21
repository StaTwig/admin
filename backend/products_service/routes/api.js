const express = require("express");

const ProductsRouter = require("./productNames");
const OrganisationRouter = require("./OrganisationRouter");
const LocationRouter = require("./LocationRouter");

const app = express();

app.use("/products", ProductsRouter);
app.use("/organisation", OrganisationRouter);
app.use("/location", LocationRouter);

module.exports = app;
