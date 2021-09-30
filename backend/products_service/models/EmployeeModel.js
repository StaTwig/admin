var mongoose = require('mongoose');
var EmployeeSchema = new mongoose.Schema({
      id: { type: String, required: false, unique: true },
      emailId: {
        type: String,
        //required: true,
        //unique: true
      },
      walletAddress: {
        type: String,
        default: null,
      },
      accountStatus: {
        type: String,
        default: 'NOTAPPROVED',
      },
      otp: {
        type: String,
      },
      isConfirmed: { type: Boolean, default: false },
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
      photoId: {
        type: String,
        required: false,
        default:
            '/images/user.svg',
      },
      phoneNumber: { type: String, required: false, default: '' },
      jobTitle: { type: String, required: false, default: 'junior Engineer' },
      department: { type: String, required: false, default: 'engineering' },
      organisationId: {
        type: String,
        required: true,
      },
      warehouseId: { type: String, required: false, default: 'NA' },
      pendingWarehouseId: { type: Array, required: false, default: 'NA' },
      affiliatedOrganisations: {
        type: Array,
        required: false,
      },
      role: { type: String, required: false, default: 'powerUser' },
      postalAddress: {
        type: String,
        required: false,
        default: 'gachibowli, hyderabad, india, earth',
      },
    }, { timestamps: true }
);
module.exports = mongoose.model('Employee', EmployeeSchema);
