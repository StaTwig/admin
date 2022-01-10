const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res
    .status(200)
    .json({ status: "OK", message: "Inventory Service up and Running!" });
});

module.exports = router;
