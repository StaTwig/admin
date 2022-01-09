const mongoose = require("mongoose");
const ConsumerSchema = new mongoose.Schema(
  {
    shipmentId: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    aadhar: { type: String, required: true },
    vaccineId: { type: String, required: false, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Consumer", ConsumerSchema);
