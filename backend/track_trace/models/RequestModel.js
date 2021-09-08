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
      phone: String,
      walletAddress: String,
      role: { type: String, required: true },
      photoUrl: {
        type: String,
        default:
          "/usermanagement/api/auth/images/e835ac51d35cfbe691e485b64397f3a5",
      },
    },
    to: {
      id: String,
      organisationId: { type: String, required: true },
      warehouseId: { type: String, required: true },
    },
    status: { type: String, default: "PENDING" },
    labelId: { type: String, required: true },
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
