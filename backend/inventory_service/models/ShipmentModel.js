var mongoose = require("mongoose");
ShipmentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    shippingOrderId: String,
    poId: String,
    label: {
      labelId: { type: String, required: true, unique: true },
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
    imageDetails: {
      type: Array,
      default: [],
    },
    shipmentUpdates: { type: Array, default: [] },
    airWayBillNo: String,
    shippingDate: String,
    expectedDeliveryDate: String,
    actualDeliveryDate: String,
    status: String,
    transactionIds: [String],
    rejectionRate: { type: Number, default: 0.0 },
    products: [
      {
        productID: String,
        productName: String,
        manufacturer: String,
        productQuantity: Number,
        productQuantityDelivered: Number,
        rejectionRate: { type: Number, default: 0.0 },
        labelId: String,
        productCategory: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);
