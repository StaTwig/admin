const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: false, unique: true },
    emailId: {
      type: String,
    },
    walletAddress: {
      type: String,
      default: "wallet12345address",
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
    phoneNumber: { type: String, required: false, default: "" },
    jobTitle: { type: String, required: false, default: "junior Engineer" },
    department: { type: String, required: false, default: "engineering" },
    organisationId: {
      type: String,
      required: true,
    },
    warehouseId: { type: Array, default: [] },
    pendingWarehouseId: { type: Array, default: [] },
    affiliatedOrganisations: {
      type: Array,
      required: false,
    },
    role: { type: String, required: false, default: "powerUser" },
    preferredLanguage: { type: String, required: true, default: "EN" },
    postalAddress: {
      type: String,
      required: false,
      default: "gachibowli, hyderabad, india, earth",
    },
    userDocuments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", EmployeeSchema);
