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
    caId: { type: String, required: true, default: null },
    caName: { type: String, required: true, default: null },
    caAddress: { type: String, required: true, default: null },
    actorOrgId: { type: String, required: true, default: null },
    actorOrgName: { type: String, required: true, default: null },
    actorOrgAddress: { type: String, required: true, default: null },
    actorWarehouseId: { type: String, required: true, default: null },
    secondaryOrgId: { type: String, required: true, default: null },
    secondaryOrgName: { type: String, required: true, default: null },
    secondaryOrgAddress: { type: String, required: true, default: null },
    payloadData: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", EventSchema);
