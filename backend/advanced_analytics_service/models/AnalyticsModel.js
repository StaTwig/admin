var mongoose = require("mongoose");

var AnalyticsSchema = new mongoose.Schema({
	productId: {type: String, required: true},
	productName: {type: String, required: true},
	sales: {type: String, required: true},
	target: {type: String, required: true},
    returns: {type: String, required: true},
	warehouseId: {type: String, required: true},
	warehouseName : {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model("Analytic", AnalyticsSchema);
