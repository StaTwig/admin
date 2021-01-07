const ProductNamesModel = require('../models/ProductNamesModel');
const { body, validationResult } = require('express-validator');
const checkPermissions = require('../middlewares/rbac_middleware')
  .checkPermissions;
const multer = require('multer');
const moveFile = require('move-file');
const fs = require('fs');
const QRCode = require('qrcode');
const uniqid = require('uniqid');
const symbology = require('symbology');
const array = require('lodash/array');

// Define font files
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts); //helper file to prepare responses.
const checkToken = require('../middlewares/middleware').checkToken;
const auth = require('../middlewares/jwt');

const apiResponse = require('../helpers/apiResponse');

const init = require('../logging/init');
const logger = init.getLog();

const utility = require('../helpers/utility');

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
          logger.log(
            'info',
            '<<<<< ProductNamesService < ProductNamesController < getProductNames : token verifed successfully',
          );

          permission_request = {
            result: result,
            permissionRequired: 'viewProductList',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const productNames = await ProductNamesModel.find({});
              res.json({ data: productNames });
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ProductNamesService < ProductNamesController < getProductNames : user is not authenticated',
          );
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ProductNamesService < ProductNamesController < getProductNames : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addMultipleProducts = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          permission_request = {
            result: result,
            permissionRequired: 'addNewProduct',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              const dir = `uploads`;
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
              }
              await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
              const obj = xlsx.parse(`${dir}/${req.file.originalname}`); // parses a file
              const data = obj[0].data;
              const products = data
                .map(element => {
                  return {
                    productName: element[0],
                    productCategory: element[1],
                    productSubCategory: element[2],
                    manufacturer: element[3],
                    storageConditions: element[4],
                    description: element[5],
                  };
                })
                .filter((product, index) => index > 0);
              let err = '';
              await utility.asyncForEach(products, async product => {
                if (err) return;
                const productDetail = new ProductNamesModel({
                  productName: product.productName,
                  manufacturer: product.manufacturer,
                  productCategory: product.productCategory,
                  productSubCategory: product.productSubCategory,
                  storageConditions: product.storageConditions,
                  description: product.description,
                });
                try {
                  await productDetail.save();
                } catch (e) {
                  err = product.productName;
                }
              });
              if (err) {
                return apiResponse.ErrorResponse(
                  res,
                  `Duplicate product name ${err}`,
                );
              } else {
                return apiResponse.successResponseWithData(
                  res,
                  'Success',
                  products,
                );
              }
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
      });
    } catch (e) {
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
        logger.log(
          'error',
          '<<<<< ProductNamesService < ProductNamesController < addProductName : Validation Error: product name must be specified',
        );
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< ProductNamesService < ProductNamesController < addProductName : token verifed successfully',
          );

          permission_request = {
            result: result,
            permissionRequired: 'addNewProduct',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                console.log('file', req.file);
                console.log('body', req.body);
                const dir = `uploads`;
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir);
                }

                await moveFile(
                  req.file.path,
                  `${dir}/${req.body.productName}.png`,
                );
                const product = new ProductNamesModel({
                  productName: req.body.productName,
                  manufacturer: req.body.manufacturer,
                  productCategory: req.body.productCategory,
                  productSubCategory: req.body.productSubCategory,
                  storageConditions: req.body.storageConditions,
                  description: req.body.description,
                  image: `http://${req.headers.host}/images/${
                    req.body.productName
                  }.png`,
                });
                await product.save();

                return apiResponse.successResponseWithData(
                  res,
                  'Success',
                  product,
                );
              } catch (e) {
                return apiResponse.ErrorResponse(res, e);
              }
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ProductNamesService < ProductNamesController < addProductName : user is not authenticated',
          );
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ProductNamesService < ProductNamesController < addProductName : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.uploadImage = async function(req, res) {
  checkToken(req, res, async result => {
    if (result.success) {
      permission_request = {
        result: result,
        permissionRequired: 'addProduct',
      };
      checkPermissions(permission_request, async permissionResult => {
        if (permissionResult.success) {
          const { data } = result;
          const { username } = data;
          try {
            console.log('file', req.files);
            console.log('body', req.body);
            const { index } = req.body;
            let dir = `uploads/${username}/child${index}`;
            if (!fs.existsSync(dir)) {
              fs.mkdir(dir, { recursive: true }, err => {});
            }

            await moveFile(req.files[0].path, `${dir}/photo.png`);
            console.log('The file has been moved');
            res.json('Success');
          } catch (e) {
            console.log('error in image upload', e);
            res.status(403).json(e);
          }
        } else {
          res.json('Sorry! User does not have enough Permissions');
        }
      });
    } else {
      res.json(result);
    }
  });
};

exports.generateCodes = async function(req, res) {
  try {
    let qrCodes = [];
    const { limit, type } = req.query;
    if(limit > 1000) return apiResponse.ErrorResponse(res, 'Limit cannot be more than 1000');
    if (type === 'qrcode') {
      for (let i = 0; i < limit; i++) {
        const uniqueId = uniqid();
        const qrCode = await QRCode.toDataURL(uniqueId);

        qrCodes.push(qrCode);
      }
    } else if (type === 'barcode') {
      for(let i = 0; i < limit; i++) {
        const uniqueId = uniqid();
        const data = await symbology.createStream(
          {
            symbology: symbology.Barcode.CODE128,
            backgroundColor: 'ffffff',
            foregroundColor: '000000',
          },
          uniqueId,
        );
        qrCodes.push(data.data);
      }
    }
    const qrCodesImages = qrCodes.map(qrCode => {
      return { image: qrCode, width: 150 };
    });
    const chunkedData = array.chunk(qrCodesImages, 3).slice();
    let lastArray = chunkedData[chunkedData.length -1];
    if(lastArray.length === 1){
      lastArray.push({ text:'', width: 150});
      lastArray.push({ text:'', width: 150});
    }else if(lastArray.length === 2) {
      lastArray.push({ text:'', width: 150});
    }
    const documentDefinition = {
      content: [
        {
          style: 'tableExample',
          table: {
            body: chunkedData,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };
    const pdfDoc = printer.createPdfKitDocument(documentDefinition, {});
    pdfDoc.pipe(fs.createWriteStream(`${__dirname}/../images/codes.pdf`).on('close', () => {
      console.log('file done');
      var path = require('path');
      res.sendFile(path.resolve(`${__dirname}/../images/codes.pdf`));
    }));
    pdfDoc.end();
  } catch (err) {
    console.error(err);
  }
};
