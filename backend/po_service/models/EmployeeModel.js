var mongoose = require('mongoose');
var EmployeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    default: 'wallet12345address',
  },
  accountStatus: {
    type: String,
    default: 'ACTIVE',
  },
  firstName: {
    type: String,
    required: true,
    default: 'Ashwini',
  },
  lastName: {
    type: String,
    required: true,
    default: 'Ashwini',
  },
  photoId: { type: String, required: false, default: 'photo12345id' },
  emailId: {
    type: String,
    required: false,
    default: 'ashwini@statwig.com',
  },
  phoneNumber: { type: String, required: false, default: 919642645543 },
  jobTitle: { type: String, required: false, default: 'junior Engineer' },
  organisationId: {
    type: String,
    required: false,
    default: 'pqrstu12345',
  },
  warehouseId: { type: String, required: false, default: 'NA' },
  affiliatedOrganisations: {
    type: String,
    required: false,
    default: ['pqrstu12345', 'cbvnsdjhf23'],
  },
  role: { type: String, required: false, default: 'PLEASE DEFINE ROLES' },
  postalAddress: {
    type: String,
    required: false,
    default: 'gachibowli, hyderabad, india, earth',
  },
});
module.exports = mongoose.model('Employee', EmployeeSchema);
