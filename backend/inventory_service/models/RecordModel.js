const mongoose = require("mongoose");
const RecordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    externalId: { type: "String" },
    creationDate: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    supplier: {
      type: Object,
    },
    customer: {
      type: Object,
    },
    products: {
      type: Array,
      default: [],
    },
    poStatus: { type: String, default: "CREATED" },
    poUpdates: { type: Array, default: [] },
    lastUpdatedBy: { type: String },
    lastUpdatedOn: {
      type: String,
      required: false,
    },
    shippingOrders: {
      type: Array,
      required: false,
      default: [],
    },
    shipments: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Record", RecordSchema);
