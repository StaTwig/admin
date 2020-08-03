const express = require("express");
const multer = require('multer');
//Define all the routes in the server running on multichain cluster
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}`);
  },
});

const upload = multer({ storage: Storage });
const ProductNamesController = require("../controllers/ProductNamesController");

const router = express.Router();

router.get("/getProductNames", ProductNamesController.getProductNames);
//router.post("/addProductName", ProductNamesController.addProductName);
router.post(
  '/addProductName',
  upload.single('photo'),
  ProductNamesController.addProductName,
);
module.exports = router;
