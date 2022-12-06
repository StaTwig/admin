const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  country_id: { type: Number },
  country_code: { type: String },
  state_code: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

module.exports = mongoose.model("states", StateSchema);
