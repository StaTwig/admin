var mongoose = require("mongoose");
var WarehouseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, default: "Warehouse" },
    organisationId: {
      type: String,
      required: true,
      default: "org123",
    },
    postalAddress: {
      type: String,
      required: false,
      default: null,
    },
    warehouseAddress: {
      type: Object,
      required: true,
      properties: {
        firstLine: { type: String },
        secondLine: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        landmark: { type: String },
        zipCode: { type: String },
      },
    },
    region: {
      type: Object,
      required: true,
      default: {
        regionId: "reg123",
        regionName: "Earth Prime",
      },
    },
    country: {
      type: Object,
      required: true,
      default: {
        countryId: "001",
        countryName: "India",
      },
    },
    location: {
      type: Object,
      default: {
        longitude: 12.12323453534,
        latitude: 13.123435345435,
        geohash: "1231nejf923453",
      },
    },
    status: String,
    supervisors: {
      type: Array,
      default: [],
    },
    employees: {
      type: Array,
      default: [],
    },
    warehouseInventory: {
      type: String,
      required: true,
      unique: true,
    },
    bottleCapacity: {
      type: Number,
      default: 0,
    },
    sqft: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Warehouse", WarehouseSchema);
