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
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.get("/getProducts", ProductController.getProducts);
router.get("/generateCodes", ProductController.generateCodes);
router.get("/productInfo", ProductController.getProductInfo);

//router.post("/addProduct", ProductController.addProduct);
router.post(
  '/addProduct',
  upload.single('photo'),
  ProductController.addProduct,
);
router.post(
  '/addMultipleProducts',
  upload.single('excel'),
  ProductController.addMultipleProducts,
);
module.exports = router;