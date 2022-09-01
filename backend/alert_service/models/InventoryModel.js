const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    inventoryDetails: [
      {
        type: new mongoose.Schema(
          {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 0 },
            quantityInTransit: { type: Number, default: 0 },
            totalSales: { type: Number, default: 0 },
          },
          {
            timestamps: true,
          }
        ),
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Inventory", InventorySchema);
