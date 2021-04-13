var mongoose = require("mongoose");

var ExcelSchema = new mongoose.Schema({
	productId: {type: String, required: true},
	sales: {type: String, required: true},
	target: {type: String, required: true},
	warehousId: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model("Excel", ExcelSchema);