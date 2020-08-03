const ProductNamesModel = require('../models/ProductNamesModel');
const { body, validationResult } = require('express-validator');
//helper file to prepare responses.
const checkToken = require('../middlewares/middleware').checkToken;
const auth = require('../middlewares/jwt');

const apiResponse = require('../helpers/apiResponse');

const init = require('../logging/init');
const logger = init.getLog();
const multer = require('multer');
const moveFile = require('move-file');
const fs = require('fs');

//Define all the routes in the server running on multichain cluster
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, '../images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
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
  body('manufacturer')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Manufacturer Name must be specified.'),
  body('productCategory')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Product Category must be specified.'),
  body('productSubCategory')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Product Sub Category must be specified.'),
  body('storageConditions')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Storage Conditions must be specified.'),
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
        //  ProductNamesModel.reIndex();

         /* ProductNamesModel.collection.dropIndexes(function(){
            ProductNamesModel.collection.reIndex(function(finished){
              console.log("finished re indexing")
            })
          })*/
         try {
           console.log('file', req.file)
           console.log('body', req.body);
           const dir = `uploads`;
           if (!fs.existsSync(dir)){
             fs.mkdirSync(dir);
           }

           await moveFile(req.file.path, `${dir}/${req.body.productName}.png`);
           const product = new ProductNamesModel({
             productName: req.body.productName,
             manufacturer: req.body.manufacturer,
             productCategory: req.body.productCategory,
             productSubCategory: req.body.productSubCategory,
             storageConditions: req.body.storageConditions,
             description: req.body.description,
             image: `http://${req.headers.host}/images/${req.body.productName}.png`
           });
           await product.save();

           return apiResponse.successResponseWithData(res, 'Success', product);
         }catch(e){
           return apiResponse.ErrorResponse(res, e);
         }

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

exports.uploadImage = async function(req, res) {
  checkToken(req, res, async result => {
    if(result.success) {
      const { data } = result;
      const { username } = data;
      try {
        console.log('file', req.files)
        console.log('body', req.body);
        const { index } = req.body;
          let dir = `uploads/${username}/child${index}`;
          if (!fs.existsSync(dir)){
            fs.mkdir(dir, {recursive: true}, err => {});

          }

          await moveFile(req.files[0].path, `${dir}/photo.png`);
          console.log('The file has been moved');
          res.json('Success');

      }catch(e) {
        console.log('error in image upload', e);
        res.status(403).json(e);
      }
    }else {
      res.json(result);
    }

  });

};