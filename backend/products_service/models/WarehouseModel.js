var mongoose = require('mongoose');
var WarehouseSchema = new mongoose.Schema(
  {
    warehouse_id: { type: String, required: true, unique: true },
    warehouse_organization: {
      type: String,
      required: true,
      default: 'org123',
    },
    warehouse_postal_address: {
      type: String,
      required: true,
      default: 'T-Hub, IIIT, Gachibowli, Hyderabad, Telangana, India',
    },
    region: {
      type: Object,
      required: true,
      default: {
        region_id: 'reg123',
        region_name: 'Earth Prime',
      },
    },
    warehouse_country: {
      type: Object,
      required: true,
      default: {
        country_id: '001',
        country_name: 'India',
      },
    },
    warehouse_location: {
      type: Object,
      default: {
        longitude: 12.12323453534,
        latitude: 13.123435345435,
        geohash: '1231nejf923453',
      },
    },
    warehouse_supervisors: {
      type: Array,
      default: []
    },
    warehouse_employeess: {
      type: Array,
      default: []
    }
  },
  { timestamps: true },
);
module.exports = mongoose.model('warehouses', WarehouseSchema);
