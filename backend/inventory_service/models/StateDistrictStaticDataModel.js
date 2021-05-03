const mongoose = require('mongoose');

const StateDistrictData = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    depot: { type: String },
    district: { type: String },
    state: { type: String },
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('StateDistrictData', StateDistrictData, 'abinbevstaticdata');
