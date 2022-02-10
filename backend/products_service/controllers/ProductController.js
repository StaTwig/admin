const ProductModel = require("../models/ProductModel");
const ConfigurationModel = require("../models/ConfigurationModel");
const CounterModel = require("../models/CounterModel");
const { body, validationResult } = require("express-validator");
const checkPermissions =
  require("../middlewares/rbac_middleware").checkPermissions;
const moveFile = require("move-file");
const fs = require("fs");
const QRCode = require("qrcode");
const array = require("lodash/array");
const PdfPrinter = require("pdfmake"); //helper file to prepare responses.
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const OrganisationModel = require("../models/OrganisationModel");
const { responses } = require("../helpers/responses");
const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};
const printer = new PdfPrinter(fonts);
exports.getProducts = [
  auth,
  async (req, res) => {
    try {
      const permission_request = {
        role: req.user.role,
        permissionRequired: ["viewProductList"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const products = await ProductModel.find({});
          return apiResponse.successResponseWithData(res, "Products", products);
        } else {
          return apiResponse.forbiddenResponse(
            res,
            responses(req.user.preferredLanguage).no_permission
          );
        }
      });
    } catch (err) {
      console.error(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getProductsByCategory = [
  auth,
  async (req, res) => {
    try {
      const permission_request = {
        role: req.user.role,
        permissionRequired: ["viewProductList"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const products = await ProductModel.find({ type: req.query.type });
          return apiResponse.successResponseWithData(res, "Products", products);
        } else {
          return apiResponse.forbiddenResponse(
            res,
            responses(req.user.preferredLanguage).no_permission
          );
        }
      });
    } catch (err) {
      console.error(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getProductInfo = [
  auth,
  async (req, res) => {
    try {
      const permission_request = {
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
            responses(req.user.preferredLanguage).no_permission
          );
        }
      });
    } catch (err) {
      console.error(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.addMultipleProducts = [
  auth,
  async (req, res) => {
    try {
      const permission_request = {
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
          await utility.asyncForEach(products, async (product) => {
            const productId = await CounterModel.findOneAndUpdate(
              {
                "counters.name": "productId",
              },
              {
                $inc: {
                  "counters.$.value": 1,
                },
              },
              {
                new: true,
              }
            );
            const productDetail = new ProductModel({
              id: productId.counters[6].format + productId.counters[6].value,
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
            await productDetail.save();
          });
          return apiResponse.successResponseWithData(res, "Success", products);
        } else {
          return apiResponse.forbiddenResponse(
            res,
            responses(req.user.preferredLanguage).no_permission
          );
        }
      });
    } catch (err) {
      console.log(err);
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
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error",
          errors.array()
        );
      } else {
        const permission_request = {
          role: req.user.role,
          permissionRequired: ["addNewProduct"],
        };

        checkPermissions(permission_request, async (permissionResult) => {
          const manufacturerCheck = OrganisationModel.exists({
            name: req.body.manufacturer,
          });
          if (manufacturerCheck == false) {
            const otherManufacturer = new OrganisationModel({
              name: req.body.manufacturer,
            });
            await otherManufacturer.save();
          }
          if (permissionResult.success) {
            const productId = await CounterModel.findOneAndUpdate(
              {
                "counters.name": "productId",
              },
              {
                $inc: {
                  "counters.$.value": 1,
                },
              },
              {
                new: true,
              }
            );
            const product = new ProductModel({
              id: productId.counters[6].format + productId.counters[6].value,
              externalId: req.body.externalId,
              name: req.body.name,
              shortName: req.body.shortName,
              type: req.body.type,
              manufacturer: req.body.manufacturer,
              pricing: req.body.pricing,
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
            if (req.body.name !== "category")
              await ProductModel.findOneAndDelete({
                type: req.body.type,
                name: "category",
              });
            return apiResponse.successResponseWithData(res, "Success", product);
          } else {
            return apiResponse.forbiddenResponse(
              res,
              responses(req.user.preferredLanguage).no_permission
            );
          }
        });
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.uploadImage = [
  auth,
  async (req, res) => {
    try {
      const permission_request = {
        role: req.user.role,
        permissionRequired: ["addNewProduct"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const { username } = req.user;
          const { index } = req.body;
          let dir = `uploads/${username}/child${index}`;
          if (!fs.existsSync(dir)) {
            fs.mkdir(dir, { recursive: true }, (err) => {});
          }
          await moveFile(req.files[0].path, `${dir}/photo.png`);
          return apiResponse.successResponse(res, "Success");
        } else {
          return apiResponse.forbiddenResponse(
            res,
            responses(req.user.preferredLanguage).no_permission
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.generateCodes = async function (req, res) {
  try {
    let qrCodes = [];
    const { limit, type } = req.query;
    if (limit > 1000)
      return apiResponse.ErrorResponse(res, "Limit cannot be more than 1000");
    if (type === "qrcode") {
      for (let i = 0; i < limit; i++) {
        const qrId = await CounterModel.findOneAndUpdate(
          {
            "counters.name": "qrCode",
          },
          {
            $inc: {
              "counters.$.value": 1,
            },
          },
          {
            new: true,
          }
        );
        const qrCode = await QRCode.toDataURL(qrId.counters[9].value);
        qrCodes.push(qrCode);
      }
    }
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
        alignment: "justify",
      },
    };
    const pdfDoc = printer.createPdfKitDocument(documentDefinition, {});
    pdfDoc.pipe(
      fs
        .createWriteStream(`${__dirname}/../images/codes.pdf`)
        .on("close", () => {
          var path = require("path");
          res.sendFile(path.resolve(`${__dirname}/../images/codes.pdf`));
        })
    );
    pdfDoc.end();
  } catch (err) {
    console.error(err);
  }
};

exports.getManufacturer = [
  auth,
  async (req, res) => {
    try {
      const manufacturer = await ProductModel.find({}, "manufacturer").distinct(
        "manufacturer"
      );
      return apiResponse.successResponseWithData(
        res,
        "manufacturer",
        manufacturer
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getIotEnabledStatus = [
  auth,
  async (req, res) => {
    try {
      const confId = "CONF000";
      const config = await ConfigurationModel.find(
        { id: confId },
        "iot_enabled"
      );
      return apiResponse.successResponseWithData(
        res,
        "IotEnabledStatus",
        config[0]
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getproductcategory = [
  auth,
  async (req, res) => {
    try {
      const products = await ProductModel.find({}, "id type externalId");
      return apiResponse.successResponseWithData(
        res,
        "Product Categories",
        products
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getproductname = [
  auth,
  async (req, res) => {
    try {
      const products = await ProductModel.find(
        {},
        "id externalId name shortName"
      );
      return apiResponse.successResponseWithData(
        res,
        "Product Names",
        products
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
