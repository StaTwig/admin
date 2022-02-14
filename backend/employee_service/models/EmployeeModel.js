const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: false, unique: true },
    emailId: String,
    walletAddress: {
      type: String,
      default: "null",
    },
    accountStatus: {
      type: String,
      default: "NOTAPPROVED",
    },
    otp: String,
    isConfirmed: { type: Boolean, default: false },
    firstName: {
      type: String,
      required: true,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      default: "",
    },
    photoId: {
      type: String,
      required: false,
      default:
        "/usermanagement/api/auth/images/e835ac51d35cfbe691e485b64397f3a5",
    },
    phoneNumber: { type: String, required: false, default: "" },
    jobTitle: { type: String, required: false },
    department: { type: String, required: false },
    pendingWarehouseId: { type: Array, required: false, default: [] },
    organisationId: {
      type: String,
      required: true,
    },
    warehouseId: { type: Array, required: false, default: "NA" },
    affiliatedOrganisations: {
      type: Array,
      required: false,
    },
    role: { type: String, required: false, default: "powerUser" },
    postalAddress: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", EmployeeSchema);
