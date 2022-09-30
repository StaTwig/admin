const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json({ status: "OK", message: "Employee Service" });
});

router.get("/favicon.ico", function (req, res) {
  res.status(200).send();
});

module.exports = router;
