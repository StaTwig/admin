var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    externalId: {
      type: String,
      required: true,
      unique: true,
      default: 'ex12345',
    },
    name: {
      type: String,
      required: true,
      default: 'Samsung Galaxy S22 FE',
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
    characteristicSet: {
      type: Object
    }
  },
  { timestamps: true },
);
module.exports = mongoose.model('Product', ProductSchema);
