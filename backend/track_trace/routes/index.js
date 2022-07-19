const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res
    .status(200)
    .json({ status: "OK", message: "Track Trace Service Running" });
});

module.exports = router;
