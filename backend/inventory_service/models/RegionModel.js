var mongoose = require('mongoose');
var RegionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: Array, required: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Region', RegionSchema);
