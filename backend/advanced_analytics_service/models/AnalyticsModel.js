var mongoose = require("mongoose");
const moment = require('moment');

var AnalyticsSchema = new mongoose.Schema({
	productId: { type: String, required: true },
	productName: { type: String, required: true },
	productSubName: { type: String },
	brand: { type: String },
	sales: { type: Number, required: true },
	targetSales: { type: Number, required: true },
	returns: { type: Number, required: true },
	actualReturns: { type: Number },
	depot : { type : String },
	returnRate: { type: String },
	returnRatePrev: { type: String },
	warehouseId: { type: String, required: true },
	warehouseName: { type: String, required: true },
	uploadDate: {type:Date, default:moment(new Date()).format('DD-MM-YYYY')}
}, { timestamps: true });

module.exports = mongoose.model("advanced_analytics", AnalyticsSchema);
