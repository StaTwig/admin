const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    productName: { type: String },
    manufacturerName: { type: String },
    manufacturingDate: { type: String },
    expiryDate: { type: String },
    storageConditionMax: { type: String },
    storageConditionMIn: { type: String },
    batchNumber: { type: String },
    serialNumber: { type: String },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Inventory', InventorySchema);
