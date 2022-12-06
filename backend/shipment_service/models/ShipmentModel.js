const { SchemaTypes, Schema, model } = require("mongoose");
const ShipmentSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    shippingOrderId: String,
    poId: String,
    label: {
      labelId: { type: String },
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
        serialNumbersRange: { type: Array, default: [] },
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
    trips: [
      {
        externalId: String,
        tripScore: String,
        totalCASAlerts: Number,
        distance: Number,
        duration: Number,
        startTimeInISO: String,
        endTimeInISO: String,
        startTime: SchemaTypes.Date,
        endTime: SchemaTypes.Date,
        startLocation: String,
        endLocation: String,
      },
    ],
    tplOrgId : { type : String , required : false},
  },
  { timestamps: true }
);

module.exports = model("Shipment", ShipmentSchema);
