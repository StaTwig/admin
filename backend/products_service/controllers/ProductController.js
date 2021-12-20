const ProductModel = require("../models/ProductModel");
const ConfigurationModel=require("../models/ConfigurationModel")
const { body, validationResult } = require("express-validator");
const checkPermissions = require("../middlewares/rbac_middleware")
  .checkPermissions;
const multer = require("multer");
const moveFile = require("move-file");
const fs = require("fs");
const QRCode = require("qrcode");
const uniqid = require("uniqid");
// const symbology = require("symbology");
const array = require("lodash/array");

// Define font files
const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

const PdfPrinter = require("pdfmake");
const printer = new PdfPrinter(fonts); //helper file to prepare responses.
const auth = require("../middlewares/jwt");

const apiResponse = require("../helpers/apiResponse");

const init = require("../logging/init");
const logger = init.getLog();

const utility = require("../helpers/utility");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "../images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

exports.getProducts = [
  auth,
  async (req, res) => {
    try {
          permission_request = {
            role: req.user.role,
            permissionRequired: ["viewProductList"],
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const products = await ProductModel.find({});
              return apiResponse.successResponseWithData(
                res,
                "Products",
                products
              );
            } else {
              return apiResponse.forbiddenResponse(
                res,
                "Sorry! User does not have enough Permissions"
              );
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getProductsByCategory = [
  auth,
  async (req, res) => {
    try {
          permission_request = {
            role: req.user.role,
            permissionRequired: ["viewProductList"],
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const products = await ProductModel.find({type: req.query.type});
              return apiResponse.successResponseWithData(
                res,
                "Products",
                products
              );
            } else {
              return apiResponse.forbiddenResponse(
                res,
                "Sorry! User does not have enough Permissions"
              );
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getProductInfo = [
  auth,
  async (req, res) => {
    try {
          permission_request = {
            role: req.user.role,
            permissionRequired: ["viewProductInfo"],
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const product = await ProductModel.findOne({ id: req.query.id });
              return apiResponse.successResponseWithData(
                res,
                "Product Information",
                product
              );
            } else {
              return apiResponse.forbiddenResponse(
                res,
                "Sorry! User does not have enough Permission"
              );
            }
          });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ProductService < ProductController < getProducts : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addMultipleProducts = [
  auth,
  async (req, res) => {
    try {
          permission_request = {
            role: req.user.role,
            permissionRequired: ["addNewProduct"],
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              const dir = `uploads`;
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
              }
              await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
              const obj = xlsx.parse(`${dir}/${req.file.originalname}`); // parses a file
              const data = obj[0].data;
              const products = data
                .map((element) => {
                  return {
                    externalId: element[0],
                    name: element[1],
                    shortName: element[2],
                    type: element[3],
                    manufacturer: element[4],
                    temperature_max: element[5],
                    temperature_min: element[6],
                    humidity_max: element[7],
                    humidity_min: element[8],
                    pressure_max: element[9],
                    pressure_min: element[10],
                  };
                })
                .filter((product, index) => index > 0);
              let err = "";
              await utility.asyncForEach(products, async (product) => {
                if (err) return;
                const product_unique = uniqid("prod-");
                const productDetail = new ProductModel({
                  id: product_unique,
                  externalId: product.externalId,
                  name: product.name,
                  shortName: product.shortName,
                  type: product.type,
                  manufacturer: product.manufacturer,
                  characteristicSet: {
                    temperature_max: product.temperature_max,
                    temperature_min: product.temperature_min,
                    humidity_max: product.humidity_max,
                    humidity_min: product.humidity_min,
                    pressure_max: product.pressure_max,
                    pressure_min: product.pressure_min,
                  },
                });
                try {
                  await productDetail.save();
                } catch (e) {
                  err = e;
                }
              });
              if (err) {
                return apiResponse.ErrorResponse(res, `Error with ${err}`);
              } else {
                return apiResponse.successResponseWithData(
                  res,
                  "Success",
                  products
                );
              }
            } else {
              return apiResponse.forbiddenResponse(res, "Sorry! User does not have enough Permissions");
            }
          });
    } catch (e) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
exports.addProduct = [
  auth,
  body("externalId")
    .isLength({ min: 6 })
    .trim()
    .withMessage("Product External ID must be greater than 6"),
  body("name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Product Name must be specified."),
  body("type")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Product Type must be specified."),
  body("shortName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Product Short Name must be specified."),
  body("manufacturer")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Manufacturer must be specified."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }
          permission_request = {
            role: req.user.role,
            permissionRequired: ["addNewProduct"],
          };
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              try {
                // console.log("file", req.file);
                // console.log("body", req.body);
                // const dir = `uploads`;
                // if (!fs.existsSync(dir)) {
                //   fs.mkdirSync(dir);
                // }
                // if (req.file) {
                //   await moveFile(
                //     req.file.path,
                //     `${dir}/${req.body.productName}.png`
                //   );
                // }
                console.log(req.body.unitofMeasure)
                const product_unique = uniqid("prod-")
                const product = new ProductModel({
                  id: product_unique,
                  externalId: req.body.externalId,
                  name: req.body.name,
                  shortName: req.body.shortName,
                  type: req.body.type,
                  manufacturer: req.body.manufacturer,
                  pricing:req.body.pricing,
                  //photoId: `http://${req.headers.host}/images/${req.body.name}.png`,
                  unitofMeasure: JSON.parse(req.body.unitofMeasure),
                  characteristicSet: {
                    temperature_max: req.body.characteristicSet?.temperature_max,
                    temperature_min: req.body.characteristicSet?.temperature_min,
                    humidity_max: req.body.characteristicSet?.humidity_max,
                    humidity_min: req.body.characteristicSet?.humidity_min,
                    pressure_max: req.body.characteristicSet?.pressure_max,
                    pressure_min: req.body.characteristicSet?.pressure_min,
                  },                  
                });
                await product.save();
                console.log(product)
                if(req.body.name !== 'category')
                    ProductModel.findOneAndDelete({type: req.body.type, name: 'category'}).then((res)=> console.log(res)).catch((err)=>console.log(err))
                return apiResponse.successResponseWithData(
                  res,
                  "Success",
                  product
                );
              } catch (e) {
                console.log(e)
                return apiResponse.ErrorResponse(res, e.message);
              }
            } else {
              return apiResponse.forbiddenResponse(res, "Sorry! User does not have enough Permissions");
            }
          });
    } catch (err) {
      console.log(err)
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.uploadImage = [ 
  auth,
  async (req, res) => {
    try {
      permission_request = {
        role: req.user.role,
        permissionRequired: ["addNewProduct"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const { username } = req.user;
            console.log("file", req.files);
            console.log("body", req.body);
            const { index } = req.body;
            let dir = `uploads/${username}/child${index}`;
            if (!fs.existsSync(dir)) {
              fs.mkdir(dir, { recursive: true }, (err) => {});
            }
            await moveFile(req.files[0].path, `${dir}/photo.png`);
            return apiResponse.successResponse(res, "Success");
        } else {
         return apiResponse.forbiddenResponse(res, "Sorry! User does not have enough Permissions");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  }
]

exports.generateCodes = async function (req, res) {
  try {
    let qrCodes = [];
    const { limit, type } = req.query;
    if (limit > 1000)
      return apiResponse.ErrorResponse(res, "Limit cannot be more than 1000");
    if (type === "qrcode") {
      for (let i = 0; i < limit; i++) {
        const uniqueId = uniqid();
        const qrCode = await QRCode.toDataURL(uniqueId);

        qrCodes.push(qrCode);
      }
    }
    // else if (type === "barcode") {
    //   for (let i = 0; i < limit; i++) {
    //     const uniqueId = uniqid();
    //     const data = await symbology.createStream(
    //       {
    //         symbology: symbology.Barcode.CODE128,
    //         backgroundColor: "ffffff",
    //         foregroundColor: "000000",
    //       },
    //       uniqueId
    //     );
    //     qrCodes.push(data.data);
    //   }
    // }
    const qrCodesImages = qrCodes.map((qrCode) => {
      return { image: qrCode, width: 150 };
    });
    const chunkedData = array.chunk(qrCodesImages, 3).slice();
    let lastArray = chunkedData[chunkedData.length - 1];
    if (lastArray.length === 1) {
      lastArray.push({ text: "", width: 150 });
      lastArray.push({ text: "", width: 150 });
    } else if (lastArray.length === 2) {
      lastArray.push({ text: "", width: 150 });
    }
    const documentDefinition = {
      content: [
        {
          style: "tableExample",
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
          color: "black",
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };
    const pdfDoc = printer.createPdfKitDocument(documentDefinition, {});
    pdfDoc.pipe(
      fs
        .createWriteStream(`${__dirname}/../images/codes.pdf`)
        .on("close", () => {
          console.log("file done");
          var path = require("path");
          res.sendFile(path.resolve(`${__dirname}/../images/codes.pdf`));
        })
    );
    pdfDoc.end();
  } catch (err) {
    console.error(err);
  }
};

exports.getManufacturer =[
  auth,
  async (req, res) => {
    try {
      const name  = req.user.name;
      const externalId=req.query.id
      const manufacturer = await ProductModel.find({},'manufacturer').distinct('manufacturer');
      console.log(manufacturer)
      return apiResponse.successResponseWithData(
        res,
        'manufacturer',
        manufacturer,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< products_service < ProductController <getManufacturer : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getIotEnabledStatus =[
  auth,
  async (req,res) =>{
      try{
          const confId="CONF000"
          const config= await ConfigurationModel.find({id:confId},'iot_enabled')
          return apiResponse.successResponseWithData(
            res,
            'IotEnabledStatus',
           config[0],
          );


      }catch(err){
        logger.log(
          'error',
          '<<<<< products_service < ProductController < getIotEnabledStatus : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err.message);

      }

  }
]

exports.getproductcategory = [
  auth,
  async (req,res)=>{
    try{
    //const externalId= req.query.id;
    const product= await ProductModel.find({},'id type externalId');

    return apiResponse.successResponseWithData(
      res,
      'Product Details',
      product,
    );
  } catch (err) {
    logger.log(
      'error',
      '<<<<< ProductService < ProductController < getproductcategory : error (catch block)',
    );
    return apiResponse.ErrorResponse(res, err.message);
  }
},
]

exports.getproductname = [
  auth,
  async (req,res)=>{
    try{
    //const externalId= req.query.id;
    const product= await ProductModel.find({},'id externalId name shortName');

    return apiResponse.successResponseWithData(
      res,
      'Product Details',
      product,
    );
  } catch (err) {
    logger.log(
      'error',
      '<<<<< ProductService < ProductController < getproductname : error (catch block)',
    );
    return apiResponse.ErrorResponse(res, err.message);
  }
},
]