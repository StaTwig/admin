var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
	eventID: { type: String, required: true },
	transactionId: { type: String, required: false},
	eventTime: { type: String, required: true },
	eventTypePrimary: { type: String, required: true },
	eventTypeDesc: { type: String, required: true },
	actorId: { type: String, required: true },
	actorUserId: { type: String, required: true },
	caId: { type: String, required: true },
	caName: { type: String, required: true },
	caAddress: { type: String, required: true },
	actorOrgId: { type: String, required: true },
	actorOrgName: { type: String, required: true },
	actorOrgAddress: { type: String, required: true },
	actorWarehouseId: { type: String, required: true },
	secondaryOrgId: { type: String, required: true },
	secondaryOrgName: { type: String, required: true },
	secondaryOrgAddress: { type: String, required: true },
	payloadData: { type: Object, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Events", EventSchema);