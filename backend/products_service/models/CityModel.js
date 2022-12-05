const mongoose = require("mongoose");

const CityModel = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  country_id: { type: Number },
  country_code: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  state_id: { type: Number },
  state_code: { type: String },
});

module.exports = mongoose.model("cities", CityModel);
