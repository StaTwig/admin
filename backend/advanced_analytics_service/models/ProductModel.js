var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    externalId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    manufacturer: {
      type: String,
      required: false,
    },
    characteristicSet: {
      type: Object,
      default:
        {
          temperature_max: 97.8,
          temperature_min: -4.5,
          humidity_max: 56.3,
          humidity_min: 23.1,
          pressure_max: 2,
          pressure_min: 1,
        },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Product', ProductSchema);
