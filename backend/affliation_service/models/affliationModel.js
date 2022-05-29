const mongoose = require("mongoose");
const AffliationSchema = new mongoose.Schema(
  {
    from: {
      name: String,
      id: String,
      organisationId: String,
      organisationName: String,
      warehouseId: String,
      emailId: String,
      phone: String,
      walletAddress: String,
      photoUrl: String,
    },
    to: {
      name: String,
      id: String,
      organisationId: String,
      organisationName: String,
      warehouseId: String,
      emailId: String,
      phone: String,
      walletAddress: String,
      photoUrl: String,
    },
    status: { type: String, default: "PENDING" },
    id: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Affliation", AffliationSchema);
