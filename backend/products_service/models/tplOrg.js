const mongoose = require("mongoose");
const TplOrganisationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
    warehouses: {
      type: Array,
      default: ["ware123", "ware234"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tplrganisation", TplOrganisationSchema);
