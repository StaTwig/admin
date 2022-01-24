const mongoose = require("mongoose");
const WarehouseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, default: "WarehouseTitle" },
    warehouseAddress: {
      type: Object,
      properties: {
        firstLine: {
          type: String,
          default: "Fourth Floor, T-Hub",
        },
        secondLine: {
          type: String,
          default: "IIIT Campus, Gachibowli",
        },
        city: {
          type: String,
          default: "Hyderabad",
        },
        state: {
          type: String,
          default: "Telangana",
        },
        country: {
          type: String,
          default: "India",
        },
        region: {
          type: String,
          default: "Asia",
        },
        landmark: {
          type: String,
          default: "opposite to TCS",
        },
        zipCode: {
          type: Number,
          default: 500032,
        },
      },
    },
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Warehouse", WarehouseSchema);
