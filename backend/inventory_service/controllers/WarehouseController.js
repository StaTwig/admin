const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const InventoryModel = require("../models/InventoryModel");
const WarehouseModel = require("../models/WarehouseModel");
const ProductModel = require("../models/ProductModel");
const OrganisationModel = require("../models/OrganisationModel");

async function DistributorMapLocations(organisationId, matchQuery) {
  console.log(matchQuery);
  const locations = await WarehouseModel.aggregate([
    {
      $match: {
        organisationId: organisationId,
        status: "ACTIVE",
      },
    },
    {
      $lookup: {
        from: "atoms",
        localField: "warehouseInventory",
        foreignField: "inventoryIds",
        as: "atoms",
      },
    },
    {
      $unwind: {
        path: "$atoms",
      },
    },
    {
      $project: {
        inventoryIds: "$atoms.inventoryIds",
        warehouseInventory: "$warehouseInventory",
        index: {
          $indexOfArray: ["$atoms.inventoryIds", "$warehouseInventory"],
        },
        size: {
          $cond: {
            if: {
              $isArray: "$atoms.inventoryIds",
            },
            then: {
              $size: "$atoms.inventoryIds",
            },
            else: "NA",
          },
        },
      },
    },
    {
      $project: {
        inventoryIds: 1,
        index: 1,
        size: 1,
        slicedInventories: {
          $slice: ["$inventoryIds", "$index", "$size"],
        },
      },
    },
    {
      $unwind: {
        path: "$slicedInventories",
      },
    },
    {
      $group: {
        _id: null,
        inventories: {
          $addToSet: "$slicedInventories",
        },
      },
    },
    {
      $unwind: {
        path: "$inventories",
      },
    },
    {
      $lookup: {
        from: "warehouses",
        let: {
          inventoryId: "$inventories",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$warehouseInventory", "$$inventoryId"],
              },
            },
          },
        ],
        as: "warehouse",
      },
    },
    {
      $unwind: {
        path: "$warehouse",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$warehouse",
      },
    },
    {
      $project: {
        warehouseId: "$id",
        organisationId: "$organisationId",
        orgId: "$organisationId",
        city: "$warehouseAddress.city",
        title: "$title",
        location: "$location",
        region: "$region",
        country: "$country",
      },
    },
    {
      $facet: {
        allLocations: [],
        partnerLocations: [
          {
            $match: {
              organisationId: {
                $nin: [organisationId],
              },
            },
          },
        ],
        myLocations: [
          {
            $match: {
              organisationId: organisationId,
            },
          },
        ],
        filterLocations: [
          {
            $match: { matchQuery },
          },
        ],
      },
    },
  ]);
  return locations;
}

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
        organisationId: req.user.organisationId,
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
        organisationId: req.user.organisationId,
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
        const product = await ProductModel.findOne({ id: list[j].productId });
        if (product) {
          const product1 = {
            productName: product?.name,
            productId: product?.id,
            manufacturer: product?.manufacturer,
            quantity: list[j].quantity ? list[j].quantity : 0,
            unitofMeasure: product?.unitofMeasure,
          };
          productArray.push(product1);
        }
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
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getManufacturerWarehouses = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      console.log(organisationId);
      const { warehouseOrg, countryName, partnerLocation, mylocationFilter } =
        req.query;
      const organisation = await OrganisationModel.findOne({
        id: req.user.organisationId,
      });
      const isDist = organisation.type === "DISTRIBUTORS";
      const queryObj = {};
      if (partnerLocation)
        queryObj[`organisationId`] = { $ne: req.user.organisationId };
      else if (mylocationFilter)
        queryObj[`organisationId`] = req.user.organisationId;
      else if (warehouseOrg) queryObj[`organisationId`] = warehouseOrg;
      if (countryName) queryObj[`country.countryName`] = countryName;
      if (isDist) {
        const warehouses = await DistributorMapLocations(
          organisationId,
          queryObj
        );
        const response = {
          partnerLocations: warehouses[0]?.partnerLocations.length,
          myLocations: warehouses[0]?.myLocations.length,
        };
        if (partnerLocation && mylocationFilter) {
          response.warehouses = warehouses[0]?.allLocations;
        } else if (partnerLocation) {
          response.warehouses = warehouses[0]?.partnerLocations;
        } else {
          response.warehouses = warehouses[0]?.myLocations;
        }
        return apiResponse.successResponseWithData(
          res,
          "List of warehouses - Distributor View",
          response
        );
      } else {
        const warehouses = await WarehouseModel.aggregate([
          { $match: queryObj },
          {
            $lookup: {
              from: "inventories",
              localField: "warehouseInventory",
              foreignField: "id",
              as: "InventoryData",
            },
          },
          { $unwind: "$InventoryData" },
          { $unwind: "$InventoryData.inventoryDetails" },
          {
            $lookup: {
              from: "products",
              localField: "InventoryData.inventoryDetails.productId",
              foreignField: "id",
              as: "productData",
            },
          },
          { $unwind: "$productData" },
          { $match: { "productData.manufacturerId": organisationId } },
          {
            $lookup: {
              from: "organisations",
              localField: "organisationId",
              foreignField: "id",
              as: "orgData",
            },
          },
          {
            $group: {
              _id: null,
              warehouses: {
                $addToSet: {
                  warehouseId: "$id",
                  orgId: "$organisationId",
                  orgName: "$orgData.name",
                  city: "$warehouseAddress.city",
                  title: "$title",
                  location: "$location",
                  region: "$region",
                  country: "$country",
                },
              },
            },
          },
        ]);

        const totalWarehouseCount = await WarehouseModel.aggregate([
          {
            $lookup: {
              from: "inventories",
              localField: "warehouseInventory",
              foreignField: "id",
              as: "InventoryData",
            },
          },
          { $unwind: "$InventoryData" },
          { $unwind: "$InventoryData.inventoryDetails" },
          {
            $lookup: {
              from: "products",
              localField: "InventoryData.inventoryDetails.productId",
              foreignField: "id",
              as: "productData",
            },
          },
          { $unwind: "$productData" },
          { $match: { "productData.manufacturerId": organisationId } },
          {
            $group: {
              _id: null,
              warehouses: {
                $addToSet: {
                  warehouseId: "$id",
                  city: "$warehouseAddress.city",
                  title: "$title",
                  location: "$location",
                  region: "$region",
                  country: "$country",
                },
              },
            },
          },
          {
            $project: {
              warehouseCount: {
                $cond: {
                  if: { $isArray: "$warehouses" },
                  then: { $size: "$warehouses" },
                  else: "NA",
                },
              },
            },
          },
        ]);
        const myWarehousesCount = await WarehouseModel.aggregate([
          { $match: { organisationId: req.user.organisationId } },
          {
            $lookup: {
              from: "inventories",
              localField: "warehouseInventory",
              foreignField: "id",
              as: "InventoryData",
            },
          },
          { $unwind: "$InventoryData" },
          { $unwind: "$InventoryData.inventoryDetails" },
          {
            $lookup: {
              from: "products",
              localField: "InventoryData.inventoryDetails.productId",
              foreignField: "id",
              as: "productData",
            },
          },
          { $unwind: "$productData" },
          { $match: { "productData.manufacturerId": organisationId } },
          {
            $group: {
              _id: null,
              warehouses: {
                $addToSet: {
                  warehouseId: "$id",
                  city: "$warehouseAddress.city",
                  title: "$title",
                  location: "$location",
                  region: "$region",
                  country: "$country",
                },
              },
            },
          },
          {
            $project: {
              warehouseCount: {
                $cond: {
                  if: { $isArray: "$warehouses" },
                  then: { $size: "$warehouses" },
                  else: "NA",
                },
              },
            },
          },
        ]);
        return apiResponse.successResponseWithData(
          res,
          "List of warehouses - Manufacturer View",
          {
            partnerLocations:
              totalWarehouseCount[0]?.warehouseCount -
              myWarehousesCount[0]?.warehouseCount,
            myLocations: myWarehousesCount[0]?.warehouseCount,
            warehouses: warehouses[0]?.warehouses,
          }
        );
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getManufacturerFilterOptions = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const { type, regExp } = req.query;
      const matchQuery = {};
      if (type === "country") {
        matchQuery[`country`] = "$country.countryName";
        matchQuery[`name`] = "$country.countryName";
      } else if (type === "org") {
        matchQuery[`orgId`] = "$organisationId";
        matchQuery[`orgName`] = "$orgData.name";
        matchQuery[`name`] = "$orgData.name";
      }
      const orgs = await WarehouseModel.aggregate([
        {
          $lookup: {
            from: "inventories",
            localField: "warehouseInventory",
            foreignField: "id",
            as: "InventoryData",
          },
        },
        { $unwind: "$InventoryData" },
        { $unwind: "$InventoryData.inventoryDetails" },
        {
          $lookup: {
            from: "products",
            localField: "InventoryData.inventoryDetails.productId",
            foreignField: "id",
            as: "productData",
          },
        },
        {
          $lookup: {
            from: "organisations",
            localField: "organisationId",
            foreignField: "id",
            as: "orgData",
          },
        },
        { $unwind: "$productData" },
        { $match: { "productData.manufacturerId": organisationId } },
        {
          $match: {
            $or: [
              { "orgData.name": { $regex: regExp, $options: "i" } },
              { "country.countryName": { $regex: regExp, $options: "i" } },
            ],
          },
        },
        { $group: { _id: null, filters: { $addToSet: matchQuery } } },
      ]);

      return apiResponse.successResponseWithData(
        res,
        "List of warehouses :",
        orgs
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
