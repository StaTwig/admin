const mongoose = require("mongoose");

const AtomSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: {
      type: Object,
      required: true,
      default: {
        id: "uuid1234567899",
        type: "QR_2DBAR",
      },
    },
    productId: { type: String, required: true },
    inventoryIds: {
      type: Array,
      required: true,
      default: [],
    },
    currentInventory: { type: String, default: null },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    poIds: {
      type: Array,
      default: [],
    },
    shipmentIds: {
      type: Array,
      default: [],
    },
    currentShipment: { type: String, default: null },
    txIds: {
      type: Array,
      default: [],
    },
    batchNumbers: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      required: true,
      enum: ["HEALTHY", "TRANSIT", "EXPIRED", "ALERT", "CONSUMED", "LOST"],
      default: "HEALTHY",
    },
    attributeSet: {
      mfgDate: { type: Date, default: Date.now },
      expDate: Date,
    },
    eolInfo: {
      eolId: String,
      eolDate: { type: Date, default: Date.now },
      eolBy: String,
      eolUserInfo: { type: String, default: "NEED_TO_DEFINE" },
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("atom", AtomSchema);
