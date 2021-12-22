const mongoose = require("mongoose");
const ShipmentSchema = new mongoose.Schema(
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
    originalReceiver: {
      id: String,
      name: String,
      locationId: String,
      location: String,
    },
    imageDetails: {
      type: Array,
      default: [],
    },
    taggedShipments: { type: Array, required: false },
    shipmentUpdates: { type: Array, default: [] },
    airWayBillNo: String,
    shippingDate: Date,
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
        batchNumber: String,
        productQuantity: Number,
        productQuantityTaggedSent: { type: Number, default: 0.0 },
        productQuantityDelivered: Number,
        rejectionRate: { type: Number, default: 0.0 },
        labelId: String,
        productCategory: String,
        unitofMeasure: {
          id: { type: String },
          name: {
            type: String,
          },
        },
      },
    ],
    acceptedRequests: [String],
    isCustom: { type: Boolean, default: false },
    vehicleId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);
