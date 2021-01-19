const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    manufacturingDate: { type: String },
    expiryDate: { type: String },
    serialNumber: { type: String, unique: true },
    owner: { type: String },
    transactionIds: { type: Array },
    productName: { type: String },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Inventory', InventorySchema);
