var mongoose = require("mongoose");

var AnalyticsSchema = new mongoose.Schema({
	productId: {type: String, required: true},
	sales: {type: String, required: true},
	target: {type: String, required: true},
    returns: {type: String, required: true},
	warehousId: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model("Excel", AnalyticsSchema);