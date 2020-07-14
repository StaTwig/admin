const express = require("express");
const ProductNamesController = require("../controllers/ProductNamesController");

const router = express.Router();

router.get("/getProductNames", ProductNamesController.getProductNames);
router.post("/addProductName", ProductNamesController.addProductName);

module.exports = router;
