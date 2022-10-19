const mongoose = require("mongoose");
const OrganizationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    postalAddress: {
      type: String,
      default: null,
    },
    region: { type: String, required: true },
    country: { type: String, required: true },
    isRegistered: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
      geohash: String,
    },
    primaryContactId: { type: String, default: null },
    logoId: { type: String, default: null },
    type: String,
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVATED", "NOTVERIFIED", "INCOMPLETE"],
      default: "NOTVERIFIED",
    },
    warehouses: {
      type: Array,
      default: [],
    },
    supervisors: {
      type: Array,
      default: [],
    },
    warehouseEmployees: {
      type: Array,
      default: [],
    },
    configuration_id: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Organisation", OrganizationSchema);
