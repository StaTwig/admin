const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 10);
const RequestSchema = new mongoose.Schema(
  {
    from: {
      name: { type: String, required: true },
      id: { type: String, required: true },
      organisationId: { type: String, required: true },
      warehouseId: { type: String, required: true },
      emailId: String,
      phoneNumber: String,
      walletAddress: String,
      role: { type: String, required: true },
    },
    to: {
      employees: [String],
      organisationId: { type: String, required: true },
      warehouseId: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "CANCELLED", "REJECTED"],
      default: "PENDING",
    },
    label: {
      labelType: { type: String, required: true, default: "QR_2DBAR" },
      labelId: { type: String, required: true },
    },
    shipmentId: String,
    type: {
      type: String,
      enum: ["LOCATION_MISMATCH", "ORGANISATION_MISMATCH", "UNSUFFICIENT_ROLE"],
      required: true,
    },
    id: { type: String, required: true, unique: true, default: () => nanoid() },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Request", RequestSchema);
