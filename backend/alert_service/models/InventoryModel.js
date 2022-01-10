const mongoose = require("mongoose");
const InventorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    inventoryDetails: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Inventory", InventorySchema);
