const express = require("express");
const ProductsRouter = require("./productNames")
const app = express();

app.use("/products",ProductsRouter);

module.exports = app;
