var mongoose = require("mongoose");
ProductSchema = new mongoose.Schema({
  serialNumber: {type: String, required: true},
	txnIds: {type: Array, required: true},
}, {timestamps: true});


module.exports = mongoose.model("Product", ProductSchema);