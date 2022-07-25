const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const WarehouseModel = require("../models/WarehouseModel");
const ProductModel = require("../models/ProductModel");
const OrganisationModel = require("../models/OrganisationModel");
const AnalyticsModel = require("../models/AnalyticsModel");
const StateDistrictStaticDataModel = require("../models/StateDistrictStaticDataModel");
const CountryModel = require("../models/CountryModel");

exports.getCountries = [
  auth,
  async (req, res) => {
    try {
      const countries = await WarehouseModel.aggregate([
        { $match: { "warehouseAddress.region": req.query.region } },
        {
          $group: {
            _id: "$warehouseAddress.country",
          },
        },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        countries
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getStatesByCountry = [
  auth,
  async (req, res) => {
    try {
      const allStates = await WarehouseModel.aggregate([
        { $match: { "warehouseAddress.country": req.query.country } },
        {
          $group: {
            _id: "$warehouseAddress.state",
          },
        },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allStates
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getAllStates = [
  auth,
  async (req, res) => {
    try {
      const allStates = await StateDistrictStaticDataModel.find().distinct(
        "state"
      );
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allStates
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getDistrictsByState = [
  auth,
  async (req, res) => {
    try {
      const _selectedState = req.query.state;
      const allStates = await StateDistrictStaticDataModel.find({
        state: _selectedState,
      }).distinct("district");
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allStates
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getCitiesByState = [
  auth,
  async (req, res) => {
    try {
      const allCities = await WarehouseModel.aggregate([
        { $match: { "warehouseAddress.state": req.query.state } },
        {
          $group: {
            _id: "$warehouseAddress.city",
          },
        },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allCities
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getVendorsByDistrict = [
  auth,
  async (req, res) => {
    try {
      const _selectedDistrict = req.query.district;
      const _vendorType = req.query.vendorType;
      const allVendors = await OrganisationModel.find({
        district: _selectedDistrict,
        type: _vendorType,
      });
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allVendors
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getAllSKUs = [
  auth,
  async (req, res) => {
    try {
      const allSKUs = await ProductModel.aggregate([
        {
          $group: {
            _id: { externalId: "$externalId", name: "$name" },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$_id", "$$ROOT"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$externalId",
            name: 1,
          },
        },
      ]).sort({ name: 1 });
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allSKUs
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getOrganizationsByType = [
  auth,
  async (req, res) => {
    try {
      const filters = req.query;
      let matchCondition = {};
      if (
        filters.orgType === "BREWERY" ||
        filters.orgType === "S1" ||
        filters.orgType === "S2"
      ) {
        matchCondition.type = filters.orgType;
      } else if (filters.orgType === "ALL_VENDORS") {
        matchCondition.$or = [{ type: "S1" }, { type: "S2" }];
      }

      const organisations = await OrganisationModel.aggregate([
        {
          $match: matchCondition,
        },
      ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        organisations
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getOrganizationInfoByID = [
  auth,
  async (req, res) => {
    try {
      const orgId = req.query.orgId;
      const organisation = await OrganisationModel.findOne({ id: orgId });
      const warehouseIds = organisation.warehouses;
      const stats = await AnalyticsModel.find({
        warehouseId: { $in: warehouseIds },
      });
      let totalStock = 0;
      stats.forEach((stat) => {
        totalStock = totalStock + parseInt(stat.returns);
      });

      let responseObj = {
        organisation,
        totalStock,
      };
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        responseObj
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getRegions = [
  auth,
  async (req, res) => {
    try {
      const { orgType } = req.query;
      var orgs;
      const orgSet = new Set();
      if (!orgType) {
        orgs = await OrganisationModel.find({}).select("region");
      } else {
        orgs = await OrganisationModel.find({ type: orgType }).select(
          "region id"
        );
        try {
          const warehouseRegions = await WarehouseModel.find({
            organisationId: { $in: orgs.map((org) => org.id) },
          }).select("region");
          for (let warehouse of warehouseRegions) {
            orgSet.add(warehouse.region);
          }
        } catch (err) {
          console.log(err);
        }
      }
      for (let org of orgs) {
        orgSet.add(org.region);
      }
      return apiResponse.successResponseWithData(
        res,
        `Regions of Organizations of type ${orgType}`,
        [...orgSet]
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getCountryDetailsByRegion = [
  // auth,
  async (req, res) => {
    try {
      const { region, orgType } = req.query;
      var common = [];
      const countrySet = new Set();
      if (region && orgType) {
        var countries = await CountryModel.find(
          { region: region },
          { _id: 0 }
        ).select("name");
        countries = countries.map((country) => country.name);
        const orgs = await OrganisationModel.find({ type: orgType }).select(
          "country id"
        );
        try {
          const warehouseCountries = await WarehouseModel.find({
            organisationId: { $in: orgs.map((org) => org.id) },
          }).select("country");
          for (let warehouse of warehouseCountries) {
            countrySet.add(warehouse.country.countryName);
          }
        } catch (err) {
          console.log(err);
        }
        for (let org of orgs) {
          countrySet.add(org.country.countryName);
        }
        const orgArray = [...countrySet];
        orgArray.sort();

        // Get common countries
        var i = 0,
          j = 0;
        while (i < countries.length && j < orgArray.length) {
          if (countries[i] == orgArray[j]) {
            common.push(countries[i]);
            i++;
            j++;
          } else if (countries[i] < orgArray[j]) {
            i++;
          } else {
            j++;
          }
        }
      } else {
        if (region) {
          common = await CountryModel.find({ region: region }).select("name");
        } else {
          return apiResponse.ErrorResponse(
            res,
            "Please provide region and orgType"
          );
        }
      }
      return apiResponse.successResponseWithData(
        res,
        `Countries in Region ${region} & OrgType ${orgType}`,
        common
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getAddresses = [
  auth,
  async (req, res) => {
    try {
      var warehouseIds = [];
      var warehouseData = [];
      const { orgType, country } = req.query;
      if (orgType && country) {
        const orgs = await OrganisationModel.find({ type: orgType }).select(
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
      } else if (country) {
        warehouseData = await WarehouseModel.find({
          "country.countryName": country,
        });
      } else {
        return apiResponse.ErrorResponse(res, "Provide OrgType and Country");
      }
      return apiResponse.successResponseWithData(
        res,
        `Organizations Warehouse Address of type ${orgType} & country ${country}`,
        warehouseData
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getOrganizations = [
  auth,
  async (req, res) => {
    try {
      var orgs = [];
      const { orgType, country } = req.query;
      if (orgType && country) {
        orgs = await OrganisationModel.find({
          $and: [
            { type: orgType },
            { "country.countryName": country },
            { status: "ACTIVE" },
          ],
        });
      } else if (country) {
        orgs = await OrganisationModel.find({ "country.countryName": country });
      } else {
        return apiResponse.ErrorResponse(res, "Provide OrgType and Country");
      }
      return apiResponse.successResponseWithData(
        res,
        `Organizations of type ${orgType} & country ${country}`,
        orgs
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
