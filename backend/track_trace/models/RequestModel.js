const mongoose = require("mongoose");
import { customAlphabet } from "nanoid";
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
    payload: {
      shipmentId: [String],
      productId: [String],
    },
    status: { type: String, default: "PENDING" },
    labelId: { type: String, required: true },
    id: { type: String, required: true, unique: true, default: () => nanoid() },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Request", RequestSchema);
