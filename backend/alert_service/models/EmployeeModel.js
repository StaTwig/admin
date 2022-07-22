const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    emailId: {
      type: String,
      default: null,
    },
    walletAddress: {
      type: String,
      default: null,
    },
    accountStatus: {
      type: String,
      default: "NOTAPPROVED",
    },
    otp: {
      type: String,
    },
    isConfirmed: { type: Boolean, default: false },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photoId: {
      type: String,
      default: "default.jpg",
    },
    phoneNumber: String,
    preferredLanguage: { type: String, default: "EN" },
    jobTitle: { type: String, default: "Junior Engineer" },
    department: { type: String, default: "Engineering" },
    organisationId: {
      type: String,
      required: true,
    },
    warehouseId: { type: Array, default: [] },
    pendingWarehouseId: { type: Array, default: [] },
    affiliatedOrganisations: {
      type: Array,
      default: [],
    },
    role: { type: String, default: "powerUser" },
    msp: { type: String, default: "org1MSP" },
    postalAddress: String,
    userDocuments: {
      type: Array,
      default: [],
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", EmployeeSchema);
