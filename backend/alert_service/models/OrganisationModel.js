var mongoose = require('mongoose');
var OrganisationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
    postalAddress: {
      type: String,
      default: null,
    },
    region: {
      type: Object,
      default: {
        id: 'reg123',
        name: 'Earth Prime',
      },
    },
    country: {
      type: Object,
      default: {
        id: '001',
        name: 'India',
      },
    },
    location: {
      type: Object,
      required: false,
      default: {
        longitude: 12.12323453534,
        latitude: 13.123435345435,
        geohash: "1231nejf923453",
      },
    },
    primaryContactId: String,
    logoId: String,
    type: String,
    warehouses: {
      type: Array,
      default: ['ware123', 'ware234'],
    },
    supervisors: {
      type: Array,
      default: ['user_id 1', 'user_id 2'],
    },
    warehouseEmployees: {
      type: Array,
      default: ['em12345', 'em12346', 'em12347'],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Organisation', OrganisationSchema);
