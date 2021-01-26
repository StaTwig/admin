var mongoose = require('mongoose');
var OrganisationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    postalAddress: {
      type: String,
      required: true,
      unique: true,
      default: 'JNIBF, Gachibowli, Hyderabad, Telanagana, India',
    },
    region: {
      type: Object,
      required: true,
      default: {
        id: 'reg123',
        name: 'Earth Prime',
      },
    },
    country: {
      type: Object,
      required: true,
      default: {
        id: '001',
        name: 'India',
      },
    },
    location: {
      type: String,
      required: false,
      default: {
        longitude: 12.12323453534,
        latitude: 13.123435345435,
        geohash: '1231nejf923453',
      },
    },
    supervisors: {
      type: Array,
      required: false,
      default: ['user_id 1', 'user_id 2'],
    },
    warehouseEmployees: {
      type: String,
      required: false,
      default: ['em12345', 'em12346', 'em12347'],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Organisation', OrganisationSchema);
