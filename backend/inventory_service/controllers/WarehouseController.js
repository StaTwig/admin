const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const InventoryModel = require("../models/InventoryModel");
const WarehouseModel = require("../models/WarehouseModel");
const ProductModel = require("../models/ProductModel");
const OrganisationModel = require("../models/OrganisationModel");

exports.getWarehousesByCity = [
  auth,
  async (req, res) => {
    try {
      const allWarehouses = await WarehouseModel.aggregate([
        { $match: { "warehouseAddress.city": req.query.city } },
        {
          $group: {
            _id: "$id",
          },
        },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Warehouses By City",
        allWarehouses
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getWarehouseDetailsByRegion = [
  auth,
  async (req, res) => {
    try {
      const { region } = req.query;
      const warehouseDetails = await WarehouseModel.find({
        "warehouseAddress.region": region,
      });
      return apiResponse.successResponseWithData(
        res,
        "Warehouse Details By Region",
        warehouseDetails
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getWarehouseDetailsByCountry = [
  auth,
  async (req, res) => {
    try {
      const { country } = req.query;
      const warehouseDetails = await WarehouseModel.find({
        "country.countryName": country,
      });
      return apiResponse.successResponseWithData(
        res,
        "Warehouse Details By Country",
        warehouseDetails
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getOrganizationWarehouses = [
  auth,
  async (req, res) => {
    try {
      let warehouseData;
      const warehouseIds = [];
      const { orgId, country } = req.query;
      if (orgId && country) {
        const orgs = await OrganisationModel.find({ id: orgId }).select(
          "warehouses"
        );
        for (let org of orgs) {
          for (let warehouse of org.warehouses) {
            warehouseIds.push(warehouse);
          }
        }
        warehouseData = await WarehouseModel.find({
          $and: [
            { id: { $in: warehouseIds } },
            { "country.countryName": country },
          ],
        });
      } else if (orgId) {
        warehouseData = await WarehouseModel.find({ organisationId: orgId });
      } else {
        return apiResponse.ErrorResponse(res, "Provide OrgId and Country");
      }
      return apiResponse.successResponseWithData(
        res,
        `Organizations Warehouse Address of ${orgId} & country ${country}`,
        warehouseData
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getProductDetailsByWarehouseId = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.query;
      const warehouseDetails = await WarehouseModel.findOne({
        id: warehouseId,
      });
      const val = warehouseDetails.warehouseInventory;
      const productList = await InventoryModel.find({ id: val });
      const list = productList[0].inventoryDetails;
      const productArray = [];
      for (let j = 0; j < list.length; j++) {
        const product = await ProductModel.find({ id: list[j].productId });
        const product1 = {
          productName: product[0].name,
          productId: product[0].id,
          manufacturer: product[0].manufacturer,
          quantity: list[j].quantity ? list[j].quantity : 0,
          unitofMeasure: product[0].unitofMeasure,
        };
        productArray.push(product1);
      }
      const { firstLine, secondLine, city, state, country, zipCode } =
        warehouseDetails.warehouseAddress;
      const address =
        firstLine +
        " " +
        (secondLine ? secondLine + " " : "") +
        city +
        " " +
        state +
        " " +
        zipCode +
        " " +
        country;
      const warehouse = {
        warehouseCountryId: warehouseDetails.country.countryId,
        warehouseCountryName: warehouseDetails.country.countryName,
        warehouseId: warehouseDetails.id,
        warehouseName: warehouseDetails.title,
        warehouseAddress: address,
        warehouseLocation: warehouseDetails.location,
      };

      return apiResponse.successResponseWithData(
        res,
        "Product Details by Warehouse",
        {
          warehouse,
          productArray,
        }
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
