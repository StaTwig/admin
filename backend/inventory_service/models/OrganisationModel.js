const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
    postalAddress: { type: String },
    region: { type: Object },
    country: { type: Object },
    primaryContactId: { type: String },
    logoId: { type: String },
    type: { type: String },
    warehouses: { type: Array, default: [] },
    warehouseEmployees: { type: String, default: [] },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Organisation', OrganisationSchema);
