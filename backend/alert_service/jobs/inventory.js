const { format, startOfMonth } = require("date-fns");
const InventoryAnalyticsModel = require("../models/InventoryAnalytics");
const InventoryModel = require("../models/InventoryModel");

async function dailyInventoryUpdate(date) {
  try {
    const allInventories = await InventoryModel.find({}).lean();
    for (const inventory of allInventories) {
      if (inventory?.inventoryDetails?.length > 0) {
        for (const product of inventory.inventoryDetails) {
          let dayOutofStock = 0;
          if (product?.quantity <= 0) dayOutofStock = 1;
          await InventoryAnalyticsModel.updateOne(
            {
              inventoryId: inventory.id,
              date: format(startOfMonth(date), "yyyy-MM-dd"),
              productId: product.productId,
            },
            {
              $inc: {
                outOfStockDays: dayOutofStock,
              },
              $push: {
                dailyAnalytics: [date, product.quantity],
              },
              $setOnInsert: {
                quantity: product.quantity,
                quantityInTransit: product.quantityInTransit,
                openingBalance: product.quantity,
              },
            },
            {
              upsert: true,
            }
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  dailyInventoryUpdate,
};
