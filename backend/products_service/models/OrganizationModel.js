var mongoose = require('mongoose');
var OrganizationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name:{type:String, required:true},
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
        regionId: 'reg123',
        regionName: 'Earth Prime',
      },
    },
    country: {
      type: Object,
      required: true,
      default: {
        countryId: '001',
        countryName: 'India',
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
    primaryContactId:String,
    logoId:String,
    type:String,
    warehouses:{
        type:Array,
        default:['ware123','ware234'],
    },
    supervisors: {
      type: Array,
      required: false,
      default: ['user_id 1', 'user_id 2'],
    },
    employees: {
      type: String,
      required: false,
      default: ['em12345', 'em12346', 'em12347'],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Organization', OrganizationSchema);
