const mongoose = require('mongoose');

const SalesDataSchema = new mongoose.Schema(
  {
    uploadedFileName: { type: String },
    dataCollectedDate: { type: String },
    depots: {
      type: Array,
      default: []
    },
    districtAggregations: {
      type: Array,
      default: []
    }
  },
  { timestamps: true },
);
module.exports = mongoose.model('salesdata_uploads', SalesDataSchema);
