const mongoose = require("mongoose");
const WarehouseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, default: "Warehouse" },
    organisationId: {
      type: String,
      required: true,
    },
    postalAddress: {
      type: String,
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
    region: { type: String, required: true },
    country: {
      type: String,
      required: true,
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
    status: {
      type: String,
      enum: ["ACTIVE", "NOTVERIFIED", "PENDING", "REJECTED"],
      default: "NOTVERIFIED",
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
    bottleCapacity: {
      type: Number,
      min: 0,
      default: 0,
    },
    sqft: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Warehouse", WarehouseSchema);
