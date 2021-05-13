var mongoose = require("mongoose");
ProductSKUSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    externalId: { type: String },
    name: { type: String },
    shortName: { type: String },
    type: { type: String },
    manufacturer: { type: String },
    characteristicSet: { type: Object },
    image: { type: String }
  },
  { timestamps: true });


module.exports = mongoose.model("products", ProductSKUSchema);