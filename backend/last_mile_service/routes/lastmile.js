const express = require("express");
const multer = require("multer");
const LastMileController = require("../controllers/LastMileController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./uploads");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

const router = express.Router();


module.exports = router;
