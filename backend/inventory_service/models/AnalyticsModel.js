var mongoose = require("mongoose");

var AnalyticsSchema = new mongoose.Schema({
	productId: { type: String, required: true },
	productName: { type: String, required: true },
	productSubName: { type: String },
	sales: { type: String, required: true },
	isDistrictAggregate: { type: Boolean },
	districtName: { type: String },
	depot: { type: String },
	targetSales: { type: String, required: true },
	returns: { type: String },
	warehouseId: { type: String },
	uploadDate: { type: String, required: true },
	warehouseName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("advanced_analytics", AnalyticsSchema);
