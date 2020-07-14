const ProductNamesModel = require('../models/ProductNamesModel');
const { body, validationResult } = require('express-validator');
//helper file to prepare responses.
const checkToken = require('../middlewares/middleware').checkToken;
const auth = require('../middlewares/jwt');

const apiResponse = require('../helpers/apiResponse');

const init = require('../logging/init');
const logger = init.getLog();

exports.getProductNames = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< ProductNamesService < ProductNamesController < getProductNames : token verifed successfully');
          const productNames = await ProductNamesModel.find({});
          res.json({ data: productNames });
        } else {
          logger.log('warn', '<<<<< ProductNamesService < ProductNamesController < getProductNames : user is not authenticated')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ProductNamesService < ProductNamesController < getProductNames : error (catch block)')
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
        logger.log('error', '<<<<< ProductNamesService < ProductNamesController < addProductName : Validation Error: product name must be specified')
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< ProductNamesService < ProductNamesController < addProductName : token verifed successfully');
          const product = new ProductNamesModel({
            productName: req.body.productName,
          });
          await product.save();
          apiResponse.successResponseWithData(res, 'Success');
        } else {
          logger.log('warn', '<<<<< ProductNamesService < ProductNamesController < addProductName : user is not authenticated')
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< ProductNamesService < ProductNamesController < addProductName : error (catch block)')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
