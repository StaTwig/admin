var mongoose = require('mongoose');
var OrganisationSchema = new mongoose.Schema(
  {
    organisation_id: { type: String, required: true, unique: true },
    organization_name: {
      type: String,
      required: true,
      unique: true,
      default: 'StaTwig Pvt. Ltd.',
    },
    postal_address: {
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
    country: {
      type: Object,
      required: true,
      default: {
        country_id: '001',
        country_name: 'India',
      },
    },
    primary_contact_id: { type: String, required: false },
    organization_type: { type: String, required: false, default: 'SUPPLIER' },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Organisation', OrganisationSchema);
