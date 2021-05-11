var mongoose = require("mongoose");

var AnalyticsSchema = new mongoose.Schema({
	productId: { type: String, required: true },
	productName: { type: String, required: true },
	productSubName: { type: String },
	sales: { type: String, required: true },
	target: { type: String, required: true },
	returns: { type: String, required: true },
	actualReturns: { type: String },
	returnRate: { type: String },
	returnRatePrev: { type: String },
	warehouseId: { type: String, required: true },
	warehouseName: { type: String, required: true },
	uploadDate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("advanced_analytics", AnalyticsSchema);
