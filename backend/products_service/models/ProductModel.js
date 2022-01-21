const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;
const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    externalId: {
      type: String,
      required: true,
      unique: true,
      default: "ex12345",
    },
    name: {
      type: String,
      required: true,
      default: "Samsung Galaxy S22 FE",
    },
    shortName: {
      type: String,
      required: false,
      default: "S22 FE",
    },
    type: {
      type: String,
      required: false,
      default: "Mobile Phone",
    },
    manufacturer: {
      type: String,
      required: false,
      default: "organization_id 1",
    },
    unitofMeasure: {
      type: Object,
      items: {
        type: Object,
        properties: {
          id: { type: String },
          name: {
            type: String,
          },
        },
      },
    },
    photoId: {
      type: String,
      default: "No Image",
    },
    characteristicSet: {
      type: Object,
      default: {
        temperature_max: 97.8,
        temperature_min: -4.5,
        humidity_max: 56.3,
        humidity_min: 23.1,
        pressure_max: 2,
        pressure_min: 1,
      },
    },
    pricing: [
      {
        perUnitPrice: Decimal128,
        currency: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
