var mongoose = require("mongoose");
ShipmentSchema = new mongoose.Schema({
  shipmentId: {type: String, required: true},
	txnIds: {type: Array, required: true},
}, {timestamps: true});


module.exports = mongoose.model("Shipment", ShipmentSchema);