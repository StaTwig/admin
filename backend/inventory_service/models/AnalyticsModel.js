var mongoose = require("mongoose");

var AnalyticsSchema = new mongoose.Schema({
	productId: { type: String, required: true },
	productName: { type: String, required: true },
	brand: { type: String },
	productSubName: { type: String },
	sales: { type: Number, required: true },
	isDistrictAggregate: { type: Boolean },
	districtName: { type: String },
	depot: { type: String },
	targetSales: { type: Number, required: true },
	returns: { type: Number },
	warehouseId: { type: String },
	uploadDate: { type: Date, required: true },
	warehouseName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("advanced_analytics", AnalyticsSchema);
