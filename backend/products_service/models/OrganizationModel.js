var mongoose = require('mongoose');
var OrganizationSchema = new mongoose.Schema(
  {
    organization_id: { type: String, required: true, unique: true },
    organization_name:{type:String, required:true},
    organization_postal_address: {
      type: String,
      required: true,
      unique: true,
      default: 'JNIBF, Gachibowli, Hyderabad, Telanagana, India',
    },
    organization_region: {
      type: Object,
      required: true,
      default: {
        region_id: 'reg123',
        region_name: 'Earth Prime',
      },
    },
    organization_country: {
      type: Object,
      required: true,
      default: {
        country_id: '001',
        country_name: 'India',
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
    organization_primary_contact_id:String,
    organization_logo_id:String,
    organization_type:String,
    organization_warehouses:{
        type:Array,
        default:['ware123','ware234'],
    },
    supervisors: {
      type: Array,
      required: false,
      default: ['user_id 1', 'user_id 2'],
    },
    organization_employees: {
      type: String,
      required: false,
      default: ['em12345', 'em12346', 'em12347'],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Organization', OrganizationSchema);
