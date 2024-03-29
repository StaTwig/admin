var mongoose = require("mongoose");
var EmployeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: false, unique: true },
    emailId: {
      type: String,
      required: true,
      unique: true,
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
      default:
        "data:image/webp;base64,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",
    },
    phoneNumber: { type: String, required: false, default: "" },
    jobTitle: { type: String, required: false, default: "junior Engineer" },
    department: { type: String, required: false, default: "engineering" },
    organisationId: {
      type: String,
      required: true,
    },
    warehouseId: { type: Array, required: false, default: "NA" },
    pendingWarehouseId: { type: Array, required: false, default: [] },
    affiliatedOrganisations: {
      type: Array,
      required: false,
    },
    role: { type: String, required: false, default: "powerUser" },
    postalAddress: {
      type: String,
      required: false,
      default: "gachibowli, hyderabad, india, earth",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", EmployeeSchema);
