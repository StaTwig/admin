const mongoose = require("mongoose");
const TplOrganisationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tplrganisation", TplOrganisationSchema);
