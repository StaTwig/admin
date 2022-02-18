var mongoose = require("mongoose");
var EmployeeSchema = new mongoose.Schema({
  id: { type: String, required: false, unique: true },
  emailId: {
    type: String,
    //required: true,
    //unique: true
  },
  password: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: false,
    default: "wallet12345address",
  },
  accountStatus: {
    type: String,
    default: "ACTIVE",
  },
  confirmOTP: {
    type: String,
  },
  isConfirmed: { type: Boolean, default: false },
  firstName: {
    type: String,
    required: true,
    default: "Ashwini",
  },
  lastName: {
    type: String,
    required: true,
    default: "Ashwini",
  },
  photoId: {
    type: String,
    required: false,
    default: "default.jpg",
  },
  phoneNumber: { type: String, required: false, default: 919642645543 },
  jobTitle: { type: String, required: false, default: "junior Engineer" },
  organisationId: {
    type: String,
    required: false,
    default: "org1234",
  },
  warehouseId: { type: String, required: false, default: "NA" },
  pendingWarehouseId: { type: Array, required: false, default: "NA" },
  affiliatedOrganisations: {
    type: String,
    required: false,
  },
  role: { type: String, required: false, default: "PLEASE DEFINE ROLES" },
  postalAddress: {
    type: String,
    required: false,
    default: "gachibowli, hyderabad, india, earth",
  },
});
module.exports = mongoose.model("Employee", EmployeeSchema);
