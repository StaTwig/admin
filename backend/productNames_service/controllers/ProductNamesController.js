const ProductNamesModel = require('../models/ProductNamesModel');
const { body, validationResult } = require('express-validator');
//helper file to prepare responses.
const checkToken = require('../middlewares/middleware').checkToken;
const auth = require('../middlewares/jwt');

const apiResponse = require('../helpers/apiResponse');

exports.getProductNames = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          const productNames = await ProductNamesModel.find({});
          res.json({ data: productNames });
        } else {
          res.status(403).json(result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addProductName = [
  auth,
  body('productName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Product Name must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      checkToken(req, res, async result => {
        if (result.success) {
          const product = new ProductNamesModel({
            productName: req.body.productName,
          });
          await product.save();
          apiResponse.successResponseWithData(res, 'Success');
        } else {
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
