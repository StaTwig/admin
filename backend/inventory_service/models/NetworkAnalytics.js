const mongoose = require("mongoose");

const NetworkAnalytics = new mongoose.Schema(
  {
    orgId: { type: String, required: true },
    warehouseId: { type: String, required: true },
    date: { type: Date, required: true },
    inventory: [
      {
        type: new mongoose.Schema(
          {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 0 },
            quantityInTransit: { type: Number, default: 0 },
            totalSales: { type: Number, default: 0 },
            closingBalance: { type: Number, default: 0 },
            outOfStockDate: { type: Date },
            dailyAnalytics: [
              {
                date: { type: Date, required: true },
                quantity: { type: Number, default: 0 },
              },
            ],
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
module.exports = mongoose.model("network_analytics", NetworkAnalytics);
