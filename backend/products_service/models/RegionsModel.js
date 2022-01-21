const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema({
  lng: { type: String },
  geonameId: { type: Number },
  name: { type: String },
  fclName: {
    type: String,
  },
  toponymName: {
    type: String,
  },
  fcodeName: {
    type: String,
  },
  adminName1: {
    type: String,
  },
  lat: {
    type: String,
  },
  fcl: {
    type: String,
  },
  fcode: {
    type: String,
  },
  population: {
    type: Number,
  },
});

module.exports = mongoose.model("regions", RegionSchema);
