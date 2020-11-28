const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    manufacturingDate: { type: String },
    expiryDate: { type: String },
    serialNumber: { type: String, unique: true },
    owner: { type: String },
    manufacturerName: { type: String },
    batchNumber: { type: String },
    transactionIds: { type: Array },
    productName: { type: String },
    shipmentId: { type: String },
    poNumber: { type: String },
    quantity: { type: Number },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Inventory', InventorySchema);
