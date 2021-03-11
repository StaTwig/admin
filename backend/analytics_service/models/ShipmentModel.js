var mongoose = require("mongoose");
ShipmentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    shippingOrderId: String,
    poId: String,
    label: {
      labelId: String,
      labelType: { type: String, default: "QR_2DBAR" },
    },
    externalShipmentId: String,
    supplier: {
      id: String,
      name: String,
      locationId: String,
      location: String,
    },
    receiver: {
      id: String,
      name: String,
      locationId: String,
      location: String,
    },
    airWayBillNo: String,
    shippingDate: String,
    expectedDeliveryDate: String,
    actualDeliveryDate: String,
    status: String,
    transactionIds: [String],
    products: [
      {
        productId: String,
        productName: String,
        manufacturer: String,
        productQuantity: Number,
        labelId: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);
