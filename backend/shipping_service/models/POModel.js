var mongoose = require("mongoose");

var POSchema = new mongoose.Schema({
  orderID: {type: String, required: true, unique: true},
	sender: {type: String, required: true},
	receiver: {type: String, required: true},
  status:{type: String, required: true, default: 'Created'}
}, {timestamps: true});


module.exports = mongoose.model("PurchaseOrder", POSchema);