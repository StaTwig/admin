var mongoose = require('mongoose');
var TplWarehouseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    organisationId: {
      type: String,
      required: true,
      default: 'org123',
    },
    postalAddress: {
      type: String,
      required: false,
      default: null,
    },
    warehouseAddress: {
      type: Object,
      required: true,
      properties: {
        firstLine: { type: String },
        secondLine: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        landmark: { type: String },
        zipCode: { type: String }
      }
    },
    // region: {
    //   type: Object,
    //   required: true,
    //   default: {
    //     regionId: 'reg123',
    //     regionName: 'Earth Prime',
    //   },
    // },
    region: {
      type: String,
      required: true,
      // default: {
      //   regionId: 'reg123',
      //   regionName: 'Earth Prime',
      // },
    },
    // country: {
    //   type: Object,
    //   required: true,
    //   default: {
    //     countryId: '001',
    //     countryName: 'India',
    //   },
    // },
    country: {
      type: String,
      required: true,
      // default: {
      //   countryId: '001',
      //   countryName: 'India',
      // },
    },
    location: {
      type: Object,
      default: {
        longitude: 12.12323453534,
        latitude: 13.123435345435,
        geohash: '1231nejf923453',
      },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('TplWarehouse', TplWarehouseSchema);
