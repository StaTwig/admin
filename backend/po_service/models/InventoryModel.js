const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    inventory_id: { type: String, required: true, unique: true },
    inventory_details: {
      type: Array,
      default: [
        {
          inventory_product_info: 'product_id 1',
          inventory_product_quantity: 12345,
        },
        {
          inventory_product_info: 'product_id 2',
          inventory_product_quantity: 67890,
        },
      ],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Inventory', InventorySchema);
