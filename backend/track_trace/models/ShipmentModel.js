var mongoose = require("mongoose");
ShipmentSchema = new mongoose.Schema({
  shipmentId: {type: String, required: true, unique: true},
	txnIds: {type: Array, required: true},
	receiver: {type: String, required: true},
	sender: {type: String, required: true},
	status: {type: String, required: true},
	estimatedDeliveryDate: {type: String, required: true},
	poNumber: {type: String },
	batchNumber: {type: String },
}, {timestamps: true});


module.exports = mongoose.model("Shipment", ShipmentSchema);
