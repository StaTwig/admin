const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventID: { type: String, required: true },
    transactionId: { type: String, default: null },
    eventTime: { type: String, required: true, default: Date.now },
    eventTypePrimary: { type: String, required: true },
    eventTypeDesc: { type: String, required: true },
    actorId: { type: String, required: true },
    actorUserId: { type: String, required: true },
    caId: { type: String, default: null },
    caName: { type: String, default: null },
    caAddress: { type: String, default: null },
    actorOrgId: { type: String, default: null },
    actorOrgName: { type: String, default: null },
    actorOrgAddress: { type: String, default: null },
    actorWarehouseId: { type: String, default: null },
    secondaryOrgId: { type: String, default: null },
    secondaryOrgName: { type: String, default: null },
    secondaryOrgAddress: { type: String, default: null },
    payloadData: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", EventSchema);
